interface Window {
    requestIdleCallback: (cb: Function) => void
}
interface PerformanceTiming {}

interface PerformanceEntry {
    responseEnd: number
    encodedBodySize: number
    decodedBodySize: number
    nextHopProtocol: string
    initiatorType: string
}

interface EventTarget {
    tagName: string
    value: any
    checked: any
    baseURI: string
    getAttribute(qualifiedName: string): string | null
}

interface Event {
    clientX: number
    clientY: number
}

interface ErrorEvent {
    reason: any
}

interface tagType {
    _tag: {
        id: string
    }
}
interface HTMLElement extends tagType {}

interface EventTarget extends tagType {}
