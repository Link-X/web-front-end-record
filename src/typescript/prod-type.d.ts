export interface Iprops {
    /**key */
    key: string
    /** 应用版本 */
    version: string
    /**上报延迟 */
    outtime: number
    /**插件开始时触发 */
    start?: () => void
    /**插件准备完毕 */
    ready?: (data: userDataType) => void
    /** 是否录屏 */
    recording?: boolean
    /** 事件钩子 */
    sendEvent: (
        type: 'scriptError' | 'resourceError' | 'promiseError' | 'vdomSend' | 'mouseSend' | 'userData',
        data: any
    ) => void
}

/** 播放类 */
export interface vdomPlayType {
    play: (cb: (el: Element | Text) => void) => {}
}

interface recordFunc {
    (props: Iprops): void
}

declare const record: recordFunc

export default record

export interface facilityBrowserType {
    /** send 类型 */
    isWx: boolean
    pcInfo: { isPc: boolean; facilityName: string }
    sendTypeName: string
    domain: string
    url: string
    title: string
    referrer: string
    screenH: number
    screenW: number
    screenColorDepth: number
    language: string
    platform: string
}
export interface loadType {
    /** 首次渲染时间 */
    fpt: number
    /** 首次可交互时间 */
    tti: number
    /** ht加载j完成时间 */
    ready: number
    /** 页面完全加载完成时间 */
    load: number
    /** 首保加载时间 */
    firstbyte: number
    /** dns查询耗时 */
    dns: number
    /** tcp 链接耗时 */
    tcp: number
    /** 内容传输耗时 */
    trans: number
    /** domj解析耗时 */
    dom: number
    /** 资源加载耗时 */
    res: number
    /**Time to First Byte（TTFB）请求响应耗时 */
    ttfb: number
    /** ssl层链接时间 */
    sslTime: number
}

/** 超时文件数据 */
export interface timeOutDataType {
    /** 文件名 */
    name: string
    /** 压缩后body大小 */
    encodedBodySize: number
    /** 解压后body大小 */
    decodedBodySize: number
    /** 超时边界 */
    timeout: number
    /** 请求总时间 */
    duration: number
    /** 请求网络协议 */
    protocol: string
    /** 发送请求网络类型 */
    type: string
}
export interface getTimeData {
    /** send 类型 */
    sendTypeName: string
    timeData: loadType
    timeOut: timeOutDataType[]
}
export interface userDataType {
    browser: facilityBrowserType
    timeData: getTimeData
}

type sendType = 'scriptError' | 'resourceError' | 'promiseError' | 'vdomSend' | 'mouseSend' | 'userData'
