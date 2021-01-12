import createElement from "./createElement"
import updataChildren from "./updataChildren"
/**
 *
 *
 * @export
 * @param {真实DOM} oldVnode
 * @param {虚拟DOM} newVnode
 */
export default function patchVnode(oldVnode, newVnode) {
    //判断老节点和新节点是否是同一片内存空间的
    if (oldVnode !== newVnode) {
        //判断新节点是否有文本
        if (newVnode.text !== undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
            //console.log("新节点有text属性");
            //判断新节点和老节点的文本是否相同,如果不相同那么直接替换（老节点的内容无论是什么，使用innerText方法都会全部替换掉）
            if (newVnode.text !== oldVnode.text) {
                oldVnode.elm.innerText = newVnode.text;
            }
        } else {
            //console.log("新节点没有text属性");
            //如果新节点没有文本那么肯定有子节点（children），那么判断老节点是否有子节点（children）这部分是最复杂的
            if (oldVnode.children && oldVnode.children.length) {
                updataChildren(oldVnode.elm,oldVnode.children,newVnode.children)
            } else {
                //老节点没有子节点（children），那么清空老节点中的文本，并把新节点中的子节点（children）插入到DOM中
                //为什么要先清空在插入，是因为appendChild不会替换之前已经存在的文本，而是追加元素上树
                oldVnode.elm.innerHTML = "";
                for (let i = 0; i < newVnode.children.length; i++) {
                    const ch = newVnode.children[i];
                    let dom = createElement(ch)
                    oldVnode.elm.appendChild(dom)
                }
            }
        }
    }
}
