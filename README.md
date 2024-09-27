# RealNode-API-for-reactive-programming
为响应式编程提供了若干实用的ES6类，基类为`RealNode`。

- `RealNode`的子类`RealElement`可用于任何对象以及网页元素，并提供了用于创建样式的静态方法。

- `RealElement`的子类`RealDivList`、`RealImgList`、`RealSelect`分别可以用于快速创建块列表、图列表、选择项。

- 特殊类`RealGroup`不继承`RealNode`，但可以作为多个`RealNode`的映射群，起到路由的作用。

在代码的末尾有使用演示，但在演示完后会破坏事件循环以结束该程序的进程，即运行`RealNode.eventLoop.destroy()`方法。

如需重启事件循环，则请运行`RealNode.eventLoop = new RealNode.eventLoop.constructor;`代码。

敬请期待后续更新。
