import { getBrowserVar, getTimeData } from './variate/index'
import { resourceErrorHandler, scriptErrorHandler } from './events'
import HtmlGetting from '@/utils/generate-virtual-dom'

type performParams = 'resourceErrorHandler' | 'scriptErrorHandler' | 'promiseErrorHandler' | 'htmlGetting'

class record {
    private props: webRecord.Iprops
    private init: () => void
    private getUserData: () => void
    private propsChange: () => void
    public methods: any
    public userData: { browser: variateType.facilityBrowserType; timeData: variateType.getTimeData }
    public plugins: any

    constructor(props: webRecord.Iprops) {
        this.props = {} as webRecord.Iprops

        this.userData = {
            browser: { title: '页面初始化' } as variateType.facilityBrowserType,
            timeData: {} as variateType.getTimeData,
        }

        this.methods = {
            resourceErrorHandler: (props: webRecord.Iprops) => {
                this.eventMethod(document, 'error', resourceErrorHandler, true)
            },
            scriptErrorHandler: (props: webRecord.Iprops) => {
                this.eventMethod(window, 'error', scriptErrorHandler, false)
            },
            promiseErrorHandler: (props: webRecord.Iprops) => {
                this.eventMethod(window, 'unhandledrejection', scriptErrorHandler, false)
            },
        }

        this.plugins = {}

        this.getUserData = () => {
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

        this.propsChange = () => {
            this.props = props
        }

        this.init = () => {
            this.getUserData()
            this.propsChange()
        }

        this.init()
    }

    perform(name: performParams) {
        const fn = this.methods[name] || this.plugins[name]
        fn && fn(this.props)
    }

    eventMethod<E, D>(
        target: any,
        type: string,
        fn: (e: E, p: webRecord.Iprops) => D,
        spread: boolean = false
    ) {
        target.addEventListener(
            type,
            (event: E) => {
                this.sendData<D>(fn(event, this.props))
            },
            spread
        )
    }

    register(params: webRecord.registerParamsType) {
        const { name, func } = params
        this.plugins[name] = func
    }

    sendData<T>(data: T): T {
        setTimeout(() => {
            this.props.log &&
                console.log({ ...data, ...{ title: this.userData.browser.pcInfo }, ...this.props })
        }, this.props.outtime || 0)
        return data
    }
}

export default (props: webRecord.Iprops) => {
    const recordObj = new record(props)
    recordObj.perform('resourceErrorHandler')
    recordObj.perform('scriptErrorHandler')
    recordObj.perform('promiseErrorHandler')
    recordObj.register({
        name: 'htmlGetting',
        func: (props) => {
            const getinng = new HtmlGetting(props as any)
            getinng.init()
        },
    })
    recordObj.perform('htmlGetting')
    return recordObj
}
