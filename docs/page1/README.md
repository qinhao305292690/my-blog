## 概述 Page1


### 1.区块链接口

``` markdown
入区块链须知：

	各银行需独自做一个适配层，适配层的的作用：通过取各自银行的区块链支付指令信息，调用各自银行的支付接口，将各自银行的支付结果信息更新至区块链。具体步骤如下：

	1.定时任务执行取区块链支付指令待处理信息（status为0），调用银行支付接口，将支付结果明细信息			（状态值（1:处理成功，3:处理中，4:处理失败)和返回码等）更新至区块链。

	2.定时任务执行取区块链支付指令处理中信息（status为3），调用银行支付结果查询，将结果信息更新至区块链。
```



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
