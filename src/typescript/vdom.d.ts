declare namespace vdomType {
    interface tagType {
        id: string
    }

    type vDom = virtualElement | virtualTextType

    interface virtualTextType {
        text: string
        type: 'virtualText'
        _tag: tagType
    }

    interface virtualElement {
        tagName: string
        type: 'virtualElement'
        children: virtualElement[]
        attributes: { [name: string]: any }
        namespace: string
        _tag: tagType
        text?: string
       changeDom?: boolean 
    }

    interface addedNodesType {
        vdom: vDom
        doctype?: string
        clientWidth?: number
        clientHeight?: number
        nextSibling?: string
        previousSibling?: string
    }

    interface recordType {
        type: MutationRecordType | 'input' | 'checked' | 'focus' | 'blur'
        target: string
        beginTime: number
        preTime: number
        value?: string
        attributeName?: string
        attributeValue?: string
        removedNodes?: string[]
        addedNodes?: addedNodesType[]
        checked?: any
    }
}
