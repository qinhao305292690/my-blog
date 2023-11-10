---
title: webWorker
date: 2023-11-10
categories: 
- 前端
tags: 
- http
---
:rofl: 前端浏览器缓存知识
## 前言 
## Web Worker 概念与用法
::: tip
Worker 是一个使用构造函数创建的对象（例如 Worker()），它运行一个具名 JavaScript 文件——该文件包含将在 worker 线程中运行的代码。
:::
::: tip
除了标准的 JavaScript 函数集（如 String、Array、Object、JSON 等），你可以在 worker 线程中运行任何你喜欢的代码，有一些例外：你不能直接在 worker 线程中操作 DOM 元素，或使用 window 对象中的某些方法和属性。有关你可以运行的代码的信息，请参见下面的 Worker 全局上下文和函数和支持的 Web API 。
:::
::: tip
数据通过消息系统在 worker 和主线程之间发送——双方都使用 postMessage() 方法发送消息，并通过 onmessage 事件处理程序响应消息（消息包含在 message 事件的 data 属性中）。数据是复制的，而不是共享的。
:::
::: tip
worker 可以依次生成新的 worker，只要这些 worker 与父页面托管在同一个 origin 中。此外，worker 可以通过 XMLHttpRequest 来访问网络，但 XMLHttpRequest 的 responseXML 和 channel 属性始终返回 null
:::
## 支持的 Web API
 以下 Web API 对 worker 是可用的：
 
 Barcode Detection API (en-US)
 Broadcast Channel API
 Cache API
 Channel Messaging API
 Console API
 Web Crypto API（例如 Crypto）
 CSS Font Loading API
 CustomEvent
 Encoding API（例如 TextEncoder、TextDecoder）
 Fetch API
 FileReader
 FileReaderSync（仅在 worker 中有效！）
 FormData
 ImageBitmap
 ImageData
 IndexedDB
 Media Source Extensions API（仅限专用 worker）
 Network Information API
 Notifications API
 OffscreenCanvas（和所有的 canvas context API）
 Performance API，包括：
 Performance
 PerformanceEntry
 PerformanceMeasure (en-US)
 PerformanceMark (en-US)
 PerformanceObserver
 PerformanceResourceTiming
 Server-sent 事件
 ServiceWorkerRegistration (en-US)
 URL API（例如 URL）
 WebCodecs_API
 WebSocket
 XMLHttpRequest
 worker 也可以派生其他 worker，所以这些 API 也是可用的：
 
 Worker
 
 WorkerGlobalScope (en-US)
 
 WorkerLocation (en-US)
 
 WorkerNavigator (en-US)
  
  ## webWorker代码示例:
  #### 下面的代码通过构造函数 Worker() 创建了一个 Worker 对象。
  >前端代码
  ````html
 <!DOCTYPE html>  
 <html>  
 <body>  
   
 <h1>Web Worker Example</h1>  
 <p id="output"></p>  
   
 <script>  
   var worker = new Worker('worker.js');  
   worker.postMessage(5);  
   worker.onmessage = function(event) {  
     document.getElementById('output').innerHTML = event.data;  
   };  
 </script>  
   
 </body>  
 </html>

````
>worker.js
````javascript
   // worker.js  
     
   self.postMessage('Hello from Worker!');  
     
   self.onmessage = function(event) {  
     console.log('Message received from main script:', event.data);  
     var response = event.data * 2;  
     self.postMessage(response);  
   };
````

>在这个例子中，我们创建了一个新的 Worker 对象，并向它发送了一个数字 5。当 worker 完成处理后，它会将结果发送回主线程。我们在主线程中使用 onmessage 事件监听器来接收这个结果，并将其显示在页面上。
 
