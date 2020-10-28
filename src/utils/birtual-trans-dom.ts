/**将收集的vdom 渲染成真实dom */
interface vdomType {
    attributes?: any
    children?: any[]
    childNodes?: any[]
    namespace?: any
    tagName?: string
    type?: string
    target: string
    value?: string
    checked?: boolean
    __flow: { id: string }
}

interface recordsType {
    type: 'childList' | 'focus' | 'input' | 'blur' | 'change' | 'attributes' | 'characterData'
    target: string
    removedNodes?: string[]
    attributeValue?: string
    attributeName?: string
    value?: string
    addedNodes?: {
        previousSibling: string
        nextSibling: string
        vdom: vdomType
    }[]
}

export const createElement = (vdom: vdomType, nodeFilter = (childNode: any) => true) => {
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
            const childNode: any = createElement(cnode, nodeFilter)
            if (childNode && nodeFilter(childNode)) {
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

export const findFlowNode = (vdom: vdomType[], flowId: string): any => {
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
            return (items = findFlowNode(item.children, flowId))
        }
        if (item?.childNodes?.length) {
            return (items = findFlowNode(item.childNodes, flowId))
        }
    })
    return items
}

const addNodes = (vdom: vdomType, nodes: any[], target: string) => {
    const targetData = findFlowNode([vdom], target)
    nodes.forEach((v) => {
        const { nextSibling, previousSibling, vdom } = v
        const appendid = nextSibling || previousSibling
        const op = nextSibling ? 0 : +1
        const index = targetData.children.findIndex((j: any) => j.__flow.id === appendid)
        targetData.children.splice(index + op, 0, vdom)
    })
}

const removeNodes = (vdom: vdomType, removeArr: string[], target: string) => {
    const targetData = findFlowNode([vdom], target)
    removeArr.forEach((v) => {
        const index = targetData.children.findIndex((j: any) => j.__flow.id === v)
        targetData.children.splice(index, 1)
    })
}

const attributterChange = (vdom: vdomType, record: recordsType, target: string) => {
    const targetData = findFlowNode([vdom], target)
    targetData.attributes[record.attributeName] = record.attributeValue
}

const characterData = (vdom: vdomType, record: recordsType, target: string) => {
    const targetData = findFlowNode([vdom], target)
    targetData.text = record.value
}


export const recordPlayBack = (vdom: vdomType, record: recordsType) => {
    const { target, removedNodes, addedNodes } = record
    console.log(vdom, record)
    switch (record.type) {
        case 'childList':
            if (addedNodes?.length) {
                addNodes(vdom, addedNodes, target)
            }
            if (removedNodes.length) {
                removeNodes(vdom, removedNodes, target)
            }
            break
        case 'attributes':
            attributterChange(vdom, record, target)
        case 'characterData':
            characterData(vdom, record, target)
        case 'input':
            attributterChange(
                vdom,
                { attributeName: 'value', attributeValue: record.value, target, type: 'input' },
                target
            )
    }
    const el = createElement(vdom)
    console.log(el)
}
