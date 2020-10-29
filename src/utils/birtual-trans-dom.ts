/**将收集的vdom 渲染成真实dom */
import compose from './compose'
class vdomPlay {
    rootVdom: vdomType.vdomItemType
    records: vdomType.recordsType[]

    constructor(props: { vdom: vdomType.vdomItemType; records: vdomType.recordsType[] }) {
        this.rootVdom = props.vdom
        this.records = props.records
    }

    createElement(vdom: vdomType.vdomItemType) {
        let node: any
        if (vdom.type === 'VirtualText') {
            node = document.createTextNode(vdom.text)
        } else {
            node =
                typeof vdom.namespace === 'undefined'
                    ? document.createElement(vdom.tagName)
                    : document.createElementNS(vdom.namespace, vdom.tagName)
            for (let name in vdom.attributes) {
                node.setAttribute(name, vdom.attributes[name])
            }
            vdom.children.forEach((cnode: any) => {
                const childNode: any = this.createElement(cnode)
                if (childNode && vdom.tagName !== 'script') {
                    node.appendChild(childNode)
                }
            })
        }
        if (vdom.__flow) {
            node.classList && node.classList.add(vdom.__flow.id)
            node.__flow = vdom.__flow
        }
        return node
    }

    findFlowNode(vdom: vdomType.vdomItemType[], flowId: string): any {
        // const el = document.getElementsByTagName('*')
        let items: any = null
        vdom.forEach((item) => {
            if (items) {
                return
            }
            if (item.__flow.id === flowId) {
                return (items = item)
            }
            if (item?.children?.length) {
                return (items = this.findFlowNode(item.children, flowId))
            }
            if (item?.childNodes?.length) {
                return (items = this.findFlowNode(item.childNodes, flowId))
            }
        })
        return items
    }

    addNodes(nodes: any[], target: string) {
        const targetData = this.findFlowNode([this.rootVdom], target)
        nodes.forEach((v) => {
            const { nextSibling, previousSibling, vdom } = v
            const appendid = nextSibling || previousSibling
            const op = nextSibling ? 0 : +1
            const index = targetData.children.findIndex((j: any) => j.__flow.id === appendid)
            targetData.children.splice(index + op, 0, vdom)
        })
    }

    removeNodes(removeArr: string[], target: string) {
        const targetData = this.findFlowNode([this.rootVdom], target)
        if(!targetData) {
            return
        }
        removeArr.forEach((v) => {
            const index = targetData.children.findIndex((j: any) => j.__flow.id === v)
            targetData.children.splice(index, 1)
        })
    }

    attributterChange(record: vdomType.recordsType, target: string) {
        const targetData = this.findFlowNode([this.rootVdom], target)
        targetData.attributes[record.attributeName] = record.attributeValue
    }

    characterData(record: vdomType.recordsType, target: string) {
        const targetData = this.findFlowNode([this.rootVdom], target)
        targetData.text = record.value
    }

    recordPlayBack(record: vdomType.recordsType) {
        const { target, removedNodes, addedNodes, checked } = record
        switch (record.type) {
            case 'childList':
                if (addedNodes?.length) {
                    this.addNodes(addedNodes, target)
                }
                if (removedNodes.length) {
                    this.removeNodes(removedNodes, target)
                }
                break
            case 'attributes':
                this.attributterChange(record, target)
                break
            case 'characterData':
                this.characterData(record, target)
                break
            case 'input':
                this.attributterChange(
                    { attributeName: 'value', attributeValue: record.value, target, type: 'input' },
                    target
                )
                break
            case 'checked':
                this.attributterChange(
                    { attributeName: 'checked', attributeValue: checked, target, type: 'checked' },
                    target
                )
                break
        }
        const el = this.createElement(this.rootVdom)
        return el
    }

    play(cb: (el: HTMLElement) => void) {
        const funcArr: any[] = []
        this.records.forEach((v) => {
            funcArr.push((e: any, next: Function) => {
                setTimeout(() => {
                    cb(this.recordPlayBack(v))
                    next()
                }, 500)
            })
        })
        const fn = compose(funcArr)
        fn(this, () => {
            console.log(1234)
        })
    }
}

export default vdomPlay
