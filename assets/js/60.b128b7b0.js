(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{672:function(e,t,s){"use strict";s.r(t);var a=s(3),r=Object(a.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h2",{attrs:{id:"父传子"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#父传子"}},[e._v("🌙")]),e._v(" 父传子")]),e._v(" "),s("p",[e._v("在父组件中初始化数据，将子组件的"),s("code",[e._v("props")]),e._v("属性值通过父组件的状态"),s("code",[e._v("state")]),e._v("来管理，父组件通过调用"),s("code",[e._v("setState")]),e._v("方法来更新子组件数据：")]),e._v(" "),s("iframe",{staticStyle:{width:"100%"},attrs:{height:"265",scrolling:"no",title:"React父子组件的通信",src:"https://codepen.io/zkkysqs/embed/RwwmJxO?height=265&theme-id=default&default-tab=js,result",frameborder:"no",allowtransparency:"true",allowfullscreen:"true"}},[e._v("\n  See the Pen "),s("a",{attrs:{href:"https://codepen.io/zkkysqs/pen/RwwmJxO"}},[e._v("React父子组件的通信")]),e._v(" by zkkysqs\n  ("),s("a",{attrs:{href:"https://codepen.io/zkkysqs"}},[e._v("@zkkysqs")]),e._v(") on "),s("a",{attrs:{href:"https://codepen.io"}},[e._v("CodePen")]),e._v(".\n")]),e._v(" "),s("h2",{attrs:{id:"子传父"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#子传父"}},[e._v("🌙")]),e._v(" 子传父")]),e._v(" "),s("p",[e._v("在子组件中初始化数据，在子组件构造方法中通过"),s("code",[e._v("props")]),e._v("调用父组件回调函数设置"),s("code",[e._v("setState")]),e._v("，更新父组件的"),s("code",[e._v("state")]),e._v("状态，从而更新父组件数据：")]),e._v(" "),s("iframe",{staticStyle:{width:"100%"},attrs:{height:"265",scrolling:"no",title:"React 父子之间的通信-子传父",src:"https://codepen.io/zkkysqs/embed/ExxzRJp?height=265&theme-id=default&default-tab=js,result",frameborder:"no",allowtransparency:"true",allowfullscreen:"true"}},[e._v("\n  See the Pen "),s("a",{attrs:{href:"https://codepen.io/zkkysqs/pen/ExxzRJp"}},[e._v("React 父子之间的通信-子传父")]),e._v(" by zkkysqs\n  ("),s("a",{attrs:{href:"https://codepen.io/zkkysqs"}},[e._v("@zkkysqs")]),e._v(") on "),s("a",{attrs:{href:"https://codepen.io"}},[e._v("CodePen")]),e._v(".\n")]),e._v(" "),s("h2",{attrs:{id:"任意组件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#任意组件"}},[e._v("🌙")]),e._v(" 任意组件")]),e._v(" "),s("p",[e._v("任意组件间的通信，若不借助其他库，一般借用消息中间件和状态管理来实现：")]),e._v(" "),s("p",{staticClass:"codepen",staticStyle:{height:"265px","box-sizing":"border-box",display:"flex","align-items":"center","justify-content":"center",border:"2px solid",margin:"1em 0",padding:"1em"},attrs:{"data-height":"265","data-theme-id":"default","data-default-tab":"js,result","data-user":"zkkysqs","data-slug-hash":"eYYajNK","data-pen-title":"React组件间的通信-消息接口"}},[s("span",[e._v("See the Pen "),s("a",{attrs:{href:"https://codepen.io/zkkysqs/pen/eYYajNK"}},[e._v("\n  React组件间的通信-消息接口")]),e._v(" by zkkysqs ("),s("a",{attrs:{href:"https://codepen.io/zkkysqs"}},[e._v("@zkkysqs")]),e._v(")\n  on "),s("a",{attrs:{href:"https://codepen.io"}},[e._v("CodePen")]),e._v(".")])]),e._v(" "),s("script",{attrs:{async:"",src:"https://static.codepen.io/assets/embed/ei.js"}}),e._v("\n 消息中间件的模式非常简单，利用了观察者模式，将两个组件之间的耦合解耦成了组件和消息中心+消息名称的耦合 ，但为了解耦却引入全局消息中心和消息名称，消息中心对组件的侵入性很强 ，谨慎使用。\n"),s("h2",{attrs:{id:"单向数据流"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#单向数据流"}},[e._v("🌙")]),e._v(" 单向数据流")]),e._v(" "),s("p",[e._v("现在，我们已经知道：")]),e._v(" "),s("ul",[s("li",[e._v("父传子：父组件通过"),s("code",[e._v("props")]),e._v("直接赋值的形式实现，更新数据使用"),s("code",[e._v("state")]),e._v("管理状态，直接调用"),s("code",[e._v("this.setState")]),e._v("方法。")]),e._v(" "),s("li",[e._v("子传父：子组件通过"),s("code",[e._v("props")]),e._v("调用父组件的方法，从而间接调用父组件的"),s("code",[e._v("this.setState")]),e._v("方法将子组件的数据传给父组件，并更新父组件视图。")])]),e._v(" "),s("p",[e._v("单向数据流是指数据的流向只能由父组件通过"),s("code",[e._v("props")]),e._v("将数据传递给子组件，不能由子组件向父组件传递数据，要想实现数据的双向绑定，只能由子组件接收父组件"),s("code",[e._v("props")]),e._v("传过来的方法去改变父组件的数据，而不是直接将子组件的数据传递给父组件。")]),e._v(" "),s("h2",{attrs:{id:"更进一步"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#更进一步"}},[e._v("🌙")]),e._v(" 更进一步")]),e._v(" "),s("p",[e._v("如果项目非常大，上面方案都不合适，那你可能需要一个状态管理工具，通过状态管理工具把组件之间的关系，和关系的处理逻辑从组建中抽象出来，并集中化到统一的地方来处理，"),s("a",{attrs:{href:"https://redux.js.org",target:"_blank",rel:"noopener noreferrer"}},[e._v("Redux"),s("OutboundLink")],1),e._v("就是一个非常不错的状态管理工具。")]),e._v(" "),s("p",[e._v("除了"),s("a",{attrs:{href:"https://redux.js.org",target:"_blank",rel:"noopener noreferrer"}},[e._v("Redux"),s("OutboundLink")],1),e._v("，还有"),s("a",{attrs:{href:"https://cn.mobx.js.org",target:"_blank",rel:"noopener noreferrer"}},[e._v("Mobx"),s("OutboundLink")],1),e._v("，Rematch，reselect等工具，这些都是用来解决不同问题的，只要根据自己的场景选择合适的工具就好了。")])])}),[],!1,null,null,null);t.default=r.exports}}]);