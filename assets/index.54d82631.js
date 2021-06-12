import{R as e,d as t,S as o,C as a,P as n,T as r,a as c,b as i,h as l,r as d}from"./vendor.bcba5a07.js";let s;const m={},p=function(e,t){if(!t)return e();if(void 0===s){const e=document.createElement("link").relList;s=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in m)return;m[e]=!0;const t=e.endsWith(".css"),o=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${o}`))return;const a=document.createElement("link");return a.rel=t?"stylesheet":s,t||(a.as="script",a.crossOrigin=""),a.href=e,document.head.appendChild(a),t?new Promise(((e,t)=>{a.addEventListener("load",e),a.addEventListener("error",t)})):void 0}))).then((()=>e()))};function _(){return e.createElement("div",null,"Loading...")}console.log("[global.ts] Here is a global script."),c.render(e.createElement(e.StrictMode,null,e.createElement(i,{history:l},d({routes:[{path:"/",component:t({loader:()=>p((()=>import("./BlankLayout.e6cc5ba2.js")),["/use-switch-tabs/assets/BlankLayout.e6cc5ba2.js","/use-switch-tabs/assets/vendor.bcba5a07.js"]),loading:_}),routes:[{path:"/",redirect:"/welcome",exact:!0},{path:"/",component:t({loader:()=>p((()=>import("./BasicLayout.224a2e6c.js")),["/use-switch-tabs/assets/BasicLayout.224a2e6c.js","/use-switch-tabs/assets/BasicLayout.954dacba.css","/use-switch-tabs/assets/index.87115ea7.js","/use-switch-tabs/assets/index.3f2e0bb5.css","/use-switch-tabs/assets/vendor.bcba5a07.js","/use-switch-tabs/assets/isEqual.a6e7c5e2.js","/use-switch-tabs/assets/isEqual.1a75c382.css","/use-switch-tabs/assets/button.1f4160cf.js","/use-switch-tabs/assets/button.18ff417e.css","/use-switch-tabs/assets/index.f4f14a65.js","/use-switch-tabs/assets/index.87718197.css","/use-switch-tabs/assets/utils.eaf96c7a.js"]),loading:_}),routes:[{path:"/",redirect:"/welcome",exact:!0},{path:"/welcome",icon:e.createElement(o),name:"欢迎页",component:t({loader:()=>p((()=>import("./index.df769134.js")),["/use-switch-tabs/assets/index.df769134.js","/use-switch-tabs/assets/index.87115ea7.js","/use-switch-tabs/assets/index.3f2e0bb5.css","/use-switch-tabs/assets/vendor.bcba5a07.js","/use-switch-tabs/assets/index.0f87140e.js","/use-switch-tabs/assets/index.16d51c2b.css","/use-switch-tabs/assets/CheckCircleFilled.1a5644c5.js","/use-switch-tabs/assets/button.1f4160cf.js","/use-switch-tabs/assets/button.18ff417e.css","/use-switch-tabs/assets/index.fd4e4f47.js","/use-switch-tabs/assets/index.e6435892.css","/use-switch-tabs/assets/index.2678c8b1.js","/use-switch-tabs/assets/index.f96511d5.css","/use-switch-tabs/assets/isEqual.a6e7c5e2.js","/use-switch-tabs/assets/isEqual.1a75c382.css","/use-switch-tabs/assets/utils.eaf96c7a.js"]),loading:_}),exact:!0},{path:"/control",icon:e.createElement(a),name:"控制台",component:t({loader:()=>p((()=>import("./index.1371ce57.js")),["/use-switch-tabs/assets/index.1371ce57.js","/use-switch-tabs/assets/index.87115ea7.js","/use-switch-tabs/assets/index.3f2e0bb5.css","/use-switch-tabs/assets/vendor.bcba5a07.js","/use-switch-tabs/assets/index.fd4e4f47.js","/use-switch-tabs/assets/index.e6435892.css","/use-switch-tabs/assets/index.0f87140e.js","/use-switch-tabs/assets/index.16d51c2b.css","/use-switch-tabs/assets/CheckCircleFilled.1a5644c5.js","/use-switch-tabs/assets/button.1f4160cf.js","/use-switch-tabs/assets/button.18ff417e.css","/use-switch-tabs/assets/index.f4f14a65.js","/use-switch-tabs/assets/index.87718197.css"]),loading:_}),exact:!0},{path:"/profile",icon:e.createElement(n),name:"详情页",routes:[{path:"/profile/basic",name:"基础详情页",component:t({loader:()=>p((()=>import("./index.f8b43f2b.js")),["/use-switch-tabs/assets/index.f8b43f2b.js","/use-switch-tabs/assets/index.87115ea7.js","/use-switch-tabs/assets/index.3f2e0bb5.css","/use-switch-tabs/assets/vendor.bcba5a07.js","/use-switch-tabs/assets/index.fd4e4f47.js","/use-switch-tabs/assets/index.e6435892.css","/use-switch-tabs/assets/index.2678c8b1.js","/use-switch-tabs/assets/index.f96511d5.css","/use-switch-tabs/assets/isEqual.a6e7c5e2.js","/use-switch-tabs/assets/isEqual.1a75c382.css","/use-switch-tabs/assets/button.1f4160cf.js","/use-switch-tabs/assets/button.18ff417e.css","/use-switch-tabs/assets/CheckCircleFilled.1a5644c5.js"]),loading:_}),exact:!0},{path:"/profile/advanced",name:"高级详情页",component:t({loader:()=>p((()=>import("./index.cc4468ae.js")),["/use-switch-tabs/assets/index.cc4468ae.js","/use-switch-tabs/assets/index.87115ea7.js","/use-switch-tabs/assets/index.3f2e0bb5.css","/use-switch-tabs/assets/vendor.bcba5a07.js","/use-switch-tabs/assets/index.fd4e4f47.js","/use-switch-tabs/assets/index.e6435892.css","/use-switch-tabs/assets/index.2678c8b1.js","/use-switch-tabs/assets/index.f96511d5.css","/use-switch-tabs/assets/isEqual.a6e7c5e2.js","/use-switch-tabs/assets/isEqual.1a75c382.css","/use-switch-tabs/assets/button.1f4160cf.js","/use-switch-tabs/assets/button.18ff417e.css","/use-switch-tabs/assets/CheckCircleFilled.1a5644c5.js"]),loading:_}),exact:!0}]},{path:"/search",icon:e.createElement(r),name:"搜索列表",component:t({loader:()=>p((()=>import("./index.3828ed60.js")),["/use-switch-tabs/assets/index.3828ed60.js","/use-switch-tabs/assets/index.87115ea7.js","/use-switch-tabs/assets/index.3f2e0bb5.css","/use-switch-tabs/assets/vendor.bcba5a07.js","/use-switch-tabs/assets/index.fd4e4f47.js","/use-switch-tabs/assets/index.e6435892.css","/use-switch-tabs/assets/index.2678c8b1.js","/use-switch-tabs/assets/index.f96511d5.css","/use-switch-tabs/assets/isEqual.a6e7c5e2.js","/use-switch-tabs/assets/isEqual.1a75c382.css","/use-switch-tabs/assets/button.1f4160cf.js","/use-switch-tabs/assets/button.18ff417e.css","/use-switch-tabs/assets/CheckCircleFilled.1a5644c5.js"]),loading:_}),routes:[{path:"/search/projects",name:"搜索列表（项目）",component:t({loader:()=>p((()=>import("./index.85af384d.js")),["/use-switch-tabs/assets/index.85af384d.js","/use-switch-tabs/assets/index.87115ea7.js","/use-switch-tabs/assets/index.3f2e0bb5.css","/use-switch-tabs/assets/vendor.bcba5a07.js","/use-switch-tabs/assets/index.fd4e4f47.js","/use-switch-tabs/assets/index.e6435892.css"]),loading:_}),exact:!0},{path:"/search/applications",name:"搜索列表（应用）",component:t({loader:()=>p((()=>import("./index.c5ebd1d8.js")),["/use-switch-tabs/assets/index.c5ebd1d8.js","/use-switch-tabs/assets/index.87115ea7.js","/use-switch-tabs/assets/index.3f2e0bb5.css","/use-switch-tabs/assets/vendor.bcba5a07.js","/use-switch-tabs/assets/index.fd4e4f47.js","/use-switch-tabs/assets/index.e6435892.css"]),loading:_}),exact:!0}]}]}]}]}))),document.getElementById("root"));
