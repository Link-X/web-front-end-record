declare namespace variateType {
    /** 设备参数 */
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

    /** 页加载数据 */
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
}
