import h from "./mySnabbdom/h"
import patch from "./mySnabbdom/patch"

const container = document.getElementById("container")
const btn = document.getElementById("btn")

const mySnabbdom = h('div', {
    key: "div"
}, [
    h('p', {
        key: "A"
    }, "A"),
    h('p', {
        key: "B"
    }, "B"),
    h('p', {
        key: "C"
    }, "C"),
    h('p', {
        key: "D"
    }, "D"),
])

const mySnabbdom4 = h('div', {
    key: "div"
}, [
    h('p', {
        key: "BBQ"
    }, "BBQ"),
    h('p', {
        key: "C"
    }, "C"),
    
    h('p', {
        key: "A"
    }, "A"),
    h('p', {
        key: "D"
    }, "D"),

    h('p', {
        key: "B"
    }, "B"),

])

const mySnabbdom1 = h('div', {
    key: "div"
}, [
    h('p', {
        key: "A",
    }, "A"),
    h('p', {
        key: "B"
    }, "B"),
    h('p', {
        key: "D"
    }, "D"),
    h('p', {
        key: "C"
    }, "C"),
    h('p', {
        key: "j"
    }, "j"),
    h('p', {
        key: "q"
    }, "q"),
])


patch(container, mySnabbdom)

btn.onclick = function () {
    patch(mySnabbdom, mySnabbdom4)
}