import { getBrowserVar, getTimeData } from './variate/index'

const getLoadTime = () => {
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

getLoadTime()
