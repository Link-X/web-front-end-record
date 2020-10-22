import { send } from '@/utils/index'

export const resourceErrorHandler = (event: ErrorEvent) => {
    if (!event) return
    const target = event.target
    return send<eventsType.resourceType>({
        /** send 类型 */
        sendTypeName: '资源加载错误',
        tagName: target.tagName.toLowerCase(),
        src: target.getAttribute('src'),
    })
}

export const scriptErrorHandler = (event: ErrorEvent) => {
    const { message, filename, lineno, colno, reason, type, error } = event
    if (!message) {
        // promise reject 未处理的错误
        return send<eventsType.promiseErrorType>({
            sendTypeName: 'promise 错误',
            type,
            reason: reason?.toString(),
            message: reason?.message,
            stack: reason?.stack,
        })
    }
    // 普通脚本错误
    const msg = message.toLowerCase()
    if (msg.includes('script error')) {
        return send<{ message: string; sendTypeName: string }>({
            sendTypeName: '普通脚本错误1',
            message,
        })
    }
    return send<eventsType.scriptErrType>({
        sendTypeName: '普通脚本错误2',
        message,
        filename,
        lineno,
        colno,
        stack: error?.stac?.toString(),
        type,
    })
}
