declare namespace eventsType {
    /** 资源错误上报信息 */
    export interface resourceType {
        /** send 类型 */
        sendTypeName: string
        /** 标签名 */
        tagName: string
        /** url */
        src: string
        /**目标路径 */
        baseURI:string
    }

    /** script 错误上报信息 */
    export interface scriptErrType {
        /** send 类型 */
        sendTypeName: string
        /** 错误提示 */
        message: string
        /** 错误发送文件 */
        filename: string
        /** 错误行号 */
        lineno: number
        /** 错误列号 */
        colno: number
        /** 错误类型 */
        type: string
        /** 错误栈信息 */
        stack: string
    }

    /** promise reject 错误信息 */
    export interface promiseErrorType {
        /** send 类型 */
        sendTypeName: string
        type: string
        reason: string
        message: string
        stack: string
    }
}
