import patchVnode from "./patchVnode"
import createElement from "./createElement"
/**
 *
 *
 * @export
 * @param {父节点} parentElm
 * @param {老的子元素} oldCh
 * @param {新的子元素} newCh
 */
export default function updataChildren(parentElm, oldCh, newCh) {
    //四种命中指针
    let newStarIdx = 0; //新前
    let newEndIdx = newCh.length - 1; //新后
    let oldStarIdx = 0; //旧前
    let oldEndIdx = oldCh.length - 1; //旧后

    let newStarVnode = newCh[0]; //新前节点
    let newEndVnode = newCh[newEndIdx]; //新后节点
    let oldStarVnode = oldCh[0]; //旧前节点
    let oldEndVnode = oldCh[oldEndIdx]; //旧后节点

    let keyMap = null;

    //开始大while了
    while (newStarIdx <= newEndIdx && oldStarIdx <= oldEndIdx) {
        console.log('★');
        //首先不是判断四种指针是否命中，而是要略过已经家undefined标记的东西
        if (oldStarVnode == null || oldCh[oldStarIdx] == undefined) {
            oldStarVnode = oldCh[++oldStarIdx];
        } else if (oldEndVnode == null || oldCh[oldEndIdx] == undefined) {
            oldEndVnode = oldCh[--oldEndIdx];
        } else if (newStarVnode == null || newCh[newStarIdx] == undefined) {
            newStarVnode = newCh[++newStarIdx];
        } else if (newEndVnode == null || newCh[newEndIdx] == undefined) {
            newEndVnode = newCh[++newEndIdx];
        } else if (checkSameVnode(newStarVnode, oldStarVnode)) {
            //新前和旧前
            console.log('新前和旧前');
            patchVnode(oldStarVnode, newStarVnode)
            //前指针向后走
            newStarVnode = newCh[++newStarIdx]
            oldStarVnode = oldCh[++oldStarIdx]

        } else if (checkSameVnode(newEndVnode, oldEndVnode)) {
            //新后和旧后
            console.log('新后和旧后');
            patchVnode(oldEndVnode, newEndVnode)
            //后指针向前走
            newEndVnode = newCh[--newEndIdx]
            oldEndVnode = oldCh[--oldEndIdx]

        } else if (checkSameVnode(newEndVnode, oldStarVnode)) {
            //新后和旧前
            console.log('新后和旧前');
            patchVnode(oldStarVnode, newEndVnode)
            //当新后和旧前命中的时候，此时要移动节点。移动新前指向的这个节点到老节点的旧后的后面
            //如何移动节点？ 只要你插入一个已经在DOM树上的节点，它就会被移动
            parentElm.insertBefore(oldStarVnode.elm, oldEndVnode.elm.nextSibling) //insertBefore方法参数是把第一个参数DOM插入到第二个参数DOM的前面
            newEndVnode = newCh[--newEndIdx] //新的后指针向前
            oldStarVnode = oldCh[++oldStarIdx] //旧的前指针向后
        } else if (checkSameVnode(newStarVnode, oldEndVnode)) {
            //新前和旧后
            console.log('新前和旧后');
            patchVnode(oldEndVnode, newStarVnode)
            //当新前和旧后命中的时候，此时要移动节点。移动新前指向的这个节点到老节点的旧前的前面
            //如何移动节点？ 只要你插入一个已经在DOM树上的节点，它就会被移动
            parentElm.insertBefore(oldEndVnode.elm, oldStarVnode.elm) //insertBefore方法参数是把第一个参数DOM插入到第二个参数DOM的前面
            newStarVnode = newCh[++newStarIdx] //新的前指针向后
            oldEndVnode = oldCh[--oldEndIdx] //旧的后指针向前
        } else {
            //四种命中都没有命中，都没有找到的情况
            
            //寻找key的map
            if (!keyMap) {
                keyMap = {}
                //创建keyMap映射对象，这样就不用每次都遍历老对象了
                for (let i = oldStarIdx; i <= oldEndIdx; i++) {
                    const key = oldCh[i].key;
                    if (key !== undefined) {
                        keyMap[key] = i;
                    }
                }
            }

            //寻找当前这项（newStartIdx）这项在keyMap中的映射的位置序号
            const idxInOld = keyMap[newStarVnode.key];
            
            if (idxInOld == undefined) {
                //判断，如果idxInOld是undefined表示他是全新的项
                //现在被加入的项（就是被newStartVnode这项）现在还不是真正的DOM节点
                parentElm.insertBefore(createElement(newStarVnode), oldStarVnode.elm)

            } else {
                //如果不是undefined，就表示不是全新的项，而是需要移动
                const elmToMove = oldCh[idxInOld];
                patchVnode(elmToMove, newStarVnode);
                //把这项设置为undefined，表示我已经处理完了
                oldCh[idxInOld] = undefined;
                //移动，调用insertBefore也可以实现移动
                parentElm.insertBefore(elmToMove.elm, oldStarVnode.elm)
            }
            //指针下移，之移动新的头
            newStarVnode = newCh[++newStarIdx]
        }
    }
    //继续看看有没有剩余的，循环结束了start还是比End小，老节点走完了新节点还有没走完的，那么剩下start和end中间的节点就是需要增加的节点
    if (newStarIdx <= newEndIdx) {
        console.log(newCh, newStarIdx, newEndIdx, oldCh[oldEndIdx + 1], parentElm);
        const before = oldCh[oldEndIdx + 1] == null ? null : oldCh[oldEndIdx + 1].elm;
        console.log(before);
        for (let i = newStarIdx; i <= newEndIdx; i++) {
            const element = newCh[i];
            parentElm.insertBefore(createElement(element), before)
        }
    } else if (oldStarIdx <= oldEndIdx) {
        //批量删除oldStart和oldEnd指针之前的项,新节点走完了老节点还有剩余，start和end之间是老节点需要删除的
        for (let i = oldStarIdx; i <= oldEndIdx; i++) {
            const element = oldCh[i];
            if (element) {
                console.log(element);
                parentElm.removeChild(element.elm)
            }
        }
    }
}

//判断是否是同一个虚拟节点
function checkSameVnode(a, b) {
    return a.key === b.key && a.sel === b.sel
}