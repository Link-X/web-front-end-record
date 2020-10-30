import"core-js/modules/es.function.name";import"core-js/modules/web.timers";import"core-js/modules/es.array.index-of";import"core-js/modules/es.regexp.exec";import"core-js/modules/es.string.match";import"core-js/modules/es.array.filter";import"core-js/modules/es.array.map";import"core-js/modules/es.array.includes";import"core-js/modules/es.date.to-string";import"core-js/modules/es.object.to-string";import"core-js/modules/es.regexp.to-string";import"core-js/modules/es.string.includes";import"core-js/modules/es.array.for-each";import"core-js/modules/es.function.bind";import"core-js/modules/web.dom-collections.for-each";import"core-js/modules/es.array.find-index";import"core-js/modules/es.array.splice";import"core-js/modules/es.array.is-array";import"core-js/modules/es.promise";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function r(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||s(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,t){if(e){if("string"==typeof e)return u(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?u(e,t):void 0}}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var c=function(){for(var e=navigator.userAgent,t=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],r=!0,n="",o=0;o<t.length;o++)if(e.indexOf(t[o])>0){n=t[o],r=!1;break}return{isPc:r,facilityName:n}},d=function(){if(!document||!window)return{};var e=document,t=e.domain,r=e.URL,n=e.title,o=e.referrer,i=window.screen,a=i.height,s=i.width,u=i.colorDepth,d=navigator,l=d.language,f=d.platform;return{sendTypeName:"设备数据",isWx:!!navigator.userAgent.match(/MicroMessenger\/([^\s]+)/),pcInfo:c(),domain:t,url:r,title:n,referrer:o,screenW:s,screenH:a,screenColorDepth:u,language:l,platform:f}},l=window.performance||window.msPerformance||window.webkitPerformance,f=function(){var e,t,r,n,o,i,a,s,u,c,d,f,m,h,p;return{sendTypeName:"页面加载数据",timeOut:(e=l.getEntriesByType("resource"))?e.filter((function(e){var t=e.startTime;return e.responseEnd-t>5e3})).map((function(e){return{name:e.name,encodedBodySize:e.encodedBodySize,decodedBodySize:e.decodedBodySize,timeout:5e3,duration:e.duration,protocol:e.nextHopProtocol,type:e.initiatorType}})):[],timeData:(t=l.timing?l.timing:l.getEntriesByType("navigation"),r=t.fetchStart,n=t.domainLookupStart,o=t.domainLookupEnd,i=t.connectStart,a=t.connectEnd,s=t.secureConnectionStart,u=t.requestStart,c=t.responseStart,d=t.responseEnd,f=t.domInteractive,m=t.domContentLoadedEventStart,h=t.domContentLoadedEventEnd,p=t.loadEventStart,{fpt:d-r,tti:f-r,ready:m-r,load:p-r,firstbyte:c-n,dns:o-n,tcp:a-i,ttfb:c-u,trans:d-c,dom:f-d,res:p-h,sslTime:s?a-s:null})}},m=function(e){if(e){var t=e.target;return{sendTypeName:"资源加载错误",tagName:t.tagName.toLowerCase(),src:t.getAttribute("src")}}},h=function(e){var t,r=e.message,n=e.filename,o=e.lineno,i=e.colno,a=e.reason,s=e.type,u=e.error;return r?r.toLowerCase().includes("script error")?{sendTypeName:"普通脚本错误1",message:r}:{sendTypeName:"普通脚本错误2",message:r,filename:n,lineno:o,colno:i,stack:null==u||null===(t=u.stac)||void 0===t?void 0:t.toString(),type:s}:{sendTypeName:"promise 错误",type:s,reason:null==a?void 0:a.toString(),message:null==a?void 0:a.message,stack:null==a?void 0:a.stack}},p=["xmlns","xmlns:svg","xmlns:xlink"],v=function(){function t(r){e(this,t),this.props=r,this.records=[]}return r(t,[{key:"init",value:function(){var e=this;this.props.key?window.addEventListener("load",(function(){window.requestIdleCallback=window.requestIdleCallback||setTimeout,window.requestIdleCallback((function(){e.nodeMark(document.getElementsByTagName("*")),e.records=[i(i({},e.createVirtualDom(document.documentElement)),{},{beginTime:0,preTime:0})],e.eventInit(),setTimeout(function(){this.obsDom()}.bind(e),500)}))})):console.error("请传入唯一key")}},{key:"getkey",value:function(){return this.props.key+(1e7*Math.random()).toString(16).substr(0,4)+"-"+(new Date).getTime()+"-"+Math.random().toString().substr(2,5)}},{key:"nodeMark",value:function(e){for(var t=0;t<e.length;t++){var r,n,o=e[t];o.__flow||(o.__flow={id:this.getkey()}),(null==o||null===(r=o.children)||void 0===r?void 0:r.length)&&this.nodeMark(o.children),(null==o||null===(n=o.childNodes)||void 0===n?void 0:n.length)&&this.nodeMark(o.childNodes)}return e}},{key:"eventInit",value:function(){window.addEventListener("input",this.onFormInput.bind(this),!0),window.addEventListener("change",this.onFormChange.bind(this),!0),window.addEventListener("focus",this.onFormFocus.bind(this),!0),window.addEventListener("blur",this.onFormBlur.bind(this),!0),window.addEventListener("mousemove",this.onWindowMove.bind(this),!0)}},{key:"obsDom",value:function(){var e=this;new MutationObserver((function(t){e.onMutationChange(t)})).observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeOldValue:!0,characterData:!0,characterDataOldValue:!0})}},{key:"createVirtualDom",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];switch(e.nodeType){case Node.TEXT_NODE:return this.createVirtualText(e);case Node.ELEMENT_NODE:return this.createVirtualElement(e,t||"svg"===e.tagName.toLowerCase());default:return null}}},{key:"createVirtualText",value:function(e){var t={text:e.nodeValue,type:"VirtualText",__flow:{}};return void 0!==e.__flow&&(t.__flow=e.__flow),t}},{key:"createVirtualElement",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=e.tagName.toLowerCase(),n=this.getNodeChildren(e,t),o=this.getNodeAttributes(e,t),i=o.attr,a=o.namespace,s={tagName:r,type:"VirtualElement",children:n,attributes:i,namespace:a};return void 0!==e.__flow&&(s.__flow=e.__flow),s}},{key:"getNodeChildren",value:function(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=e.childNodes?a(e.childNodes):[],o=[];return n.forEach((function(e){o.push(t.createVirtualDom(e,r))})),o.filter((function(e){return!!e}))}},{key:"getNodeAttributes",value:function(e){var t,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=e.attributes?a(e.attributes):[],o={};return n.forEach((function(e){var n=e.nodeName,i=e.nodeValue;o[n]=i,p.includes(n)?t=i:r&&(t="http://www.w3.org/2000/svg")})),{attr:o,namespace:t}}},{key:"onMutationChange",value:function(e){var t=this,r=function(e){if(e)return e.__flow||(e.__flow={id:t.getkey()}),e.__flow.id};e.forEach((function(e){var n=e.target,o=e.type,s=e.attributeName,u={type:o,target:r(n),beginTime:(new Date).getTime(),preTime:t.records[t.records.length-1].beginTime||0};switch(o){case"characterData":u.value=n.nodeValue;break;case"attributes":u.attributeName=s,u.attributeValue=n.getAttribute(s);break;case"childList":u.removedNodes=a(e.removedNodes).map((function(e){return r(e)})),u.addedNodes=a(e.addedNodes).map((function(e){return i(i({},t.takeSnapshot(e)),{},{nextSibling:r(e.nextSibling),previousSibling:r(e.previousSibling)})}))}t.eventSend(u)}))}},{key:"takeSnapshot",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.markNodes(e);var r={vdom:this.createVirtualDom(e)};return!0===t.doctype&&(r.doctype=document.doctype.name,r.clientWidth=document.body.clientWidth,r.clientHeight=document.body.clientHeight),r}},{key:"markNodes",value:function(e){return e.__flow={id:this.getkey()},e.children&&e.children.length&&this.nodeMark(e.children),e}},{key:"onFormInput",value:function(e){var t=e.target;t&&t.__flow&&["select","textarea","input"].includes(t.tagName.toLowerCase())&&this.eventSend({type:"input",target:t.__flow.id,value:t.value})}},{key:"onFormChange",value:function(e){var t=e.target;t&&t.__flow&&"input"===t.tagName.toLowerCase()&&["checkbox","radio"].includes(t.getAttribute("type"))&&this.eventSend({type:"checked",target:t.__flow.id,checked:t.checked})}},{key:"onFormFocus",value:function(e){var t=e.target;t&&t.__flow&&this.eventSend({type:"focus",target:t.__flow.id})}},{key:"onFormBlur",value:function(e){var t=e.target;t&&t.__flow&&this.eventSend({type:"blur",target:t.__flow.id})}},{key:"eventSend",value:function(e){return this.records.push(e),this.props.sendEvent("vdomSend",this.records),e}},{key:"onWindowMove",value:function(e){var t=e.clientX,r=e.clientY;this.props.sendEvent("mouseSend",{clientX:t,clientY:r})}}]),t}();function g(e){if(!Array.isArray(e))throw new TypeError("传数组!");var t,r=function(e,t){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=s(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,u=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return a=e.done,e},e:function(e){u=!0,i=e},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw i}}}}(e);try{for(r.s();!(t=r.n()).done;){if("function"!=typeof t.value)throw new TypeError("请传入函数数组!")}}catch(e){r.e(e)}finally{r.f()}return function(t,r){var n=-1;return function o(i){if(i<=n)return Promise.reject(new Error("多次调用同一函数"));n=i;var a=e[i];i===e.length&&(a=r);if(!a)return Promise.resolve();try{return Promise.resolve(a(t,o.bind(null,i+1)))}catch(e){return Promise.reject(e)}}(0)}}var y=function(){function t(r){e(this,t),this.rootVdom=r.vdom,this.records=r.records}return r(t,[{key:"createElement",value:function(e){var t,r=this;if("VirtualText"===e.type)t=document.createTextNode(e.text);else{for(var n in t=void 0===e.namespace?document.createElement(e.tagName):document.createElementNS(e.namespace,e.tagName),e.attributes)t.setAttribute(n,e.attributes[n]);e.children.forEach((function(n){var o=r.createElement(n);o&&"script"!==e.tagName&&t.appendChild(o)}))}return e.__flow&&(t.__flow=e.__flow),t}},{key:"findFlowNode",value:function(e,t){var r=this,n=null;return e.forEach((function(e){var o,i;if(!n)return e.__flow.id===t?n=e:(null==e||null===(o=e.children)||void 0===o?void 0:o.length)?n=r.findFlowNode(e.children,t):(null==e||null===(i=e.childNodes)||void 0===i?void 0:i.length)?n=r.findFlowNode(e.childNodes,t):void 0})),n}},{key:"addNodes",value:function(e,t){var r=this.findFlowNode([this.rootVdom],t);e.forEach((function(e){var t=e.nextSibling,n=e.previousSibling,o=e.vdom,i=t||n,a=t?0:1,s=r.children.findIndex((function(e){return e.__flow.id===i}));r.children.splice(s+a,0,o)}))}},{key:"removeNodes",value:function(e,t){var r=this.findFlowNode([this.rootVdom],t);r&&e.forEach((function(e){var t=r.children.findIndex((function(t){return t.__flow.id===e}));r.children.splice(t,1)}))}},{key:"attributterChange",value:function(e,t){this.findFlowNode([this.rootVdom],t).attributes[e.attributeName]=e.attributeValue}},{key:"characterData",value:function(e,t){this.findFlowNode([this.rootVdom],t).text=e.value}},{key:"recordPlayBack",value:function(e){var t=e.target,r=e.removedNodes,n=e.addedNodes,o=e.checked;switch(e.type){case"childList":(null==n?void 0:n.length)&&this.addNodes(n,t),r.length&&this.removeNodes(r,t);break;case"attributes":this.attributterChange(e,t);break;case"characterData":this.characterData(e,t);break;case"input":this.attributterChange({attributeName:"value",attributeValue:e.value,target:t,type:"input"},t);break;case"checked":this.attributterChange({attributeName:"checked",attributeValue:o,target:t,type:"checked"},t)}return this.createElement(this.rootVdom)}},{key:"play",value:function(e){var t=this;g(this.records.map((function(r){return function(n,o){setTimeout((function(){e(t.recordPlayBack(r)),o()}),r.beginTime-r.preTime)}})))(this,(function(){console.log("播放完毕")}))}}]),t}(),w=function(){function t(r){var n=this;e(this,t),this.props={},this.userData={browser:{title:"页面初始化"},timeData:{}},this.methods={resourceErrorHandler:function(e){n.eventMethod(document,"error",m,!0,"resourceError")},scriptErrorHandler:function(e){n.eventMethod(window,"error",h,!1,"scriptError")},promiseErrorHandler:function(e){n.eventMethod(window,"unhandledrejection",h,!1,"promiseError")}},this.plugins={},this.getUserData=function(){var e=window.onload;window.onload=function(t){e&&"function"==typeof e&&e(t),window.requestIdleCallback=window.requestIdleCallback||setTimeout,window.requestIdleCallback((function(){n.userData={browser:d(),timeData:f()}}))}},this.propsChange=function(){n.props=r},this.init=function(){n.getUserData(),n.propsChange()},this.init()}return r(t,[{key:"perform",value:function(e){var t=this.methods[e]||this.plugins[e];t&&t(this.props)}},{key:"eventMethod",value:function(e,t,r){var n=this,o=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=arguments.length>4?arguments[4]:void 0;e.addEventListener(t,(function(e){n.sendData(i,r(e,n.props))}),o)}},{key:"register",value:function(e){var t=e.name,r=e.func;this.plugins[t]=r}},{key:"sendData",value:function(e,t){var r=this;return setTimeout((function(){var n=i(i(i({},t),{title:r.userData.browser.pcInfo}),r.props);r.props.log&&console.log(n),r.props.sendEvent(e,n)}),this.props.outtime||0),t}}]),t}();export default function(e){var t=new w(e);return t.perform("resourceErrorHandler"),t.perform("scriptErrorHandler"),t.perform("promiseErrorHandler"),e.recording&&(t.register({name:"htmlGetting",func:function(e){new v(e).init()}}),t.perform("htmlGetting")),{vdomPlay:y}}
