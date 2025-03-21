# RealNode-API-for-reactive-programming

为响应式编程提供了若干实用的ES10类，基类为`RealNode`和`RealWorld`。

由于大多数的类有着极其复杂的属性和方法，此处先进行相关说明：

## 属性分级

类/实例的属性在使用频率和是否只读的方面被分为6级：

1. 常用只读属性

2. 常用可写属性

3. 谨慎只读属性

4. 谨慎可写属性

5. 隐藏只读属性

5. 隐藏可写属性

级别越高，稳定性越差，越不建议使用！

未提及的属性一般被认为是5-6级属性。级别为奇数的只读，偶数的可写。

## 方法分级

类/实例的方法在使用频率的方面被分为三级：

- 一 常用方法

- 二 谨慎方法

- 三 隐藏方法

级别越高，稳定性越差，越不建议使用！

未提及的方法一般被认为是三级方法。

尽可能不要使用三级方法，因为这些方法针对性（功能性）极强，不适合也没必要在日常中使用。

# 各种类/对象/函数的使用指南

- 事件循环类[**`RealWorld`**](#RealWorld类)

- 响应式类[**`RealNode`**](#RealNode类)

- 对象响应式类[**`RealGroup`**](#RealGroup类)

- 对象属性响应式类[**`RealTarget`**](#RealTarget类)

- 元素属性响应式类[**`RealElement`**](#RealElement类)

- 自动流程对象[**`RealStory`**](#RealStory对象)

- 异步流程对象[**`RealPromise`**](#RealPromise对象)

- 异步画布元素类[**`RealCanvas`**](#RealCanvas类)

- 文件交互元素类[**`RealLoader`**](#RealLoader类)

- select元素拓展类[**`RealSelect`**](#RealSelect类)

- 组合元素类[**`RealComtag`**](#RealComtag类)

- 块元素列表类[**`RealDivList`**](#RealDivList类)

- 图片元素列表类[**`RealImgList`**](#RealImgList类)

- 块元素排列类[**`RealDivQueue`**](#RealDivQueue类)

- 函数：创建块元素选择类[**`createRealDivSelect()`**](#createrealdivsearch函数)

- 函数：创建块元素搜索类[**`createRealDivSearch()`**](#createRealDivSearch函数)

## **RealWorld类**

这是一个事件循环类，基于`setInterval()`函数实现。对该类的一个实例而言，每过一段固定时间将会调用二级实例方法`_mainFn()`。

### **构造函数** `new RealWorld(timeSep, ...fnList)`

`timeSep`（可选）应为一个数值，否则默认为10，单位为毫秒。

`...fnList`（可选）应为`Function`类型，但不建议使用。

### **1级属性**

- `timeSep` 实例属性，`Number`类型。

### **2级属性**

- `paused` 实例属性。

	若为真值，则会暂停该实例的运行，否则恢复该实例的运行。

- `intervalFn` 实例属性，应为`Function`类型。

	会在二级实例方法`_mainFn()`被调用时执行，若报错，则会被清除。

- `ifFn` 实例属性，应为`Function`类型。

	会在二级实例方法`_mainFn()`被调用时执行，若报错，则会被清除。若执行的返回值是真值，则会被清除并尝试执行2级实例属性`soFn`。

- `soFn` 实例属性，应为`Function`类型。

	会在二级实例方法`_mainFn()`被调用且2级实例属性`ifFn`被执行并返回真值时执行，执行后会被立即清除。

### **3级属性**

- `fnList` 实例属性，`Array`类型。

	会在二级实例方法`_mainFn()`调用时执行`fnList.pop()`并执行其返回值。

### **4级属性**

- `onload` 静态属性，应为`Promise`类型。

	浏览器环境下网页文档准备就绪时兑现。

### **一级方法**

- `destroy()` 实例方法，返回`undefined`。

	永久停止实例的运行，原理是使用`clearInterval()`函数。

- `setTimeSep()` 实例方法，返回`Boolean`类型。

	接收一个参数作为新的时间间隔，更改成功则返回`true`，否则反之。

- `then()` 实例方法，返回实例本身。

	接收一个参数`fn`，若`fn`是为`Function`类型，则插入到3级实例属性`fnList`的第一位。

- `onceIf()` 静态方法，返回`Promise`类型。

	接收一个参数`ifFn`，必须为`Function`类型。当`ifFn`被执行并返回真值时，`onceIf()`方法返回的承诺将会被兑现。

### **二级方法**

- `_mainFn()` 实例方法，返回`undefined`。

	每过一段固定时间将会被调用。

## **RealNode类**

这是一个响应式类，基于`Promise`类的微任务队列实现。对该类的一个实例而言，可以存储一个值，并在变更存储的值时会产生响应。

### **构造函数** `new RealNode(config, tryRealNode, ...relativeRNs)`

`config`（可选）应为一个对象，根据`config`的属性决定某些行为。

- `get`（可选）

	对2级实例属性`get`进行赋值。

- `set`（可选）

	对2级实例属性`set`进行赋值。

- `react`（可选）

	对2级实例属性`react`进行赋值。

- `id`（可选）

	初始化1级实例属性`id`时作为`description`。

- `info`（可选）

	对4级实例属性`info`进行赋值。

- `value`（可选）

	对2级实例属性`value`进行赋值。

`tryRealNode`（可选）

不建议使用。若为真值，当变更存储的值时将会尝试对新值中嵌套的`RealNode`实例进行解析。

`...relativeRNs`（可选）

应为`RealNode`类型或`Symbol`类型，但不建议使用。将会调用一级实例方法`relate()`，参数为`...relativeRNs`。

### **1级属性**

- `id` 实例属性，`Symbol`类型。

	当实例的引用不小心丢失时，可以通过一级静态方法`search()`尝试找回。

### **2级属性**

- `get` 实例属性，应为`Function`类型，且能够返回一个值。

- `set` 实例属性。

	读取值为二级实例方法`realSet()`，写入值应为`Function`类型，应接收2级实例属性`get`的执行返回值并返回`Boolean`类型。所赋的值将在变更存储的值时被执行。

- `react` 实例属性，应为`Function`类型。

- `value` 实例属性。

	读取值为2级实例属性`get`的执行返回值，写入时将执行2级实例属性`set`，若返回真值，则会执行2级实例属性`react`和调用一级实例方法`notify()`。

- `display` 实例属性。

	读取值为`Boolean`类型，默认是`true`。若写入真值，将能够接收到其他实例的广播通知，否则反之且无法被一级静态方法`search()`查询。

### **4级属性**

- `eventLoop` 静态属性，必须是`RealWorld`实例。

### **6级属性**

- `relativeRNs` 实例属性，必须是`Array`实例，且每个元素都必须为`Symbol`类型，即`RealNode`实例的1级实例属性`id`。

### **一级方法**

- `notify()` 实例方法，返回`undefined`。

	将根据6级实例属性`relativeRNs`查询`RealNode`实例并依次生成微任务，将依次执行2级实例属性`react`和调用一级实例方法`notify()`。

- `relate()` 实例方法，返回`RealNode`实例或`undefined`。

	接收若干`RealNode`实例或`Symbol`类型作为参数，并尝试返回最后一个`RealNode`实例。

- `unrelate()` 实例方法，返回`Boolean`类型。

	接收若干`RealNode`实例或`Symbol`类型作为参数。

- `search()` 静态方法，返回`RealNode`实例或`undefined`。接收一个参数`id`，应为`Symbol`类型。

- `justNow()` 静态方法，返回`Promise`类型。

	接收一个参数`fn`，应为`Function`类型，在生成的一个微任务中执行后兑现返回值。

- `afterNow()` 静态方法，返回`Promise`类型。

	接收一个参数`fn`，应为`Function`类型，在生成的一个宏任务中执行后兑现返回值。

### **二级方法**

- `realSet()` 实例方法，返回`Boolean`类型。

	执行时接收四个参数`value`、`react`、`notify`、`noSelf`，将根据6级实例属性`relativeRNs`查询`RealNode`实例并依次生成微任务，将依次执行2级实例属性`react`和调用一级实例方法`notify()`。

- `time()` 静态方法，返回`Promise`类型。

	接收一个参数`promise`，若为`Function`类型则执行，若为`Promise`类型则等待兑现，最终返回值将兑现`{time: Number, value: any | Error}`。

## **RealGroup类**

> 继承[**`RealNode`**](#RealNode类)类

这是针对对象的响应式类，是`RealNode`类的子类。对该类的一个实例而言，可以代理一个对象，并在代理变更对象的键值对时会产生响应。

### **构造函数** `new RealGroup({id, info, self})`

`self`（可选）默认是一个`null`为原型的空对象。必须是一个对象，否则会报错！（注意：根据相同对象创建的`RealGroup`实例是同一个实例！）

`id`（可选）初始化1级实例属性`id`时作为`description`。

`info`（可选）对4级实例属性`info`进行赋值。

### **1级属性**

- `proxy` 实例属性，`Proxy`类型。

	对该属性的读写操作将完全转移到构造实例时的参数`self`对象上。

- `get` 实例属性，返回三级实例方法`protoGet()`。

	执行时：若没有参数，则返回构造实例时的参数`self`对象的浅拷贝；接收一个参数`keyOrkeyObj`，若是一个对象，则返回一个`null`为原型的相同结构的对象，否则返回对应键的值。

- `set` 实例属性，返回三级实例方法`realSet()`。

	执行时接收一个参数`value`，`value`必须是对象，不能读取其原型链上的属性。

- `react` 实例属性，返回三级实例方法`protoReact()`。

### **3级属性**

- `listenerMap` 实例属性，`Map`类型。

	键为`String`类型或`Function`类型，值为`Array`类型，所有元素为`Function`类型。

### **一级方法**

- `keys()` 实例方法，返回`Array`实例，每个元素为`String`类型或`Symbol`类型。

	接收一个参数`all`，若为真值，则返回值包括`Symbol`类型和不可枚举的键。

- `addSetterListener()` 实例方法，返回`undefined`。

	接收两个参数`ifKeyOrFn`和`listener`，`ifKeyOrFn`必须为`String`类型或返回`Boolean`类型的`Function`类型，`listener`必须为`Function`类型。

- `getByFilter()` 实例方法，返回一个`null`为原型的含对应键值对的对象。

	接收一个参数`filterFn`，必须为`Function`类型，根据筛选出的键返回一个`null`为原型的含对应键值对的对象。

### **三级方法**

- `proxy()` 实例方法，返回构造实例时的参数`self`对象。

	此方法仅在找回原对象引用时使用。

## **RealTarget类**

> 继承[**`RealNode`**](#RealNode类)类

这是一个键值单向绑定的响应式类，用于尽可能减少对某个对象的单个属性的赋值操作以提高性能。对该类的一个实例而言，可以存储一个值、绑定一个属性名和一个固定对象，当变更存储的值之后，会执行2级实例属性`transform`（`Function`类型）将存储的值经过函数变换后赋值给绑定的对象的相应属性并产生响应。

从语义上说，`RealTarget`类主要针对对象，`RealElement`类主要针对`HTML`元素。然而实际上，两者在实例属性和实例方法上没有任何区别，仅在静态属性和静态方法上有明显差异。

在实际开发中，`RealTarget`类常用于非浏览器环境中。

### **构造函数** `new RealTarget({self, key, transform, initValue}, config, tryRealNode, ...relativeRNs)`

`{self, key, transform, initValue}`必须提供一个对象用于解构参数。这个对象的属性必须满足以下要求。

- `self`

	必须是需要绑定的对象，否则直接报错。

- `key`

	应是需要绑定的属性名。

- `transform`（可选）

	应为`Function`类型。用于初始化2级实例属性`transform`。

- `initValue`（可选）

	用于赋值初始化2级实例属性`value`。如果参数`tryRealNode`是真值，则会产生相应（即视作进行了一次存储值变更）。

`config`（可选）应为一个对象，根据`config`的属性决定某些行为。

- `get`（可选）

	对2级实例属性`get`进行赋值。

- `set`（可选）

	对2级实例属性`set`进行赋值。

- `react`（可选）

	对2级实例属性`react`进行赋值。

- `id`（可选）

	初始化1级实例属性`id`时作为`description`。

- `info`（可选）

	对4级实例属性`info`进行赋值。

- `value`（可选）

	对2级实例属性`value`进行赋值。

`tryRealNode`（可选）

不建议使用。若为真值，当变更存储的值时将会尝试对新值中嵌套的`RealNode`实例进行解析。

`...relativeRNs`（可选）

应为`RealNode`类型或`Symbol`类型，但不建议使用。将会调用一级实例方法`relate()`，参数为`...relativeRNs`。

### **1级属性**

- `isElement` 实例属性，`Boolean`类型。

	判断2级实例属性`self`是否为`HTML`元素。

### **2级属性**

- `self` 实例属性，对象类型。

	当对其进行赋值时，如果赋的值不是对象，会直接报错。

- `key` 实例属性，任何类型。

	建议只赋值为`String`类型，`Number`类型或`Symbol`类型。

- `transform` 实例属性，`Function`类型。

	应接收一个参数并返回一个值。

### **一级方法**

- `fix()` 实例方法，返回实例自身。

	调用该方法时，会接收存储的值以执行2级实例属性`transform`（`Function`类型）进行函数变换并将返回值赋值到绑定对象的对应属性上，是一个同步过程。

- `clearClassName()` 实例方法，返回`Boolean`类型。

	如果绑定的对象是一个`HTML`元素，则会清空其类名并返回`true`，否则反之。

- `addClassName()` 实例方法，返回`Boolean`类型。

	如果绑定的对象是一个`HTML`元素，则会执行该`HTML`元素的`classList`的`add()`方法且接收所有参数并返回`true`，否则反之。

- `toggleClassName()` 实例方法，返回`Boolean`类型。

	应接收一个参数`className`，`className`应为`String`类型。如果绑定的对象是一个`HTML`元素，则会执行该`HTML`元素的`classList`的`toggle()`方法且接收参数`className`，执行之后其返回值将被返回（`Boolean`类型），否则返回`false`。

- `removeClassName()` 实例方法，返回`Boolean`类型。

	如果绑定的对象是一个`HTML`元素，则会执行该`HTML`元素的`classList`的`remove()`方法且接收所有参数并返回`true`，否则反之。

- `getIndexWithin()` 实例方法，返回`Number`类型。

	返回值是绑定的`HTML`元素在其父元素中的`HTML`元素排列索引。原理是通过绑定的对象的`previousElementSibling`属性的真假值判断，所以正常情况下，即使绑定的对象不是`HTML`元素也不会报错。

- `removeClassName()` 实例方法，返回`Boolean`类型。

	如果绑定的对象是一个`HTML`元素，则会执行该`HTML`元素的`classList`的`remove()`方法且接收所有参数并返回`true`，否则反之。

- `applyCSS()` 实例方法，返回`Boolean`类型。

	如果绑定的对象不是`HTML`元素，则会直接报错。

	接收两个参数`selfSelector`、`classNameOrRuleObjObj`，其中`selfSelector`必须为`String`类型，`classNameOrRuleObjObj`应为一个类名（`String`类型）或一个对象。

	`selfSelector`和`classNameOrRuleObjObj`（对象类型）的属性名都会被视作CSS选择器，按照一定规律进行【绑定的`HTML`元素的`id`属性 + 参数`selfSelector` + 参数`classNameOrRuleObjObj`的属性名】的字符串拼接，如果绑定的`HTML`元素没有`id`属性，则会自动进行随机`id`属性注册。`classNameOrRuleObjObj`（对象类型）的每一个属性都必须是符合CSS标准的字符串键值对对象。如果`classNameOrRuleObjObj`为`String`类型，则会对当前注册过的类名进行检索并自动获取所需对象。

	底层原理是`CSSStyleSheet.insertRule()`方法。

- `clone()` 实例方法，返回`RealTarget`类型。

	接收三个参数`keepValue`（可选）、`fix`（可选）、`deepCopyRelativeRNs`（可选），其中所有参数应为`Boolean`类型。

	返回的`RealTarget`对象拥有相同的绑定对象、绑定属性名和相同引用的6级实例属性`relativeRNs`，参数`keepValue`决定是否拥有相同的存储值，参数`fix`决定在返回时是否调用一级实例方法`fix()`，参数`deepCopyRelativeRNs`决定是否对6级实例属性`relativeRNs`进行深复制。

- `searchByObj()` 静态方法，返回包含`RealTarget`对象的`Array`对象。

	接收一个参数`element`，应为对象，搜索并返回所有绑定对象为参数`element`的`RealTarget`对象组成的`Array`对象。

## **RealElement类**

> 继承[**`RealTarget`**](#RealTarget类)类 继承[**`RealNode`**](#RealNode类)类

这是一个键值单向绑定的响应式类，用于尽可能减少对某个`HTML`元素的单个属性的赋值操作以提高性能。

从语义上说，`RealTarget`类主要针对对象，`RealElement`类主要针对`HTML`元素。然而实际上，两者在实例属性和实例方法上没有任何区别，仅在静态属性和静态方法上有明显差异。

在实际开发中，`RealElement`类常用于浏览器环境中。

### **构造函数** `new RealElement({self, key, transform, initValue}, config, tryRealNode, ...relativeRNs)`

> 详见[**`RealTarget`**](#构造函数-new-realtargetself-key-transform-initvalue-config-tryrealnode-relativerns)构造函数

### **4级属性**

- `keyboardController` 静态属性，应是包含`previous`、`next`、`enter`、`back`等4个属性的对象。

	其用途详见二级静态方法`applyKeyboardController()`。

### **一级方法**

- `createImg()` 静态方法，返回`RealElement`类型。

	等价于执行并返回`new RealElement({self: document.createElement('img'), key: 'src'})`。

- `createVideo()` 静态方法，返回`RealElement`类型。

	等价于执行并返回`new RealElement({self: document.createElement('video'), key: 'src'})`。

- `createAudio()` 静态方法，返回`RealElement`类型。

	等价于执行并返回`new RealElement({self: document.createElement('audio'), key: 'src'})`。

- `createDiv()` 静态方法，返回`RealElement`类型。

	接收两个参数`id`和`initValue`。等价于执行并返回` new RealElement({self: document.createElement('div'), key: 'textContent', initValue}, {id})`。

- `createTextarea()` 静态方法，返回`RealElement`类型。

	等价于执行并返回`new RealElement({self: document.createElement('img'), key: 'src'})`。

- `makeElement()` 静态方法

	

- `getDomByString()` 静态方法

	

- `addCSSRules()` 静态方法

	

- `defaultInit()` 静态方法

	

### **二级方法**

- `applyKeyboardController()` 静态方法

	

- `cancelKeyboardController()` 静态方法

	

- `addEventListenerBySelectors()` 静态方法

	

## **RealStory对象**

这是

### **1级属性**

- `index` 属性

	

- `StoryPromise` 属性

	

### **2级属性**

- `info` 属性

	

### **6级属性**

- `ofStory` 属性

	

- `pages` 属性

	

- `fnList` 属性

	

### **一级方法**

- `newPage()` 方法

	

- `newPrivatePage()` 方法

	

- `then()` 方法

	

- `getNextPage()` 方法

	

- `getPreviousPage()` 方法

	

- `newPromiseObj()` 方法

	

- `launch()` 方法

	

## **RealPromise对象**

这是

### **1级属性**

- `length` 属性

	

### **2级属性**

- `list` 属性

	

- `self` 属性

	

### **一级方法**

- `newOne()` 方法

	

- `catch()` 方法

	

- `finally()` 方法

	

- `then()` 方法

	

- `tryHandler()` 方法

	

- `require()` 方法

	

### **二级方法**

- `_push()` 方法

	

# 以下类和函数仅在浏览器环境中有效！！！

# **以下类和函数仅在浏览器环境中有效！！！**

# ***以下类和函数仅在浏览器环境中有效！！！***

## **RealCanvas类**

> 继承[**`RealElement`**](#RealElement类)类 继承[**`RealTarget`**](#RealTarget类)类 继承[**`RealNode`**](#RealNode类)类

这是

### **构造函数** `new RealCanvas(id, width, height, tryRealNode, ...relativeRNs)`

### **1级属性**

- `ctx` 实例属性

	

- `img` 实例属性

	

- `imgW` 实例属性

	

- `imgH` 实例属性

	

### **2级属性**

- `width` 实例属性

	

- `height` 实例属性

	

- `self` 实例属性

	

- `clearBeforeDraw` 实例属性

	

- `temp` 实例属性

	

- `opacity` 实例属性

	

- `noCache` 静态属性

	

### **4级属性**

- `loaded` 实例属性

	

### **一级方法**

- `clearAsync()` 实例方法

	

- `testSrc()` 实例方法

	

- `clear()` 实例方法

	

- `resizeBySrc()` 实例方法

	

- `strN()` 静态方法

	

- `toBlob()` 实例方法

	

- `getImageBySrc()` 静态方法

	

### **二级方法**

- `multiDrawSrcArray()` 实例方法

	

- `clearShape()` 实例方法

	

- `animate()` 实例方法

	

### **三级方法**

- `applyMouseClear()` 实例方法

	

## **RealLoader类**

> 继承[**`RealElement`**](#RealElement类)类 继承[**`RealTarget`**](#RealTarget类)类 继承[**`RealNode`**](#RealNode类)类

这是

### **构造函数** `new RealLoader(isDownload, fileName, dataGetter, {innerHTML, onerror, onloadend})`

### **1级属性**

- `type` 实例属性

	

- `files` 实例属性

	

### **2级属性**

- `onerror` 实例属性

	

- `onloadend` 实例属性

	

- `fileName` 实例属性

	

- `dataGetter` 实例属性

	

### **6级属性**

- `fs` 静态属性

	

### **一级方法**

- `load()` 实例方法

	

- `getArrayBufferFrom()` 静态方法

	

- `load()` 静态方法

	

## **RealSelect类**

> 继承[**`RealElement`**](#RealElement类)类 继承[**`RealTarget`**](#RealTarget类)类 继承[**`RealNode`**](#RealNode类)类

这是

### **构造函数** `new RealSelect(id, multiple, optionConfig, tryRealNode, defaultKey, defaultValue, onchange)`

### **1级属性**

- `list` 实例属性

	

### **2级属性**

- `defaultKey` 实例属性

	

- `defaultValue` 实例属性

	

### **一级方法**

- `getValueIndexs()` 实例方法

	

## **RealComtag类**

> 继承[**`RealElement`**](#RealElement类)类 继承[**`RealTarget`**](#RealTarget类)类 继承[**`RealNode`**](#RealNode类)类

这是

### **构造函数** `new RealComtag(id, tryHTML, optionList, tryRealNode, selfAssign)`

### **4级属性**

- `comtagClassMap` 静态属性

	

### **二级方法**

- `defineComtagClass()` 静态方法

	

- `createByClassName()` 静态方法

	

## **RealDivList类**

> 继承[**`RealElement`**](#RealElement类)类 继承[**`RealTarget`**](#RealTarget类)类 继承[**`RealNode`**](#RealNode类)类

这是

### **构造函数** 

### **1级属性**

- `childrenList` 实例属性

	

### **4级属性**

- `divListClassMap` 静态属性

	

### **一级方法**

- `getRealEmentList()` 实例方法

	

- `createList()` 静态方法

	

### **二级方法**

- `getIdDict()` 实例方法

	

- `defineDivListClass()` 静态方法

	

- `createByClassName()` 静态方法

	

## **RealImgList类**

> 继承[**`RealDivList`**](#RealDivList类)类 继承[**`RealElement`**](#RealElement类)类 继承[**`RealTarget`**](#RealTarget类)类 继承[**`RealNode`**](#RealNode类)类

这是

### **构造函数** 

### **一级方法**

- `cloneImgList()` 实例方法

	

## **RealDivQueue类**

> 继承[**`RealDivList`**](#RealDivList类)类 继承[**`RealElement`**](#RealElement类)类 继承[**`RealTarget`**](#RealTarget类)类 继承[**`RealNode`**](#RealNode类)类

这是

### **构造函数** 

### **1级属性**

- `queueArray` 实例属性

	

### **一级方法**

- `getListQueue()` 实例方法

	

### **三级方法**

- `applyQueue()` 实例方法

	

## **createRealDivSelect()函数**

这是

``

## **createRealDivSearch()函数**

这是

``

敬请期待后续更新

<!-- 

## **`$`**

> 继承[**`$`**](#$)

这是$。对该类的一个实例而言，会产生响应。

### **构造函数** 

### **1级属性**

- `` 



### **一级方法**

- `` 

	

 -->

<style>
	*{
		line-height: 1.5;
		text-align: justify;
		align-items: center;
		align-content: center;
		vertical-align: baseline;
		overflow-wrap: break-word;
	}
	h1{
		justify-content: center;
	}
	h2{
		color: #339;
		left: 10%;
		/* transform: translateX(-0.4); */
		position: relative;
	}
	code{
		color: #933;
		font-weight: bolder;
	}
</style>
