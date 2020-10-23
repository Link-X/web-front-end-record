# web-front-end-record

this is simpleness record in web front end project

** 记录了：脚本错误、promise 错误、资源加载错误、页面加载性能、超时文件 **

```javascript
npm install web-front-end-record
```

```javascript
import record from 'web-front-end-record'
record({
  key: 'key',// key
  reportUrl: 'www.baidu.com',// 上报地址
  version: '0.0.1',// 应用版本
  outtime: 300,// 上报延迟
})

// or
<script src="web-front-end-record/dist/web-front-end-record.umd.js"><script>
record({
  key: 'key',// key
  reportUrl: 'www.baidu.com',// 上报地址
  version: '0.0.1',// 应用版本
  outtime: 300,// 上报延迟
})
```
