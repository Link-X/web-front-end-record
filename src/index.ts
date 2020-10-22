import { getBrowserVar, getTimeData } from './variate/index'
import { resourceErrorHandler, scriptErrorHandler } from './events'

const getLoadTime = () => {
    /** 保存一份,当用户有onload 的时候触发 */
    const preLoad: (e: Event) => any = window.onload
    window.onload = (e: Event) => {
        if (preLoad && typeof preLoad === 'function') {
            preLoad(e)
        }
        window.requestIdleCallback = window.requestIdleCallback || setTimeout

        window.requestIdleCallback(() => {
            console.log(getBrowserVar(), getTimeData())
        })
    }
}

window.addEventListener('load', (e: Event) => {
    console.log(e)
})

getLoadTime()

document.addEventListener('error', resourceErrorHandler, true)
window.addEventListener('error', scriptErrorHandler, false)
window.addEventListener('unhandledrejection', scriptErrorHandler, false)
