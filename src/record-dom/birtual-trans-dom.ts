/**将收集的vdom 渲染成真实dom */
import compose from '@/utils/compose'

class vdomPlay {
    rootVdom: vdomType.virtualElement
    records: vdomType.recordType[]

    constructor(props: { vdom: vdomType.virtualElement; records: vdomType.recordType[] }) {
        this.rootVdom = props.vdom
        this.records = props.records
    }

    createElement(vdom: vdomType.vDom) {
        let node: Element | HTMLElement | Text
        if (vdom.type === 'virtualText') {
            node = document.createTextNode(vdom.text)
        } else {
            node =
                typeof vdom.namespace === 'undefined'
                    ? document.createElement(vdom.tagName)
                    : document.createElementNS(vdom.namespace, vdom.tagName)
            for (let name in vdom.attributes) {
                node.setAttribute(name, vdom.attributes[name])
            }
            vdom.children &&
                vdom.children.forEach((cnode) => {
                    const childNode = this.createElement(cnode)
                    if (childNode && vdom.tagName !== 'script') {
                        node.appendChild(childNode)
                    }
                })
        }
        if (vdom._tag) {
            node._tag = vdom._tag
        }
        return node
    }

    findTagNode(vdom: vdomType.virtualElement[], tagId: string): vdomType.virtualElement {
        // const el = document.getElementsByTagName('*')
        let items: vdomType.virtualElement = null
        vdom.forEach((item) => {
            if (items) {
                return
            }
            if (item._tag.id === tagId) {
                return (items = item)
            }
            if (item?.children?.length) {
                return (items = this.findTagNode(item.children, tagId))
            }
        })
        return items
    }

    addNodes(nodes: vdomType.addedNodesType[], targetData: vdomType.virtualElement) {
        nodes.forEach((v) => {
            const { nextSibling, previousSibling, vdom } = v
            const appendid = nextSibling || previousSibling
            const op = nextSibling ? 0 : +1
            const index = targetData.children.findIndex((j) => j._tag.id === appendid)
            targetData.children.splice(index + op, 0, vdom as any)
        })
    }

    removeNodes(removeArr: string[], targetData: vdomType.virtualElement) {
        if (!targetData) {
            return
        }
        removeArr.forEach((v) => {
            const index = targetData.children.findIndex((j) => j._tag.id === v)
            targetData.children.splice(index, 1)
        })
    }

    attributterChange(record: vdomType.recordType, targetData: vdomType.virtualElement) {
        targetData.attributes[record.attributeName] = record.attributeValue
    }

    characterData(record: vdomType.recordType, targetData: vdomType.virtualElement) {
        targetData.text = record.value
    }

    optionsMethods = {
        childList: (record: vdomType.recordType, targetData: vdomType.virtualElement) => {
            const { removedNodes, addedNodes } = record
            if (addedNodes?.length) {
                this.addNodes(addedNodes, targetData)
            }
            if (removedNodes.length) {
                this.removeNodes(removedNodes, targetData)
            }
        },
        characterData: this.characterData,
        attributes: this.attributterChange,
        input: (record: vdomType.recordType, targetData: vdomType.virtualElement) => {
            const params = { ...record, ...{ attributeName: 'value', attributeValue: record.value } }
            this.attributterChange(params, targetData)
        },
        checked: (record: vdomType.recordType, targetData: vdomType.virtualElement) => {
            const params = { ...record, ...{ attributeName: 'checked', attributeValue: record.checked } }
            this.attributterChange(params, targetData)
        },
        focus: () => {},
        blur: () => {},
    }

    recordPlayBack(record: vdomType.recordType) {
        const { target, type } = record
        const targetData = this.findTagNode([this.rootVdom], target)
        const fn = this.optionsMethods[type]
        fn && fn(record, targetData)
        return this.createElement(this.rootVdom)
    }

    play() {
        window.onload = () => {
            const iframe = document.createElement('iframe')
            iframe.style.width = `${window.innerWidth}px`
            iframe.style.height = `${window.innerHeight}px`
            document.body.appendChild(iframe)
            const content = iframe.contentDocument
            content.open()
            content.write(`<!doctype html><html><head></head><body></body></html>`)
            content.close()
            const fn = compose(
                this.records.map((v) => {
                    return (e: any, next: Function) => {
                        window.requestAnimationFrame(() => {
                            setTimeout(
                                () => {
                                    content.replaceChild(this.recordPlayBack(v), content.documentElement)
                                    next()
                                },
                                v.preTime ? (v.beginTime - v.preTime) / 1.5 : 0
                            )
                        })
                    }
                })
            )
            fn(this, () => {
                console.log('播放完毕')
            })
        }
    }
}

export default vdomPlay
