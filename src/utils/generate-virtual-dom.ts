import vdomPlay from './birtual-trans-dom'

/**
 * 收集用户操作的信息 生成虚拟dom
 */
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'
const XML_NAMESPACES = ['xmlns', 'xmlns:svg', 'xmlns:xlink']

interface Iprops {
    key: string
    sendEvent: (type: webRecord.sendType, data: any) => void
}

class HtmlGetting {
    private options: any
    props: Iprops
    records: vdomType.vdomItemType[]
    constructor(props: Iprops) {
        this.props = props
        this.records = []
    }

    init() {
        if (!this.props.key) {
            console.error('请传入唯一key')
            return
        }

        window.addEventListener('load', () => {
            window.requestIdleCallback = window.requestIdleCallback || setTimeout
            window.requestIdleCallback(() => {
                this.nodeMark(document.getElementsByTagName('*'))
                this.records = [
                    { ...this.createVirtualDom(document.documentElement), beginTime: 0, preTime: 0 },
                ]
                this.eventInit()

                setTimeout(
                    function () {
                        this.obsDom()
                    }.bind(this),
                    500
                )
            })
        })
    }

    getkey() {
        return (
            this.props.key +
            (Math.random() * 10000000).toString(16).substr(0, 4) +
            '-' +
            new Date().getTime() +
            '-' +
            Math.random().toString().substr(2, 5)
        )
    }

    nodeMark(el: HTMLCollectionOf<Element>) {
        // const el = document.getElementsByTagName('*')
        for (let i = 0; i < el.length; i++) {
            const elItem = el[i]
            if (!elItem.__flow) {
                elItem.__flow = { id: this.getkey() }
            }
            if (elItem?.children?.length) {
                this.nodeMark(elItem.children)
            }
            if (elItem?.childNodes?.length) {
                this.nodeMark(elItem.childNodes)
            }
        }
        return el
    }

    eventInit() {
        window.addEventListener('input', this.onFormInput.bind(this), true)

        window.addEventListener('change', this.onFormChange.bind(this), true)

        window.addEventListener('focus', this.onFormFocus.bind(this), true)

        window.addEventListener('blur', this.onFormBlur.bind(this), true)

        window.addEventListener('mousemove', this.onWindowMove.bind(this), true)
    }

    obsDom() {
        const options = {
            childList: true, // 是否观察子节点的变动
            subtree: true, // 是否观察所有后代节点的变动
            attributes: true, // 是否观察属性的变动
            attributeOldValue: true, // 是否观察属性的变动的旧值
            characterData: true, // 是否节点内容或节点文本的变动
            characterDataOldValue: true, // 是否节点内容或节点文本的变动的旧值
        }

        const observer = new MutationObserver((mutationList: MutationRecord[]) => {
            this.onMutationChange(mutationList)
        })

        observer.observe(document.documentElement, options)
    }

    createVirtualDom(element: HTMLElement, isSVG = false): vdomType.vdomItemType {
        switch (element.nodeType) {
            case Node.TEXT_NODE:
                return this.createVirtualText(element)
            case Node.ELEMENT_NODE:
                return this.createVirtualElement(element, isSVG || element.tagName.toLowerCase() === 'svg')
            default:
                return null
        }
    }

    createVirtualText(element: HTMLElement): any {
        const vText = {
            text: element.nodeValue,
            type: 'VirtualText',
            __flow: {},
        }
        if (typeof element.__flow !== 'undefined') {
            vText.__flow = element.__flow
        }
        return vText
    }

    createVirtualElement(element: HTMLElement, isSVG = false): any {
        const tagName = element.tagName.toLowerCase()
        const children = this.getNodeChildren(element, isSVG)
        const { attr, namespace } = this.getNodeAttributes(element, isSVG)
        const vElement = {
            tagName,
            type: 'VirtualElement',
            children,
            attributes: attr,
            namespace,
        }
        if (typeof element.__flow !== 'undefined') {
            vElement.__flow = element.__flow
        }
        return vElement
    }

    getNodeChildren(element: HTMLElement, isSVG = false) {
        const childNodes = element.childNodes ? [...element.childNodes] : []
        const children: any[] = []
        childNodes.forEach((cnode: any) => {
            children.push(this.createVirtualDom(cnode, isSVG))
        })
        return children.filter((c) => !!c)
    }

    getNodeAttributes(element: HTMLElement, isSVG = false) {
        const attributes = element.attributes ? [...element.attributes] : []
        const attr: any = {}
        let namespace
        attributes.forEach(({ nodeName, nodeValue }) => {
            attr[nodeName] = nodeValue
            if (XML_NAMESPACES.includes(nodeName)) {
                namespace = nodeValue
            } else if (isSVG) {
                namespace = SVG_NAMESPACE
            }
        })
        return { attr, namespace }
    }

    onMutationChange(mutationsList: MutationRecord[]) {
        const getFlowId = (node: HTMLElement) => {
            if (node) {
                // 新插入的DOM没有标记，所以这里需要兼容
                if (!node.__flow) node.__flow = { id: this.getkey() }
                return node.__flow.id
            }
        }
        mutationsList.forEach((mutation) => {
            const { target, type, attributeName } = mutation
            const record: any = {
                type,
                target: getFlowId(target as HTMLElement),
                beginTime: new Date().getTime(),
                preTime: this.records[this.records.length - 1].beginTime || 0,
            }
            switch (type) {
                case 'characterData':
                    record.value = target.nodeValue
                    break
                case 'attributes':
                    record.attributeName = attributeName
                    record.attributeValue = target.getAttribute(attributeName)
                    break
                case 'childList':
                    record.removedNodes = [...mutation.removedNodes].map((n: HTMLElement) => getFlowId(n))
                    record.addedNodes = [...mutation.addedNodes].map((n: HTMLElement) => {
                        const snapshot = this.takeSnapshot(n)
                        return {
                            ...snapshot,
                            nextSibling: getFlowId(n.nextSibling),
                            previousSibling: getFlowId(n.previousSibling),
                        }
                    })
                    break
            }
            this.eventSend(record)
        })
    }

    takeSnapshot(node: HTMLElement, options: any = {}) {
        this.markNodes(node)
        const snapshot: any = {
            vdom: this.createVirtualDom(node),
        }
        if (options.doctype === true) {
            snapshot.doctype = document.doctype.name
            snapshot.clientWidth = document.body.clientWidth
            snapshot.clientHeight = document.body.clientHeight
        }
        return snapshot
    }

    markNodes(node: HTMLElement) {
        node.__flow = { id: this.getkey() }
        node.children && node.children.length && this.nodeMark(node.children)
        return node
    }

    onFormInput(event: Event) {
        const target = event.target
        if (
            target &&
            target.__flow &&
            ['select', 'textarea', 'input'].includes(target.tagName.toLowerCase())
        ) {
            this.eventSend({
                type: 'input',
                target: target.__flow.id,
                value: target.value,
            })
        }
    }

    onFormChange(event: Event) {
        const target = event.target
        if (target && target.__flow) {
            if (
                target.tagName.toLowerCase() === 'input' &&
                ['checkbox', 'radio'].includes(target.getAttribute('type'))
            ) {
                this.eventSend({
                    type: 'checked',
                    target: target.__flow.id,
                    checked: target.checked,
                })
            }
        }
    }

    onFormFocus(event: Event) {
        const target = event.target
        if (target && target.__flow) {
            this.eventSend({
                type: 'focus',
                target: target.__flow.id,
            })
        }
    }

    onFormBlur(event: Event) {
        const target = event.target
        if (target && target.__flow) {
            this.eventSend({
                type: 'blur',
                target: target.__flow.id,
            })
        }
    }

    eventSend(data: any) {
        this.records.push(data)
        this.props.sendEvent('vdomSend', this.records)
        return data
    }

    onWindowMove(event: Event) {
        const { clientX, clientY } = event
        this.props.sendEvent('mouseSend', { clientX, clientY })
        // console.log(clientX, clientY)
    }
}

export default HtmlGetting
