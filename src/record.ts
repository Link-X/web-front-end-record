import { getBrowserVar, getTimeData } from './variate/index'
import { resourceErrorHandler, scriptErrorHandler } from './events'
import generateVirtualDom from '@/record-dom/generate-virtual-dom'

import Base from './base'

const fn = () => {}
class Record extends Base {
    public props: webRecord.Iprops

    constructor(props: webRecord.Iprops) {
        super(props)
        this.props = {
            ...props,
            reday: props?.reday || fn,
            start: props?.start || fn,
        }
        this.init()
    }

    init = () => {
        this.props?.start()
        this.methods.resourceErrorHandler()
        this.methods.promiseErrorHandler()
        this.methods.scriptErrorHandler()
        this.methods.generateVirtualDom()
        this.methods.getUserData()
    }

    methods = {
        /**获取浏览器和页面渲染相关数据  */
        getUserData: () => {
            const cb = () => {
                const userData: webRecord.userDataType = {
                    browser: getBrowserVar(),
                    timeData: getTimeData(),
                }
                this.sendData('userData', userData)
                this.props.reday('ready', userData)
            }
            this.onload(cb)
        },
        /** 监听资源错误 */
        resourceErrorHandler: () => {
            this.eventMethod(document, 'error', resourceErrorHandler, true, 'resourceError')
        },
        /** 监听js错误 */
        scriptErrorHandler: () => {
            this.eventMethod(window, 'error', scriptErrorHandler, false, 'scriptError')
        },
        /**监听promise错误 */
        promiseErrorHandler: () => {
            this.eventMethod(window, 'unhandledrejection', scriptErrorHandler, false, 'promiseError')
        },
        /** 录屏 */
        generateVirtualDom: () => {
            if (!this.props.recording) {
                return
            }
            return new generateVirtualDom(this.props)
        },
    }
}

export default (props: webRecord.Iprops) => {
    const recordObj = new Record(props)
    return recordObj
}
