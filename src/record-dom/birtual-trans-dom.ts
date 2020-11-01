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

    findFlowNode(vdom: vdomType.virtualElement[], flowId: string): vdomType.virtualElement {
        // const el = document.getElementsByTagName('*')
        let items: vdomType.virtualElement = null
        vdom.forEach((item) => {
            if (items) {
                return
            }
            if (item._tag.id === flowId) {
                return (items = item)
            }
            if (item?.children?.length) {
                return (items = this.findFlowNode(item.children, flowId))
            }
        })
        return items
    }

    addNodes(nodes: vdomType.addedNodesType[], target: string) {
        const targetData = this.findFlowNode([this.rootVdom], target)
        nodes.forEach((v) => {
            const { nextSibling, previousSibling, vdom } = v
            const appendid = nextSibling || previousSibling
            const op = nextSibling ? 0 : +1
            const index = targetData.children.findIndex((j) => j._tag.id === appendid)
            targetData.children.splice(index + op, 0, vdom)
        })
    }

    removeNodes(removeArr: string[], target: string) {
        const targetData = this.findFlowNode([this.rootVdom], target)
        if (!targetData) {
            return
        }
        removeArr.forEach((v) => {
            const index = targetData.children.findIndex((j) => j._tag.id === v)
            targetData.children.splice(index, 1)
        })
    }

    attributterChange(record: vdomType.recordType, target: string) {
        const targetData = this.findFlowNode([this.rootVdom], target)
        targetData.attributes[record.attributeName] = record.attributeValue
    }

    characterData(record: vdomType.recordType, target: string) {
        const targetData = this.findFlowNode([this.rootVdom], target)
        targetData.text = record.value
    }

    optionsMethods = {
        childList: (record: vdomType.recordType, target: string) => {
            const { removedNodes, addedNodes } = record
            if (addedNodes?.length) {
                this.addNodes(addedNodes, target)
            }
            if (removedNodes.length) {
                this.removeNodes(removedNodes, target)
            }
        },
        characterData: this.characterData,
        attributes: this.attributterChange,
        input: (record: vdomType.recordType, target: string) => {
            const params = { ...record, ...{ attributeName: 'value', attributeValue: record.value } }
            this.attributterChange(params, target)
        },
        checked: (record: vdomType.recordType, target: string) => {
            const params = { ...record, ...{ attributeName: 'checked', attributeValue: record.checked } }
            this.attributterChange(params, params.target)
        },
        focus: () => {},
        blur: () => {},
    }

    recordPlayBack(record: vdomType.recordType) {
        const { target, type } = record
        const fn = this.optionsMethods[type]
        fn && fn(record, target)
        return this.createElement(this.rootVdom)
    }

    play(cb: (el: Text | Element) => void) {
        const fn = compose(
            this.records.map((v) => {
                return (e: any, next: Function) => {
                    setTimeout(
                        () => {
                            cb(this.recordPlayBack(v))
                            next()
                        },
                        v.preTime ? v.beginTime - v.preTime : 0
                    )
                }
            })
        )
        fn(this, () => {
            console.log('播放完毕')
        })
    }
}

export default vdomPlay
