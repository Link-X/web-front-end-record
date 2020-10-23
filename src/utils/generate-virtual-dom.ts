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

export default createVirtualDom
