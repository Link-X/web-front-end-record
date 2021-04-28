
# web 错误与性能记录插件 --- 前端记录插件

[github 地址: https://github.com/Link-X/web-front-end-record](https://github.com/Link-X/web-front-end-record)

## 实现功能

普通脚本错误、promise 错误、资源加载错误、页面加载性能、超时文件、用户操作录制、回放

## 技术栈

js、ts、rollup

## 原理浅析

#### 1、错误记录

-   监听 error、unhandledrejection，根据事件响应数据判断错误类型
-   文件性能和错误监听 主要是通过这个 window.performance api 对数据进行整理

#### 2、页面录制

-   录制：生成首屏 vdom 后 使用 MutationObserver 监听页面和时间变化进行上传
-   播放：根据 vdom 每项类型一次执行记录的数据修改根 vdom，进行渲染

## 使用方式

```javascript
npm install web-front-end-record
```

```javascript
import {Record} from 'web-front-end-record'
record({
  key: 'key',// key
  version: '0.0.1',// 应用版本
  outtime: 300, // 上报延迟
  start: () => {}, // 开始
  ready: () => {]}, // 准备完毕
  recording: true, // 是否录制屏幕录制屏幕原理j监听页面变化生成用户操记录以及生成当前页面虚拟dom, 最终上传的是一json数据.如需播放则引用birtual-trans-dom.ts(tip: 虽然我们录屏的方式是把dom转换成vdom，相比canvas能大幅减小体积，却依然很大，用户的随便操作录屏记录就能有几mb的大小。谨慎使用
  sendEvent(type: string, data: any) => {
    /// 所有监听事件触发经过这个钩子
    ......
  }
})

// 关于录屏，记录屏幕的方法为监听用户页面辩护，将其转换为vdom类型的json，比使用canvas记录能大幅度减小体积，但是依然很大，用户随便操作的记录依然有几mb的大小。并且由于记录还没有记录操作时间间隔，所以变化均按500 毫秒播放，以及每次出现变化播放插件都会全屏渲染一般，所以播放时会出现感觉卡顿。

// or
<script src="web-front-end-record/dist/web-front-end-record.umd.js"><script>
Record.record({
  key: 'key',
  version: '0.0.1',
  outtime: 300,
  start: () => {},
  ready: () => {},
  recording: true,
  sendEvent(type: string, data: any) => {
    /// 所有监听事件触发经过这个钩子
    ......
  }
})


```

```javascript
// 播放 参考/test/play
import {BirtualTransDom} from 'web-front-end-record'
const obj = BirtualTransDom({ key: 'key', recording: true })
window.onload = () => {
    paly2 = new test2.birtualTransDom({
        vdom: data[0],
        records: data.slice(1, data.length),
    })
    paly2.play()
}
```
