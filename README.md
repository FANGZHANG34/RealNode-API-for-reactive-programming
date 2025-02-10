# RealNode-API-for-reactive-programming

为响应式编程提供了若干实用的ES6类，基类为`RealNode`。

- `RealNode`的子类`RealElement`可用于任何对象以及网页元素，并提供了用于创建样式的静态方法。

- `RealElement`的子类`RealCanvas`、`RealLoader`、`RealDivList`、`RealImgList`、`RealDivQueue`、`RealSelect`、`RealComtag`分别可以用于快速创建异步画布元素、上传/下载元素、块列表、图列表、可变排序列表、选择项、组合元素。

| 子类 \ 父类 | `RealElement` |
| :---: | :---: |
| `RealCanvas` | 异步画布 |
| `RealLoader` | 上传/下载块 |
| `RealDivList` | 块列表 |
| `RealSelect` | 选择项 |
| `RealComtag` | 组合元素 |

| 子类 \ 父类 | `RealDivList` |
| :---: | :---: |
| `RealImgList` | 图列表 |
| `RealDivQueue` | 可变排序列表 |

- 特殊类`RealGroup`不继承`RealNode`，但可以作为多个`RealNode`的映射群，起到路由的作用。

- 特殊类`RealWorld`不继承`RealNode`，是事件循环类。

- 函数`createRealDivSelect`、`createRealDivSearch`、`RealPromise`分别用于创建选择块列表（特殊块列表）、检索块列表（特殊块列表）、唯一公共承诺。

- 对象`RealStory`用于预设模拟栈行为脚本。

敬请期待后续更新。
