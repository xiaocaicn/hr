export const imgerror = {
  // 写各种钩子,去影响使用这个指令的那个 dom
  // 各种钩子可以查询文档, 现在用一个 inserted
  // 使用这个指令的元素被插入父节点时自动触发的函数
  inserted(dom, options) {
    // console.log('使用了自定义指令')
    // console.log(dom)
    // 这个钩子可以获取到一些参数其中第一个就是绑定了这个指令的 dom
    // console.log(options.value)
    // 第二个默认可以获取到的形参, 是当前指令使用时的配置对象
    // 监听这个 dom 错误, 每当凹陷错误是, 都修改 src
    console.log('插入图像')
    if (!dom.src) {
      dom.src = options.value
    }
    dom.onerror = function() {
      dom.src = options.value
    }
  },
  // 当该节点的父组件发生变化的时候, inserted 并不会重新触发
  // 需要用另外一个钩子进行处理
  componentUpdated(dom, options) {
    if (!dom.src) {
      dom.src = options.value
    }
  }
}
