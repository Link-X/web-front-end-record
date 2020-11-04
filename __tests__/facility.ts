import { getBrowserVar, getFacilityInfo, isWx } from '../src/variate/facility/index'

test('iswx test', () => {
    expect(isWx()).toBe(false)
})

test('facility info', () => {
    expect(getFacilityInfo()).toEqual({
        isPc: true,
        facilityName: '',
    })
})

test('browser info', () => {
    expect(getBrowserVar()).toEqual({
        domain: undefined,
        isWx: false,
        language: 'en-US',
        pcInfo: {
            isPc: true,
            facilityName: '',
        },
        platform: '',
        referrer: '',
        screenColorDepth: 24,
        screenH: 0,
        screenW: 0,
        sendTypeName: '设备数据',
        title: '',
        url: 'http://localhost/',
    })
})
