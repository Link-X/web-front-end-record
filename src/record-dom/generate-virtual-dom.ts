/**
 * 收集用户操作的信息 生成虚拟dom
 */

import Base from '@/base'
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'
const XML_NAMESPACES = ['xmlns', 'xmlns:svg', 'xmlns:xlink']

class GenerateVDom extends Base {
    public records: vdomType.recordType[]
    constructor(props: webRecord.Iprops) {
        super(props)
        this.records = []
        this.init()
    }

    init() {
        this.onload(() => {
            this.tagNode(document.getElementsByTagName('*'))
            const home = this.createVirtualDom(document.documentElement)
            this.records = [{ ...home, beginTime: 0, preTime: 0 } as any]
            this.eventInit()
            setTimeout(
                function () {
                    this.obsDom()
                }.bind(this),
                500
            )
        })
    }

    eventInit() {
        window.addEventListener('input', this.onFormInput.bind(this), true)

        window.addEventListener('change', this.onFormChange.bind(this), true)

        window.addEventListener('focus', this.onFormFocus.bind(this), true)

        window.addEventListener('blur', this.onFormBlur.bind(this), true)

        window.addEventListener('mousemove', this.onWindowMove.bind(this), true)
    }

    getKey() {
        const random = (Math.random() * 10000000).toString(16).substr(0, 4)
        const random2 = Math.random().toString().substr(2, 5)
        return `${this.props.key}-${random}-${random2}`
    }

    tagNode(el: HTMLCollectionOf<Element>): HTMLCollectionOf<Element> {
        for (let i = 0; i < el.length; i++) {
            const elItem = el[i]
            if (!elItem._tag) {
                elItem._tag = { id: this.getKey() }
            }
            if (elItem?.children?.length) {
                this.tagNode(elItem.children)
            }
            if (elItem?.childNodes?.length) {
                this.tagNode(elItem.childNodes as any)
            }
        }
        return el
    }

    createVirtualDom(el: HTMLElement, isSVG = false): vdomType.virtualElement | vdomType.virtualTextType {
        switch (el.nodeType) {
            case Node.TEXT_NODE:
                return this.createVirtualText(el)
            case Node.ELEMENT_NODE:
                return this.createVirtualElement(el, isSVG || el.tagName.toLowerCase() === 'svg')
            default:
                return null
        }
    }

    createVirtualText(el: HTMLElement): vdomType.virtualTextType {
        return {
            text: el.nodeValue,
            type: 'virtualText',
            _tag: el?._tag || undefined,
        }
    }

    createVirtualElement(el: HTMLElement, isSvg = false): vdomType.virtualElement {
        const { attr, namespace } = this.getNodeAttributes(el, isSvg)
        return {
            type: 'virtualElement',
            tagName: el.tagName.toLowerCase(),
            children: this.getNodeChildren(el, isSvg),
            attributes: attr,
            namespace,
            _tag: el?._tag || undefined,
        }
    }

    getNodeChildren(el: HTMLElement, isSvg = false): vdomType.virtualElement[] {
        const childNodes = el.childNodes ? [...el.childNodes] : []
        return childNodes
            .map((node: ChildNode) => {
                return this.createVirtualDom(node as HTMLElement, isSvg)
            })
            .filter((c) => !!c) as vdomType.virtualElement[] | vdomType.virtualElement[]
    }

    getNodeAttributes(element: HTMLElement, isSVG = false) {
        const attributes = element.attributes ? [...element.attributes] : []
        const attr: { [name: string]: any } = {}
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

    recordChange(item: vdomType.recordType) {
        this.records.push(item)
        this.props.sendEvent && this.props.sendEvent('vdomSend', this.records)
    }

    obsDom() {
        const observer = new MutationObserver((mutationList: MutationRecord[]) => {
            this.onMutationChange(mutationList)
        })

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeOldValue: true,
            characterData: true,
            characterDataOldValue: true,
        })
    }

    getTimers() {
        return {
            beginTime: new Date().getTime(),
            preTime: this.records[this.records.length - 1].beginTime || 0,
        }
    }

    getTagId = (node: Node) => {
        if (node) {
            // 新插入的DOM没有标记，所以这里需要兼容
            if (!node._tag) node._tag = { id: this.getKey() }
            return node._tag.id
        }
    }

    onMutationChange(mutationsList: MutationRecord[]) {
        mutationsList.forEach((item) => {
            const { target, type, attributeName } = item
            const record: vdomType.recordType = {
                type,
                target: this.getTagId(target),
                ...this.getTimers(),
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
                    record.removedNodes = [...item.removedNodes].map((n: HTMLElement) => this.getTagId(n))
                    record.addedNodes = [...item.addedNodes].map((n: HTMLElement) => {
                        const snapshot = this.takeSnapshot(n)
                        return {
                            ...snapshot,
                            nextSibling: this.getTagId(n.nextSibling),
                            previousSibling: this.getTagId(n.previousSibling),
                        }
                    })
                    break
            }
            this.recordChange(record)
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
        node._tag = { id: this.getKey() }
        node.children && node.children.length && this.tagNode(node.children)
        return node
    }

    onFormInput(event: Event) {
        const target = event.target
        if (target && target._tag && ['select', 'textarea', 'input'].includes(target.tagName.toLowerCase())) {
            this.recordChange({
                type: 'input',
                target: target._tag.id,
                value: target.value,
                ...this.getTimers(),
            })
        }
    }

    onFormChange(event: Event) {
        const target = event.target
        if (target && target._tag) {
            if (
                target.tagName.toLowerCase() === 'input' &&
                ['checkbox', 'radio'].includes(target.getAttribute('type'))
            ) {
                this.recordChange({
                    type: 'checked',
                    target: target._tag.id,
                    checked: target.checked,
                    ...this.getTimers(),
                })
            }
        }
    }

    onFormFocus(event: Event) {
        const target = event.target
        if (target && target._tag) {
            this.recordChange({
                type: 'focus',
                target: target._tag.id,
                ...this.getTimers(),
            })
        }
    }

    onFormBlur(event: Event) {
        const target = event.target
        if (target && target._tag) {
            this.recordChange({
                type: 'blur',
                target: target._tag.id,
                ...this.getTimers(),
            })
        }
    }

    onWindowMove(event: Event) {
        const { clientX, clientY } = event
        // console.log(clientX, clientY)
    }
}

export default GenerateVDom
