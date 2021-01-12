import vnode from "./vnode";
import createElement from "./createElement"
import patchVnode from "./patchVnode"
/**
 *
 *
 * @export
 * @param {真实DOM} oldVnode
 * @param {虚拟DOM} newVnode
 */
export default function (oldVnode, newVnode) {
    //判断传入的第一个参数是DOM节点还是虚拟节点
    if (oldVnode.sel == "" || oldVnode.sel == undefined) {
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
    }
    //判断oldVnode和newVnode是不是同一个节点
    if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
        console.log('是同一个节点',oldVnode);
        patchVnode(oldVnode, newVnode)
    } else {
        console.log('不是同一个节点，暴力删除，插入新的节点');
        let newVnodeElm = createElement(newVnode)
        //插入到老节点之前
        if (oldVnode.elm && newVnodeElm) {
            oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
        }
        //删除老的节点
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
}