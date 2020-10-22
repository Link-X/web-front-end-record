import { send } from '@/utils/index'
const performance: Performance = window.performance || window.msPerformance || window.webkitPerformance

/** 获取超时文件 */
const getTimeoutRes = (): variateType.timeOutDataType[] => {
    const resourceTimes = performance.getEntriesByType('resource')
    if (!resourceTimes) {
        return []
    }
    return resourceTimes
        .filter(({ startTime, responseEnd }) => responseEnd - startTime > 5000)
        .map(({ name, encodedBodySize, decodedBodySize, duration, nextHopProtocol, initiatorType }) => ({
            name,
            encodedBodySize,
            decodedBodySize,
            timeout: 5000,
            duration,
            protocol: nextHopProtocol,
            type: initiatorType,
        }))
}

export const countTime = (): variateType.loadType => {
    const {
        fetchStart,
        domainLookupStart,
        domainLookupEnd,
        connectStart,
        connectEnd,
        secureConnectionStart,
        requestStart,
        responseStart,
        responseEnd,
        domInteractive,
        domContentLoadedEventStart,
        domContentLoadedEventEnd,
        loadEventStart,
    } = performance.timing ? performance.timing : performance.getEntriesByType('navigation')
    return {
        fpt: responseEnd - fetchStart,
        tti: domInteractive - fetchStart,
        ready: domContentLoadedEventStart - fetchStart,
        load: loadEventStart - fetchStart,
        firstbyte: responseStart - domainLookupStart,
        dns: domainLookupEnd - domainLookupStart,
        tcp: connectEnd - connectStart,
        ttfb: responseStart - requestStart,
        trans: responseEnd - responseStart,
        dom: domInteractive - responseEnd,
        res: loadEventStart - domContentLoadedEventEnd,
        sslTime: secureConnectionStart ? connectEnd - secureConnectionStart : null,
    }
}

/** 获加载时间 */
export const getTimeData = (): variateType.getTimeData => {
    const resourceList = getTimeoutRes()
    const timeData = countTime()
    return send<variateType.getTimeData>({
        sendTypeName: '页面加载数据',
        timeOut: resourceList,
        timeData,
    })
}
