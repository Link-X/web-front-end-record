interface Window {
    requestIdleCallback: (cb: Function) => void
}

interface flowType {
    __flow: {
        id: string
    }
}
interface HTMLElement extends flowType {}

interface EventTarget extends flowType {}
