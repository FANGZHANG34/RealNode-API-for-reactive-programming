"use strict";
// ==UserScript==
// @name			real-node
// @namespace		http://tampermonkey.net/
// @version			2024-12-14
// @description		Try to take over the world after watching the end of this script!
// @author			FANGZHANG34
// @match			https://*/*
// @icon			https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant			none
// ==/UserScript==
/**
 * ## 使用以下代码获得类型提示，不用时再注释掉。
 * ### var {
 * ### RealWorld,RealNode,RealGroup,RealTarget,
 * ### RealStory,RealPromise,
 * ### RealElement,RealCanvas,RealLoader,RealSelect,RealComtag,RealDivList,RealImgList,RealDivQueue,
 * ### createRealDivSelect,createRealDivSearch,createRealDivSeries
 * ### } = await import('real-node').then(EXPORTS=>EXPORTS.default);
var {
	RealWorld,RealNode,RealGroup,RealTarget,
	RealStory,RealPromise,
	RealElement,RealCanvas,RealLoader,RealSelect,RealComtag,RealDivList,RealImgList,RealDivQueue,
	createRealDivSelect,createRealDivSearch,createRealDivSeries
} = await import('real-node').then(EXPORTS=>EXPORTS.default);
 * 
 * ## 如果使用ESM规范，请不要注释掉"export default"，否则请注释掉"export default"。
 */
var{
	RealWorld,RealNode,RealGroup,RealTarget,
	RealStory,RealPromise,
	RealElement,RealCanvas,RealLoader,RealSelect,
	RealComtag,RealSVG,
	RealDivList,RealImgList,RealDivQueue,
	createRealDivSelect,createRealDivSearch,createRealDivSeries,
} = (()=>{
	function prevent(v){return v;}
	/**##   */
	/**# 搜索## */
	const
	Element = globalThis.Element ?? prevent,
	performance = globalThis.performance ?? Date,
	emptyArray = [],
	t0 = performance.now(),
	tryFunctionRealNode = false,
	emptyObj = Object.create(null),
	/**## browserMode 是否存在浏览器环境 */
	browserMode = Element !== prevent,
	nonEnumerableConfig = {enumerable: false},
	writableNull = {value: null,writable: true},
	tempConfig = {writable: false,enumerable: false},
	/**### bind @type {typeof console.log} */
	log = ((...argArray)=>console.log(...argArray)),
	/**
	 * 
	 * @type {{
	 * (thisArg: RealNode)=>*;
	 * (thisArg: RealNode,value,react: Boolean,notify: Boolean,noSelf: Boolean)=>Boolean;
	 * }}
	 */
	protoThisArg =
	/**
	 * 
	 * @param {RealNode} thisArg 
	 * @param {[*,Boolean,Boolean,Boolean] | []} argArray 
	 */
	(thisArg,...argArray)=>argArray.length ? thisArg.realSet(...argArray,true,true,true) : thisArg.get(),
	tryYieldKey =
	/**
	 * 
	 * @template T
	 * @param {*[] | IterableIterator} iter 
	 * @param {T} [type] 
	 * @returns {IterableIterator<T>}
	 */
	function*tryYieldKey(iter,key,type){try{for(const target of iter) yield target?.[key] ?? target;}catch(e){console.error(e);}}
	;
	/**## nodeMode 是否存在nodejs环境 */
	var nodeMode = false;
	/**
	 * ## 使用以下代码获得类型提示，不用时再注释掉。
	 * ### var {
	 * ### RealWorld,RealNode,RealGroup,RealTarget,
	 * ### RealStory,RealPromise,
	 * ### RealElement,RealCanvas,RealLoader,RealSelect,RealComtag,RealDivList,RealImgList,RealDivQueue,
	 * ### createRealDivSelect,createRealDivSearch,createRealDivSeries
	 * ### } = await import('real-node').then(EXPORTS=>EXPORTS.default);
	 * @type {{
	 * RealWorld: typeof RealWorld;
	 * RealNode: typeof RealNode;
	 * RealGroup: typeof RealGroup;
	 * RealTarget: typeof RealTarget;
	 * RealStory: typeof RealStory;
	 * RealPromise: typeof RealPromise;
	 * RealElement: typeof RealElement;
	 * RealCanvas: typeof RealCanvas;
	 * RealLoader: typeof RealLoader;
	 * RealSelect: typeof RealSelect;
	 * RealComtag: typeof RealComtag;
	 * RealSVG: typeof RealSVG;
	 * RealDivList: typeof RealDivList;
	 * RealImgList: typeof RealImgList;
	 * RealDivQueue: typeof RealDivQueue;
	 * createRealDivSelect: typeof createRealDivSelect;
	 * createRealDivSearch: typeof createRealDivSearch;
	 * createRealDivSeries: typeof createRealDivSeries;
	 * }} 
	 */
	var
	EXPORTS,
	nodeRequire,
	setInterval = globalThis.setInterval ?? prevent,
	clearInterval = globalThis.clearInterval ?? prevent
	;
	try{nodeRequire = require;EXPORTS = module.exports;nodeMode = true;}
	catch{EXPORTS = {};nodeRequire = path=>new Promise(async r=>{try{
		const exports = await import(String(path));
		r('default' in exports ? exports.default : exports);
	}catch(e){r(e);console.log('\n\r\t'+String(e)+e?.stack);}});}
	const nodeFS = nodeRequire('fs');
	/**# RealWorld 事件循环类 */
	var RealWorld = (()=>{
		var undefined;
		/**@this {{resolve(...value)=>void}} */
		function thisResolve(...value){this.resolve(value);};
		/**
		 * 
		 * @param {Number} timeSep 
		 * @param {...()=>void} fnList 
		 */
		function RealWorld(timeSep,...fnList){
			if(null == this || this === globalThis) return new RealWorld(timeSep,...fnList);
			try{Number.isFinite(this.timeSep = Number(timeSep)) || (this.timeSep = 10);}catch{this.timeSep = 10;}
			this._id = setInterval(/**### bind */()=>this._mainFn(),this.timeSep);
			/**@type {(()=>*)[]} */
			this.fnList = fnList;
			this.info = undefined;
			/**@type {HTMLDivElement} */
			this.self = browserMode ? document.createElement('div') : {};
			this.paused = false;
			/**@type {?()=>*} */
			this.intervalFn = undefined;
			/**@type {?()=>*} */
			this.ifFn = undefined;
			/**@type {?()=>*} */
			this.soFn = undefined;
			Reflect.defineProperty(this,'_id',tempConfig);
			Reflect.defineProperty(this,'fnList',tempConfig);
			Reflect.defineProperty(this,'timeSep',tempConfig);
			return this;
		};
		/**
		 * ## onload 环境准备好时兑现的承诺
		 * @type {Promise<void>}
		 */
		RealWorld.onload =
		browserMode ? new Promise(r=>addEventListener('load',function tempListener(){r();removeEventListener('load',tempListener)})) :
		nodeMode ? Promise.resolve() : new Promise(async r=>{if(setInterval === prevent){
			const {setTimeout,clearTimeout} = globalThis.setTimeout ? globalThis :
			/**@type {{setTimeout: typeof globalThis.setTimeout;clearTimeout: typeof globalThis.clearTimeout;}} */ (await nodeRequire('os'));
			function Interval(handler,timeout,...argArray){
				if(null == this || this === globalThis) return new Interval(handler,timeout,...argArray);
				return this._ = setTimeout(this.transform(handler,timeout,...argArray),timeout,...argArray),this;
			}
			Interval.prototype.transform = function(handler,timeout,...argArray){
				const tempFn = ()=>{this._ = setTimeout(tempFn,timeout,...argArray);handler.apply(null,argArray);};
				return tempFn; 
			},Interval.prototype.clear = function(){clearTimeout(this._);};
			setInterval = Interval,clearInterval = /**@type {(id: Interval)=>void} */ id=>id.clear();
			Reflect.defineProperty(RealNode.eventLoop,'_id',{
				value: setInterval(/**### bind */()=>RealNode.eventLoop._mainFn(),RealNode.eventLoop.timeSep)
			}),r();
		}});
		RealWorld.createInterval =
		/**
		 * 
		 * @param {Number} timeSep 
		 * @param {()=>void} intervalFn 
		 * @returns {RealWorld}
		 */
		function(timeSep,intervalFn){return (timeSep = new RealWorld(timeSep)).intervalFn = intervalFn,timeSep;};
		/**## getPromiseState 异步获取承诺状态 */
		RealWorld.getPromiseState = (()=>{
			const temp = Symbol(),tryFn = v=>+(temp !== v),catchFn = ()=>-1;
			return function getPromiseState(promise){return Promise.race([promise,temp]).then(tryFn,catchFn);};
		})();
		RealWorld.onceIf =
		/**
		 * ## onceIf 生成条件检测承诺 
		 * @method
		 * @param {()=>Boolean} ifFn
		 * @param {Number} [timeSep]
		 */
		async(ifFn,timeSep)=>{
			if(typeof ifFn !== 'function') throw new TypeError('"ifFn" must be Function !');
			const temp = new RealWorld(timeSep);
			await new Promise(soFn=>(temp.ifFn = ifFn,temp.soFn = soFn));
			clearInterval(temp._id);
		};
		RealWorld.cb2promise =
		/**
		 * ## cb2promise 回调转承诺
		 * @template T
		 * @param {{thisArg?: {}; useFn: String | (callback: (err?: Error,...value: T)=>void)=>void; callback: typeof thisResolve;}} param0 
		 * @param {...any} parameters 
		 * @returns {Promise<[?Error,...T]>}
		 */
		function({thisArg,useFn,callback = thisResolve} = emptyObj,...parameters){
			if(typeof useFn !== 'function') useFn = thisArg?.[useFn];
			if(typeof useFn !== 'function') throw new Error('=> Wrong:\n	"thisArg" is not Object\n or\n	"useFn" not in "thisArg" !');
			return new Promise(resolve=>{
				const temp = {callback,resolve};
				try{useFn.call(thisArg,...parameters,(...value)=>temp.callback(...value));}catch(error0){
					try{useFn.call(thisArg,(...value)=>temp.callback(...value),...parameters);}catch(error1){
						temp.resolve([new Error('=> Neither head or tail of parameters is Callback !\n'+(
							String(error0?.stack ?? error0)+'\n'+String(error1?.stack ?? error1)
						))]);
					}
				}
			}).catch(e=>console.error(e.stack));
		};
		/**## destroy 销毁本对象 */
		RealWorld.prototype.destroy = function(){clearInterval(this._id),this._mainFn();};
		/**## then 添加函数入执行队列 */
		RealWorld.prototype.then = function(fn){return typeof fn === 'function' && this.fnList.unshift(fn),this;};
		/**## 生成RealElement实例 */
		RealWorld.prototype.getRealElement = function(){
			return new RealElement({self: this.self,key: 'innerHTML'},{id: this.self.id,initValue: this.self.innerHTML});
		};
		/**## 变更时间间隔 */
		RealWorld.prototype.setTimeSep = function(timeSep){
			return (Number.isFinite(timeSep = Number(timeSep)) ? timeSep : 10) !== this.timeSep && (
				clearInterval(this._id),Reflect.defineProperty(this,'timeSep',{value: timeSep}),
				Reflect.defineProperty(this,'_id',{value: setInterval(/**### bind */()=>this._mainFn(),this.timeSep)})
			);
		};
		RealWorld.prototype._mainFn = function(){
			if(this.paused) return;
			try{this.intervalFn?.();}catch(e){this.intervalFn = null;console.error(e);}
			try{this.info = this.fnList.pop()?.call?.(this,this.info);}catch(e){console.error(e);}
			try{if(this.ifFn?.()) this.ifFn = this.soFn = void this.soFn?.();}catch(e0){
				try{this.ifFn?.();}catch(e1){e0 = e1;this.ifFn = null;this.paused = true;}
				this.paused || (this.soFn = null);this.paused = false;console.error(e0);
			}
		};
		return RealWorld;
	})();
	var RealNode = class RealNode{
		/**
		 * 
		 * @throws
		 * @param {String} message 
		 * @returns {never}
		 */
		static error(message){throw new Error(this.name+' : '+message);}
		/**@type {Map<Symbol,RealNode>} */
		static _sys = new Map;
		static t0 = Date.now();
		static tryRealNode = false;
		static now = Promise.resolve();
		static eventLoop = new RealWorld;
		/**
		 * @typedef {{
		 * tryRealNode: Boolean,
		 * childRNs: ({info: [RealNode,String[],String[]]} & RealNode)[],
		 * get()=>*,
		 * set(value)=>Boolean,
		 * react()=>Boolean,
		 * id: Symbol,
		 * value,
		 * }} AntiNode 
		 */
		static proto = class AntiNode{
			tryRealNode;
			/**@type {(RealNode & {info: [RealNode,String[],String[]]})[]} */
			childRNs = [];
			/**@type {()=>*} */
			['get'];
			/**@type {(value)=>Boolean} */
			['set'];
			/**@type {()=>Boolean} */
			react;
			/**@type {Symbol} */
			id;
			value;
		};
		/**
		 * 
		 * @param {Symbol} id 
		 */
		static search(id){return RealNode._sys.get(id);}
		static is(value1,value2){return Object.is(value1,value2) || value1 === value2;}
		/**
		 * ### bind
		 * @param {()=>*} fn 
		 * @returns {Promise}
		 */
		static justNow(fn,thisArg,...argArray){return RealNode.now.then(()=>fn.apply(thisArg,argArray));}
		static arrayToObject(...argArray){
			const temp = Object.create(null),array = emptyArray.concat(...argArray),length = array.length;
			for(var i = 0;i < length;i++) temp[String(array[i])] = array[i];
			return temp;
		}
		/**@method */
		static createExpression = (set=>
			/**
			 * 
			 * @param {()=>any} get 
			 * @param {RealNode[]} relativeRNs
			 * */
			(get,...relativeRNs)=>new RealNode({get,set},true,...relativeRNs)
		)(()=>false);
		/**
		 * 
		 * @param {RealNode} realNode 
		 */
		static check(realNode){for(const temp of RealNode._sys.entries()) if(realNode === temp[1]) return realNode.id === temp[0];}
		/**
		 * 
		 * @type {(config: {get?: ()=>*,set?: (value)=>Boolean,react?: ()=>void,id?,info?,value?,initValue?})=>RealNode}
		 */
		static createHidden = (temp=>function(config){return new RealNode(Object.assign({},config,temp));})({display: false});
		/**
		 * 
		 * @param {()=>*} fn 
		 * @param {Boolean} keepNow 
		 * @returns {Promise}
		 */
		static afterNow(fn,keepNow,thisArg,...argArray){
			const temp = new Promise(r=>RealNode.eventLoop.then(()=>r(fn.apply(thisArg,argArray))));
			return keepNow || (RealNode.now = temp.catch(prevent)),temp;
		}
		/**
		 * 
		 * @param {()=>*} get 
		 */
		static protoCreate(get,...argArray){
			const temp = new RealNode({get});
			temp.proto.value = argArray;
			return temp;
		}
		/**@method @type {((...args)=>RealNode)} */
		static createNumber = RealNode.protoCreate.bind(null,function(temp = 0){
			if(!Array.isArray(this.proto.value)) return +(this.proto.value instanceof RealNode ? this.proto.value.value : this.proto.value);
			else for(const i of this.proto.value) temp +=+(i instanceof RealNode ? i.value : i);
			return temp;
		});
		/**@method */
		static copyObj = function copyObj(obj){
			if(Object(obj) === obj){
				const newObj = Array.isArray(obj) ? [] : Object.create(null);
				for(const i of Object.keys(obj)){95 === i.charCodeAt(0) || (newObj[i] = copyObj(obj[i]));}
				return newObj;
			}else return new.target ? Object(obj) : obj;
		};
		/**@method @type {((...args)=>RealNode)} */
		static createString = RealNode.protoCreate.bind(null,function(){
			if(Array.isArray(this.proto.value)){
				const temp = this.proto.value.concat();
				for(var i = temp.length;i --> 0;) if(temp[i] instanceof RealNode) temp[i] = temp[i].value;
				return temp.join('');
			}else return String(this.proto.value instanceof RealNode ? this.proto.value.value : this.proto.value);
		});
		/**
		 * 
		 * @param {(()=>*) & Promise} promise 
		 * @param {(time: Number,error: Error | null,value)=>void} callback 
		 * @returns {Promise<{error: ?Error,time: Number,value: ?*}>}
		 */
		static async time(promise,callback){
			const t0 = performance.now(),result = {time: null,error: null,value: null,};
			try{result.value = await(typeof promise === 'function' ? promise() : promise);}catch(e){console.error(result.error = e);}
			result.time = performance.now() - t0;
			if(typeof callback === 'function') try{callback(result.time,result.error,result.value);}catch(e){console.error(e);}
			return result;
		}
		/**
		 * 
		 * @param {Number} n 
		 * @param {Number} [tail] 
		 */
		static makeNumStr0oTail(n,tail){
			var int,float;
			switch(typeof n){
				case "bigint": return n.toString();
				case "symbol":case "undefined": return 'NaN';
			}
			try{n = +n;}catch{return 'NaN';}
			return Number.isFinite(n) ? (
				tail = typeof tail !== 'number' ? 9 : tail > 18 ? 18 : tail < 0 ? 0 : Math.floor(tail),
				{0: int,1: float = ''} = n.toString(8).split('.'),
				BigInt('0o'+int).toString()+'_+'+'0o'+float.slice(0,tail).padEnd(tail,'0')
			) : 'NaN';
		}
		/**
		 * 
		 * @this {RealNode}
		 * @param {RealNode} realNode 
		 */
		static _react(realNode,react = true,notify = true,noSelf = true){try{
			var value;
			const temp = this._getPositionsOfChildRN(realNode);
			while(temp.length){
				const position = temp.pop().reverse();
				if(!position.length) return this.realSet(realNode.value,react,notify,noSelf);else{
					value = this.proto.value;
					while(position.length > 1) value = value[position.pop()];
					realNode.value === value[position[0]] || (value[position[0]] = realNode.value);
				}
			}
			return react && this.react?.(noSelf),notify && this.notify(noSelf),true;
		}catch(e){
			if(this instanceof RealNode) throw e;
			this.error('Please avoid using method "react" of typeof '+this?.name+' !\n'+e.message);
		}}
		protoReact(){}
		protoGet(){return this.proto.value;}
		log(...message){console.log(this+':',...message);}
		done(){return RealNode.justNow(this.protoDone,this);}
		// done(keepNow){return RealNode.afterNow(this.protoDone,keepNow,this);}
		/**
		 * 
		 * @throws
		 * @param {String} message 
		 * @returns {never}
		 */
		error(message){throw new Error(this+'\n"""\n'+String(message)+'\n"""');}
		/**
		 * 
		 * @returns {Boolean}
		 */
		protoSet(value){return value !== this.proto.value && (this.proto.value = value,true);}
		clearChildRNs(){while(this.proto.childRNs.length){this.proto.childRNs.pop().display = false;}return this;}
		realReact(notify = true,noSelf){
			const react = this.proto.react;
			return react ? (react.call(this),notify && this.notify(noSelf),true) : false;
		}
		[Symbol.toPrimitive](hint){try{
			return 'number' === hint ? Number(this.value) : '[object '+this.constructor.name+']{ '+this.id.description+' }';
		}catch{return NaN;}}
		async protoDone(){
			var i = 0;
			while(i < this.notifyArray.length) await Promise.allSettled(this.notifyArray[i++]);
			return this.notifyArray.splice(0);
		}
		/**
		 * 
		 * @param {Boolean} noSelf 
		 * @param {RealNode} [thisArg] 
		 * @param {number} [count] 
		 * @returns {?Promise<void>}
		 */
		notify(noSelf,thisArg,count){
			// return this.relativeRNs.length ? this.done().finally(this.protoNotify.bind(this,noSelf,thisArg,count)) : null;
			for(const id of this.relativeRNs) Promise.resolve(RealNode.search(id)).
			then(realNode=>!realNode || (noSelf && this === realNode) || realNode.realReact?.());
		}
		/**
		 * 
		 * @param {Boolean} react 
		 * @param {Boolean} notify 
		 * @param {Boolean} noSelf 
		 * @returns {Boolean}
		 */
		realSet(value,react,notify,noSelf){try{
			var temp;
			return (this.proto.set.call(
				this,
				this.proto.tryRealNode && (temp = this._computePositionsOfRNs(value)).length ?
				this._dealWithPositionsOfRNs(temp,value) : value
			) ?? true) && (react && this.react?.(),notify && this.notify(noSelf),true);
		}catch(e){return console.error(e),e;}}
		/**
		 * 
		 * @param {RealNode} realNode 
		 * @returns {String[][]}
		 */
		_getPositionsOfChildRN(realNode){
			const childRNs = this.proto.childRNs,temp = [];
			for(var i = childRNs.length,iter;i --> 0;) iter = childRNs[i].info.values(),realNode === iter.next().value && temp.push(...iter);
			return temp;
		}
		/**
		 * 
		 * @param {Boolean} noSelf 
		 * @param {RealNode} [thisArg] 
		 * @param {number} [count] 
		 */
		protoNotify(noSelf,thisArg,count = 0){
			!thisArg ? thisArg = this : count++;
			(thisArg.notifyArray[count] || (thisArg.notifyArray[count] = [])).push(new Promise(r=>{
				for(var id of this.relativeRNs){
					!(noSelf && id === this.id) && (id = RealNode.search(id)) && (id.react?.(),id.notify(noSelf,thisArg,count));
				}
				r();
			}));
		}
		/**
		 * 
		 * @param {...(RealNode | Symbol)} relativeRNs 
		 */
		relate(...relativeRNs){
			var id = relativeRNs[relativeRNs.length - 1];
			const temp = RealNode.search(id?.id ?? id);
			while(relativeRNs.length){
				id = relativeRNs.pop();
				typeof id === 'symbol' || (id instanceof RealNode ? id = id.id : this.error(
					'=> "relativeRNs['+relativeRNs.length+']" is not legal id !'
				));
				RealNode.search(id) && !this.relativeRNs.includes(id) && this.relativeRNs.push(id);
			}
			return temp;
		}
		/**
		 * 
		 * @param {...(RealNode | Symbol)} unrelativeRNs 
		 */
		unrelate(...unrelativeRNs){
			if(!unrelativeRNs.length) return false;
			const temp = this.relativeRNs.concat();
			var i = unrelativeRNs.length;
			this.relativeRNs.splice(0);
			while(i --> 0) typeof unrelativeRNs[i] === 'symbol' || (unrelativeRNs[i] = unrelativeRNs[i]?.id);
			for(i = temp.length;i --> 0;) unrelativeRNs.includes(temp[i]) || this.relativeRNs.push(temp[i]);
			return temp.length !== this.relativeRNs.length;
		}
		/**
		 * 
		 * @param {String[]} [position] 
		 * @returns {[RealNode, ...string[]][]} 
		 */
		_computePositionsOfRNs(value,deep = 2,position = [],count = 0){
			/**@type {[RealNode, ...string[]][]} */
			var temp = [],i,keys;
			if(value instanceof RealNode) return temp.push((position.unshift(value),position)),temp;
			else if(count < deep && Object(value) === value) for(i = (keys = Reflect.ownKeys(value)).length;i --> 0;){
				temp = temp.concat(this._computePositionsOfRNs(value[keys[i]],deep,[...position,keys[i]],count + 1));
			}
			return temp;
		}
		/**
		 * ### bind
		 * @param {[RealNode, ...string[]][]} realNodeMap 
		 */
		_dealWithPositionsOfRNs(realNodeMap,expression){
			const temp = this.clearChildRNs().proto.childRNs,list = [];
			const tempReact = this.constructor._react;
			var value,i,end;
			realNodeMap = realNodeMap.concat();
			while(realNodeMap.length){
				/**@type {[RealNode, ...string[]]} */
				const position = realNodeMap.pop(),realNode = position[0],dir = position.slice(1);
				if(!dir.length) expression = realNode.value;else{
					for(value = expression,i = 0,end = dir.length - 1;i < end;i++) value = value[key];
					value[dir[i]] = realNode.value;
				}
				i = list.indexOf(realNode);
				i < 0 ? (list.push(realNode),temp.push(realNode.relate(
					new RealNode({info: [realNode,dir],react: (...argArray)=>tempReact.call(this,realNode,...argArray)})
				))) : temp[i].info.push(dir);
			}
			return expression;
		}
		/**@type {Symbol} */
		get id(){return this.proto.id;}
		get childRNs(){return this.proto.childRNs;}
		get value(){return this.get();}
		set value(value){this.realSet(value,true,true);}
		get set(){return this.realSet;}
		set set(set){this.proto.set = typeof set === 'function' ? set : this.protoSet;}
		get get(){return this.proto.get;}
		set get(get){this.proto.get = typeof get === 'function' ? get : this.protoGet;}
		get react(){return this.proto.react;}
		set react(react){this.proto.react = typeof react === 'function' ? react : react ? this.protoReact : null;}
		get display(){return RealNode._sys.has(this.id);}
		set display(display){display ? RealNode._sys.set(this.id,this) : RealNode._sys.delete(this.id);}
		get tryRealNode(){return this.proto.tryRealNode;}
		set tryRealNode(tryRealNode){
			tryRealNode = (this.proto.tryRealNode = Boolean(tryRealNode));
			var i = this.proto.childRNs.length;
			while(i --> 0) this.proto.childRNs[i].display = tryRealNode;
		}
		/**
		 * 
		 * @param {{get?: ()=>*,set?: (value)=>Boolean,react?: ()=>void,id?,info?,value?,initValue?,display?}} [config] 
		 * @param {...(Symbol | RealNode)} [relativeRNs] 
		 */
		constructor(config,tryRealNode = RealNode.tryRealNode,...relativeRNs){
			config = Object(config);
			/**@type {Symbol[]} */
			this.relativeRNs = [];
			/**@type {Promise[][]} */
			this.notifyArray = [];
			/**@type {AntiNode} */
			this.proto = null;
			/**@type {*} */
			this.info = null;
			/**@type {this} */
			const thisArg = tryFunctionRealNode ? (...argArray)=>protoThisArg(thisArg,...argArray) : this;
			// "this" 仅用于获取当前原型，真正的 this 为 "thisArg"
			tryFunctionRealNode && (
				Reflect.setPrototypeOf(thisArg,Reflect.getPrototypeOf(this)),
				Reflect.defineProperty(thisArg,'length',writableNull),
				Reflect.defineProperty(thisArg,'name',writableNull),
				thisArg.relativeRNs = this.relativeRNs,
				thisArg.notifyArray = this.notifyArray,
				null
			);
			/**@type {AntiNode} */
			thisArg.proto = new this.constructor.proto;
			thisArg.info = config.info;
			thisArg.proto.id = Symbol(String(config.id ?? config.info?.id ?? ''));
			Reflect.defineProperty(thisArg,'relativeRNs',nonEnumerableConfig);
			Reflect.defineProperty(thisArg,'notifyArray',nonEnumerableConfig);
			Reflect.defineProperty(thisArg,'proto',tempConfig);
			thisArg.display = config.display ?? true;
			thisArg.get = config.get;
			thisArg.set = config.set;
			thisArg.react = config.react;
			thisArg.relate(...relativeRNs);
			thisArg.proto.value = config.initValue;
			thisArg.tryRealNode = tryRealNode;
			if('value' in config) thisArg.value = config.value;
			return thisArg;
			
			// config = Object(config);
			// /**@type {AntiNode} */
			// this.proto = new this.constructor.proto;
			// this.proto.id = Symbol(String(config.id ?? config.info?.id ?? ''));
			// Reflect.defineProperty(this,'relativeRNs',nonEnumerableConfig);
			// Reflect.defineProperty(this,'notifyArray',nonEnumerableConfig);
			// Reflect.defineProperty(this,'proto',tempConfig);
			// this.display = config.display ?? true;
			// this.info = config.info;
			// this.get = config.get;
			// this.set = config.set;
			// this.react = config.react;
			// this.relate(...relativeRNs);
			// this.proto.value = config.initValue;
			// this.tryRealNode = tryRealNode;
			// if('value' in config) this.value = config.value;
		}
	};
	var RealGroup =
	/**@template {{}} T */
	class RealGroup extends RealNode{
		static tempProxy = class AntiGroup extends Function{
			apply(){return this.self;}
			ownKeys(){return Reflect.ownKeys(this);}
			has(target,key){return Reflect.has(this,key);}
			construct(){return this.realGroup.getByFilter();}
			isExtensible(){return Reflect.isExtensible(this);}
			['get'](target,key){return this.realGroup.get(key);}
			preventExtensions(){return Reflect.preventExtensions(this);}
			deleteProperty(target,key){return Reflect.deleteProperty(this.self,key);}
			setPrototypeOf(target,prototype){return Reflect.setPrototypeOf(this,prototype);}
			['set'](target,key,value){return this.realGroup.set(Object.create(null,{[key]:{value}}));}
			defineProperty(target,key,attributes){return Reflect.defineProperty(this.self,key,attributes);}
			/**
			 * 
			 * @param {{}} self 
			 * @param {RealGroup} realGroup 
			 */
			constructor(self,realGroup){
				super('');
				this.self = self;
				this.realGroup = realGroup;
			}
		};
		/**@type {Map<{},RealGroup>} */
		static groupMap = new Map;
		static _ = ()=>true;
		/**
		 * 
		 * @template T
		 * @param {T} obj 
		 * @param {String} [id] 
		 * @param {Boolean} [tryRealNode] 
		 * @param {Boolean} [strict] 
		 * @returns {RealGroup<T> | any}
		 */
		static createDeepGroup = function createDeepGroup(obj,id = '',tryRealNode,strict){
			var i;
			if(Object(obj) !== obj) return strict ? tryRealNode ? RealNode.createHidden({id,initValue: obj}) : obj : new RealGroup;
			const proto = Reflect.getPrototypeOf(obj);
			if(proto && proto !== Object.prototype) return strict ? tryRealNode ?
			RealNode.createHidden({id,initValue: obj}) : obj : new RealGroup({self: obj});
			const temp = Object.create(null),keyArray = Reflect.ownKeys(obj),length = keyArray.length;
			for(i = 0;i < length;i++) temp[keyArray[i]] = createDeepGroup(obj[keyArray[i]],keyArray[i],tryRealNode,true);
			return new RealGroup({self: temp});
		};
		/**
		 * ## 针对JSON对象的强制数据结构转换
		 * @template {{}} T
		 * @template U
		 * @type {{
		 * (target,structure: "array")=>*[];
		 * (target,structure: "string")=>String;
		 * (target,structure: "number")=>Number;
		 * (target,structure: "bigint")=>BigInt;
		 * (target,structure: "boolean")=>Boolean;
		 * (target,structure: "null" | "undefined")=>null;
		 * (target,structure: T)=>T;
		 * (target: U,structure: unknown)=>U;
		 * }} 
		 */
		static getObjByStructure = (()=>{
			const getObjByStructure = (source,structure)=>{
				var index,keys,temp,key;
				switch(structure){
					case "boolean": return Boolean(source);
					case "null": case "undefined": return null;
					case "bigint": try{return BigInt(source);}catch{return 0n;}
					case "number": try{return Number(source);}catch{return NaN;}
					case "string": try{return String(source);}catch{return 'Symbol(unknown)';}
					case "array": switch(typeof source){
						default: return [];
						case "string": return source.split('');
						case "object": if(source === null) return [];else if(Array.isArray(source)) return source.concat();
						else for(temp = [],keys = Object.keys(source),index = 0;true;) if(
							Number.isInteger(key = +keys[index++]) && key > -1
						) try{temp[key] = source[key];}catch(e){console.error(e);}else return temp;
					}
					default: if(Object(structure) !== structure) return source;
				}
				source = Object(source),temp = Object.create(null),keys = Object.keys(structure),index = keys.length;
				while(index --> 0) try{
					key = keys[index],structure[key];
					try{temp[key] = getObjByStructure(source[key],structure[key]);}
					catch(e){temp[key] = getObjByStructure(null,structure[key]);console.error(e);}
				}catch(e){temp[key] = null;console.error(e);}
				return temp;
			};
			return getObjByStructure;
		})();
		keys(all){return all ? Reflect.ownKeys(this.proxy()) : Object.keys(this.proxy());}
		/**
		 * 
		 * @param {Boolean} [notify] 
		 * @param {Boolean} [noSelf] 
		 * @returns {Boolean | Error}
		 */
		realSet(value,notify,noSelf){try{return this.protoSet(value) && (notify && this.notify(noSelf),true);}catch(e){return console.error(e),e;}}
		/**
		 * 
		 * @param {String | Symbol | ?(keyArray: (String | Symbol)[])=>Boolean} ifKeyOrFn 
		 * @param {()=>void} listener 
		 */
		addSetterListener(ifKeyOrFn,listener){
			var temp;
			if(!listener) return;
			if(typeof listener !== 'function') this.error('"listener" must be function !');
			if(null == ifKeyOrFn) ifKeyOrFn = RealGroup._;
			Array.isArray(temp = this.listenerMap.get(ifKeyOrFn)) || this.listenerMap.set(ifKeyOrFn,temp = []);
			temp.push(listener);
		}
		/**
		 * 
		 * @param {(String | Symbol)[]} [keyArray] 
		 */
		protoReact(keyArray = emptyArray){
			Array.isArray(keyArray) || this.error('"keyArray" must be Array !');
			this.listenerMap.forEach((listenerArray,ifKeyOrFn)=>{try{
				if(typeof ifKeyOrFn === 'function' ? ifKeyOrFn(keyArray) : keyArray.indexOf(ifKeyOrFn) !== -1){
					for(var l = listenerArray.length,i = 0;i < l;i++) try{listenerArray[i]();}catch(e){this.log('Wrong with ',listenerArray[i]);}
				}
			}catch(e){this.log('Wrong with ',ifKeyOrFn);}});
		}
		tryRealNodeSetter(){
			const self = this.proxy(),keys = Reflect.ownKeys(self);
			var i = keys.length;
			while(i --> 0) Reflect.has(Reflect.getOwnPropertyDescriptor(self,keys[i]),'get') || self[keys[i]] instanceof RealNode ||
			(self[keys[i]] = RealNode.createHidden({initValue: self[keys[i]]}));
			return this;
		}
		/**
		 * 
		 * @param {(key: String)=>Boolean} [filterFn] 
		 * @returns {{}}
		 */
		getByFilter(filterFn){
			const self = this.proxy(),keyArray = Reflect.ownKeys(self),notFn = typeof filterFn !== 'function',temp = Object.create(null);
			var i = keyArray.length;
			while(i --> 0) if(notFn || filterFn(keyArray[i])) Reflect.
			set(temp,keyArray[i],self[keyArray[i]] instanceof RealNode ? self[keyArray[i]].value : self[keyArray[i]]);
			return temp;
		}
		/**
		 * 
		 * @param {{}} obj 
		 */
		protoSet(obj){
			if(Object(obj) !== obj) return false;
			const self = this.proxy(),keyArray = Reflect.ownKeys(Object(obj)),temp = [];
			for(const key of keyArray) obj[key] instanceof RealNode ? (self[key] = obj[key],temp.push(key)) :
			self[key] instanceof RealNode ? self[key].set(obj[key],true,true,true) && temp.push(key) :
			obj[key] !== self[key] && (self[key] = obj[key],temp.push(key));
			if(temp.length) try{this.protoReact(temp);}catch(e){this.log(e?.stack ?? e);}finally{return true;}else{
				const listenerArray = this.listenerMap.get(RealGroup._),l = listenerArray.length;
				for(var i = 0;i < l;i++) try{listenerArray[i]();}catch(e){this.log('Wrong with ',listenerArray[i]);}
				return false;
			}
		}
		/**
		 * 
		 * @type {(()=>{}) & ((objectDescription: {})=>{}) & ((key)=>*)}
		 */
		protoGet(...argArray){
			if(0 === argArray.length) return this.getByFilter();
			var temp = argArray[0];
			if(Object(temp) !== temp) return (temp = this.proxy()[temp],temp instanceof RealNode ? temp.value : temp);
			const self = this.proxy(),keyArray = Reflect.ownKeys(temp);
			/**@type {{}} */
			temp = Object.create(null);
			var i = keyArray.length;
			while(i --> 0) Reflect.set(temp,keyArray[i],self[keyArray[i]] instanceof RealNode ? self[keyArray[i]].value : self[keyArray[i]]);
			return temp;
		}
		/**@type {T & {()=>T}} */
		get proxy(){return this.proto.value;}
		get set(){return this.realSet;}
		set set(set){/**tthis.log('Invalid set "set" !'); */}
		/**@type {(keyOrkeyObj?: String | Symbol | {})=> *} */
		get get(){return this.protoGet;}
		set get(get){/**this.log('Invalid set "get" !'); */}
		get react(){return this.protoReact;}
		set react(react){/**this.log('Invalid set "react" !'); */}
		get tryRealNode(){return false;}
		set tryRealNode(tryRealNode){tryRealNode && this.log('I can not try realNode !');}
		/**@type {Map<String | Symbol | (keyArray: (String | Symbol)[])=>Boolean,(()=>void)[]>} */
		listenerMap = new Map([[RealGroup._,[]]]);
		/**
		 * 
		 * @param {{self?: T}} param0 
		 */
		constructor({id,info,self = Object.create(null)} = emptyObj){
			var temp;
			if((temp = RealGroup.groupMap.get(self)) instanceof RealGroup) return console.log('Please do not new for "self":'+self+' again !'),temp;
			super({id,info});
			if(Object(self) !== self) this.error('"self" not typeof object !');
			Reflect.defineProperty(this,'listenerMap',tempConfig);
			temp = new RealGroup.tempProxy(self,this);
			this.proto.value = new Proxy(temp,temp);
			RealGroup.groupMap.set(self,this);
		}
	};
	var RealTarget = class RealTarget extends RealNode{
		/**@typedef {AntiNode & {self: Element & {},isElement: Boolean,transform(value)=>*}} AntiTarget */
		static proto = class AntiTarget extends RealNode.proto{
			/**@type {Element & {}} */
			self;
			/**@type {Boolean} */
			isElement;
			/**@type {(value)=>*} */
			transform;
		};
		/**
		 * 
		 * @type {{(element: Element)=>RealElement[];(element: {})=>RealTarget[];(element)=>RealElement[];}}
		 */
		static searchByObj(element){
			const temp = [];
			if(Object(element) !== element) return temp;
			for(const realTarget of RealTarget._sys.values()) if(element === realTarget.self) temp.push(realTarget);
			return temp;
		}
		/**
		 * 
		 * @this {RealTarget}
		 * @param {RealNode} realNode 
		 */
		static _react(realNode,react = true,notify = true,noSelf = true){try{
			var value;
			const temp = this._getPositionsOfChildRN(realNode);
			while(temp.length){
				const position = temp.pop().reverse();
				if(!position.length) return this.realSet(realNode.value,react,notify,noSelf);else{
					value = this.proto.value;
					while(position.length > 1) value = value[position.pop()];
					realNode.value === value[position[0]] || (value[position[0]] = realNode.value);
				}
			}
			return this.fix(),react && this.react?.(noSelf),notify && this.notify(noSelf),true;
		}catch(e){
			if(this instanceof RealTarget) throw e;
			this.error('Please avoid using method "react" of typeof '+this?.name+' !\n'+e.message);
		}}
		/**
		 * 
		 * @template T
		 * @param {T} value 
		 */
		protoTransform(value){return value;}
		fix(){return this.self[this.key] = this.transform(this.proto.value),this;}
		clearClassName(){return this.proto.isElement && (this.proto.self.className = '',true);}
		/**@param {...String} classList */
		addClassName(...classList){return this.proto.isElement && (this.proto.self.classList.add(...classList),true);}
		/**@param {String} className */
		toggleClassName(className){return this.proto.isElement && this.proto.self.classList.toggle(className);}
		/**@param {...String} classList  */
		removeClassName(...classList){return this.proto.isElement && (this.proto.self.classList.remove(...classList),true);}
		getIndexWithin(){
			var i = 0,temp = this.proto.self;
			while(temp = temp.previousElementSibling) i++;
			return i;
		}
		/**
		 * 
		 * @param {Boolean} react 
		 * @param {Boolean} notify 
		 * @param {Boolean} noSelf 
		 * @returns {Boolean}
		 */
		realSet(value,react,notify,noSelf){try{
			var temp;
			return (this.proto.set.call(
				this,
				this.tryRealNode && (temp = this._computePositionsOfRNs(value)).length ?
				this._dealWithPositionsOfRNs(temp,value) : value
			) ?? true) && (this.fix(),react && this.react?.(),notify && this.notify(noSelf),true);
		}catch(e){return console.error(e),e;};}
		/**
		 * 
		 * @param {keyof HTMLElementTagNameMap} selfSelector 
		 * @param {String | {[selector: String]: {[styleName: String]: String}}} classNameOrRuleObjObj 
		 */
		applyCSS(selfSelector,classNameOrRuleObjObj){
			if(!(this.proto.self instanceof Element)) this.error('I am not RealElement !');
			const strReg = /^[A-Za-z]/;
			var temp = selfSelector;
			if(typeof selfSelector !== 'string'){
				while(temp = temp?.parentElement) if(temp === this.proto.self) break;
				temp ? selfSelector = ' #'+(selfSelector.id || (selfSelector.id = RealElement.getRandomId())) :
				this.error('"selfSelector" must be String or my descendant !');
			}
			const id = this.proto.self.id || (this.proto.self.id = RealElement.getRandomId());
			typeof classNameOrRuleObjObj === 'string' ? classNameOrRuleObjObj = RealElement.myStyle.get(classNameOrRuleObjObj) :
			classNameOrRuleObjObj = Object(classNameOrRuleObjObj);
			return !classNameOrRuleObjObj ? false : (RealElement.addCSSRules(
				'#'+id+(strReg.test(selfSelector) ? ' ' : '')+selfSelector,classNameOrRuleObjObj
			),RealElement.addId(id,false),true);
		}
		/**
		 * 
		 * @param {Boolean} keepValue 
		 * @param {Boolean} fix 
		 * @param {Boolean} [deepCopyRelativeRNs] 
		 */
		clone(keepValue,fix,deepCopyRelativeRNs){
			const self = this.proto.self instanceof Element ? this.proto.self.cloneNode() :
			Object.assign(Object.create(Reflect.getPrototypeOf(this.proto.self)),this.proto.self);
			const param0 = {self,key: this.key,transform: this.transform};
			const temp = new RealTarget(param0,{
				get: this.proto.get,
				set: this.proto.set,
				react: this.proto.react,
				id: this.id.description+'-clone',
				info: this.info,
				initValue: keepValue ? this.proto.value : void 0,
			});
			Reflect.setPrototypeOf(temp,Reflect.getPrototypeOf(this));
			if(null == deepCopyRelativeRNs) temp.relativeRNs = deepCopyRelativeRNs ? this.relativeRNs : this.relativeRNs.concat();
			return fix ? temp.fix() : temp;
		}
		get isElement(){return this.proto.isElement;}
		get transform(){return this.proto.transform;}
		/**@param {(value)=>*} transform */
		set transform(transform){this.proto.transform = typeof transform === 'function' ? transform : this.protoTransform;}
		/**@type { Element | {}} */
		get self(){return this.proto.self;}
		set self(self){
			Object(self) === self ? this.proto.isElement = (this.proto.self = self) instanceof Element :
			this.error('=> "self" must be Object !');
		}
		/**
		 * 
		 * @param {{self: Element | {},key,transform?: (value)=>*}} param0 
		 * @param {{get?: ()=>*,set?: (value)=>Boolean,react?: ()=>void,id?,info?,value?,initValue?}} [config] 
		 * @param {Boolean} [tryRealNode] 
		 * @param {...RealNode} [relativeRNs] 
		 */
		constructor({self,key,transform},config,tryRealNode,...relativeRNs){
			super(config,tryRealNode);
			/**@type {AntiTarget} */this.proto;
			this.self = self;
			this.key = key;
			this.transform = transform;
			tryRealNode && this.realSet(config.initValue);
			this.relate(...relativeRNs);
			this.addClassName(this.constructor.name);
		}
	};
	var RealElement = class RealElement extends RealTarget{
		/**@type {Element} */
		get self(){return this.proto.self;}
		set self(self){
			Object(self) === self ? this.proto.isElement = (this.proto.self = self) instanceof Element :
			this.error('=> "self" must be Element !');
		}
		/**@type {Set<String>} */
		static idSet = new Set;
		static findId(id){return this.idSet.has(id);}
		static deleteId(id){typeof id !== 'string' && console.error('=> Please use String "id" !');return this.idSet.delete(id);}
		static getRandomId(){
			for(var temp;this.idSet.has(temp = 'C3'+Math.floor(Math.random() * 1e14).toString(36)););
			return temp;
		}
		static addId(id,strict = true){
			if(id) typeof id !== 'string' ? this.error('=> Please use String "id" !') :
			this.idSet.has(id) ? strict && this.error('=> Please use another "id" !') :
			this.idSet.add(id);
		}
		/**@type {Map<String,{[selector: String]: {}}>} */
		static myStyle = new Map;
		/**@type {{[type: String]:Map<(keyof HTMLElementTagNameMap,EventListener)[]>}} */
		static selectorEventListeners = {};
		static keyboardController = (browserMode && addEventListener('keydown',e=>{
			if(/^(TEXTAREA)|(SELECT)|(INPUT)$/.test(document.activeElement?.tagName)) return;
			/**@type {?Element} */
			const onkeyboardController = document.querySelector('.onkeyboardControl') ?? document.querySelector('.keyboardController');
			if(!onkeyboardController) return;
			var i,temp;
			switch(e.key){
				case RealElement.keyboardController?.previous: i = -1;break;
				case RealElement.keyboardController?.next: i = 1;break;
				case RealElement.keyboardController?.enter: (temp = RealTarget.searchByObj(onkeyboardController)[0]) instanceof RealDivList ?
				temp.proto.list.length ?
				(onkeyboardController.classList.remove('onkeyboardControl'),(temp = temp.proto.list[0]).classList.add('onkeyboardControl')) :
				(temp = onkeyboardController).click() :
				(temp = onkeyboardController.querySelector('.keyboardController')) ?
				(onkeyboardController.classList.remove('onkeyboardControl'),temp.classList.add('onkeyboardControl')) :
				(temp = onkeyboardController).click();break;
				case RealElement.keyboardController?.back:{
					temp = onkeyboardController;
					while(temp = temp.parentElement) if(temp.classList.contains('keyboardController')) break;
					temp ? (onkeyboardController.classList.remove('onkeyboardControl'),temp.classList.add('onkeyboardControl')) :
					(temp = onkeyboardController).classList.add('onkeyboardControl');
					break;
				}
			}
			if(i++){if(temp = onkeyboardController,onkeyboardController.classList.remove('onkeyboardControl'),i){
				while(temp = temp.nextElementSibling) if(getComputedStyle(temp).display !== 'none') break;
				(temp || (temp = onkeyboardController.parentElement.firstElementChild)).classList.add('onkeyboardControl');
			}else{
				while(temp = temp.previousElementSibling) if(getComputedStyle(temp).display !== 'none') break;
				(temp || (temp = onkeyboardController.parentElement.lastElementChild)).classList.add('onkeyboardControl');
			}}
			temp && temp.animate({'opacity':[1,0,1]},{duration: 500});
		}),{
			previous: 'ArrowUp',
			next: 'ArrowDown',
			enter:'ArrowRight',
			back: 'ArrowLeft'
		});
		/**@method */
		static makeElementByString = (()=>{
			/**@type {HTMLTemplateElement} */
			const template = browserMode ? document.createElement('template') : {content: {}};
			function makeElementByString(innerHTML){template.innerHTML = String(innerHTML); return template.content.firstElementChild;}
			return makeElementByString._clear = ()=>(template.innerHTML = '',template.content),makeElementByString;
		})();
		static createImg(){return new RealElement({self: document.createElement('img'),key: 'src'});}
		static createVideo(){return new RealElement({self: document.createElement('video'),key: 'src'});}
		static createAudio(){return new RealElement({self: document.createElement('audio'),key: 'src'});}
		static createDiv(id,initValue = ''){return new RealElement({self: document.createElement('div'),key: 'textContent'},{id,initValue});}
		static createTextarea(placeholder){
			const temp = document.createElement('textarea');
			return new RealElement({self: (temp.placeholder = String(placeholder),temp),key: 'value'});
		}
		static newXHTML =
		/**
		 * 
		 * @template {keyof HTMLElementTagNameMap} T
		 * @param {T} tagName 
		 * @param {HTMLElement} [config] 
		 * @param {CSSStyleDeclaration} [cssConfig] 
		 * @returns {HTMLElementTagNameMap[T]}
		 */
		(tagName,config,cssConfig)=>(Object.assign(Object.assign(tagName = document.createElement(tagName),config).style,cssConfig),tagName)
		static newSVG =
		/**
		 * 
		 * @template {keyof SVGElementTagNameMap} T
		 * @param {T} tagName 
		 * @param {SVGElement} [config] 
		 * @param {CSSStyleDeclaration} [cssConfig] 
		 */
		(tagName,config,cssConfig)=>RealElement.makeElement(document.createElementNS('http://www.w3.org/2000/svg',tagName),config,cssConfig);
		/**
		 * 
		 * @param {Element[] | IterableIterator<Element>} Elements 
		 */
		static newDocumentFragmentFromElements(Elements){
			const temp = new DocumentFragment();
			for(const ele of Elements) try{temp.appendChild(ele);}catch(e){console.error(e);}
			return temp;
		}
		/**
		 * 
		 * @param {...(Element | {self: Element})} elementList
		 */
		static applyKeyboardController(...elementList){
			for(const ele of elementList) ele instanceof Element ? ele.classList.add('keyboardController') :
			ele?.self instanceof Element && ele.self.classList.add('keyboardController');
		}
		/**
		 * 
		 * @param {...(Element | {self: Element})} elementList
		 */
		static cancelKeyboardController(...elementList){
			for(const ele of elementList) ele instanceof Element ? ele.classList.remove('keyboardController') :
			ele?.self instanceof Element && ele.self.classList.remove('keyboardController');
		}
		/**
		 * 
		 * @template {Element | keyof HTMLElementTagNameMap} T 
		 * @param {T} element 
		 * @param {HTMLElement & SVGElement} [config] 
		 * @param {CSSStyleDeclaration} [cssConfig] 
		 * @returns {T extends Element ? T : HTMLElementTagNameMap[T]}
		 */
		static makeElement(element,config,cssConfig){
			element instanceof Element || (element = document.createElement(element));
			const style = element.style;
			var temp;
			if(config) for(const attr of Object.keys(config)) try{if(attr in element) try{
				typeof (temp = element[attr]) === 'object' && null !== temp ?
				'baseVal' in temp && element.setAttribute(attr,config[attr]) : element[attr] = config[attr];
			}catch(e){console.error(e);}else if(attr in style) style[attr] = String(config[attr]);}catch(e){console.error(e);}
			return Object.assign(style,cssConfig),element;
		}
		/**
		 * 
		 * @template {String} T
		 * @template {Boolean | Node | []} U
		 * @param {T} type 
		 * @param {T extends 'svg' ? (keyof SVGElementTagNameMap)[] : (keyof HTMLElementTagNameMap)[]} tagNameArray 
		 * @param {U} [toDocumentFragment] 
		 * @returns {U extends true ? DocumentFragment : T extends 'svg' ? SVGElement[] : Element[]}
		 */
		static newElements(type,tagNameArray,toDocumentFragment){
			const iter = tagNameArray[Symbol.iterator]();
			if(toDocumentFragment){
				if(toDocumentFragment = new DocumentFragment(),'svg' === type) for(tagNameArray of iter) toDocumentFragment.
				appendChild(document.createElementNS('http://www.w3.org/2000/svg',tagNameArray?.tagName ?? tagNameArray));
				else for(tagNameArray of iter) toDocumentFragment.appendChild(document.createElement(tagNameArray?.tagName ?? tagNameArray));
			}else if(toDocumentFragment = [],'svg' === type) for(tagNameArray of iter) toDocumentFragment.push(
				document.createElementNS('http://www.w3.org/2000/svg',tagNameArray?.tagName ?? tagNameArray)
			);else for(tagNameArray of iter) toDocumentFragment.push(document.createElement(tagNameArray?.tagName ?? tagNameArray));
			return toDocumentFragment;
		}
		/**@method */
		static addEventListenerBySelectors = (()=>{
			/**
			 * 
			 * @param {Event} e 
			 * @param {((event: Event)=>void)[]} listenerArray 
			 * @param {keyof HTMLElementTagNameMap} selectors 
			 */
			function temp(e,listenerArray,selectors){try{if(Array.from(document.querySelectorAll(selectors)).includes(e.target)){
				for(var i = 0,l = listenerArray.length;i < l;) try{listenerArray[i++](e);}catch(e){console.error,alert(e?.stack ?? e);}
			}}catch(e){console.error(e);}}
			/**
			 * 
			 * @param {keyof HTMLElementTagNameMap} selectors 
			 * @param {keyof HTMLElementEventMap} type 
			 * @param {(event: Event)=>void} listener 
			 */
			return(selectors,type,listener)=>{
				const tempStr = type.replace(type[0],type[0].toUpperCase());
				!selectors || '*' === selectors ? addEventListener(type,listener) : (
					!RealElement.selectorEventListeners[type] && (RealElement.selectorEventListeners[type] = new Map,addEventListener(
						type,e=>{
							const t0 = performance.now();
							RealElement.selectorEventListeners[type].forEach(/**### bind */(listenerArray,selectors)=>temp(e,listenerArray,selectors));
							log(tempStr+'-listeners completed\nin '+RealNode.makeNumStr0oTail(performance.now() - t0)+' ms.');
						}
					)),
					RealElement.selectorEventListeners[type].has(selectors) ? RealElement.selectorEventListeners[type].get(selectors).push(listener) :
					RealElement.selectorEventListeners[type].set(selectors,[listener])
				);
			}
		})();
		/**@method */
		static addCSSRules = (()=>{
			if(!browserMode){const addCSSRules = ()=>addCSSRules; return addCSSRules._css = RealWorld.onload,addCSSRules;}
			var myCSS = RealWorld.onload.then(function(){
				const style = document.getElementsByTagName("head")[0].appendChild(document.createElement("style"));
				window.createPopup || style.appendChild(document.createTextNode("")),myCSS = style.sheet;
			});
			const testReg = /^\.([A-Za-z][A-Z0-9a-z]{0,})$/;
			const strReg0 = /[A-Za-z]$/,strReg1 = /^[A-Za-z]/;
			const getKeys = obj=>Object(obj) === obj ? Object.keys(obj) : [];
			/**@type {(selector: keyof HTMLElementTagNameMap,rulesStr: String)=>Promise<Number>} */
			var insertRule = !globalThis.CSSStyleSheet.prototype.insertRule ? (selector,rulesStr)=>myCSS.addRule(selector,rulesStr,-1) :
			(selector,rulesStr)=>myCSS.insertRule(selector+"{\n"+rulesStr+"}",myCSS.cssRules.length);
			var tempInsertRule = (selector,rulesStr)=>myCSS instanceof Promise ?
			myCSS.then(()=>(tempInsertRule = insertRule)(selector,rulesStr)) : (tempInsertRule = insertRule)(selector,rulesStr);
			/**
			 * 
			 * @param {String} prefix 
			 * @param {{[selector: String]: {[styleName: String]: String}}} ruleObjObj 
			 */
			function addCSSRules(prefix,ruleObjObj){try{
				if(Array.isArray(prefix)){
					let i = prefix.length
					while(i --> 0) typeof prefix[i] === 'string' && addCSSRules(prefix[i],ruleObjObj);
					return addCSSRules;
				}else typeof prefix === 'string' || RealElement.error('"prefix" in addCSSRules must be String !');
				for(const selector of getKeys(ruleObjObj)){
					const ruleObj = ruleObjObj[selector],temp = [];
					for(const key of getKeys(ruleObj)){temp.push(key,':',String(ruleObj[key]),';\n');}
					tempInsertRule(prefix+(strReg0.test(prefix) && strReg1.test(selector) ? ' ' : '')+selector+' ',temp.join(''));
				}
				const cssName = testReg.exec(prefix)?.[1];
				cssName && RealElement.myStyle.set(cssName,Object.assign({},RealElement.myStyle.get(cssName),ruleObjObj));
			}catch(e){console.error(e);}return addCSSRules;};
			return addCSSRules._css = myCSS,addCSSRules;
		})();
		static defaultInit = (()=>{
			var onload = false;
			return ()=>{
				return onload ? RealWorld.onload : RealWorld.onload = (onload = true,RealWorld.onload.
				then(()=>RealNode.time(()=>void RealElement.addCSSRules('',{
					'*':{
						'margin':'0',
						'padding':'0',
						'border':'0',
						'-webkit-user-select':'none',
						'-moz-user-select':'none',
						'-ms-user-select':'none',
						'user-select':'none',
					},
					':root':{
						'--mapWidth':'1920px',
						'--halfBlack':'rgba(0, 0, 0, 0.5)',
						'--halfWhite':'rgba(225, 225, 225, 0.5)',
						'--noColor':'rgba(0, 0, 0, 0)',
					},
					'pre':{
						'text-align':'left',
						'align-content':'left',
						'vertical-align':'top',
						'white-space':'pre-wrap',
						'word-wrap':'break-word',
					},
					'html':{
						'cursor':'default',
						'background-color':'black',
						'color':'white',
					},
					'body':{
						'transform':'rotate(0)',
						'transform-origin':'50vmin 50vmin',
						// 'width':'100vmax',
						// 'height':'calc((var(--mapWidth) - 100vmax) * 9 / 16 + 100vmin)',
						'overflow':'visible scroll',
					},
					'body>*':{'position':'absolute',},
					'hr':{'border':'1px solid white,'},
					'::-webkit-scrollbar':{'display':'none',},
				})('.coverBody',{
					'':{'width': '100vmax','height':'56.25vmax'},
				})('.noDisplay',{
					'':{'display':'none'},
				})('.disappear',{
					'':{'visibility':'hidden'},
				})('.listDown',{
					'':{'writing-mode':'horizontal-tb'},
					'>*':{'position':'relative','display':'block'},
				})('.listRight',{
					'':{'writing-mode':'vertical-lr'},
					'>*':{'position':'relative','display':'block'},
				})('.listDownListRight',{
					'':{'writing-mode':'horizontal-tb'},
					'>*':{'position':'relative','display':'block','writing-mode':'vertical-lr'},
					'>*>*':{'position':'relative','display':'block'},
				})('.listRightListDown',{
					'':{'writing-mode':'vertical-lr'},
					'>*':{'position':'relative','display':'block','writing-mode':'horizontal-tb'},
					'>*>*':{'position':'relative','display':'block'},
				})('div.listClose',{
					'':{'writing-mode':'horizontal-tb'},
					'>*':{'position':'absolute'},
					'>:nth-child(1)':{'z-index':'1'},
					'>:nth-child(2)':{'z-index':'2'},
					'>:nth-child(3)':{'z-index':'3'},
					'>:nth-child(4)':{'z-index':'4'},
					'>:nth-child(5)':{'z-index':'5'},
					'>:nth-child(6)':{'z-index':'6'},
					'>:nth-child(7)':{'z-index':'7'},
					'>:nth-child(8)':{'z-index':'8'},
					'>:nth-child(9)':{'z-index':'9'},
					'>:nth-child(10)':{'z-index':'10'},
					'>:nth-child(11)':{'z-index':'11'},
					'>:nth-child(12)':{'z-index':'12'},
					'>:nth-child(13)':{'z-index':'13'},
					'>:nth-child(14)':{'z-index':'14'},
					'>:nth-child(15)':{'z-index':'15'},
				})('div.listFar',{
					'':{'writing-mode':'horizontal-tb'},
					'>*':{'position':'absolute'},
					'>:nth-last-child(1)':{'z-index':'1'},
					'>:nth-last-child(2)':{'z-index':'2'},
					'>:nth-last-child(3)':{'z-index':'3'},
					'>:nth-last-child(4)':{'z-index':'4'},
					'>:nth-last-child(5)':{'z-index':'5'},
					'>:nth-last-child(6)':{'z-index':'6'},
					'>:nth-last-child(7)':{'z-index':'7'},
					'>:nth-last-child(8)':{'z-index':'8'},
					'>:nth-last-child(9)':{'z-index':'9'},
					'>:nth-last-child(10)':{'z-index':'10'},
					'>:nth-last-child(11)':{'z-index':'11'},
					'>:nth-last-child(12)':{'z-index':'12'},
					'>:nth-last-child(13)':{'z-index':'13'},
					'>:nth-last-child(14)':{'z-index':'14'},
					'>:nth-last-child(15)':{'z-index':'15'},
				})('.onhover',{
					':hover':{'background':'linear-gradient(#fff,#000,#000,#fff)'}
				})('.onactive',{
					':active':{'background':'linear-gradient(#000,#fff,#fff,#000)'}
				})('.childOnhover',{
					'>:hover':{'background':'linear-gradient(#fff,#000,#000,#fff)'}
				})('.childOnactive',{
					'>:active':{'background':'linear-gradient(#000,#fff,#fff,#000)'}
				})('.relativeSquare',{
					'':{'width':'20vmin','height':'20vmin'},
				})('.fontTitle',{
					'':{'font-size':'20vmin'},
				})('.fontHead',{
					'':{'font-size':'10vmin'},
				})('.fontNormal',{
					'':{'font-size':'3vmin'},
				})('.scrollY',{
					'':{'overflow':'hidden scroll'},
				})('.scrollX',{
					'':{'overflow':'scroll hidden'},
				})('.scrollXY',{
					'':{'overflow':'scroll'},
				})('.scrollNone',{
					'':{'overflow':'hidden'},
				})('.centerCenter',{
					'':{
						'text-align':'justify',// 文本左右对齐方式
						'align-items':'center',// 子元素自垂直对齐
						'align-content':'center',// 元素左右对齐方式
						'vertical-align':'baseline',// 元素相对文字对齐
						'justify-content':'center',// 子元素水平对齐
					},
				})('.autoFull',{
					'':{'width':'100vmax','height':'100vmin'},
				})('.selfCenterCenter',{
					'': {
						// 'align-self':'center',
						'left':'50%',
						'top':'50%',
						'transform':'translate(-50%,-50%)',
					},
				})._css.finally(),time=>log('Init defaultCSS\nin '+RealNode.makeNumStr0oTail(time)+' ms.'))));
			};
		})();
	};
	{
		/**
		 * ### bind
		 * @typedef {{
		 * resolve: (value)=>void;
		 * reject: (reason?)=>void;
		 * promise: Promise;
		 * }} StoryPromise 
		 */
		/**@type {{()=>StoryPromise; new()=>StoryPromise;}} */
		const StoryPromise = function(){
			if(null == this || this === globalThis) return new StoryPromise;
			/**@type {(value)=>void} */
			this.resolve = null;
			/**@type {(reason?)=>void} */
			this.reject = null;
			return this.promise = new Promise((resolve,reject)=>{this.resolve = resolve;this.reject = reject;}),this;
		};
	var RealStory = new class RealStory{
		newPage(){return new RealStory(this);}
		/**
		 * 
		 * @template T
		 * @param {(page: RealStory)=>T} fn 
		 * @returns {Promise<T>}
		 */
		newPrivatePage(fn){return new Promise(r=>r(fn?.(this.newPage())));}
		then(fn){return typeof fn === 'function' && this.fnList.unshift(fn),this;}
		getNextPage(){
			if(!(this.ofStory instanceof RealStory)) return;
			const temp = this.ofStory.pages;
			return temp[temp.indexOf(this) + 1];
		}
		getPreviousPage(){
			if(!(this.ofStory instanceof RealStory)) return;
			const temp = this.ofStory.pages;
			return temp[temp.indexOf(this) - 1];
		}
		newPromiseObj(){
			const temp = new StoryPromise;
			return this.then(()=>temp.promise),temp;
		}
		async launch(){
			var i = 0,temp = this;
			while((temp = temp.ofStory) instanceof RealStory) i++;
			const bool = !i;
			if(bool) isBusy = true;
			while(this.pages.length || this.fnList.length){
				while(this.fnList.length) try{this.info = await this.fnList.pop()?.(this.info);}
				catch(e){console.error('Depth of the fn : '+i+'\n'+String(e?.stack ?? e));}
				try{await this.pages.shift()?.launch?.();}catch(e){console.error('Depth of the page : '+i+'\n'+String(e?.stack ?? e));}
			}if(bool) isBusy = false;
		}
		get StoryPromise(){return StoryPromise;}
		get index(){return this.ofStory instanceof RealStory ? this.ofStory.pages.indexOf(this) : -1;}
		/**@type {?RealStory} */
		ofStory;
		/**@type {RealStory[]} */
		pages = [];
		/**@type {(()=>*)[]} */
		fnList = [];
		info;
		constructor(ofStory){(this.ofStory = ofStory instanceof RealStory && ofStory) && ofStory.pages.push(this);}
	};
		let isBusy = Reflect.getPrototypeOf(RealStory).constructor = false;
		RealWorld.onload.then(()=>Reflect.getPrototypeOf(RealStory).constructor = setInterval(()=>isBusy || RealStory.launch(),50));
	}
	var RealPromise = new
	/**@template T */
	class RealPromise{
		/**
		 * 
		 * @template T
		 * @param {Promise<T> | T} promise 
		 */
		newOne(promise){return new RealPromise(promise);}
		/**
		 * 
		 * @param {(reason)=>*} [onrejected] 
		 */
		catch(onrejected){return this.self = Promise.resolve(this.self).catch(onrejected),this;}
		/**
		 * 
		 * @param {()=>void} [onfinally] 
		 */
		finally(onfinally){return this.self = Promise.resolve(this.self).finally(onfinally),this;}
		/**
		 * 
		 * @template U
		 * @param {U} v 
		 */
		_push(v){return this.list.push(v),v;}
		/**
		 * @throws 
		 * @returns {never}
		 */
		_throw(e){throw this.list.push(e),e;}
		/**
		 * 
		 * @template U
		 * @template V
		 * @param {(value: T)=>U} [onfulfilled] 
		 * @param {(reason)=>V} [onrejected] 
		 * @returns {RealPromise<U>}
		 */
		then(onfulfilled,onrejected){return this.self = Promise.resolve(this.self).then(onfulfilled,onrejected).then(this._push,this._throw),this;}
		/**
		 * 
		 * @template U
		 * @param {(v)=>U} handler 
		 * @param {(error: Error)=>void} [onerror] 
		 */
		async tryHandler(handler,onerror){
			if(typeof handler !== 'function') throw new TypeError('"handler" must be Function !');
			try{await this.self;}catch(e){console.error(this.length,e);}
			var i = this.length;
			while(i --> 0) try{try{return handler(await this.list[i]);}catch(e){(onerror ?? console.error)(e);}}catch(e){console.error(e);}
		}
		get require(){return RealPromise.require;}
		static require = (()=>{
			/**@this {Element} */
			function onfinally(){this.remove();}
			const pathSet = {},tempReg = /[^\/]+\/\.\.\//g;
			return nodeMode ? /**@this {RealPromise} */
			function(path){return this instanceof RealPromise && this._push(Promise.resolve(nodeRequire(String(path))));} :
			browserMode ? /**@type {(path: String)=>Promise<*,Error | ErrorEvent | void>}@this {RealPromise} */
			function(path){
				var temp,script;
				path = String(path).replaceAll('\\','/');
				if(this instanceof RealPromise) while(tempReg.test(path)) path = path.replaceAll(tempReg,'');else return Promise.reject();
				return pathSet[path] || (pathSet[path] = (temp = RealStory.StoryPromise(),document.head.appendChild((
					script = document.createElement('script'),script.onload = temp.resolve,script.onerror = temp.reject,script.src = path,script
				)),this._push(temp.promise.finally(onfinally.bind(script)))));
			} : function(){return Promise.reject(new Error('Mode error !'));};
		})();
		get length(){return this.list.length;}
		list = [];
		/**
		 * ### bind
		 * @param {Promise<T> | T} promise 
		 */
		constructor(promise){
			/**@type {Promise<T>} */
			this.self = Promise.resolve(promise).then(this._push = v=>(this.list.push(v),v),this._throw = e=>{throw this.list.push(e),e;});
			Reflect.defineProperty(this,'list',tempConfig);
			Reflect.defineProperty(this,'_push',tempConfig);
			Reflect.defineProperty(this,'_throw',tempConfig);
		}
	}(RealWorld.onload.then(()=>EXPORTS));
	RealPromise.self.finally(()=>RealNode.time(RealWorld.onload,time=>log('Set up\nin '+RealNode.makeNumStr0oTail(time)+' ms.')));

if(browserMode){

	var RealCanvas = class RealCanvas extends RealElement{
		/**
		 * @typedef {AntiTarget & {
		 * self: HTMLCanvasElement;
		 * temp: CanvasRenderingContext2D;
		 * backup: CanvasRenderingContext2D;
		 * img: HTMLImageElement;
		 * clearBeforeDraw: Boolean;
		 * ctx: CanvasRenderingContext2D;
		 * }} AntiCanvas 
		 * */
		static proto = class AntiCanvas extends RealTarget.proto{
			temp = document.createElement('canvas').getContext('2d');
			backup = document.createElement('canvas').getContext('2d');
			img = new Image;
			isElement = true;
			clearBeforeDraw = true;
			/**@type {CanvasRenderingContext2D} */
			ctx;
		}
		static useCache = true;
		/**@type {Map<String,HTMLImageElement>} */
		static srcImageMap = new Map;
		/**
		 * 
		 * @param {Number} n 
		 * @param {Number} length 
		 */
		static strN(n,length){return String(n).padStart(length,'0');}
		static preloadSrc(...srcArray){
			for(var temp = emptyArray.concat(...srcArray),i = temp.length;i --> 0;) temp[i] = RealCanvas.getImageBySrc(temp[i]);
			return Promise.allSettled(temp);
		}
		// /**@method @type {(src)=>Promise<HTMLImageElement>} */
		// static getImageBySrc(src){return new Promise((resolve,reject)=>{
		// 	const temp = RealCanvas.srcImageMap.get(src) ?? new Image;
		// 	temp.src ? resolve(temp) : src && typeof src === 'string' && !(RealCanvas.useCache && RealCanvas.srcImageMap.has(src)) ?
		// 	(temp.onload = ()=>(
		// 		RealCanvas.srcImageMap.set(src,temp),temp.onload = temp.onerror = resolve(temp)
		// 	),temp.onerror = reject,temp.src = src,temp) : reject();
		// })};
		/**@method @type {(src)=>Promise<HTMLImageElement>} */
		static getImageBySrc = (()=>{
			/**
			 * ### bind
			 * @param {String} src 
			 * @param {(value)=>void} resolve 
			 * @param {(reason?)=>void} reject 
			 */
			function dealWithSrc(src,resolve,reject){
				const temp = RealCanvas.srcImageMap.get(src) ?? new Image;
				temp.src ? resolve(temp) : src && typeof src === 'string' && !(RealCanvas.useCache && RealCanvas.srcImageMap.has(src)) ?
				(temp.onload = ()=>(
				 	RealCanvas.srcImageMap.set(src,temp),temp.onload = temp.onerror = resolve(temp)
				),temp.onerror = reject,temp.src = src,temp) : reject();
			}
			return src=>new Promise((resolve,reject)=>dealWithSrc(src,resolve,reject));
		})();
		static getRealGroupToClear = (()=>{
			class ConfigToClearShape{x = 0;y = 0;radiusX;radiusY;shape;relative;}
			/**
			 * ### bind
			 * @template {RealCanvas} T 
			 * @param {T} realCanvas 
			 * @param {{initFn?: ()=>void;fnBeforeClear?: (this: T)=>void;fnAfterClear?: (this: T)=>void;}} [param1] 
			 */
			return function getRealGroupToClear(realCanvas,{initFn,fnBeforeClear,fnAfterClear} = emptyObj){
				if(!(realCanvas instanceof RealCanvas)) throw new Error('=> "realCanvas" must be instanceof RealCanvas !');
				if(typeof fnAfterClear === 'function') fnAfterClear = ()=>fnAfterClear.call(realCanvas);
				if(typeof fnBeforeClear === 'function') fnBeforeClear = ()=>fnBeforeClear.call(realCanvas);
				const config = new ConfigToClearShape,temp = new RealGroup({self: config});
				return temp.addSetterListener(null,async()=>{
					await Promise.resolve(realCanvas.loaded).then(fnBeforeClear);
					await realCanvas.clearShape(config,config.shape).then(fnAfterClear);
				}),realCanvas.loaded.finally(initFn),temp;
			};
		})();
		protoTransform(){}
		protoGet(){return this.loaded.then(()=>this.proto.value);}
		clearAsync(){return this.loaded = Promise.resolve(this.loaded).then(()=>this.clear());}
		fix(imgOrCanvas = this.proto.temp.canvas){(this.proto.clearBeforeDraw ? this.clear() : this.proto.ctx).drawImage(imgOrCanvas,0,0);}
		/**### bind @returns {Promise<PromiseSettledResult<HTMLImageElement>[]>} */
		preloadSrc(...srcArray){return this.loaded = Promise.resolve(this.loaded).then(()=>RealCanvas.preloadSrc(...srcArray));}
		clear(){return this.proto.ctx.clearRect(0,0,this.proto.self.width,this.proto.self.height),this.proto.ctx.closePath(),this.proto.ctx;}
		clearTemp(){return this.proto.temp.clearRect(0,0,this.proto.self.width,this.proto.self.height),this.proto.temp.closePath(),this.proto.temp;}
		/**### bind */
		testSrc(src){return this.loaded = Promise.resolve(this.loaded).then(()=>RealCanvas.getImageBySrc(src)).then(()=>true,e=>this.rejectSrc(src,e));}
		/**### bind */
		rejectSrc(src,error){return src && console.error(error instanceof Error ? error : (
			RealCanvas.useCache && error && RealCanvas.srcImageMap.set(src),this+': Fail to load by src "'+src+'" !'
		)),false;}
		/**### bind */
		protoSet(src){
			return this.loaded = Promise.resolve(this.loaded).then(()=>RealCanvas.getImageBySrc(src)).
			then(img=>(this.proto.img = img,this.proto.value = src,true),e=>this.rejectSrc(src,e));
		}
		/**
		 * 
		 * @returns {Promise<Blob>}
		 */
		toBlob(){try{return RealWorld.cb2promise({thisArg: this.self,useFn: 'toBlob'}).then(
			result=>(result[0] instanceof Error ? (console.error(result[0]),new Blob) : result[0])
		);}catch(e){return console.error(e),Promise.resolve(new Blob);}}
		resizeBySrc(src){return this.loaded = Promise.resolve(this.loaded).then(()=>RealCanvas.getImageBySrc(src)).then(img=>{
			if(this.self.width !== img.naturalWidth) this.width = img.naturalWidth;
			if(this.self.height !== img.naturalHeight) this.height = img.naturalHeight;
		});}
		/**
		 * 
		 * @param {Boolean} react 
		 * @param {Boolean} notify 
		 * @param {Boolean} noSelf 
		 * @returns {Promise<Boolean>}
		 */
		realSet(value,react,notify,noSelf){
			var temp;
			return this.loaded = Array.isArray(value) ? this.multiDrawSrcArray({},...value).then(()=>{this.proto.value = value;}) :
			Promise.resolve(this.proto.set.call(
				this,
				this.proto.tryRealNode && (temp = this._computePositionsOfRNs(value)).length ?
				this._dealWithPositionsOfRNs(temp,value) : value
			) ?? true).then(v=>v && (this.fix(this.img),react && this.react?.(),notify && this.notify(noSelf),true)).catch(e=>(console.error(e),e));
		}
		multiDrawSrcArray({bgSrc,autoOpacity,resize},...srcArray){
			this.preloadSrc(bgSrc,srcArray);
			var i = -1,temp = bgSrc ?? srcArray[0] ?? false;
			resize && temp && this.resizeBySrc(temp);
			this.loaded = Promise.resolve(this.loaded).then(()=>this.clearTemp());
			if(Array.isArray(bgSrc)){for(temp = bgSrc.length;temp >++ i;) this.temp = bgSrc[i];}
			else bgSrc && typeof bgSrc === 'string' && (this.temp = bgSrc);
			if(srcArray.length > 1 && autoOpacity){
				for(i = srcArray.length,temp = 0;i --> 0;) this.tempOpacity = .625 ** i,this.temp = srcArray[temp++];
			}else for(i = -1,temp = srcArray.length;temp >++ i;) this.temp = srcArray[i];
			return this.loaded = Promise.resolve(this.loaded).then(()=>{this.fix(this.proto.temp.canvas);},e=>log(e?.stack ?? e));
		}
		/**
		 * 
		 * @param {{radiusX: Number;radiusY: Number;relative?: Boolean;}} param0 
		 * @param {'rect' | 'circle'} [shape] 
		 */
		applyMouseClear({radiusX,radiusY,relative} = emptyObj,shape){
			const self = this.proto.self,backup = this.proto.backup,nowStyle = getComputedStyle(self);
			const mouseenter = ()=>(backup.canvas.width = self.width,backup.canvas.height = self.height,backup.drawImage(self,0,0)),
			/**@type {(e: MouseEvent)=>Promise<void>} */
			mousemove = e=>(mouseleave(),this.clearShape({
				x: e.offsetX * self.width / +nowStyle.width.slice(0,-2),
				y: e.offsetY * self.height / +nowStyle.height.slice(0,-2),
				radiusX,radiusY,relative
			},shape)),mouseleave = ()=>this.clear().drawImage(backup.canvas,0,0),
			/**## 唯一可以取消该功能的函数 */
			cancelMouseClear = ()=>(
				self.removeEventListener('mouseenter',mouseenter),
				self.removeEventListener('mouseleave',mouseleave),
				self.removeEventListener('mousemove',mousemove)
			);
			self.addEventListener('mouseenter',mouseenter),self.addEventListener('mouseleave',mouseleave),self.addEventListener('mousemove',mousemove);
			return cancelMouseClear;
		}
		/**
		 * 
		 * @param {{x: Number;y: Number;radiusX: Number;radiusY: Number;relative?: Boolean;}} param0 
		 * @param {'rect' | 'circle'} [shape] 
		 */
		clearShape({x = 0,y = 0,radiusX,radiusY,relative} = emptyObj,shape){
			var failed = false;
			typeof radiusX === 'number' ? typeof radiusY === 'number' || (radiusY = radiusX) :
			typeof radiusY === 'number' ? radiusX = radiusY : failed = true;
			failed || (failed = !Number.isFinite(radiusX + radiusY));
			if(failed) return Promise.reject(new Error('"radiusX": '+String(radiusX)+' or "radiusY": '+String(radiusY)+' must be legal number !'));
			if(typeof x !== 'number') x = 0;if(typeof y !== 'number') y = 0;
			failed || (failed = !Number.isFinite(x + y));
			if(failed) return Promise.reject(new Error('"x": '+String(x)+' or "y": '+String(y)+' must be legal number !'));
			return this.loaded = Promise.resolve(this.loaded).then(()=>{
				const self = this.proto.self,temp = this.proto.temp;
				var i = 0,j;
				radiusX = Math.abs(relative ? radiusX * this.width / 2 : radiusX);
				radiusY = Math.abs(relative ? radiusY * this.height / 2 : radiusY);
				temp.canvas.width = self.width,temp.canvas.height = self.height;
				temp.drawImage(self,0,0);
				switch(shape){
					default: {
						x = Math.round(x),y = Math.round(y),radiusX = Math.ceil(radiusX),radiusY = Math.ceil(radiusY);
						const yPOW2 = radiusY ** 2,yDIVxPOW2 = yPOW2 / radiusX ** 2;
						while(i ++< radiusX) j = Math.floor(Math.sqrt(yPOW2 - i ** 2 * yDIVxPOW2)) + 1,temp.clearRect(x - i,y - j,i * 2,j * 2);
						break;
					}
					case 'rect': {
						temp.clearRect(Math.floor(x - radiusX),Math.floor(y - radiusY),Math.ceil(radiusX * 2),Math.ceil(radiusY * 2));
						this.clear().drawImage(temp.canvas,0,0);
						break;
					}
				}this.clear().drawImage(temp.canvas,0,0);
			}).catch(e=>console.error(e));
		}
		/**
		 * 
		 * @param {{
		 * prefix: String; suffix: String; startN: Number; length: Number; midLength?: Number;
		 * bgSrc?: String; playMode?: 0 | 1 | 2 | 3; timeSep?: Number; sizeMode?: 'std' | 'auto';
		 * resizeAfter?: Boolean;
		 * }} param0 
		 * @returns {{loaded: Promise<void>,finished: Promise<void>}}
		 */
		animate({
			prefix,suffix,startN = 0,length,midLength,
			bgSrc,playMode = 0,timeSep = 100,sizeMode = 'std',resizeAfter = true,
		} = emptyObj){
			const size = {width: this.width,height: this.height},config = '1235',srcArr = [];
			var i = startN + length + playMode;
			length *= config[playMode] || 1;
			timeSep /= config[playMode] || 1;
			while(i --> startN) srcArr.push(prefix+RealCanvas.strN(i,midLength)+suffix);
			return this.preloadSrc(srcArr),i = 0,{loaded: this.loaded,finished: this.loaded.then(()=>{
				var resize;
				/**@type {RealWorld} */
				const temp = new RealWorld(timeSep);
				switch(sizeMode){
					case 'auto': resize = true;break;
				}
				switch(playMode){
					default: while(length --> 0) temp.then(this.multiDrawSrcArray,this,{bgSrc,resize},prefix+RealCanvas.strN(startN++,midLength)+suffix);
					case 1:{
						while(length --> 0) temp.then(
							this.multiDrawSrcArray,this,{bgSrc,autoOpacity: true,resize},
							(i = !i) || prefix+RealCanvas.strN(startN++,midLength)+suffix,
							false,
							prefix+RealCanvas.strN(startN,midLength)+suffix
						);
						break;
					}
					case 2:{
						while(length --> 0) temp.then(
							this.multiDrawSrcArray,this,{bgSrc,autoOpacity: true,resize},
							1 === i ? prefix+RealCanvas.strN(startN + 1,midLength)+suffix : 2 === i && prefix+RealCanvas.strN(startN,midLength)+suffix,
							false,
							2 > i ? prefix+RealCanvas.strN(startN,midLength)+suffix : prefix+RealCanvas.strN(startN + 1,midLength)+suffix
						),3 ===++ i && (startN++,i %= 3);
						break;
					}
					case 3:{
						while(length --> 0) temp.then(
							// this.multiDrawSrcArray,this,{bgSrc,autoOpacity: true},
							// 3 === i ? prefix+RealCanvas.strN(startN,midLength)+suffix : 0 === i && prefix+RealCanvas.strN(startN + 1,midLength)+suffix,
							// 2 === i ? prefix+RealCanvas.strN(startN,midLength)+suffix : 1 === i && prefix+RealCanvas.strN(startN + 1,midLength)+suffix,
							// 2 > i ? prefix+RealCanvas.strN(startN,midLength)+suffix : prefix+RealCanvas.strN(startN + 1,midLength)+suffix
							this.multiDrawSrcArray,this,{bgSrc,autoOpacity: true,resize},
							1 === i ? prefix+RealCanvas.strN(startN + 1,midLength)+suffix : 4 === i && prefix+RealCanvas.strN(startN,midLength)+suffix,
							false,
							2 === i ? prefix+RealCanvas.strN(startN + 1,midLength)+suffix : 3 === i && prefix+RealCanvas.strN(startN,midLength)+suffix,
							false,
							3 > i ? prefix+RealCanvas.strN(startN,midLength)+suffix : 2 < i && prefix+RealCanvas.strN(startN + 1,midLength)+suffix
						),5 ===++ i && (startN++,i %= 5);
						break;
					}
				}
				return temp.then(()=>(this.clearTemp(),resizeAfter && Object.assign(this,size),temp.destroy()));
			})};
		}
		get ctx(){return this.proto.ctx;}
		get img(){return this.proto.img;}
		get imgW(){return this.proto.img.naturalWidth;}
		get imgH(){return this.proto.img.naturalHeight;}
		get width(){return this.proto.self.width;}
		set width(width){this.proto.self.width = this.proto.temp.canvas.width = width ?? 640;}
		get height(){return this.proto.self.height;}
		set height(height){this.proto.self.height = this.proto.temp.canvas.height = height ?? 360;}
		get self(){return this.proto.self;}
		set self(self){if(self instanceof HTMLCanvasElement) this.proto.ctx = (this.proto.self = self).getContext('2d');}
		get clearBeforeDraw(){return this.loaded.then(()=>this.proto.clearBeforeDraw);}
		set clearBeforeDraw(clearBeforeDraw){this.loaded = Promise.resolve(this.loaded).then(()=>this.proto.clearBeforeDraw = clearBeforeDraw);}
		get temp(){return this.proto.temp.canvas;}
		/**### bind */
		set temp(src){return this.proto.set.call(this,src).then(()=>(this.proto.temp.drawImage(this.img,0,0),true),e=>this.rejectSrc(src,e));}
		get opacity(){return this.loaded.then(()=>this.proto.ctx.globalAlpha);}
		/**@param {[(Promise<Number>|Number),Number]} opacityConfig */
		set opacity(opacityConfig){
			Array.isArray(opacityConfig) || (opacityConfig = [opacityConfig]);
			this.loaded = Promise.resolve(this.loaded).then(()=>opacityConfig[0]).
			then(value=>{this.proto.ctx.globalAlpha = value * (opacityConfig[1] ?? 1);});
		}
		/**@param {[(Promise<Number>|Number),Number]} opacityConfig */
		set tempOpacity(opacityConfig){
			Array.isArray(opacityConfig) || (opacityConfig = [opacityConfig]);
			this.loaded = Promise.resolve(this.loaded).then(()=>opacityConfig[0]).
			then(value=>{this.proto.temp.globalAlpha = value * (opacityConfig[1] ?? 1);});
		}
		loaded = RealNode.now;
		/**
		 * 
		 * @param {String | Element} id 
		 * @param {Number} [width] 
		 * @param {Number} [height] 
		 * @param {Boolean} [tryRealNode] 
		 * @param {...RealNode} [relativeRNs] 
		 */
		constructor(id,width,height,tryRealNode,...relativeRNs){
			var temp;temp = id;
			const self = temp instanceof Element ? (id = temp.id,temp) :
			(typeof temp === 'string' || (id = '',false)) && document.getElementById(temp);
			if(self) self instanceof HTMLCanvasElement || RealNode.error('=> "id" exists but not within an HTMLCanvasElement !');
			RealElement.addId(id,!self);
			temp = {id};
			super({self: self || RealElement.newXHTML('canvas',temp)},temp,tryRealNode,...relativeRNs);
			/**@type {AntiCanvas} */
			this.proto;
			this.width = width;
			this.height = height;
			this.proto.ctx = this.proto.self.getContext('2d');
		}
	};
	var RealLoader =
	/** @template {Boolean} T */
	class RealLoader extends RealElement{
		/**@typedef {AntiTarget & {onerror: null | (error: Error)=>void,onloadend: null | (n: Number)=>void}} AntiLoader */
		static proto = class AntiLoader extends RealTarget.proto{
			/**@type {null | (error: Error)=>void} */
			onerror;
			/**@type {null | (this: RealLoader)=>void} */
			onloadend;
		};
		static fs = (()=>{
			const initHEAD = {method: 'HEAD'},onfulfilled = r=>[,r],onrejected = e=>[e];
			class DocumentFs{get stat(){return DocumentFs.stat;}get readdir(){return DocumentFs.readdir;}}
				/**@type {(path: string | URL | Request,init?: RequestInit)=>[?Error,?Response]} */
			DocumentFs.fetch = (()=>{
				/**
				 * 
				 * @template {Response} T
				 * @param {T} response 
				 */
				const temp = response=>response.status < 300 ? response : RealLoader.error('Failed request !');
				return browserMode && document.location.protocol === 'file:' ?
				(path,init)=>fetch(path,(init = Object.assign({},init),init.mode = 'no-cors',init)).then(temp) :
				(path,init)=>fetch(path,Object(init)).then(temp);
			})();
			/**@type {(path: String)=>Promise<[Error | null,Stats | Response]>} */
			DocumentFs.stat = nodeMode ? (async (path)=>RealWorld.cb2promise({thisArg: await nodeFS,useFn: 'stat'},path)) :
			(path=>DocumentFs.fetch(path,initHEAD).then(onfulfilled,onrejected));
			/**@type {(path: String,...strArgs: (String | String[])[])=>Promise<[Error | null,String[]]>} */
			DocumentFs.readdir = nodeMode ?
			(async (path)=>RealWorld.cb2promise({thisArg: await nodeFS,useFn: 'readdir'},path)) :
			(async (path,...strArgs)=>{try{
				const length = strArgs.length;
				var i = length,fileName;
				/\/$/.test(path) || (path += '/');
				iLoop: while(i --> 0){
					if(Array.isArray(strArgs[i])){
						for(fileName = strArgs[i].length;fileName --> 0;) strArgs[i][fileName] = String(strArgs[i][fileName]);
						continue iLoop;
					}
					const str = String(strArgs[i]);
					if('\\' === str[0]) switch(str[1]){
						case 'w': strArgs[i] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';break;
						case 'd': strArgs[i] = '0123456789';break;
					}
					else strArgs[i] = [str];
				}
				const statList = [],testFileNameList = [],fileNameList = [];
				for(const temp = Array(length).fill(0);!('-1' in temp);){
					fileName = '';
					for(i = 0;i < length;i++) fileName+=strArgs[i][temp[i]];
					testFileNameList.push(fileName),fileName = path+fileName,statList.push(DocumentFs.stat(fileName));
					// log(fileName);
					for(temp[(i = length) - 1]++;i --> 0;) strArgs[i].length > temp[i] || (temp[i] = 0,temp[i - 1]++);
				}
				const resultList = await Promise.all(statList),limit = resultList.length;
				for(i = 0;i < limit;i++) resultList[i][0] ?? log(fileNameList.push(testFileNameList[i]),testFileNameList[i]);
				return [null,fileNameList];
			}catch(e){return [e,[]];}});
			return new DocumentFs;
		})();
		static _configDescriptor = (browserMode && addEventListener('click',async e=>{
			if(e.target.classList.contains('RealLoader')) for(const temp of RealTarget.searchByObj(e.target)) if(temp instanceof RealLoader){
				try{const err = (await RealLoader.load(temp))[0];err ? temp.onerror?.(err) : temp.onloadend?.();}catch(e){console.error(e);}
				temp.notify(true);
				temp.react?.();
				break;
			}
		}),{writable: false,enumerable: false,configurable: false});
		static getArrayBufferFrom(data){return Promise.resolve(
			data instanceof ArrayBuffer ? data : ArrayBuffer.isView(data) ? data.buffer :
			data instanceof Blob ? data.arrayBuffer() : new Blob(Array.isArray(data) ? data.join('') : String(data)).arrayBuffer()
		);}
		/**@type {(realLoader: RealLoader)=>Promise<[Error | null,Number | undefined]>} @method */
		static load = (
			nodeMode ? (async (realLoader)=>{try{
				if('upload' === realLoader.type){
					const temp = realLoader.temp.files;
					return realLoader.temp.click(),await RealWorld.onceIf(()=>temp !== realLoader.temp.files,10),[];
				}
				const fs = await nodeFS;
				const data = await realLoader.dataGetter();
				const {1: prefix = 'file',2: suffix = ''} = /(.+)(\..+)/.exec(realLoader.temp.download) || emptyArray;
				const result = await RealWorld.cb2promise({thisArg: fs,useFn: 'stat'},'./'+realLoader.temp.download);
				if(!result) this.error('Unknown Error !');
				if(result[0]) return RealLoader.getArrayBufferFrom(data).
				then(ab=>RealWorld.cb2promise({thisArg: fs,useFn: 'writeFile'},'./'+realLoader.temp.download,Buffer.from(ab)));
				for(var i = 1;true;i++){
					const path = './'+prefix+' - '+i+suffix;
					if((await RealWorld.cb2promise({thisArg: fs,useFn: 'stat'},path))[0]) return RealLoader.getArrayBufferFrom(data).
					then(ab=>RealWorld.cb2promise({thisArg: fs,useFn: 'writeFile'},path,Buffer.from(ab)));
				}
			}catch(e){return [e];}}) :
			(()=>{
				const toBlob = data=>new Blob(data);
				return async (realLoader)=>{try{
					if('upload' === realLoader.type){
						const temp = realLoader.temp.files;
						return realLoader.temp.click(),await RealWorld.onceIf(()=>temp !== realLoader.temp.files,10),[];
					}
					const data = await realLoader.dataGetter();
					const href = URL.createObjectURL(await(
						typeof data === 'string' ? new Blob([data]) : data instanceof Blob ? data : RealLoader.getArrayBufferFrom(data).then(toBlob)
					));
					return realLoader.temp.href = href,realLoader.temp.click(),URL.revokeObjectURL(href),[];
				}catch(e){return [e];}}
			})()
		);
		load(){return RealLoader.load(this);}
		protoSet(value){return this.self[this.key] = String(value),false;}
		/**@type {(this: RealLoader<false>)=>FileList} */
		get files(){return 'upload' === this.type ? this.temp.files : this.error('I\'m an downloader without files !');}
		get onerror(){return this.proto.onerror;}
		set onerror(onerror){this.proto.onerror = typeof onerror === 'function' ? onerror : null;}
		get onloadend(){return this.proto.onloadend;}
		set onloadend(onloadend){this.proto.onloadend = typeof onloadend === 'function' ? onloadend : null;}
		/**@this {RealLoader<true>} */
		get fileName(){return 'upload' === this.type ? this.error('Uploader bans "fileName" !') : this.temp.download;}
		/**@this {RealLoader<true>} */
		set fileName(fileName){
			'upload' === this.type && this.error('Uploader bans "fileName" !');
			typeof fileName === 'symbol' && this.error('"fileName" must be String but not Symbol !');
			if(nodeMode && !/^\.\//.test(fileName)) fileName = './'+fileName;
			this.temp.download = fileName;
		}
		/**@type {()=>*} */
		dataGetter;
		// /**@type {Promise<Buffer | String>} */
		// data;
		/**
		 * 
		 * @param {T} isDownload 
		 * @param {String} fileName 
		 * @param {()=>*} dataGetter 
		 * @param {{innerHTML?: String;onerror?: (e)=>void;onloadend?: (this: RealLoader)=>void;}} param3 
		 */
		constructor(isDownload,fileName,dataGetter,{innerHTML,onerror,onloadend} = emptyObj){
			super({self: document.createElement('div'),key: 'innerHTML'});
			/**@type {AntiLoader} */
			this.proto;
			this.onerror = onerror;
			this.onloadend = onloadend;
			this.dataGetter = dataGetter;
			this.value = innerHTML;
			isDownload = Boolean(isDownload);
			/**@type {T extends true ? HTMLAnchorElement : HTMLInputElement} */
			this.temp = document.createElement(isDownload ? 'a' : 'input');
			Reflect.defineProperty(this,'temp',RealLoader._configDescriptor);
			/**@type {T extends true ? 'download' : 'upload'} */
			this.type = isDownload ? (this.fileName = fileName || 'file','download') : (this.temp.type = 'file','upload');
			Reflect.defineProperty(this,'type',RealLoader._configDescriptor);
		}
	};
	var RealSelect = class RealSelect extends RealElement{
		/**@typedef {AntiTarget & {list: HTMLOptionElement[]}} AntiSelect */
		static proto = class AntiSelect extends RealTarget.proto{
			/**@type {HTMLOptionElement[]} */
			list = [];
		};
		/**
		 * 
		 * @this {RealSelect}
		 * @param {RealNode} realNode 
		 */
		static _react(realNode,react = true,notify = true,noSelf = true){try{
			var value,i;
			const temp = this._getPositionsOfChildRN(realNode);
			while(temp.length){
				const position = temp.pop().reverse(),tempValue = realNode.value;
				if(!position.length) return this.realSet(tempValue,react,notify,noSelf);else{
					value = this.proto.value;
					while(position.length > 1) value = value[position.pop()];
					tempValue === value[position[0]] || (value[position[0]] = tempValue);
					if(value === this.proto.value){
						i = 0;
						fix:for(const key of Object.keys(value)) if(key !== position[0]) i++;else{
							this.proto.list[i].value = String(tempValue);
							break fix;
						}
					}
				}
			}
			return react && this.react?.(noSelf),notify && this.notify(noSelf),true;
		}catch(e){
			if(this instanceof RealSelect) throw e;
			this.error('Please avoid using method "react" of typeof '+this?.name+' !\n'+e.message);
		}}
		/**
		 * 
		 * @param {{[text: String]: String}} value 
		 */
		protoSet(value){return this.proto.value = Object.assign({},value),true;}
		fix(){
			this.self[this.key] = this.protoTransform(this.proto.value);
			this.proto.list = Array.from(this.self.children);
			return this;
		}
		getValueIndexs(){
			var i = this.proto.list.length,temp = [];
			while(i --> 0) this.proto.list[i].selected && temp.push(i);
			return temp.reverse();
		}
		/**
		 * 
		 * @returns {String[]}
		 */
		protoGet(){
			const valueArray = [],list = this.proto.list,end = list.length;
			for(var i = 0;i < end;i++){list[i].selected && valueArray.push(list[i].value);}
			return valueArray;
		}
		/**
		 * 
		 * @param {*[]} value 
		 */
		protoTransform(value,defaultKey = String(this.defaultKey),defaultValue = String(this.defaultValue)){
			var now;
			if(this instanceof RealSelect && !this.self.multiple) value = Object.assign({[defaultKey]: defaultValue},value);
			const innerHTML = [],iterator = Object.entries(value).sort((a,b)=>a[0].localeCompare(b[0])).sort((a,b)=>a[0] - b[0]).values();
			while(!(now = iterator.next()).done)
				innerHTML.push(`<option value="${String(now.value[1])}" ${now.value[0] === defaultKey ? 'selected' : ''}>${now.value[0]}</option>`);
			return innerHTML.join('');
		}
		/**@returns {Element[]} */
		get list(){return this.proto.list;}
		/**
		 * 
		 * @param {String | Element} id 
		 * @param {Boolean} multiple 
		 * @param {{[text: String]: String}} optionConfig 
		 * @param {Boolean} [tryRealNode] 
		 * @param {String} [defaultKey] 
		 * @param {String} [defaultValue] 
		 * @param {(e: Event)=>void} [onchange] 
		 */
		constructor(id,multiple,optionConfig,tryRealNode,defaultKey,defaultValue,onchange){
			const temp = id,self = temp instanceof Element ? (id = temp.id,temp) :
			(typeof temp === 'string' || (id = '',false)) && document.getElementById(temp);
			if(self) self instanceof HTMLSelectElement ? Object.assign(self,{multiple,onchange}) :
			RealNode.error('=> "id" exists but not within an HTMLSelectElement !');
			RealElement.addId(id,!self);
			super({
				key: 'innerHTML',self: self || RealElement.newXHTML('select',{id,multiple,onchange})
			},{id,initValue: Object.assign({},optionConfig)},tryRealNode);
			/**@type {AntiSelect} */this.proto;
			this.defaultKey = defaultKey ?? '_';
			this.defaultValue = defaultValue ?? '';
			this.fix();
		}
	};
	var RealComtag = class RealComtag extends RealElement{
		/**@type {Map<String,[*[],Boolean,HTMLDivElement,((this: RealComtag)=>void) | null]>} */
		static comtagClassMap = new Map;
		/**
		 * 
		 * @param {String} className 
		 * @param {{
		 * optionList?: [];
		 * tryRealNode?: Boolean;
		 * selfAssign?: HTMLDivElement;
		 * cssRuleObjObj?: {[selector: String]: {[styleName: String]: String}};
		 * callback?: (this: RealDivList)=>void;
		 * }} config 
		 */
		static defineComtagClass(className,config){
			const {optionList = [],tryRealNode,selfAssign,cssRuleObjObj,callback} = config || emptyObj;
			/^([A-Za-z]\w*)$/.test(className) || this.error('Illegal "className" !');
			this.comtagClassMap.has(className) && this.error('"className" repeated !');
			optionList?.[Symbol.iterator] || this.error('"optionList" must be Array !');
			this.addCSSRules('.'+className,cssRuleObjObj);
			this.comtagClassMap.set(className,[optionList,tryRealNode,selfAssign,typeof callback === 'function' ? callback : null]);
		}
		static createByClassName(className,...argArray){Comtag
			const config = this.comtagClassMap.get(className);
			config || this.error('"className" not found !');
			const temp = new RealComtag('',config[0],config[1],config[2]);
			return config[3] && config[3].apply(temp,argArray),temp.addClassName(className),temp;
		}
		protoTransform(value){return RealElement.newElements('',value,true);}
		fix(){return this.self.innerHTML = '',this.self.appendChild(this.transform(this.proto.value)),this;}
		/**
		 * 
		 * @param {(Element | String)[]} value 
		 */
		protoSet(value){
			if(!value?.[Symbol.iterator]) throw new Error('=> "value" must be Array !');
			/**@type {[IteratorYieldResult<String>,IteratorYieldResult<String>]} */
			const temp = Array(2),iter1 = tryYieldKey(value,'tagName',''),iter0 = tryYieldKey(this.proto.value,'tagName','');
			while((temp[0] = iter0.next(),temp[1] = iter1.next(),!temp[0].done ^ temp[1].done)) if(temp[0].done) break;
			else if(temp[0].value.toLowerCase() !== temp[1].value.toLowerCase()) return this.proto.value = Array.from(value),true;
			return false;
		}
		/**
		 * 
		 * @param {String | Element} id 
		 * @param {String[]} optionList 
		 * @param {Boolean} [tryRealNode] 
		 * @param {HTMLDivElement} [selfAssign] 
		 */
		constructor(id,optionList,tryRealNode,selfAssign){
			const temp = id,self = temp instanceof Element ? (id = temp.id,temp) :
			(typeof temp === 'string' || (id = '',false)) && document.getElementById(temp);
			RealElement.addId(id,!self);
			super({self: self || RealElement.newXHTML('div',selfAssign)},{
				id,initValue: optionList?.[Symbol.iterator] ? Array.from(optionList) : []
			},tryRealNode);
			this.fix().proto.self.id = id;
		}
	};
	var RealSVG = class RealSVG extends RealComtag{
		/**
		 * 
		 * @template {Boolean | Node | []} T
		 * @param {String[]} hrefList 
		 * @param {T} [toDocumentFragment] 
		 * @returns {T extends true ? DocumentFragment : SVGImageElement[]}
		 */
		static newImages(hrefList,toDocumentFragment){
			const iter = hrefList[Symbol.iterator]();
			if(toDocumentFragment) for(hrefList of (toDocumentFragment = new DocumentFragment(),iter)) try{
				toDocumentFragment.appendChild(document.createElementNS('http://www.w3.org/2000/svg','image')).href.baseVal = String(hrefList);
			}catch(e){console.error(e);}
			else for(hrefList of (toDocumentFragment = [],iter)) try{
				const SVGImage = document.createElementNS('http://www.w3.org/2000/svg','image');
				toDocumentFragment.push(SVGImage),SVGImage.href.baseVal = String(hrefList);
			}catch(e){console.error(e);}
			return toDocumentFragment;
		}
		protoTransform(value){return RealElement.newElements('svg',value,true);}
		/**
		 * 
		 * @template {keyof SVGElementTagNameMap} T
		 * @param {T} tagName 
		 * @param {(keyof SVGElementTagNameMap)[]} [optionList] 
		 * @param {SVGElementTagNameMap[T]} [selfAssign] 
		 * @param {(this: RealSVG,children: SVGElement[])=>void} [callback] 
		 */
		constructor(tagName,optionList,selfAssign,callback){
			super(RealElement.newSVG(tagName,selfAssign),optionList,false);
			typeof callback === 'function' && callback.call(this,Array.from(this.proto.self.children));
		}
	};
	var RealDivList = class RealDivList extends RealElement{
		/**@typedef {AntiTarget & {list: Element[],childrenList: Element[][]}} AntiList */
		static proto = class AntiList extends RealTarget.proto{
			/**@type {HTMLDivElement[]} */
			list = [];
			/**@type {Element[][]} */
			childrenList = [];
		}
		/**@type {Map<String,[Boolean,*[],Boolean,{[selector: String]: {[styleName: String]: String}},((this: RealDivList)=>void) | null]>} */
		static divListClassMap = new Map;
		/**
		 * 
		 * @param {Number} length 
		 * @param {String} tagName 
		 * @param {String} [id] 
		 * @param {HTMLDivElement} [selfAssign] 
		 */
		static createList(length = 0,tagName,id,selfAssign){
			const temp = [];
			while(length --> 0) temp.push(document.createElement(tagName));
			return new RealDivList(id,true,temp,RealDivList.tryRealNode,selfAssign);
		}
		/**
		 * 
		 * @this {RealDivList}
		 * @param {RealNode} realNode 
		 */
		static _react(realNode,react = true,notify = true,noSelf = true){try{
			var value;
			const temp = this._getPositionsOfChildRN(realNode);
			while(temp.length){
				const position = temp.pop().reverse().concat(),tempValue = realNode.value;
				if(!position.length) return this.realSet(tempValue,react,notify,noSelf);else{
					value = this.proto.value;
					while(position.length > 1) value = value[position.pop()];
					tempValue === value[position[0]] || (value[position[0]] = tempValue);
					if(value === this.proto.value) (position[1] = this.proto.list[position[0]]).innerHTML = '';
					tempValue instanceof Element ? position[1].appendChild(tempValue) :
					this.tryHTML ? position[1].innerHTML = tempValue : position[1].textContent = tempValue;
				}
			}
			return react && this.react?.(noSelf),notify && this.notify(noSelf),true;
		}catch(e){
			if(this instanceof RealDivList) throw e;
			this.error('Please avoid using method "react" of typeof '+this?.name+' !\n'+e.message);
		}}
		/**
		 * 
		 * @param {String} className 
		 * @param {{
		 * tryHTML?: Boolean;
		 * optionList?: [];
		 * tryRealNode?: Boolean;
		 * selfAssign?: HTMLDivElement;
		 * cssRuleObjObj?: {[selector: String]: {[styleName: String]: String}};
		 * callback?: (this: RealDivList)=>void;
		 * }} config 
		 */
		static defineDivListClass(className,config){
			const {tryHTML,optionList = [],tryRealNode,selfAssign,cssRuleObjObj,callback} = config || emptyObj;
			/^([A-Za-z]\w*)$/.test(className) || this.error('Illegal "className" !');
			this.divListClassMap.has(className) && this.error('"className" repeated !');
			optionList?.[Symbol.iterator] || this.error('"optionList" must be Array !');
			this.addCSSRules('.'+className,cssRuleObjObj);
			this.divListClassMap.set(className,[tryHTML,optionList,tryRealNode,selfAssign,typeof callback === 'function' ? callback : null]);
		}
		static createByClassName(className,...argArray){
			const config = this.divListClassMap.get(className);
			config || this.error('"className" not found !');
			const temp = new RealDivList('',config[0],config[1],config[2],config[3]);
			return config[4] && config[4].apply(temp,argArray),temp.addClassName(className),temp;
		}
		/**
		 * 
		 * @returns {Element[]}
		 */
		protoGet(){return this.proto.list;}
		/**
		 * 
		 * @param {(Element | String)[]} value 
		 */
		protoSet(value){return this.proto.value = Array.from(value),true;}
		/**
		 * 
		 * @param {*[]} value 
		 */
		protoTransform(value){
			var list = [],temp,ele;
			try{var iter = value[Symbol.iterator]();}catch{throw new Error('=> "value" must be Array !');}
			while(!(temp = iter.next()).done) list.push(ele = document.createElement('div')),
			temp.value instanceof Element ? ele.appendChild(temp.value) :
			this.tryHTML ? ele.innerHTML = String(temp.value) : ele.textContent = String(temp.value);
			return list;
		}
		/**
		 * 
		 * @param {Boolean} [toRealElement] 
		 * @param {String} [key] 
		 * @returns {{[id: String]: Element} | {[id: String]: RealElement}}
		 */
		getIdDict(toRealElement,key){
			/**@type {{[id: String]: Element} | {[id: String]: RealElement}} */
			const list = Object.create(null);
			var i = this.proto.list.length,temp;
			if(toRealElement) while(i --> 0) (temp = this.proto.childrenList[i]).length > 1 || !temp[0]?.id ||
			(list[temp[0].id] = new RealElement({self: this.proto.list[i],key}));
			else while(i --> 0) (temp = this.proto.childrenList[i]).length > 1 || !temp[0]?.id ||
			(list[temp[0].id] = this.proto.list[i]);
			return list;
		}
		/**
		 * 
		 * @returns {RealElement[]}
		 */
		getRealEmentList(){
			const temp = this.proto.list.concat();
			for(var i = temp.length;i --> 0;) temp[i] = new RealElement({self: temp[i]});
			return temp;
		}
		fix(){
			var i = 0;
			/**@type {HTMLDivElement[]} list */
			const list = this.proto.list = this.transform(this.proto.value),childrenList = this.proto.childrenList = [];
			const elementList = RealElement.makeElementByString._clear();
			while(i < list.length){childrenList.push(Array.from(elementList.appendChild(list[i++]).children));}
			this.self.innerHTML = '';
			this.self.appendChild(elementList);
			return this;
		}
		/**@type {Element[][]} */
		get childrenList(){return this.proto.childrenList;}
		/**
		 * 
		 * @param {String | Element} id 
		 * @param {Boolean} tryHTML 
		 * @param {(Element | String)[]} optionList 
		 * @param {Boolean} [tryRealNode] 
		 * @param {HTMLDivElement} [selfAssign] 
		 */
		constructor(id,tryHTML,optionList,tryRealNode,selfAssign){
			const temp = id,self = temp instanceof Element ? (id = temp.id,temp) :
			(typeof temp === 'string' || (id = '',false)) && document.getElementById(temp);
			RealElement.addId(id,!self);
			super({self: self || RealElement.newXHTML('div',selfAssign)},{
				id,initValue: optionList?.[Symbol.iterator] ? Array.from(optionList) : []
			},tryRealNode);
			/**@type {AntiList} */this.proto;
			this.tryHTML = tryHTML;
			this.fix().proto.self.id = id;
		}
	};
	var RealImgList = class RealImgList extends RealDivList{
		/**
		 * 
		 * @this {RealImgList}
		 * @param {RealNode} realNode 
		 */
		static _react(realNode,react = true,notify = true,noSelf = true){try{
			var value;
			const temp = this._getPositionsOfChildRN(realNode);
			while(temp.length){
				const position = temp.pop().reverse(),tempValue = realNode.value;
				if(!position.length) return this.realSet(tempValue,react,notify,noSelf);else{
					value = this.proto.value;
					while(position.length > 1) value = value[position.pop()];
					tempValue === value[position[0]] || (value[position[0]] = tempValue);
					if(value === this.proto.value) this.proto.childrenList[position[0]][0].src = String(tempValue?.src ?? tempValue);
				}
			}
			return react && this.react?.(noSelf),notify && this.notify(noSelf),true;
		}catch(e){
			if(this instanceof RealImgList) throw e;
			this.error('Please avoid using method "react" of typeof '+this?.name+' !\n'+e.message);
		}}
		/**
		 * 
		 * @returns {HTMLImageElement[]}
		 */
		cloneImgList(){
			const temp = this.childrenList.concat();
			for(var i = temp.length;i --> 0;) temp[i] = temp[i][0].cloneNode();
			return temp;
		}
		/**
		 * 
		 * @param {*[]} value 
		 */
		protoTransform(value){
			var list = [],temp,img;
			try{var iter = value[Symbol.iterator]();}catch{throw new Error('=> "value" must be Array !');}
			while(!(temp = iter.next()).done) list.push(temp.done = document.createElement('div')),
			temp.done.appendChild(temp.value instanceof Image ? temp.value : ((img = new Image()).src = String(temp.value),img));
			return list;
		}
		/**
		 * 
		 * @param {(Element | String)[]} value 
		 */
		protoSet(value){
			if(!value?.[Symbol.iterator]) throw new Error('=> "value" must be Array !');
			/**@type {[IteratorYieldResult<String>,IteratorYieldResult<String>]} */
			const temp = Array(2),iter1 = tryYieldKey(value,'src',''),iter0 = tryYieldKey(this.proto.value,'src','');
			while((temp[0] = iter0.next(),temp[1] = iter1.next(),!temp[0].done ^ temp[1].done)) if(temp[0].done) break;
			else if(temp[0].value !== temp[1].value) return this.proto.value = Array.from(value),true;
			return false;
		}
		/**
		 * 
		 * @param {String} id 
		 * @param {(Element | String)[]} srcList 
		 * @param {Boolean} [tryRealNode] 
		 * @param {HTMLDivElement} [selfAssign] 
		 */
		constructor(id,srcList,tryRealNode,selfAssign){super(id,true,srcList,tryRealNode,selfAssign);}
	};
	var RealDivQueue = class RealDivQueue extends RealDivList{
		/**@typedef {AntiList & {queueArray: Number[]}} AntiQueue */
		static proto = class AntiQueue extends RealDivList.proto{
			/**@type {Number[]} */
			queueArray;
		}
		/**@type {Element} */
		static tempTarget = void(browserMode && (RealWorld.onload.then(()=>RealElement.addCSSRules('.RealDivQueue',{
			// '>div': {'transition-duration':'.1s'},
			'>div:hover': {'transform':'scale(1.1,1)'},
			'>div:active': {'transform':'scale(1.2,1)'},
		})),addEventListener('mousedown',e=>(RealDivQueue.tempTarget = e.target)),addEventListener('mouseup',e=>{
			/**@type {RealDivQueue} */
			var realDivQueue,target,queue;
			const list0 = [target = RealDivQueue.tempTarget];
			while(target = target.parentElement) list0.push(target);
			const list1 = [target = e.target];
			while(target = target.parentElement) list1.push(target);
			if(list0.pop() !== list1.pop()) return;
			target = [];
			while((target[0] = list0.pop()) === (target[1] = list1.pop())) if(!list0.length) return;
			const [target0,target1] = target;
			if(!target0 || !target1) return;
			/**@type {Element} */
			const temp = target0.parentElement;
			if(temp.classList.contains('RealDivQueue')){
				for(realDivQueue of RealTarget.searchByObj(temp)) if(realDivQueue instanceof RealDivQueue) break;
				queue = realDivQueue.queueArray;
				queue = (target[0] = queue.indexOf(realDivQueue.proto.list.indexOf(target[0]))) >
				(target[1] = queue.indexOf(realDivQueue.proto.list.indexOf(target[1]))) ?
				queue.slice(0,target[1]).concat(queue[target[0]],queue.slice(target[1],target[0]),queue.slice(target[0] + 1)) :
				queue.slice(0,target[0]).concat(queue.slice(target[0] + 1,target[1] + 1),queue[target[0]],queue.slice(target[1] + 1));
				realDivQueue.applyQueue(queue,target0,target1);
			}
		})));
		getListQueue(){
			/**@type {AntiQueue} */this.proto;
			/**@type {Element[]} */
			const temp = this.queueArray;
			for(var i = temp.length;i --> 0;) temp[i] = this.proto.list[temp[i]];
			return temp;
		}
		fix(){
			var i = 0;
			/**@type {HTMLDivElement[]} list */
			const list = this.proto.list = this.transform(this.proto.value),childrenList = this.proto.childrenList = [];
			while(i < list.length) childrenList.push(Array.from(list[i++].children));
			return this.applyQueue([]);
		}
		/**
		 * 
		 * @param {Number[]} queueArray 
		 * @param {Element} [target0] 
		 * @param {Element} [target1] 
		 * @returns 
		 */
		applyQueue(queueArray,target0,target1){
			const previousQueue = this.queueArray ?? [];
			const temp = Array.isArray(queueArray);queueArray = temp ? queueArray.slice(0,this.proto.list.length) : previousQueue;
			const list = this.proto.list.concat(),length = list.length,top = this.self.scrollTop,left = this.self.scrollLeft;
			var i = length;
			while(i --> 0) queueArray[i] == null && (queueArray[i] = i),queueArray.indexOf(i) === -1 && this.error('Illegal "queueArray" !');
			i = [previousQueue.indexOf(this.proto.list.indexOf(target0)),previousQueue.indexOf(this.proto.list.indexOf(target1))];
			if(i[0] !== -1 && i[1] !== -1) i[0] < i[1] ? target1.insertAdjacentElement('afterend',target0) :
			target1.insertAdjacentElement('beforebegin',target0);
			else{
				i = 0;
				const elementList = RealElement.makeElementByString._clear();
				while(i < length) elementList.appendChild(list[queueArray[i++]]);
				this.self.classList.add('disappear');
				this.self.innerHTML = '';
				this.self.appendChild(elementList);
				this.self.scrollTo({top,left,behavior: 'instant'});
				this.self.classList.remove('disappear');
			}
			this.proto.queueArray = queueArray;
			if(temp) this.react?.(),this.notify(true);
			return this;
		}
		/**@type {Number[]} */
		get queueArray(){return this.proto.queueArray?.concat?.();}
	};
	/**
	 * 
	 * @param {{[key: String]: *}} [optionConfig] 
	 * @param {Boolean} [multiple] 
	 * @param {(this: RealDivList,e: Event)=>void} [onchange] 
	 */
	var createRealDivSelect = (optionConfig,multiple,onchange)=>RealDivList.createByClassName('realDivSelect',optionConfig,multiple,onchange);
	RealWorld.onload = RealWorld.onload.
	finally(()=>RealDivList.defineDivListClass('realDivSelect',{tryRealNode: true,cssRuleObjObj: {
		'': {'background':'linear-gradient(135deg,#fff,#000)'},
		'>div': {'background-color':'#333','transform':'scale(0.8,1)'},
		'>div:hover': {'transform':'scale(0.9,1)'},
		'>.selected': {'background-color':'#555','transform':'scale(1)','font-weight':'bolder'},
	},callback: (()=>{
		const changeConfig = {bubbles: true,cancelable: false};
		/**@type {(this: RealDivList)=>*[]} */
		function tempGet(){
			const temp = [],list = this.proto.list;
			for(var i = 0;list[i];i++) list[i].classList.contains('selected') && temp.push(this.info.optionList[i]);
			this.info.multiple || temp.length || !i || (list[0].classList.add('selected'),temp.push(this.info.optionList[0]));
			return temp;
		}
		/**@type {(this: RealDivList,value: {})=>false} */
		function tempSet(value){
			for(const key of (
				this.info.optionList = [],
				this.proto.value = Object.keys(value = Object(value)).sort().sort((a,b)=>a - b)
			)) this.info.optionList.push(value[key]);
			return this.fix().value,false;
		}
		/**@type {(RS: RealDivList)=>Boolean} */
		async function tempReact(RS){return RS.react?.(),await RS.notify(),RS.self.dispatchEvent(new Event('change',changeConfig));}
		addEventListener('click',e=>{
			/**@type {?Element} */
			const parentElement = e.target.parentElement;
			if(!parentElement || !parentElement.classList.contains('realDivSelect')) return;
			var i = 0,REList,temp;
			REList = RealTarget.searchByObj(parentElement);
			while(temp = REList.pop()) if(temp instanceof RealDivList) break;
			if(!temp) return;
			const RS = temp,previousValue = RS.value[0];
			REList = RS.proto.list;
			if(RS.info.multiple) return e.target.classList.toggle('selected'),tempReact(RS);
			while(temp = REList[i++]) e.target === temp ? temp.classList.add('selected') : temp.classList.remove('selected');
			previousValue === RS.value[0] || tempReact(RS);
		});
		/**@type {(this: RealDivList,optionConfig?: {[key: String]: *},multiple?: Boolean,onchange?: (this: RealDivList,e: Event)=>void)=>void} */
		return function(optionConfig,multiple,onchange){
			this.get = tempGet;
			this.set = tempSet;
			this.info = Object(this.info);
			this.info.multiple = Boolean(multiple);
			/**### bind */
			if(typeof onchange === 'function') this.self.onchange = e=>onchange.call(this,e);
			this.value = optionConfig;
		};
	})()}));
	/**
	 * 
	 * @param {String} [placeholder] 
	 */
	var createRealDivSearch = placeholder=>RealDivList.createByClassName('realDivSearch',placeholder);
	RealWorld.onload = RealWorld.onload.
	finally(()=>RealDivList.defineDivListClass('realDivSearch',{callback: (()=>{
		/**@type {RealDivList} */
		var tempRealDivList;
		const changeConfig = {bubbles: true,cancelable: false},now = Promise.resolve();
		/**@type {(this: RealDivList)=>String} */
		function tempGet(){return this.info.inputer.value;}
		/**@type {(target: Element)=>void} */
		function tempReact(target){tempRealDivList && target !== tempRealDivList.info.inputer && (
			tempRealDivList.info.matcher.value = {},tempRealDivList.react?.(),tempRealDivList.notify(true)
		);}
		/**@type {(this: RealDivList,value: *[])=>false} */
		function tempSet(value){
			Array.isArray(value) ? this.info.wordList = value : this.error('"value must be Array !');
			return now.then(()=>this.info.inputer.dispatchEvent(new Event('input',changeConfig))),
			(tempRealDivList || (tempRealDivList = this)).info.matcher.value = {},false;
		}
		addEventListener('click',e=>RealNode.afterNow(()=>tempReact(e.target)));
		RealElement.addEventListenerBySelectors('.RealDivList.realDivSearch>:nth-child(1)>textarea','click',async e=>(
			await 0,e.target.dispatchEvent(new Event('input',changeConfig))
		));
		RealElement.addEventListenerBySelectors('.RealDivList.realDivSearch>:nth-child(1)>textarea','input',e=>{
			var REList = RealTarget.searchByObj(e.target.parentElement.parentElement),temp;
			while(temp = REList.pop()) if(temp instanceof RealDivList) break;
			if(!temp) return;
			const testReg = new RegExp(temp.info.inputer.value,'i');
			temp.info.matcher.value = RealNode.arrayToObject(temp.info.wordList.filter(str=>testReg.test(String(str))));
		});
		RealElement.addEventListenerBySelectors('.RealDivList.realDivSearch>:nth-child(2)>div>div','click',e=>{
			var REList = RealTarget.searchByObj(e.target.parentElement.parentElement.parentElement),temp;
			while(temp = REList.pop()) if(temp instanceof RealDivList) break;
			if(!temp) return;
			temp.info.inputer.value = temp.info.matcher.value[0];
			tempRealDivList = temp;
			tempRealDivList.react?.(),tempRealDivList.notify(true);
			// (tempRealDivList = temp).info.inputer.dispatchEvent(new Event('input',changeConfig));
		});
		/**@type {(this: RealDivList)=>void} */
		return function(placeholder){
			const matcher = RealDivList.createByClassName('realDivSelect');
			this.proto.value = ['<textarea placeholder="'+String(placeholder)+'"></textarea>',matcher.self];
			this.fix().info = Object(this.info);
			this.info.inputer = this.proto.childrenList[0][0];
			this.info.matcher = matcher;
			this.info.wordList = [];
			this.get = tempGet;
			this.set = tempSet;
		};
	})(),tryHTML: true,tryRealNode: true,cssRuleObjObj: {'>:nth-child(2)>div>div:hover': {'transform':'scale(0.9,1)'}}}));
	/**
	 * 
	 * @param {String | RealNode | ()=>String} titleGetter 
	 */
	var createRealDivSeries = titleGetter=>RealDivList.createByClassName('realDivSeries',titleGetter);
	RealWorld.onload = RealWorld.onload.
	finally(()=>RealDivList.defineDivListClass('realDivSeries',{tryRealNode: true,cssRuleObjObj: {
		'>div:nth-child(1)': {'font-weight':'bolder'},
		'.hidden>div:nth-child(n + 2)': {'display':'none'},
	},callback: (()=>{
		RealElement.addEventListenerBySelectors('.RealDivList.realDivSeries>div:nth-child(1)','click',e=>{
			var REList = RealElement.searchByObj(e.target.parentElement),temp;
			while(temp = REList.pop()) if(temp instanceof RealDivList) break;
			temp && temp.toggleClassName('hidden');
		});
		/**### bind @type {(this: RealDivList,titleGetter: String | RealNode | ()=>String)=>( typeof_fn | typeof _realNode | typeof _str)} */
		function getTransform(titleGetter){
			return typeof titleGetter === 'function' ? /**@param {String[]} value */value=>_fn.call(this,titleGetter,value) :
			titleGetter instanceof RealNode ? /**@param {String[]} value */value=>_realNode.call(this,titleGetter,value) :
			/**@param {String[]} value */value=> _str.call(this,titleGetter,value);
		}
		/**@type {(this: RealDivList,titleGetter: ()=>String,value: String[])=>HTMLDivElement[]} */
		function _fn(titleGetter,value){return this.protoTransform(emptyArray.concat(titleGetter(),value));}
		/**@type {(this: RealDivList,titleGetter: String,value: String[])=>HTMLDivElement[]} */
		function _str(titleGetter,value){return this.protoTransform(emptyArray.concat(String(titleGetter),value));}
		/**@type {(this: RealDivList,titleGetter: RealNode,value: String[])=>HTMLDivElement[]} */
		function _realNode(titleGetter,value){return this.protoTransform(emptyArray.concat(String(titleGetter.value),value));}
		/**@type {(this: RealDivList,titleGetter: String | RealNode | ()=>String)=>void} */
		return function(titleGetter){this.transform = getTransform.call(this,titleGetter),this.fix();};
	})()}));

}else log('No DOM !');

	EXPORTS.RealWorld = RealWorld,EXPORTS.RealNode = RealNode,EXPORTS.RealGroup = RealGroup,EXPORTS.RealTarget = RealTarget,
	EXPORTS.RealStory = RealStory,EXPORTS.RealPromise = RealPromise,
	EXPORTS.RealElement = RealElement,EXPORTS.RealCanvas = RealCanvas,EXPORTS.RealLoader = RealLoader,EXPORTS.RealSelect = RealSelect,
	EXPORTS.RealComtag = RealComtag,EXPORTS.RealSVG = RealSVG,
	EXPORTS.RealDivList = RealDivList,EXPORTS.RealImgList = RealImgList,EXPORTS.RealDivQueue = RealDivQueue,
	EXPORTS.createRealDivSelect = createRealDivSelect,EXPORTS.createRealDivSearch = createRealDivSearch,EXPORTS.createRealDivSeries = createRealDivSeries;
	(function tempFn(fn){for(const key of Object.keys(fn)){
		if(typeof fn[key] === 'function') Reflect.defineProperty(fn,key,nonEnumerableConfig),tempFn(fn[key]);
	}})(EXPORTS);
	/**## 如果用作全局接口，请不要注释掉下面这一行。  */
	// Object.assign(globalThis,EXPORTS);
	log('Sync\nin '+RealNode.makeNumStr0oTail(performance.now() - t0)+' ms.');
	return EXPORTS;
})();