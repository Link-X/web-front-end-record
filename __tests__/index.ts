import record from '../src/index'

import birtualDom from '../src/record-dom/birtual-trans-dom'

test('methods not undefined', () => {
    const recordObj: {
        recordObj: any
        birtualTransDom: typeof birtualDom
    } = record({
        key: 'key',
        version: '0.0.1',
        outtime: 300,
        recording: true,
        sendEvent: (type, data) => {
        },
    })
    expect(recordObj).not.toBeUndefined()
    expect(recordObj.recordObj).not.toBeUndefined()
    expect(recordObj.birtualTransDom).not.toBeUndefined()

    expect(window.onerror).not.toBeUndefined()
    expect(window.onunhandledrejection).not.toBeUndefined()
    expect(document.onerror).not.toBeUndefined()
})
