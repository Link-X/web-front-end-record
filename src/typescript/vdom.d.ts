declare namespace vdomType {
    interface vdomItemType {
        attributes?: any
        children?: any[]
        childNodes?: any[]
        namespace?: any
        tagName?: string
        type?: string
        target: string
        value?: string
        checked?: boolean
        text?: string
        __flow?: { id: string }
        preTime: number
        beginTime: number
    }

    interface recordsType {
        type: 'childList' | 'focus' | 'input' | 'blur' | 'change' | 'attributes' | 'characterData' | 'checked'
        target: string
        checked?: boolean
        removedNodes?: string[]
        attributeValue?: string | boolean
        attributeName?: string
        value?: string
        preTime: number
        beginTime: number
        addedNodes?: {
            previousSibling: string
            nextSibling: string
            vdom: vdomItemType
        }[]
    }
}
