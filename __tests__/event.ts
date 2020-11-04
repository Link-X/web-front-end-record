import { resourceErrorHandler, scriptErrorHandler } from '../src/events'

const errorEvent: any = {
    bubbles: false,
    cancelBubble: false,
    cancelable: true,
    colno: 19,
    composed: false,
    currentTarget: {},
    defaultPrevented: false,
    error: {
        message: 'Invalid array length',
        stack:
            'RangeError: Invalid array lengthat file:///D:/github/web-front-end-record/test/error.html:42:19',
    },
    eventPhase: 0,
    filename: 'file:///D:/github/web-front-end-record/test/error.html',
    isTrusted: true,
    lineno: 42,
    message: 'Uncaught RangeError: Invalid array length',
    path: [{}],
    returnValue: true,
    timeStamp: 175.95999996410683,
    type: 'error',
}

const sourceError: any = {
    target: {
        tagName: 'script',
        baseURI: 'file:///D:/github/web-front-end-record/test/error.html',
        getAttribute: (type: string): string => {
            const obj: any = {
                src: './aa.js',
            }
            return obj[type]
        },
    },
}

const promiseError: any = {
    bubbles: false,
    cancelBubble: false,
    cancelable: true,
    composed: false,
    defaultPrevented: false,
    eventPhase: 0,
    isTrusted: true,
    reason: '1234',
    returnValue: true,
    timeStamp: 172.96499997610226,
    type: 'unhandledrejection',
    currentTarget: {},
    path: [],
    srcElement: {},
    target: {},
}

const errorOrdinary: any = {
    message: 'script error',
}

test('sourceErr result', () => {
    expect(resourceErrorHandler(sourceError)).toEqual({
        baseURI: 'file:///D:/github/web-front-end-record/test/error.html',
        sendTypeName: '资源加载错误',
        src: './aa.js',
        tagName: 'script',
    })
})

test('promise error result', () => {
    const err2 = scriptErrorHandler(promiseError)
    expect(err2).toEqual({
        message: undefined,
        reason: '1234',
        sendTypeName: 'promise 错误',
        stack: undefined,
        type: 'unhandledrejection',
    })
})

test('err1 result', () => {
    const err = scriptErrorHandler(errorOrdinary)
    expect(err).toEqual({
        sendTypeName: '普通脚本错误1',
        message: 'script error',
    })
})

test('err2 result', () => {
    const err1 = scriptErrorHandler(errorEvent)
    expect(err1).toEqual({
        colno: 19,
        filename: 'file:///D:/github/web-front-end-record/test/error.html',
        lineno: 42,
        type: 'error',
        message: 'Uncaught RangeError: Invalid array length',
        sendTypeName: '普通脚本错误2',
        stack:
            'RangeError: Invalid array lengthat file:///D:/github/web-front-end-record/test/error.html:42:19',
    })
})
