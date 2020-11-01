declare namespace webRecord {
    type sendType = 'scriptError' | 'resourceError' | 'promiseError' | 'vdomSend' | 'mouseSend' | 'userData'

    interface userDataType {
        browser: variateType.facilityBrowserType
        timeData: variateType.getTimeData
    }
    export interface Iprops {
        /**输一个自定义的key */
        key: string
        /** 版本号 */
        version: string
        /** 上报延时 */
        outtime: number
        /** 是否录屏 */
        recording: boolean
        /** 上报钩子 */
        sendEvent?: (type: sendType, data: any) => void
        /** start */
        start?: () => void
        /** reday */
        reday?: (type: string, userData: userDataType) => void
    }
    export interface registerParamsType {
        name: string
        func: <T>(data: T) => void
    }
}
