!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("core-js/modules/es.array.index-of"),require("core-js/modules/es.regexp.exec"),require("core-js/modules/es.string.match"),require("core-js/modules/es.array.filter"),require("core-js/modules/es.array.map"),require("core-js/modules/es.function.name"),require("core-js/modules/es.array.includes"),require("core-js/modules/es.date.to-string"),require("core-js/modules/es.object.to-string"),require("core-js/modules/es.regexp.to-string"),require("core-js/modules/es.string.includes"),require("core-js/modules/es.array.concat"),require("core-js/modules/es.array.for-each"),require("core-js/modules/es.function.bind"),require("core-js/modules/web.dom-collections.for-each"),require("core-js/modules/web.timers"),require("core-js/modules/es.array.find-index"),require("core-js/modules/es.array.splice"),require("core-js/modules/es.array.is-array"),require("core-js/modules/es.promise")):"function"==typeof define&&define.amd?define(["core-js/modules/es.array.index-of","core-js/modules/es.regexp.exec","core-js/modules/es.string.match","core-js/modules/es.array.filter","core-js/modules/es.array.map","core-js/modules/es.function.name","core-js/modules/es.array.includes","core-js/modules/es.date.to-string","core-js/modules/es.object.to-string","core-js/modules/es.regexp.to-string","core-js/modules/es.string.includes","core-js/modules/es.array.concat","core-js/modules/es.array.for-each","core-js/modules/es.function.bind","core-js/modules/web.dom-collections.for-each","core-js/modules/web.timers","core-js/modules/es.array.find-index","core-js/modules/es.array.splice","core-js/modules/es.array.is-array","core-js/modules/es.promise"],t):(e="undefined"!=typeof globalThis?globalThis:e||self).record=t()}(this,(function(){"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function r(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function c(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function d(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?c(e):t}function l(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=u(e);if(t){var o=u(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return d(this,r)}}function f(e){return function(e){if(Array.isArray(e))return h(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||m(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,t){if(e){if("string"==typeof e)return h(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?h(e,t):void 0}}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var g=function(){for(var e=navigator.userAgent,t=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],r=!0,n="",o=0;o<t.length;o++)if(e.indexOf(t[o])>0){n=t[o],r=!1;break}return{isPc:r,facilityName:n}},v=function(){if(!document||!window)return{};var e=document,t=e.domain,r=e.URL,n=e.title,o=e.referrer,i=window.screen,a=i.height,u=i.width,s=i.colorDepth,c=navigator,d=c.language,l=c.platform;return{sendTypeName:"设备数据",isWx:!!navigator.userAgent.match(/MicroMessenger\/([^\s]+)/),pcInfo:g(),domain:t,url:r,title:n,referrer:o,screenW:u,screenH:a,screenColorDepth:s,language:d,platform:l}},p=window.performance||window.msPerformance||window.webkitPerformance,y=function(){var e,t,r,n,o,i,a,u,s,c,d,l,f,m,h;return{sendTypeName:"页面加载数据",timeOut:(e=p.getEntriesByType("resource"))?e.filter((function(e){var t=e.startTime;return e.responseEnd-t>5e3})).map((function(e){return{name:e.name,encodedBodySize:e.encodedBodySize,decodedBodySize:e.decodedBodySize,timeout:5e3,duration:e.duration,protocol:e.nextHopProtocol,type:e.initiatorType}})):[],timeData:(t=p.timing?p.timing:p.getEntriesByType("navigation"),r=t.fetchStart,n=t.domainLookupStart,o=t.domainLookupEnd,i=t.connectStart,a=t.connectEnd,u=t.secureConnectionStart,s=t.requestStart,c=t.responseStart,d=t.responseEnd,l=t.domInteractive,f=t.domContentLoadedEventStart,m=t.domContentLoadedEventEnd,h=t.loadEventStart,{fpt:d-r,tti:l-r,ready:f-r,load:h-r,firstbyte:c-n,dns:o-n,tcp:a-i,ttfb:c-s,trans:d-c,dom:l-d,res:h-m,sslTime:u?a-u:null})}},b=function(e){if(e){var t=e.target;return{sendTypeName:"资源加载错误",tagName:t.tagName.toLowerCase(),src:t.getAttribute("src")}}},w=function(e){var t,r=e.message,n=e.filename,o=e.lineno,i=e.colno,a=e.reason,u=e.type,s=e.error;return r?r.toLowerCase().includes("script error")?{sendTypeName:"普通脚本错误1",message:r}:{sendTypeName:"普通脚本错误2",message:r,filename:n,lineno:o,colno:i,stack:null==s||null===(t=s.stac)||void 0===t?void 0:t.toString(),type:u}:{sendTypeName:"promise 错误",type:u,reason:null==a?void 0:a.toString(),message:null==a?void 0:a.message,stack:null==a?void 0:a.stack}},j=function(){function t(r){e(this,t),n(this,"plugins",{}),this.props=r}return r(t,[{key:"onload",value:function(e){var t=window.onload;window.onload=function(r){t&&"function"==typeof t&&t(r),window.requestIdleCallback=window.requestIdleCallback||setTimeout,window.requestIdleCallback((function(){e()}))}}},{key:"eventMethod",value:function(e,t,r){var n=this,o=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=arguments.length>4?arguments[4]:void 0;e.addEventListener(t,(function(e){n.sendData(i,r(e,n.props))}),o)}},{key:"sendData",value:function(e,t){var r=this;return setTimeout((function(){var n=i(i({},t),r.props);r.props.sendEvent(e,n)}),this.props.outtime||0),t}}]),t}(),k="http://www.w3.org/2000/svg",E=["xmlns","xmlns:svg","xmlns:xlink"],N=function(t){a(u,t);var o=l(u);function u(t){var r;return e(this,u),n(c(r=o.call(this,t)),"getTagId",(function(e){if(e)return e._tag||(e._tag={id:r.getKey()}),e._tag.id})),r.records=[],r.init(),r}return r(u,[{key:"init",value:function(){var e=this;this.onload((function(){e.tagNode(document.getElementsByTagName("*"));var t=e.createVirtualDom(document.documentElement);e.records=[i(i({},t),{},{beginTime:0,preTime:0})],e.eventInit(),setTimeout(function(){this.obsDom()}.bind(e),500)}))}},{key:"eventInit",value:function(){window.addEventListener("input",this.onFormInput.bind(this),!0),window.addEventListener("change",this.onFormChange.bind(this),!0),window.addEventListener("focus",this.onFormFocus.bind(this),!0),window.addEventListener("blur",this.onFormBlur.bind(this),!0),window.addEventListener("mousemove",this.onWindowMove.bind(this),!0)}},{key:"getKey",value:function(){var e=(1e7*Math.random()).toString(16).substr(0,4),t=Math.random().toString().substr(2,5);return"".concat(this.props.key,"-").concat(e,"-").concat(t)}},{key:"tagNode",value:function(e){for(var t=0;t<e.length;t++){var r,n,o=e[t];o._tag||(o._tag={id:this.getKey()}),(null==o||null===(r=o.children)||void 0===r?void 0:r.length)&&this.tagNode(o.children),(null==o||null===(n=o.childNodes)||void 0===n?void 0:n.length)&&this.tagNode(o.childNodes)}return e}},{key:"createVirtualDom",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];switch(e.nodeType){case Node.TEXT_NODE:return this.createVirtualText(e);case Node.ELEMENT_NODE:return this.createVirtualElement(e,t||"svg"===e.tagName.toLowerCase());default:return null}}},{key:"createVirtualText",value:function(e){return{text:e.nodeValue,type:"virtualText",_tag:(null==e?void 0:e._tag)||void 0}}},{key:"createVirtualElement",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=this.getNodeAttributes(e,t),n=r.attr,o=r.namespace;return{type:"virtualElement",tagName:e.tagName.toLowerCase(),children:this.getNodeChildren(e,t),attributes:n,namespace:o,_tag:(null==e?void 0:e._tag)||void 0}}},{key:"getNodeChildren",value:function(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=e.childNodes?f(e.childNodes):[];return n.map((function(e){return t.createVirtualDom(e,r)})).filter((function(e){return!!e}))}},{key:"getNodeAttributes",value:function(e){var t,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=e.attributes?f(e.attributes):[],o={};return n.forEach((function(e){var n=e.nodeName,i=e.nodeValue;o[n]=i,E.includes(n)?t=i:r&&(t=k)})),{attr:o,namespace:t}}},{key:"recordChange",value:function(e){this.records.push(e),this.props.sendEvent("vdomSend",this.records)}},{key:"obsDom",value:function(){var e=this;new MutationObserver((function(t){e.onMutationChange(t)})).observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeOldValue:!0,characterData:!0,characterDataOldValue:!0})}},{key:"getTimers",value:function(){return{beginTime:(new Date).getTime(),preTime:this.records[this.records.length-1].beginTime||0}}},{key:"onMutationChange",value:function(e){var t=this;e.forEach((function(e){var r=e.target,n=e.type,o=e.attributeName,a=i({type:n,target:t.getTagId(r)},t.getTimers());switch(n){case"characterData":a.value=r.nodeValue;break;case"attributes":a.attributeName=o,a.attributeValue=r.getAttribute(o);break;case"childList":a.removedNodes=f(e.removedNodes).map((function(e){return t.getTagId(e)})),a.addedNodes=f(e.addedNodes).map((function(e){return i(i({},t.takeSnapshot(e)),{},{nextSibling:t.getTagId(e.nextSibling),previousSibling:t.getTagId(e.previousSibling)})}))}t.recordChange(a)}))}},{key:"takeSnapshot",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.markNodes(e);var r={vdom:this.createVirtualDom(e)};return!0===t.doctype&&(r.doctype=document.doctype.name,r.clientWidth=document.body.clientWidth,r.clientHeight=document.body.clientHeight),r}},{key:"markNodes",value:function(e){return e._tag={id:this.getKey()},e.children&&e.children.length&&this.tagNode(e.children),e}},{key:"onFormInput",value:function(e){var t=e.target;t&&t._tag&&["select","textarea","input"].includes(t.tagName.toLowerCase())&&this.recordChange(i({type:"input",target:t._tag.id,value:t.value},this.getTimers()))}},{key:"onFormChange",value:function(e){var t=e.target;t&&t._tag&&"input"===t.tagName.toLowerCase()&&["checkbox","radio"].includes(t.getAttribute("type"))&&this.recordChange(i({type:"checked",target:t._tag.id,checked:t.checked},this.getTimers()))}},{key:"onFormFocus",value:function(e){var t=e.target;t&&t._tag&&this.recordChange(i({type:"focus",target:t._tag.id},this.getTimers()))}},{key:"onFormBlur",value:function(e){var t=e.target;t&&t._tag&&this.recordChange(i({type:"blur",target:t._tag.id},this.getTimers()))}},{key:"onWindowMove",value:function(e){e.clientX,e.clientY}}]),u}(j);function T(e){if(!Array.isArray(e))throw new TypeError("传数组!");var t,r=function(e,t){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=m(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,u=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return a=e.done,e},e:function(e){u=!0,i=e},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw i}}}}(e);try{for(r.s();!(t=r.n()).done;){if("function"!=typeof t.value)throw new TypeError("请传入函数数组!")}}catch(e){r.e(e)}finally{r.f()}return function(t,r){var n=-1;return function o(i){if(i<=n)return Promise.reject(new Error("多次调用同一函数"));n=i;var a=e[i];i===e.length&&(a=r);if(!a)return Promise.resolve();try{return Promise.resolve(a(t,o.bind(null,i+1)))}catch(e){return Promise.reject(e)}}(0)}}var S=function(){function t(r){var o=this;e(this,t),n(this,"optionsMethods",{childList:function(e,t){var r=e.removedNodes,n=e.addedNodes;(null==n?void 0:n.length)&&o.addNodes(n,t),r.length&&o.removeNodes(r,t)},characterData:this.characterData,attributes:this.attributterChange,input:function(e,t){var r=i(i({},e),{attributeName:"value",attributeValue:e.value});o.attributterChange(r,t)},checked:function(e,t){var r=i(i({},e),{attributeName:"checked",attributeValue:e.checked});o.attributterChange(r,t)},focus:function(){},blur:function(){}}),this.rootVdom=r.vdom,this.records=r.records}return r(t,[{key:"createElement",value:function(e){var t,r=this;if("virtualText"===e.type)t=document.createTextNode(e.text);else{for(var n in t=void 0===e.namespace?document.createElement(e.tagName):document.createElementNS(e.namespace,e.tagName),e.attributes)t.setAttribute(n,e.attributes[n]);e.children.forEach((function(n){var o=r.createElement(n);o&&"script"!==e.tagName&&t.appendChild(o)}))}return e._tag&&(t._tag=e._tag),t}},{key:"findTagNode",value:function(e,t){var r=this,n=null;return e.forEach((function(e){var o;if(!n)return e._tag.id===t?n=e:(null==e||null===(o=e.children)||void 0===o?void 0:o.length)?n=r.findTagNode(e.children,t):void 0})),n}},{key:"addNodes",value:function(e,t){e.forEach((function(e){var r=e.nextSibling,n=e.previousSibling,o=e.vdom,i=r||n,a=r?0:1,u=t.children.findIndex((function(e){return e._tag.id===i}));t.children.splice(u+a,0,o)}))}},{key:"removeNodes",value:function(e,t){t&&e.forEach((function(e){var r=t.children.findIndex((function(t){return t._tag.id===e}));t.children.splice(r,1)}))}},{key:"attributterChange",value:function(e,t){t.attributes[e.attributeName]=e.attributeValue}},{key:"characterData",value:function(e,t){t.text=e.value}},{key:"recordPlayBack",value:function(e){var t=e.target,r=e.type,n=this.findTagNode([this.rootVdom],t),o=this.optionsMethods[r];return o&&o(e,n),this.createElement(this.rootVdom)}},{key:"play",value:function(e){var t=this;T(this.records.map((function(r){return function(n,o){setTimeout((function(){e(t.recordPlayBack(r)),o()}),r.preTime?(r.beginTime-r.preTime)/3:0)}})))(this,(function(){console.log("播放完毕")}))}}]),t}(),O=function(){},x=function(t){a(o,t);var r=l(o);function o(t){var a;return e(this,o),n(c(a=r.call(this,t)),"init",(function(){var e;null===(e=a.props)||void 0===e||e.start(),a.methods.resourceErrorHandler(),a.methods.promiseErrorHandler(),a.methods.scriptErrorHandler(),a.methods.generateVirtualDom(),a.methods.getUserData()})),n(c(a),"methods",{getUserData:function(){a.onload((function(){var e={browser:v(),timeData:y()};a.sendData("userData",e),a.props.reday("ready",e)}))},resourceErrorHandler:function(){a.eventMethod(document,"error",b,!0,"resourceError")},scriptErrorHandler:function(){a.eventMethod(window,"error",w,!1,"scriptError")},promiseErrorHandler:function(){a.eventMethod(window,"unhandledrejection",w,!1,"promiseError")},generateVirtualDom:function(){if(a.props.recording){var e=new N(a.props);console.log(e)}}}),a.props=i(i({},t),{},{reday:(null==t?void 0:t.reday)||O,start:(null==t?void 0:t.start)||O}),a.init(),a}return o}(j);return function(e){return{recordObj:new x(e),birtualTransDom:S}}}));
