!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).record=t()}(this,(function(){"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function n(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function r(e){for(var r=1;r<arguments.length;r++){var o=null!=arguments[r]?arguments[r]:{};r%2?n(Object(o),!0).forEach((function(n){t(e,n,o[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var o=function(){for(var e=navigator.userAgent,t=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],n=!0,r="",o=0;o<t.length;o++)if(e.indexOf(t[o])>0){r=t[o],n=!1;break}return{isPc:n,facilityName:r}},i=function(){if(!document||!window)return{};var e=document,t=e.domain,n=e.URL,r=e.title,i=e.referrer,a=window.screen,s=a.height,c=a.width,u=a.colorDepth,d=navigator,l=d.language,f=d.platform;return{sendTypeName:"设备数据",isWx:!!navigator.userAgent.match(/MicroMessenger\/([^\s]+)/),pcInfo:o(),domain:t,url:n,title:r,referrer:i,screenW:c,screenH:s,screenColorDepth:u,language:l,platform:f}},a=window.performance||window.msPerformance||window.webkitPerformance,s=function(){var e,t,n,r,o,i,s,c,u,d,l,f,p,m,g;return{sendTypeName:"页面加载数据",timeOut:(e=a.getEntriesByType("resource"))?e.filter((function(e){var t=e.startTime;return e.responseEnd-t>5e3})).map((function(e){return{name:e.name,encodedBodySize:e.encodedBodySize,decodedBodySize:e.decodedBodySize,timeout:5e3,duration:e.duration,protocol:e.nextHopProtocol,type:e.initiatorType}})):[],timeData:(t=a.timing?a.timing:a.getEntriesByType("navigation"),n=t.fetchStart,r=t.domainLookupStart,o=t.domainLookupEnd,i=t.connectStart,s=t.connectEnd,c=t.secureConnectionStart,u=t.requestStart,d=t.responseStart,l=t.responseEnd,f=t.domInteractive,p=t.domContentLoadedEventStart,m=t.domContentLoadedEventEnd,g=t.loadEventStart,{fpt:l-n,tti:f-n,ready:p-n,load:g-n,firstbyte:d-r,dns:o-r,tcp:s-i,ttfb:d-u,trans:l-d,dom:f-l,res:g-m,sslTime:c?s-c:null})}},c=function(e){if(e){var t=e.target;return{sendTypeName:"资源加载错误",tagName:t.tagName.toLowerCase(),src:t.getAttribute("src")}}},u=function(e){var t,n=e.message,r=e.filename,o=e.lineno,i=e.colno,a=e.reason,s=e.type,c=e.error;return n?n.toLowerCase().includes("script error")?{sendTypeName:"普通脚本错误1",message:n}:{sendTypeName:"普通脚本错误2",message:n,filename:r,lineno:o,colno:i,stack:null==c||null===(t=c.stac)||void 0===t?void 0:t.toString(),type:s}:{sendTypeName:"promise 错误",type:s,reason:null==a?void 0:a.toString(),message:null==a?void 0:a.message,stack:null==a?void 0:a.stack}},d=function(){function t(e){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.props={},this.userData={browser:{title:"页面初始化"},timeData:{}},this.methods={resourceErrorHandler:function(e){n.eventMethod(document,"error",c,!0)},scriptErrorHandler:function(e){n.eventMethod(window,"error",u,!1)},promiseErrorHandler:function(e){n.eventMethod(window,"unhandledrejection",u,!1)}},this.plugins={},this.getUserData=function(){var e=window.onload;window.onload=function(t){e&&"function"==typeof e&&e(t),window.requestIdleCallback=window.requestIdleCallback||setTimeout,window.requestIdleCallback((function(){n.userData={browser:i(),timeData:s()}}))}},this.propsChange=function(){n.props=e},this.init=function(){n.getUserData(),n.propsChange()},this.init()}var n,o,a;return n=t,(o=[{key:"perform",value:function(e){var t=this.methods[e]||this.plugins[e];t&&t(this.props)}},{key:"eventMethod",value:function(e,t,n){var r=this,o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];e.addEventListener(t,(function(e){r.sendData(n(e))}),o)}},{key:"register",value:function(e){var t=e.name,n=e.func;this.plugins[t]=n}},{key:"sendData",value:function(e){var t=this;return setTimeout((function(){console.log(r(r(r({},e),{title:t.userData.browser.pcInfo}),t.props))}),this.props.outtime||0),e}}])&&e(n.prototype,o),a&&e(n,a),t}();return function(e){var t=new d(e);return t.perform("resourceErrorHandler"),t.perform("scriptErrorHandler"),t.perform("promiseErrorHandler"),t}}));
