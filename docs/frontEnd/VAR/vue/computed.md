---
title: 【Vue2.0】vue之双向绑定
sidebar: 'auto'
date: 2020-07-27
categories: 
- 前端
tags: 
- Vue
- JS
---

# 原理
1.vue 双向数据绑定是通过 数据劫持 结合 发布订阅模式的方式来实现的， 也就是说数据和视图同步，数据发生变化，视图跟着变化，视图变化，数据也随之发生改变；

2.核心：关于VUE双向数据绑定，其核心是 Object.defineProperty()方法

3.介绍一下Object.defineProperty()方法

（1）Object.defineProperty(obj, prop, descriptor) ，这个语法内有三个参数，分别为 obj （要定义其上属性的对象） prop （要定义或修改的属性） descriptor （具体的改变方法）
（2）简单地说，就是用这个方法来定义一个值。当调用时我们使用了它里面的get方法，当我们给这个属性赋值时，又用到了它里面的set方法；
```` js
var obj = {}
Object.defineProperyt(obj,'hello',{
    get(){
        console.log('调用了get方法')
    },
    set(val){
        console.log('调用了set方法方法的值是' + val)
       }
})
obj.hello // 调用了get方法
obj.hello = '你好' //调用了set方法
````
## 简单实现一个双向绑定
```` html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    
    <body>
        <div id="app">
            <input type="text" id="a">
            <span id="b"></span>
        </div>
    </body>
    <script>
        var obj = {};  //定义一个空对象
    
        var val = 'zhao';  //赋予初始值
    
        Object.defineProperty(obj, 'val', {//定义要修改对象的属性
    
            get: function () {
    
                return val;
            },
    
            set: function (newVal) { 
    
                 val = newVal;//定义val等于修改后的内容
    
                document.getElementById('a').value = val;//让文本框的内容等于val
                
                document.getElementById('b').innerHTML = val;//让span的内容等于val
    
            }
    
        });
        document.addEventListener('keyup', function (e) {//当在文本框输入内容时让对象里你定义的val等于文本框的值
    
            obj.val = e.target.value;
    
        })
    
    </script>
    
    </html>
````
这样我们就能实现js的双向数据绑定，也对这个方法有初步的了解；
这个例子实现的效果是：随着文本框输入文字的变化，span中会同步显示相同的文字内容；这样就实现了 model => view 以及 view => model 的双向绑定。
通过添加事件监听keyup来触发set方法，而set再修改了访问器属性的同时，也修改了dom样式，改变了span标签内的文本。

