# web-front-end-record

this is simpleness record in web front end project

** 脚本错误、promise 错误、资源加载错误、页面加载性能、超时文件、用户操作录制、回放 **

```javascript
npm install web-front-end-record
```

# 温馨提示，本插件暂仅为实验用途，请不要将本插件用作生产
```javascript
import record from 'web-front-end-record'
record({
  key: 'key',// key
  version: '0.0.1',// 应用版本
  outtime: 300,// 上报延迟
  recording: true // 是否录制屏幕录制屏幕原理j监听页面变化生成用户操记录以及生成当前页面虚拟dom, 最终上传的是一json数据.如需播放则引用birtual-trans-dom.ts(tip: 虽然我们录屏的方式是把dom转换成vdom，相比canvas能大幅减小体积，却依然很大，用户的随便操作录屏记录就能有几mb的大小。谨慎使用
  sendEvent(type: string, data: any) => {
    /// 所有监听事件触发经过这个钩子
    ......
  }
})

// 关于录屏，记录屏幕的方法为监听用户页面辩护，将其转换为vdom类型的json，比使用canvas记录能大幅度减小体积，但是依然很大，用户随便操作的记录依然有几mb的大小。并且由于记录还没有记录操作时间间隔，所以变化均按500 毫秒播放，以及每次出现变化播放插件都会全屏渲染一般，所以播放时会出现感觉卡顿。

// or
<script src="web-front-end-record/dist/web-front-end-record.umd.js"><script>
record({
  key: 'key',// key
  version: '0.0.1',// 应用版本
  outtime: 300,// 上报延迟
  recording: true // 是否录制屏幕(录制屏幕原理j监听页面变化生成用户操记录以及生成当前页面虚拟dom, 最终上传的是一json数据).如需播放则引用birtual-trans-dom.ts
  sendEvent(type: string, data: any) => {
    /// 所有j监听事件触发经过这个钩子
    ......
  }
})
```
