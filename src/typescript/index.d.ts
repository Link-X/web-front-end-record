interface Window {
    requestIdleCallback: (cb: Function) => void
}

interface tagType {
    _tag: {
        id: string
    }
}
interface HTMLElement extends tagType {}

interface EventTarget extends tagType {}
