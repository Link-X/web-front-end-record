# web-front-end-record

this is simpleness record in web front end project

** 脚本错误、promise 错误、资源加载错误、页面加载性能、超时文件、用户操作录制、回放 **

```javascript
npm install web-front-end-record
```

** 这个库还有收尾工作未完成，请勿使用, 任何问题作者概不负责 **

```javascript
import record from 'web-front-end-record'
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
