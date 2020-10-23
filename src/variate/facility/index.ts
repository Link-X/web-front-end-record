export const isWx = (): boolean => {
    if (navigator.userAgent.match(/MicroMessenger\/([^\s]+)/)) {
        return true
    }
    return false
}

export const getFacilityInfo = (): { isPc: boolean; facilityName: string } => {
    const userAgentInfo = navigator.userAgent
    const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
    let isPc = true
    let facilityName = ''
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            facilityName = Agents[v]
            isPc = false
            break
        }
    }
    return { isPc, facilityName }
}

export const getBrowserVar = (): variateType.facilityBrowserType => {
    if (!document || !window) {
        return {} as variateType.facilityBrowserType
    }
    const { domain, URL: url, title, referrer } = document
    const { height: screenH, width: screenW, colorDepth: screenColorDepth } = window.screen
    const { language, platform } = navigator
    return {
        sendTypeName: '设备数据',
        isWx: isWx(),
        pcInfo: getFacilityInfo(),
        domain,
        url,
        title,
        referrer,
        screenW,
        screenH,
        screenColorDepth,
        language,
        platform,
    }
}
