import { init } from 'snabbdom/init'
import { classModule } from 'snabbdom/modules/class'
import { propsModule } from 'snabbdom/modules/props'
import { styleModule } from 'snabbdom/modules/style'
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'
import h from "./mySnabbdom/h"

var patch = init([
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
])

const dom1 = h('div', {}, [
    h('li', {}, '1'),
    h('li', {}, '3'),
    h('li', {}, '2'),
    h('li', {}, '4'),
    h('p', {}, h('i', {}, "qweqwe")),
])

const dom2 = h('div', {}, h("ul",{},[
    h('li', {}, '1'),
    h('li', {}, '3'),
    h('li', {}, '2'),
    h('li', {}, '4'),
]))


const container = document.getElementById("container")

const btn = document.getElementById("btn")

patch(container,dom1)

btn.onclick = function() {
    patch(dom1,dom2)
}
