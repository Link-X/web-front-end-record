declare namespace webRecord {
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
    }
    export interface registerParamsType {
        name: string
        func: <T>(data: T) => void
    }
}
