import vnode from "./vnode";

//调用的时候一定是下面三种形态之一：
// h('div',{},'文字')  1
// h('div',{},[])  2
// h('div',{},h()) 3
export default function (sel, data, c) {
    //检查参数的个数
    if (arguments.length !== 3) throw new Error("对不起，h函数必须传入三个参数，我们是低配版的h函数");
    //检查C的类型
    if (typeof c == "string" || typeof c == "number") {
        //说明传入的是第一种形态的参数
        return vnode(sel, data, undefined, c, undefined)
    } else if (Array.isArray(c)) {
        //说明传入的是第二种形态的参数
        const children = [];
        //遍历C
        for (let i = 0; i < c.length; i++) {
            const element = c[i];
            if (!(typeof element === "object" && "sel" in element))
                throw new Error("传入的第三个参数,数组中有项不是h函数");
            children.push(element)
        }
        //循环结束说明children收集完毕了，此时就可以返回虚拟节点了，它有children属性的
        return vnode(sel, data, children, undefined, undefined)
    } else if (typeof c === "object" && "sel" in c) {
        //hasOwnproperty方法或者"sel" in c 方式用来判断对象上是否有输入的属性，返回值是布尔值
        //说明现在传入的是第三种形态参数
        //所以传入的C是唯一的children
        const children = [c];
        return vnode(sel, data, children, undefined, undefined)
    } else {
        throw new Error("传入的第三个参数类型不正确");
    }
}