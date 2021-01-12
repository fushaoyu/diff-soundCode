//真正创建节点,将vnode创建为DOM，是孤儿节点不进行插入
/**
 *
 *
 * @export
 * @param {虚拟DOM} vnode
 * @returns
 */
export default function createElement(vnode) {
    //创建一个DOM节点，这个节点现在还是孤儿节点
    const domNode = document.createElement(vnode.sel);
    //有子节点还是有文本
    if (vnode.text !== "" && (vnode.children == undefined || vnode.children.length == 0)) {
        //它内部是文字
        domNode.innerText = vnode.text;
    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        //内部是子节点，就要递归创建节点
        for (let i = 0; i < vnode.children.length; i++) {
            //得到当前这个children
            const ch = vnode.children[i];
            //console.log(ch);
            //创建出它的DOM，一旦调用createrElement意味着：创建出DOM了，并且它的elm属性指向了创建出的DOM，但是还没有上树，是一个孤儿节点
            let chDom = createElement(ch);
            //上树
            domNode.appendChild(chDom)
        }
    }
    //补充domNode
    vnode.elm = domNode;
    //返回elm，elm是一个纯DOM属性
    return vnode.elm
}