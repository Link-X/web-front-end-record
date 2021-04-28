class Base {
    public props: webRecord.Iprops
    constructor(props: webRecord.Iprops) {
        this.props = props
    }

    plugins = {}

    onload(cb: Function) {
        const preLoad: (e: Event) => any = window.onload
        window.onload = (e: Event) => {
            if (preLoad && typeof preLoad === 'function') {
                preLoad(e)
            }
            window.requestIdleCallback = window.requestIdleCallback || setTimeout
            window.requestIdleCallback(() => {
                cb()
            })
        }
    }

    eventMethod<E, D>(
        target: any,
        eventType: string,
        fn: (e: E, p: webRecord.Iprops) => D,
        spread: boolean = false,
        sendType: webRecord.sendType
    ) {
        target.addEventListener(
            eventType,
            (event: E) => {
                this.sendData<D>(sendType, fn(event, this.props))
            },
            spread
        )
    }

    sendData<T>(sendType: webRecord.sendType, data: T): T {
        setTimeout(() => {
            try {
                const sendData = { ...data, ...this.props }
                if (typeof this.props.sendEvent === 'function') {
                    this.props.sendEvent(sendType, sendData)
                }
            } catch (err) {
                console.error('record errr')
            }
        }, this.props.outtime || 0)
        return data
    }
}

export default Base
