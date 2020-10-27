!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).record=t()}(this,(function(){"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function n(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var s=function(){for(var e=navigator.userAgent,t=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],n=!0,r="",o=0;o<t.length;o++)if(e.indexOf(t[o])>0){r=t[o],n=!1;break}return{isPc:n,facilityName:r}},c=function(){if(!document||!window)return{};var e=document,t=e.domain,n=e.URL,r=e.title,o=e.referrer,i=window.screen,a=i.height,u=i.width,c=i.colorDepth,d=navigator,l=d.language,f=d.platform;return{sendTypeName:"设备数据",isWx:!!navigator.userAgent.match(/MicroMessenger\/([^\s]+)/),pcInfo:s(),domain:t,url:n,title:r,referrer:o,screenW:u,screenH:a,screenColorDepth:c,language:l,platform:f}},d=window.performance||window.msPerformance||window.webkitPerformance,l=function(){var e,t,n,r,o,i,a,u,s,c,l,f,h,m,p;return{sendTypeName:"页面加载数据",timeOut:(e=d.getEntriesByType("resource"))?e.filter((function(e){var t=e.startTime;return e.responseEnd-t>5e3})).map((function(e){return{name:e.name,encodedBodySize:e.encodedBodySize,decodedBodySize:e.decodedBodySize,timeout:5e3,duration:e.duration,protocol:e.nextHopProtocol,type:e.initiatorType}})):[],timeData:(t=d.timing?d.timing:d.getEntriesByType("navigation"),n=t.fetchStart,r=t.domainLookupStart,o=t.domainLookupEnd,i=t.connectStart,a=t.connectEnd,u=t.secureConnectionStart,s=t.requestStart,c=t.responseStart,l=t.responseEnd,f=t.domInteractive,h=t.domContentLoadedEventStart,m=t.domContentLoadedEventEnd,p=t.loadEventStart,{fpt:l-n,tti:f-n,ready:h-n,load:p-n,firstbyte:c-r,dns:o-r,tcp:a-i,ttfb:c-s,trans:l-c,dom:f-l,res:p-m,sslTime:u?a-u:null})}},f=function(e){if(e){var t=e.target;return{sendTypeName:"资源加载错误",tagName:t.tagName.toLowerCase(),src:t.getAttribute("src")}}},h=function(e){var t,n=e.message,r=e.filename,o=e.lineno,i=e.colno,a=e.reason,u=e.type,s=e.error;return n?n.toLowerCase().includes("script error")?{sendTypeName:"普通脚本错误1",message:n}:{sendTypeName:"普通脚本错误2",message:n,filename:r,lineno:o,colno:i,stack:null==s||null===(t=s.stac)||void 0===t?void 0:t.toString(),type:u}:{sendTypeName:"promise 错误",type:u,reason:null==a?void 0:a.toString(),message:null==a?void 0:a.message,stack:null==a?void 0:a.stack}},m="http://www.w3.org/2000/svg",p=["xmlns","xmlns:svg","xmlns:xlink"],v=function(){function t(n){e(this,t),this.data=n,this.records=[]}return n(t,[{key:"init",value:function(){var e=this;this.data.key?window.addEventListener("load",(function(){e.nodeMark(document.getElementsByTagName("*")),e.records=[e.createVirtualDom(document.documentElement)],e.eventInit(),setTimeout(function(){this.obsDom()}.bind(e),500)})):console.error("请传入唯一key")}},{key:"getkey",value:function(){return this.data.key+(1e7*Math.random()).toString(16).substr(0,4)+"-"+(new Date).getTime()+"-"+Math.random().toString().substr(2,5)}},{key:"nodeMark",value:function(e){for(var t=0;t<e.length;t++){var n,r,o=e[t];o.__flow||(o.__flow={id:this.getkey()}),(null==o||null===(n=o.children)||void 0===n?void 0:n.length)&&this.nodeMark(o.children),(null==o||null===(r=o.childNodes)||void 0===r?void 0:r.length)&&this.nodeMark(o.childNodes)}return e}},{key:"eventInit",value:function(){window.addEventListener("input",this.onFormInput.bind(this),!0),window.addEventListener("change",this.onFormChange.bind(this),!0),window.addEventListener("focus",this.onFormFocus.bind(this),!0),window.addEventListener("blur",this.onFormBlur.bind(this),!0),window.addEventListener("mousemove",this.onWindowMove.bind(this),!0)}},{key:"obsDom",value:function(){var e=this;new MutationObserver((function(t){e.onMutationChange(t)})).observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeOldValue:!0,characterData:!0,characterDataOldValue:!0})}},{key:"createVirtualDom",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];switch(e.nodeType){case Node.TEXT_NODE:return this.createVirtualText(e);case Node.ELEMENT_NODE:return this.createVirtualElement(e,t||"svg"===e.tagName.toLowerCase());default:return null}}},{key:"createVirtualText",value:function(e){var t={text:e.nodeValue,type:"VirtualText",__flow:{}};return void 0!==e.__flow&&(t.__flow=e.__flow),t}},{key:"createVirtualElement",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=e.tagName.toLowerCase(),r=this.getNodeChildren(e,t),o=this.getNodeAttributes(e,t),i=o.attr,a=o.namespace,u={tagName:n,type:"VirtualElement",children:r,attributes:i,namespace:a};return void 0!==e.__flow&&(u.__flow=e.__flow),u}},{key:"getNodeChildren",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=e.childNodes?a(e.childNodes):[],o=[];return r.forEach((function(e){o.push(t.createVirtualDom(e,n))})),o.filter((function(e){return!!e}))}},{key:"getNodeAttributes",value:function(e){var t,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=e.attributes?a(e.attributes):[],o={};return r.forEach((function(e){var r=e.nodeName,i=e.nodeValue;o[r]=i,p.includes(r)?t=i:n&&(t=m)})),{attr:o,namespace:t}}},{key:"onMutationChange",value:function(e){var t=this,n=function(e){if(e)return e.__flow||(e.__flow={id:t.getkey()}),e.__flow.id};e.forEach((function(e){var r=e.target,o=e.type,u=e.attributeName,s={type:o,target:n(r)};switch(o){case"characterData":s.value=r.nodeValue;break;case"attributes":s.attributeName=u,s.attributeValue=r.getAttribute(u);break;case"childList":s.removedNodes=a(e.removedNodes).map((function(e){return n(e)})),s.addedNodes=a(e.addedNodes).map((function(e){return i(i({},t.takeSnapshot(e)),{},{nextSibling:n(e.nextSibling),previousSibling:n(e.previousSibling)})}))}t.records.push(s),console.log(t.records)}))}},{key:"takeSnapshot",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.markNodes(e);var n={vdom:this.createVirtualDom(e)};return!0===t.doctype&&(n.doctype=document.doctype.name,n.clientWidth=document.body.clientWidth,n.clientHeight=document.body.clientHeight),n}},{key:"markNodes",value:function(e){return e.__flow={id:this.getkey()},e.children&&e.children.length&&this.nodeMark(e.children),e}},{key:"onFormInput",value:function(e){var t=e.target;t&&t.__flow&&["select","textarea","input"].includes(t.tagName.toLowerCase())&&this.records.push({type:"input",target:t.__flow.id,value:t.value})}},{key:"onFormChange",value:function(e){var t=e.target;t&&t.__flow&&"input"===t.tagName.toLowerCase()&&["checkbox","radio"].includes(t.getAttribute("type"))&&this.records.push({type:"checked",target:t.__flow.id,checked:t.checked})}},{key:"onFormFocus",value:function(e){var t=e.target;t&&t.__flow&&this.records.push({type:"focus",target:t.__flow.id})}},{key:"onFormBlur",value:function(e){var t=e.target;t&&t.__flow&&(this.records.push({type:"blur",target:t.__flow.id}),console.log(this.records))}},{key:"onWindowMove",value:function(e){var t=e.clientX,n=e.clientY;console.log(t,n)}}]),t}(),g=function(){function t(n){var r=this;e(this,t),this.props={},this.userData={browser:{title:"页面初始化"},timeData:{}},this.methods={resourceErrorHandler:function(e){r.eventMethod(document,"error",f,!0)},scriptErrorHandler:function(e){r.eventMethod(window,"error",h,!1)},promiseErrorHandler:function(e){r.eventMethod(window,"unhandledrejection",h,!1)}},this.plugins={},this.getUserData=function(){var e=window.onload;window.onload=function(t){e&&"function"==typeof e&&e(t),window.requestIdleCallback=window.requestIdleCallback||setTimeout,window.requestIdleCallback((function(){r.userData={browser:c(),timeData:l()}}))}},this.propsChange=function(){r.props=n},this.init=function(){r.getUserData(),r.propsChange()},this.init()}return n(t,[{key:"perform",value:function(e){var t=this.methods[e]||this.plugins[e];t&&t(this.props)}},{key:"eventMethod",value:function(e,t,n){var r=this,o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];e.addEventListener(t,(function(e){r.sendData(n(e,r.props))}),o)}},{key:"register",value:function(e){var t=e.name,n=e.func;this.plugins[t]=n}},{key:"sendData",value:function(e){var t=this;return setTimeout((function(){t.props.log&&console.log(i(i(i({},e),{title:t.userData.browser.pcInfo}),t.props))}),this.props.outtime||0),e}}]),t}();return function(e){var t=new g(e);return t.perform("resourceErrorHandler"),t.perform("scriptErrorHandler"),t.perform("promiseErrorHandler"),t.register({name:"htmlGetting",func:function(e){new v(e).init()}}),t.perform("htmlGetting"),t}}));
