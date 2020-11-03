import record from '../src/index'

test('null', () => {
    const recordObj: {
        recordObj: object
        birtualTransDom: object
    } = record({
        key: 'key',
        version: '0.0.1',
        outtime: 300,
        recording: true,
        sendEvent: (type, data) => {
            console.log(data, type)
        },
    })
    expect(recordObj).toBeDefined()
    expect(recordObj).not.toBeUndefined()
    expect(recordObj.recordObj).not.toBeUndefined()
    expect(recordObj.birtualTransDom).not.toBeUndefined()
})
