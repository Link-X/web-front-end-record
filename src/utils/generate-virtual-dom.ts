const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'
const XML_NAMESPACES = ['xmlns', 'xmlns:svg', 'xmlns:xlink']

function createVirtualDom(element: HTMLElement, isSVG = false) {
    switch (element.nodeType) {
        case Node.TEXT_NODE:
            return createVirtualText(element)
        case Node.ELEMENT_NODE:
            return createVirtualElement(element, isSVG || element.tagName.toLowerCase() === 'svg')
        default:
            return null
    }
}

function createVirtualText(element: HTMLElement) {
    const vText = {
        text: element.nodeValue,
        type: 'VirtualText',
    }
    if (typeof element.__flow !== 'undefined') {
        vText.__flow = element.__flow
    }
    return vText
}

function createVirtualElement(element: HTMLElement, isSVG = false) {
    const tagName = element.tagName.toLowerCase()
    const children = getNodeChildren(element, isSVG)
    const { attr, namespace } = getNodeAttributes(element, isSVG)
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

function getNodeChildren(element: HTMLElement, isSVG = false) {
    const childNodes = element.childNodes ? [...element.childNodes] : []
    const children: any[] = []
    childNodes.forEach((cnode: any) => {
        children.push(createVirtualDom(cnode, isSVG))
    })
    return children.filter((c) => !!c)
}

function getNodeAttributes(element: HTMLElement, isSVG = false) {
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

const options = {
    childList: true, // 是否观察子节点的变动
    subtree: true, // 是否观察所有后代节点的变动
    attributes: true, // 是否观察属性的变动
    attributeOldValue: true, // 是否观察属性的变动的旧值
    characterData: true, // 是否节点内容或节点文本的变动
    characterDataOldValue: true, // 是否节点内容或节点文本的变动的旧值
}

const observer = new MutationObserver((mutationList) => {
    console.log(mutationList)
})
observer.observe(document.documentElement, options)

const onMutationChange = (mutationsList) => {
    const getFlowId = (node) => {
        if (node) {
            // 新插入的DOM没有标记，所以这里需要兼容
            if (!node.__flow) node.__flow = { id: uuid() }
            return node.__flow.id
        }
    }
    mutationsList.forEach((mutation) => {
        const { target, type, attributeName } = mutation
        const record = {
            type,
            target: getFlowId(target),
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
                record.removedNodes = [...mutation.removedNodes].map((n) => getFlowId(n))
                record.addedNodes = [...mutation.addedNodes].map((n) => {
                    const snapshot = this.takeSnapshot(n)
                    return {
                        ...snapshot,
                        nextSibling: getFlowId(n.nextSibling),
                        previousSibling: getFlowId(n.previousSibling),
                    }
                })
                break
        }
        this.records.push(record)
    })
}

function takeSnapshot(node, options = {}) {
    this.markNodes(node)
    const snapshot = {
        vdom: createVirtualDom(node),
    }
    if (options.doctype === true) {
        snapshot.doctype = document.doctype.name
        snapshot.clientWidth = document.body.clientWidth
        snapshot.clientHeight = document.body.clientHeight
    }
    return snapshot
}

window.addEventListener('input', this.onFormInput, true)

window.addEventListener('change', this.onFormChange, true)

window.addEventListener('focus', this.onFormFocus, true)

window.addEventListener('blur', this.onFormBlur, true)

onFormInput = (event) => {
    const target = event.target
    if (target && target.__flow && ['select', 'textarea', 'input'].includes(target.tagName.toLowerCase())) {
        this.records.push({
            type: 'input',
            target: target.__flow.id,
            value: target.value,
        })
    }
}

onFormChange = (event) => {
    const target = event.target
    if (target && target.__flow) {
        if (
            target.tagName.toLowerCase() === 'input' &&
            ['checkbox', 'radio'].includes(target.getAttribute('type'))
        ) {
            this.records.push({
                type: 'checked',
                target: target.__flow.id,
                checked: target.checked,
            })
        }
    }
}

onFormFocus = (event) => {
    const target = event.target
    if (target && target.__flow) {
        this.records.push({
            type: 'focus',
            target: target.__flow.id,
        })
    }
}

onFormBlur = (event) => {
    const target = event.target
    if (target && target.__flow) {
        this.records.push({
            type: 'blur',
            target: target.__flow.id,
        })
    }
}

export default createVirtualDom
