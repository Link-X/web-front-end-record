export const resourceErrorHandler = (event: ErrorEvent) => {
    if (!event) return
    const target = event.target
    return {
        /** send 类型 */
        sendTypeName: '资源加载错误',
        tagName: target.tagName.toLowerCase(),
        src: target.getAttribute('src'),
        baseURI: target.baseURI,
    }
}

export const scriptErrorHandler = (event: ErrorEvent) => {
    const { message, filename, lineno, colno, reason, type, error } = event
    if (!message) {
        // promise reject 未处理的错误
        return {
            sendTypeName: 'promise 错误',
            type,
            reason: reason?.toString(),
            message: reason?.message,
            stack: reason?.stack,
        }
    }
    // 普通脚本错误
    const msg = message.toLowerCase()
    if (msg.includes('script error')) {
        return {
            sendTypeName: '普通脚本错误1',
            message,
        }
    }
    return {
        sendTypeName: '普通脚本错误2',
        message,
        filename,
        lineno,
        colno,
        stack: error?.stack?.toString(),
        type,
    }
}
