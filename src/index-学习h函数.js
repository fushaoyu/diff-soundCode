import {
    init
} from "snabbdom/init";
import {
    classModule
} from "snabbdom/modules/class";
import {
    propsModule
} from "snabbdom/modules/props";
import {
    styleModule
} from "snabbdom/modules/style";
import {
    eventListenersModule
} from "snabbdom/modules/eventlisteners";
import {
    h
} from "snabbdom/h";

//创建出patch函数
var patch = init([classModule, propsModule, styleModule, eventListenersModule])

//创建虚拟节点
var myVnode = h("a", {
    props: {
        href: "http://www.baidu.com",
        target: "_blank"
    },
    class: {
        box: true
    }
}, "百度");


var myVnode1 = h('ul',{},[
    h('li',{class:{box:true}},'1'),
    h('li','2'),
    h('li',{},'3'),
])
//让虚拟节点上述
const container = document.getElementById("container")
console.log(container);

patch(container, myVnode1)