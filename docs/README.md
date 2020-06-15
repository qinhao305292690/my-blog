## 概述
# 搞笑
征拆迁资金监管区块链平台-合作方开放平台（简称开放平台）开放给所有通过征拆迁资金监管区块链平台认证后的合作方使用。在得到征拆迁资金监管区块链平台授权后，合作方可以通过调用开放平台的接口能力，为项目资料管理、审批凭证管理、转账和存单指令的上链和获取、转账和存单指令的状态更新等提供全方位服务。
## 编写目的
:tada: :100: [[toc]]
​	本文档从合作方系统对接的需求出发，对合作方参与征拆迁资金监管区块链平台的业务及数据交换的通讯协议、数据报文格式进行详细描述和说明，明确双方的数据交换标准，由此定义征拆迁资金监管区块链平台开放接口的基本内容。
## 名词定义

​	app_key：征拆迁资金监管区块链平台分配给合作方对接开放平台的应用标识；

​	app_secret：征拆迁资金监管区块链平台分配给合作方对接开放平台的应用密钥；

​	auth_code：征拆迁资金监管区块链平台授权合作方应用允许访问平台数据的授权码；

​	chaincodeID：征拆迁资金监管区块链平台分配给合作方对接开放平台区块链的智能合约标识；



##接口规范



## 接口定义

### 1.区块链接口

``` markdown
入区块链须知：

	各银行需独自做一个适配层，适配层的的作用：通过取各自银行的区块链支付指令信息，调用各自银行的支付接口，将各自银行的支付结果信息更新至区块链。具体步骤如下：

	1.定时任务执行取区块链支付指令待处理信息（status为0），调用银行支付接口，将支付结果明细信息			（状态值（1:处理成功，3:处理中，4:处理失败)和返回码等）更新至区块链。

	2.定时任务执行取区块链支付指令处理中信息（status为3），调用银行支付结果查询，将结果信息更新至区块链。
```



#### 1.1转账指令入区块链

1.功能说明

​	合作方发起转账指令入区块链请求，区块链校验、保存后返回交易结果相关信息。

2.请求路径

​	https://xx.xx.xx.xx:31700/chaincode

3.通用请求参数

| 参数名      | 类型 | 是否必输 | 描述       | 说明                        |
| ----------- | ---- | -------- | ---------- | --------------------------- |
| ChaincodeID | 字符 | 是       | 智能合约ID |                             |
| Tpye        | 字符 | 是       | 请求类型   | 固定值“invoke”              |
| Function    | 字符 | 是       | 请求方法   | 固定值“AddTransferInstruct“ |
| CHANNELID   | 字符 | 是       | 合作方标识 |                             |

4.请求参数

| 参数名      | 类型 | 是否必输 | 描述       | 说明                |
| :---------- | :--- | :------- | :--------- | :--------------------------- |
|Project|字符|是|项目ID||
|Usage|字符|是|用途编号|0:预付款,1:建设者工资,2:合同款,3:采购款,4:借款,5:拨款,6:还款,7:上交款,8:差旅费,9:运输费,10:保证金,11:投资,12:材料设备（采购或租用）费,13:机械（采购或租用）费,14:设计费,15:水电费,16:检测费,17:专业分包费,18:管理费,19:预付款,99:其他|
|TotalNum|字符|是|总数|此次PayInstrucid包含的笔数|
|Paydeptid|字符|是|付款方机构编号|付款方内部机构编号|
|DepId|字符|是|收款方机构编号|收款方内部机构编号|
|PayInstrucid|字符|是|支付指令ID|每批支付指令ID唯一标识|
|SeqNo|字符|是|序号|同支付指令ID内部SeqNo不重复|
|PayAccno|字符|是|付款账户||
|PayAccnoName|字符|是|付款账户户名||
|PayBank|字符|是|付款账户银行行号|银行行号（大小额系统使用）|
|PayBankName|字符|是|付款账户银行行名|名称到营业网点机构（大小额系统使用）|
|AccBank|字符|是|收款账户银行行号|银行行号（大小额系统使用）|
|AccBankName|字符|是|收款账户银行行名|名称到营业网点机构（大小额系统使用）|
|UniBankno|字符|是|收款账号联行行号|联行行号（超级网银系统使用）|
|UniBankNanme|字符|是|收款银行名称|名称到总行，如“工商银行”（超级网银系统使用）|
|Accno|字符|是|收款账户账号||
|AccnoName|字符|是|收款账户户名||
|AccnoType|字符|否|账户类型|暂不使用|
|AccType|字符|否|入账类型|暂不使用|
|AccDate|字符|否|起息日期|暂不使用|
|CurrType|字符|否|币种|暂不使用|
|Amount|字符|是|金额|转账金额|
|FeeSummary|字符|否|收费标志|暂不使用|
|Status|字符|是|指令状态|0待处理,1处理成功,3处理中,4处理失败|
|StatusDesc|字符|是|状态描述|银行侧返回码描述|
|Txno|字符|否|支付流水号|银行侧反馈的支付流水号|
|Retcode|字符|是|支付返回码|银行侧返回码|
|Note1|字符|是|备注1|存放附言信息（应用侧与跨行之间的信息交互）|
|Note2|字符|是|备注2|留作银行备用字段|

5.响应参数

| 参数名             | 类型 | 是否非空 | 描述               | 说明                   |
| ------------------ | ---- | -------- | ------------------ | ---------------------- |
| blockchainStatus   | 字符 | 是       | 交易状态           | 0:成功, 1:失败, 2:超时 |
| blockchainMessage  | 字符 | 是       | 交易执行结果报文   |                        |
| blockchainUuid     | 字符 | 是       | 区块链交易的UUID   | 区块链交易唯一标识     |
| blockchainSuccess  | 字符 | 是       | 区块链交易是否成功 | 暂不使用               |
| blockchainResponse | 字符 | 是       | 原始JSON报文       |                        |

6.请求报文示例

```java
[[{"Project":"P0000003", "Usage":"99", "TotalNum":"1", "Paydeptid":"300", "DepId":"400", "PayInstrucid":"202001020000000192", "SeqNo":"1", "PayAccno":"6222080200001234031", "PayAccnoName":"征管中心A账号", "PayBank":"102301000028", "PayBankName":"中国工商银行南京市城北支行", "AccBank":"102301000036", "AccBankName":"中国工商银行南京市下关支行", "Accno":"6222080200001234041", "AccnoName":"大厂街道财政所A账号", "Amount":"30000.00", "Status":"0"},{"Project":"P0000003", "Usage":"99", "TotalNum":"1", "Paydeptid":"100", "DepId":"200", "PayInstrucid":"202001020000000193", "SeqNo":"1", "PayAccno":"6222080200001234011", "PayAccnoName":"财政局A账号", "PayBank":"102301000069", "PayBankName":"中国工商银行南京市雨花支行", "AccBank":"102301000077", "AccBankName":"中国工商银行南京市玄武支行", "Accno":"6222080200001234021", "AccnoName":"土储中心A账号", "Amount":"50000.00", "Status":"0"}], {"CHANNELID":"icbc"}]
```

7.响应示例

```java
{blockchainResponse={"result":{"uuid":"b6e840a5-8318-456d-bc17-50f523516126","status":"OK"},"id":5,"jsonrpc":"2.0"}, blockchainMessage=, blockchainSuccess=false, blockchainUuid=b6e840a5-8318-456d-bc17-50f523516126, blockchainStatus=0}
```

#### 1.2存单指令入区块链

1.功能说明

​	合作方发起存单指令入区块链请求，区块链校验、保存后返回交易结果相关信息。

2.请求路径

​	<https://xx.xx.xx.xx:31700/chaincode>

3.通用请求参数

| 参数名      | 类型 | 是否必输 | 描述       | 说明                       |
| ----------- | ---- | -------- | ---------- | -------------------------- |
| ChaincodeID | 字符 | 是       | 智能合约ID |                            |
| Tpye        | 字符 | 是       | 请求类型   | 固定值“invoke”             |
| Function    | 字符 | 是       | 请求方法   | 固定值“AddDepositInstruct“ |
| CHANNELID   | 字符 | 是       | 合作方标识 |                            |

4.请求参数

| 参数名       | 类型 | 是否必输 | 描述             | 说明                                                         |
| ------------ | ---- | -------- | ---------------- | ------------------------------------------------------------ |
|PROJECT|字符|是|项目ID||
|USAGE|字符|是|用途编号||
|TOTALNUM|字符|是|总数|此次PayInstrucid包含的笔数|
|PAYINSTRUCID|字符|是|支付指令ID|每批支付指令ID唯一标识|
|SEQNO|字符|是|序号|同支付指令ID内部SeqNo不重复|
|CHNSNAME|字符|是|中文姓名||
|NATIDNO|字符|是|国籍||
|SEX|字符|是|性别||
|LGLDOCTP|字符|是|个人证件类型||
|LGLDOCNO|字符|是|个人证件号码||
|LGEPIRD|字符|是|证件有效期截止日||
|ADDRESS|字符|是|个人地址||
|Pzip|字符|否|个人地址邮编||
|PHONE1|字符|是|家庭电话/办公电话||
|SAVTERM|字符|否|存期||
|NEXTTERM|字符|否|约转存期||
|PRASINFF|字符|否|通知种类||
|COUNTER|字符|是|笔数||
|AMOUNT|字符|是|金额||
|STATUS|字符|是|指令状态|"0待处理,1处理成功,3处理中,4处理失败|
|STATUSDESC|字符|否|状态描述|银行侧返回码描述|
|TXNO|字符|否|支付流水号|银行侧反馈的支付流水号|
|RETCODE|字符|否|支付返回码|银行侧返回码|
|NOTE1|字符|否|备注1|存放附言信息（应用侧与跨行之间的信息交互）|
|NOTE2|字符|否|备注2|留作银行备用字段|
|PAYACCNO|字符|是|付款账户||
|PAYACCNONAME|字符|是|付款账户户名||
|PAYBANK|字符|是|付款账户银行行号||
|PAYBANKNAME|字符|是|付款账户银行行名|

5.响应参数

| 参数名             | 类型 | 是否非空 | 描述               | 说明                   |
| ------------------ | ---- | -------- | ------------------ | ---------------------- |
| blockchainStatus   | 字符 | 是       | 交易状态           | 0:成功, 1:失败, 2:超时 |
| blockchainMessage  | 字符 | 是       | 交易执行结果报文   |                        |
| blockchainUuid     | 字符 | 是       | 区块链交易的UUID   | 区块链交易唯一标识     |
| blockchainSuccess  | 字符 | 是       | 区块链交易是否成功 | 暂不使用               |
| blockchainResponse | 字符 | 是       | 原始JSON报文       |                        |

6.请求报文示例

```java
[[{"PROJECT":"P0000001", "USAGE":"99", "TOTALNUM":"1", "PAYINSTRUCID":"202001060000000147", "SEQNO":"1", "CHNSNAME":"张三丰", "NATIDNO":"156", "SEX":"1", "LGLDOCTP":"0", "LGLDOCNO":"431126199010270089", "LGEPIRD":"2030-06-20", "ADDRESS":"大厂街道A楼B座C层D号张首富", "Pzip":"000000", "PHONE1":"13888888888", "SAVTERM":"003", "NEXTTERM":"1-1", "COUNTER":"1", "AMOUNT":"1200.00", "STATUS":"0", "PAYACCNO":"6222080200001234031", "PAYACCNONAME":"征管中心A账号", "PAYBANK":"102301000028", "PAYBANKNAME":"中国工商银行南京市城北支行"}], {"CHANNELID":"icbc"}]
```

7.响应示例

```java
{"result":{"message":"[]","uuid":"ef505d6f-4248-42d9-84a1-572757de3a5e","status":"OK"},"id":5,"jsonrpc":"2.0"}, blockchainMessage=[], blockchainSuccess=true, blockchainUuid=ef505d6f-4248-42d9-84a1-572757de3a5e, blockchainStatus=0}
```

#### 1.3转账结果入区块链

1.功能说明

​	合作方发起转账结果入区块链请求，区块链校验、保存后返回交易结果相关信息。

2.请求路径

​	<https://xx.xx.xx.xx:31700/chaincode>

3.通用请求参数

| 参数名      | 类型 | 是否必输 | 描述       | 说明                      |
| ----------- | ---- | -------- | ---------- | ------------------------- |
| ChaincodeID | 字符 | 是       | 智能合约ID |                           |
| Tpye        | 字符 | 是       | 请求类型   | 固定值“invoke”            |
| Function    | 字符 | 是       | 请求方法   | 固定值“AddTransferResult“ |
| CHANNELID   | 字符 | 是       | 合作方标识 |                           |

4.请求参数

| 参数名       | 类型 | 是否必输 | 描述              | 说明                                       |
| ------------ | ---- | -------- | ----------------- | ------------------------------------------ |
| Status       | 字符 | 是       | 指令状态          | 0待处理，1处理成功，3处理中，4处理失败     |
| PayInstrucid | 字符 | 是       | 指令ID            | 区块链更新Key值之一指令ID                  |
| SeqNo        | 字符 | 是       | 序列号            | 区块链更新Key值之一序列号                  |
| Retcode      | 字符 | 否       | 返回码            | 银行的返回码                               |
| StatusDesc   | 字符 | 否       | 返回码描述        | 银行返回码描述                             |
| Txno         | 字符 | 否       | 流水号            | 银行支付返回的流水号                       |

5.响应参数

| 参数名             | 类型 | 是否非空 | 描述               | 说明                   |
| ------------------ | ---- | -------- | ------------------ | ---------------------- |
| blockchainStatus   | 字符 | 是       | 交易状态           | 0:成功, 1:失败, 2:超时 |
| blockchainMessage  | 字符 | 是       | 交易执行结果报文   |                        |
| blockchainUuid     | 字符 | 是       | 区块链交易的UUID   | 区块链交易唯一标识     |
| blockchainSuccess  | 字符 | 是       | 区块链交易是否成功 | 暂不使用               |
| blockchainResponse | 字符 | 是       | 原始JSON报文       |                        |

6.请求报文示例

```java
[[{"Status":"1", "PayInstrucid":"202001020000000192", "SeqNo":"1", "Retcode":"0", "StatusDesc":"成功", "Txno":"20200102000000000001"}], {"CHANNELID":"icbc"}]
```

7.响应示例

```java
{"result":{"message":"[]","uuid":"ef505d6f-4248-42d9-84a1-572757de3a6c","status":"OK"},"id":5,"jsonrpc":"2.0"}, blockchainMessage=[], blockchainSuccess=true, blockchainUuid=ef505d6f-4248-42d9-84a1-572757de3a6c, blockchainStatus=0}
```

#### 1.4存单结果入区块链

1.功能说明

​	合作方发起存单结果入区块链请求，区块链校验、保存后返回交易结果相关信息。

2.请求路径

​	<https://xx.xx.xx.xx:31700/chaincode>

3.通用请求参数

| 参数名      | 类型 | 是否必输 | 描述       | 说明                     |
| ----------- | ---- | -------- | ---------- | ------------------------ |
| ChaincodeID | 字符 | 是       | 智能合约ID |                          |
| Tpye        | 字符 | 是       | 请求类型   | 固定值“invoke”           |
| Function    | 字符 | 是       | 请求方法   | 固定值“AddDepositResult“ |
| CHANNELID   | 字符 | 是       | 合作方标识 |                          |

4.请求参数

| 参数名       | 类型 | 是否必输 | 描述              | 说明                                       |
| ------------ | ---- | -------- | ----------------- | ------------------------------------------ |
| Status       | 字符 | 是       | 指令状态          | 0待处理，1处理成功，3处理中，4处理失败     |
| PayInstrucid | 字符 | 是       | 指令ID            | 区块链更新Key值之一指令ID                  |
| SeqNo        | 字符 | 是       | 序列号            | 区块链更新Key值之一序列号                  |
| Retcode      | 字符 | 否       | 返回码            | 银行的返回码                               |
| StatusDesc   | 字符 | 否       | 返回码描述        | 银行返回码描述                             |
| Txno         | 字符 | 否       | 流水号            | 银行支付返回的流水号                       |

5.响应参数

| 参数名             | 类型 | 是否非空 | 描述               | 说明                   |
| ------------------ | ---- | -------- | ------------------ | ---------------------- |
| blockchainStatus   | 字符 | 是       | 交易状态           | 0:成功, 1:失败, 2:超时 |
| blockchainMessage  | 字符 | 是       | 交易执行结果报文   |                        |
| blockchainUuid     | 字符 | 是       | 区块链交易的UUID   | 区块链交易唯一标识     |
| blockchainSuccess  | 字符 | 是       | 区块链交易是否成功 | 暂不使用               |
| blockchainResponse | 字符 | 是       | 原始JSON报文       |                        |

6.请求报文示例

```java
[[{"Status":"1", "PayInstrucid":"202001060000000147", "SeqNo":"1", "Retcode":"0", "StatusDesc":"成功", "Txno":"20200106000000000001"}], {"CHANNELID":"icbc"}]
```

7.响应示例

```java
{"result":{"message":"[]","uuid":"ef505d6f-4248-42d9-84a1-572757de3a7d","status":"OK"},"id":5,"jsonrpc":"2.0"}, blockchainMessage=[], blockchainSuccess=true, blockchainUuid=ef505d6f-4248-42d9-84a1-572757de3a7d, blockchainStatus=0}
```



### 2.平台接口

#### 2.1审批凭证图片上传

1.功能说明

​	合作方发起审批凭证图片录入平台请求，平台校验、保存后返回交易结果相关信息。

2.请求路径

​	<https://xx.xx.xx.xx/openapi>

3.通用请求参数

| 参数名    | 类型 | 是否必输 | 描述           | 说明                                                         |
| :-------- | ---- | -------- | -------------- | ------------------------------------------------------------ |
| method    | 字符 | 是       | API接口名称    | 固定值“dccms.approval.imgupload”                             |
| req_sid   | 字符 | 是       | 请求流水号     | 每次接口请求的唯一标识ID                                     |
| version   | 字符 | 是       | 接口版本       | 1.0                                                          |
| format    | 字符 | 是       | 交互数据包格式 | 目前均为xml                                                  |
| timestamp | 字符 | 是       | 时间戳         | 时间戳，格式为yyyy-MM-dd HH:mm:ss.xxxxxx，服务端允许客户端请求时间误差为前后各5分钟。时间戳最少上送到秒级。 |
| app_key   | 字符 | 是       | 接入系统标识   |                                                              |
| auth_code | 字符 | 是       | 授权码         |                                                              |
| sign      | 字符 | 是       | 交易签名       | 对app_key=01011100&auth_code=AFcdE&req_data=XXXXXX字符串采用基于SHA-256的HMAC散列算法（密钥为32位app_secret）所得 |

4.请求参数

| 参数名          | 类型 | 是否必输 | 描述     | 说明                                                         |
| --------------- | ---- | -------- | -------- | ------------------------------------------------------------ |
| image_file      | 字符 | 是       | 上传图片 | 图片内容，图片处理过程：读取图片二进制内容进行BASE64编码，作为image_file内容上传。 |
| image_name      | 字符 | 是       | 图片名称 |                                                              |
| img_category_id | 字符 | 是       | 图片分类 | 001：凭证图片                                                |

5.响应参数

| 参数名    | 类型 | 是否非空 | 描述         | 说明                                |
| --------- | ---- | -------- | ------------ | ----------------------------------- |
| method    | 字符 | 是       | API接口名称  | 同客户请求参数                      |
| req_sid   | 字符 | 是       | 请求流水号   | 同客户请求参数                      |
| version   | 字符 | 是       | 接口版本     | 同客户请求参数                      |
| timestamp | 字符 | 是       | 时间戳       | 同客户请求参数                      |
| app_key   | 字符 | 是       | 接入系统标识 | 同客户请求参数                      |
| auth_code | 字符 | 是       | 授权码       | 同客户请求参数                      |
| ret_code  | 字符 | 是       | 返回代码     | 0成功，其他为错误                   |
| ret_msg   | 字符 | 是       | 错误描述     | ret_code为错误时返回                |
| sign      | 字符 | 是       | 交易签名     | 使用客户secret进行报文体SHA-256签名 |
| img_id    | 字符 | 是       | 图片编号     |                                     |

6.请求报文示例

``` xml
https://xx.xx.xx.xx/openapi?sign=5029C3055D51555112B60B33000122D5&timestamp=2020-01-06+13%3A52%3A03&version=2.0&app_key=01011100&method=dccms.approval.imgupload&format=xml&req_sid=20200106145102&auth_code=AFcdE&req_data=<?xml version="1.0" encoding="UTF-8"?><body>
<image_file>xxxxxxxxxxx</image_file>
<image_name>图片名称</image_name>
<img_category_id>001</img_category_id>
</body>
```

7.响应示例

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<response>
<head>
<method>dccms.approval.imgupload</method>
<req_sid>20200106145102</req_sid>
<version>1.0</version>
<timestamp>123111111111</timestamp>
<app_key>01011100</app_key>
<auth_code>AfcdE</auth_code>
<ret_code>0</ret_code>
<ret_msg>OK</ret_msg>
<sign>581149147A@#%^ASDFQEQW</sign>
</head>
<body>
<img_id>1392264247635</img_id>
</body>
```

###### 
