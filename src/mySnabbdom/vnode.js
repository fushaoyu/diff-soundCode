//函数的功能非常简单，就是把传入的字段拼成一个对象返回出去
export default function (sel, data, children, text, elm) {
    const key = data.key;
    return {
        sel,
        data,
        children,
        text,
        elm,
        key
    }
}