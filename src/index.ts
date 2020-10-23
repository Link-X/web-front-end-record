import { getBrowserVar, getTimeData } from './variate/index'
import { resourceErrorHandler, scriptErrorHandler } from './events'

interface Iprops {
    key: string
}
interface registerParamsType {
    name: string
    func: <T>(data: T) => void
}

class record {
    public key: string
    private init: () => void
    public methods: any
    public userData: { browser: variateType.facilityBrowserType; timeData: variateType.getTimeData }
    public plugins: any

    constructor(props: Iprops) {
        this.key = props.key
        this.userData = {
            browser: { title: '页面初始化' } as variateType.facilityBrowserType,
            timeData: {} as variateType.getTimeData,
        }
        this.methods = {
            resourceErrorHandler,
            scriptErrorHandler,
            promiseErrorHandler: scriptErrorHandler,
        }
        this.plugins = {}
        this.init = () => {
            /** 保存一份,当用户有onload 的时候触发 */
            const preLoad: (e: Event) => any = window.onload
            window.onload = (e: Event) => {
                if (preLoad && typeof preLoad === 'function') {
                    preLoad(e)
                }
                window.requestIdleCallback = window.requestIdleCallback || setTimeout
                window.requestIdleCallback(() => {
                    this.userData = {
                        browser: getBrowserVar(),
                        timeData: getTimeData(),
                    }
                })
            }
        }
        this.init()
    }

    eventMethod<E, D>(target: any, type: string, methodsName: string, spread: boolean = false) {
        const fn = this.methods[methodsName] || this.plugins[methodsName]
        target.addEventListener(
            type,
            (event: E) => {
                this.sendData<D>(fn(event))
            },
            spread
        )
    }

    register(params: registerParamsType) {
        const { name, func } = params
        this.plugins[name] = func
    }

    sendData<T>(data: T): T {
        console.log({ ...data, ...{ title: this.userData.browser.pcInfo, key: this.key } })
        return data
    }
}

const recordObj = new record({
    key: 'my-record',
})

recordObj.eventMethod(document, 'error', 'resourceErrorHandler', true)
recordObj.eventMethod(window, 'error', 'scriptErrorHandler', false)
recordObj.eventMethod(window, 'unhandledrejection', 'promiseErrorHandler', false)
