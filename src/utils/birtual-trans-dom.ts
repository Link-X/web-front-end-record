export default function createElement(vdom: any, nodeFilter = (childNode: any) => true) {
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
        node.__flow = vdom.__flow
    }
    return node
}
