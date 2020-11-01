import { getBrowserVar, getTimeData } from './variate/index'
import { resourceErrorHandler, scriptErrorHandler } from './events'

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
        this.methods.getUserData()
    }

    methods = {
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
        resourceErrorHandler: () => {
            this.eventMethod(document, 'error', resourceErrorHandler, true, 'resourceError')
        },
        scriptErrorHandler: () => {
            this.eventMethod(window, 'error', scriptErrorHandler, false, 'scriptError')
        },
        promiseErrorHandler: () => {
            this.eventMethod(window, 'unhandledrejection', scriptErrorHandler, false, 'promiseError')
        },
    }
}

export default Record
