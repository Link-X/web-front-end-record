declare namespace webRecord {
    type sendType = 'scriptError' | 'resourceError' | 'promiseError' | 'vdomSend' | 'mouseSend'
    export interface Iprops {
        /** 是否打印 */
        log: boolean

        key: string
        /** 上报url */
        reportUrl: string
        /** 版本号 */
        version: string
        /** 上报延时 */
        outtime: number
        /** 录屏 */
        recording: boolean

        /** 上报钩子 */
        sendEvent: (type: sendType, data: any) => void
    }
    export interface registerParamsType {
        name: string
        func: <T>(data: T) => void
    }
}
