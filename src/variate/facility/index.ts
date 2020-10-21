export const getBrowserVar = (): variateType.facilityBrowserType | {} => {
    if (!document || !window) {
        return {}
    }
    const { domain, URL, title, referrer } = document
    const { height, width, colorDepth } = window.screen
    const { language, platform } = navigator
    return {
        domain,
        URL,
        title,
        referrer,
        height,
        width,
        colorDepth,
        language,
        platform,
    }
}
