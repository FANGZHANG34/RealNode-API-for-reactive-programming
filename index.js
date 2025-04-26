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
try{const temp = exports=>exports.default;var require = require ?? (path=>import(String(path)).then(temp));}catch(e){console.error(e);}
{
var exports;
/**##   */
/**# 搜索## */
	const
	nodeRequire = require,
	prevent = function(v){return v;},
	Element = globalThis.Element ?? prevent,
	performance = globalThis.performance ?? Date,
	setInterval = globalThis.setInterval ?? prevent,
	clearInterval = globalThis.clearInterval ?? prevent,
	t0 = performance.now(),
	tempConfig = {writable: false,enumerable: false},
	/**@type {typeof console.log} */
	log = (console.log.bind(console)),
	/**## browserMode 是否存在浏览器环境 */
	browserMode = 'document' in globalThis,
	/**## browserMode 是否存在nodejs环境 */
	nodeMode = Object.prototype.toString.call(globalThis.process) === '[object process]'
	;
	// Number.prototype.toFloat = function(tail){
	// 	var int,float;
	// 	return Number.isFinite(this.valueOf()) ? (
	// 		tail = typeof tail !== 'number' ? 7 : tail > 14 ? 14 : tail < 0 ? 0 : Math.floor(tail),
	// 		{0: int,1: float = ''} = this.toString(16).split('.'),
	// 		BigInt('0x'+int)+'_+'+'0x'+float.slice(0,tail).padEnd(tail,'0')
	// 	) : 'NaN';
	// };
	Number.prototype.toFloat = function(tail){
		var int,float;
		return Number.isFinite(this.valueOf()) ? (
			tail = typeof tail !== 'number' ? 9 : tail > 18 ? 18 : tail < 0 ? 0 : Math.floor(tail),
			{0: int,1: float = ''} = this.toString(8).split('.'),
			BigInt('0o'+int)+'_+'+'0o'+float.slice(0,tail).padEnd(tail,'0')
		) : 'NaN';
	};
	Reflect.defineProperty(globalThis.Number.prototype,'toFloat',tempConfig);
/**# RealWorld 事件循环类 */
var RealWorld = (()=>{
	var undefined;
	/**@this {{resolve(...value)=>void}} */
	const thisResolve = function(...value){this.resolve(value);};
	/**
	 * 
	 * @param {Number} timeSep 
	 * @param {...()=>void} fnList 
	 */
	function RealWorld(timeSep,...fnList){
		if(!new.target) return new RealWorld(timeSep,...fnList);
		this.timeSep = Number.isFinite(timeSep = Number(timeSep)) ? timeSep : 10;
		this._id = setInterval(this._mainFn.bind(this),this.timeSep);
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
	};
	/**
	 * ## onload 环境准备好时兑现的承诺
	 * @type {Promise<void>}
	 */
	return RealWorld.onload = !browserMode ? Promise.resolve() :
	new Promise(r=>window.addEventListener('load',function tempListener(){r();window.removeEventListener('load',tempListener)})),
	/**## getPromiseState 异步获取承诺状态 */
	RealWorld.getPromiseState = (()=>{
		const temp = Symbol(),tryFn = v=>Number(temp !== v),catchFn = ()=>-1;
		return function getPromiseState(promise){return Promise.race([promise,temp]).then(tryFn,catchFn);};
	})(),
	/**
	 * ## onceIf 生成条件检测承诺 
	 * @method
	 * @param {()=>Boolean} ifFn
	 * @param {Number} [timeSep]
	 */
	RealWorld.onceIf = function(ifFn,timeSep){
		if(typeof ifFn !== 'function') return Promise.reject();
		const temp = new RealWorld(timeSep);
		return new Promise(soFn=>(temp.ifFn = ifFn,temp.soFn = soFn)).then(()=>temp.destroy());
	},
	RealWorld.cb2promise = 
	/**
	 * ## cb2promise 回调转承诺
	 * @template T
	 * @param {{thisArg?: {}; useFn: String | (callback: (err?: Error,...value: T)=>void)=>void; callback: typeof thisResolve;}} param0 
	 * @param {...any} parameters 
	 * @returns {Promise<[?Error,...T]>}
	 */
	function({thisArg,useFn,callback = thisResolve} = {},...parameters){
		if(typeof useFn !== 'function') useFn = thisArg?.[useFn];
		if(typeof useFn !== 'function') throw new Error('=> Wrong:\n	"thisArg" is not Object\n or\n	"useFn" not in "thisArg" !');
		return new Promise(resolve=>{
			const temp = {callback,resolve};
			try{useFn.call(thisArg,...parameters,(...value)=>temp.callback(...value));}catch(error0){
				try{useFn.call(thisArg,(...value)=>temp.callback(...value),...parameters);}catch(error1){
					temp.resolve([new Error('=> Neither head or tail of parameters is Callback !\n'+error0?.stack+'\n'+error1?.stack)]);
				}
			}
		}).catch(e=>console.error(e.stack));
	},
	/**## destroy 销毁本对象 */
	RealWorld.prototype.destroy = function(){return clearInterval(this._id);},
	/**## then 添加函数入执行队列 */
	RealWorld.prototype.then = function(fn){return typeof fn === 'function' && this.fnList.unshift(fn),this;},
	/**## 生成RealElement实例 */
	RealWorld.prototype.getRealElement = function(){
		return new RealElement({self: this.self,key: 'innerHTML'},{id: this.self.id,initValue: this.self.innerHTML});
	},
	/**## 变更时间间隔 */
	RealWorld.prototype.setTimeSep = function(timeSep){
		return (timeSep = Number.isFinite(Number(timeSep)) ? Number(timeSep) : 10) !== this.timeSep && (
			clearInterval(this._id),Reflect.defineProperty(this,'timeSep',{value: timeSep}),
			Reflect.defineProperty(this,'_id',{value: setInterval(this._mainFn.bind(this),this.timeSep)})
		);
	},
	RealWorld.prototype._mainFn = function(){
		if(this.paused) return;
		try{this.intervalFn?.();}catch(e){this.intervalFn = console.error(e);}
		try{this.info = this.fnList.pop()?.call(this,this.info);}catch(e){console.error(e);}
		try{if(this.ifFn?.()){this.soFn?.();this.ifFn = this.soFn = null;}}catch(e0){
			try{this.ifFn?.();}catch(e1){e0 = e1;this.ifFn = null;this.paused = true;}
			this.paused || (this.soFn = null);this.paused = false;console.error(e0);
		}
	},RealWorld;
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
	static search(id){return this._sys.get(id);}
	static is(value1,value2){return Object.is(value1,value2) || value1 === value2;}
	/**
	 * 
	 * @param {()=>*} fn 
	 * @returns {Promise}
	 */
	static justNow(fn,thisArg,...argArray){return RealNode.now.then(fn.bind(thisArg,...argArray));}
	static arrayToObject(){
		const temp = Object.create(null),array = Array.from(arguments).flat(),length = array.length;
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
	static check(realNode){for(const temp of this._sys.entries()) if(realNode === temp[1]) return realNode.id === temp[0];}
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
		const temp = new Promise(r=>this.eventLoop.then(()=>r(fn.apply(thisArg,argArray))));
		return keepNow || (this.now = temp.catch(prevent)),temp;
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
	static createNumber = this.protoCreate.bind(null,function(temp = 0){
		if(!Array.isArray(this.proto.value)) return +(this.proto.value instanceof RealNode ? this.proto.value.value : this.proto.value);
		else for(const i of this.proto.value) temp +=+(i instanceof RealNode ? i.value : i);
		return temp;
	});
	/**@method @type {((...args)=>RealNode)} */
	static createString = this.protoCreate.bind(null,function(){
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
	/**@method */
	static copyObj = function copyObj(obj){
		if(Object(obj) === obj){
			const newObj = Array.isArray(obj) ? [] : Object.create(null);
			for(const i of Object.keys(obj)){95 === i.charCodeAt(0) || (newObj[i] = copyObj(obj[i]));}
			return newObj;
		}else return new.target ? Object(obj) : obj;
	};
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
	/**
	 * 
	 * @returns {Promise[][]}
	 */
	async protoDone(){
		var i = 0;
		while(i < this.notifyArray.length) await Promise.allSettled(this.notifyArray[i++]);
		i = this.notifyArray;
		this.notifyArray = [];
		return i;
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
	 * 
	 * @param {[RealNode, ...string[]][]} realNodeMap 
	 */
	_dealWithPositionsOfRNs(realNodeMap,expression){
		const temp = this.clearChildRNs().proto.childRNs,list = [];
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
				new RealNode({info: [realNode,dir],react: this.constructor._react.bind(this,realNode)})
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
		tryRealNode = (this.proto.tryRealNode = Boolean(tryRealNode)) ? 'appear' : 'disappear';
		var i = this.proto.childRNs.length;
		while(i --> 0) this.proto.childRNs[tryRealNode]();
	}
	/**@type {Symbol[]} */
	relativeRNs = [];
	/**@type {Promise[][]} */
	notifyArray = [];
	/**
	 * 
	 * @param {{get?: ()=>*,set?: (value)=>Boolean,react?: ()=>void,id?,info?,value?,initValue?,display?}} [config] 
	 * @param {...(Symbol | RealNode)} [relativeRNs] 
	 */
	constructor(config,tryRealNode = RealNode.tryRealNode,...relativeRNs){
		config = Object(config);
		/**@type {AntiNode} */
		this.proto = new this.constructor.proto;
		this.proto.id = Symbol(String(config.id ?? config.info?.id ?? ''));
		Reflect.defineProperty(this,'notifyArray',{enumerable: false});
		Reflect.defineProperty(this,'proto',tempConfig);
		this.display = config.display ?? true;
		this.info = config.info;
		this.get = config.get;
		this.set = config.set;
		this.react = config.react;
		this.relate(...relativeRNs);
		this.proto.value = config.initValue;
		this.tryRealNode = tryRealNode;
		if('value' in config) this.value = config.value;
	}
};
var RealGroup =
/**@template {{}} T */
class RealGroup extends RealNode{
	static tempProxy = class AntiGroup extends Function{
		static arr = [];
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
	keys(all){return all ? Reflect.ownKeys(this.proxy()) : Object.keys(this.proxy());}
	/**
	 * 
	 * @param {Boolean} [notify] 
	 * @param {Boolean} [noSelf] 
	 * @returns {Boolean | Error}
	 */
	realSet(value,notify,noSelf){try{
		return this.protoSet(value) && (notify && this.notify(noSelf),true);
	}catch(e){return console.error(e),e;}}
	/**
	 * 
	 * @param {String | Symbol | ?(keyArray: (String | Symbol)[])=>Boolean} ifKeyOrFn 
	 * @param {()=>void} listener 
	 */
	addSetterListener(ifKeyOrFn,listener){
		if(!listener) return;
		if(typeof listener !== 'function') this.error('"listener" must be function !');
		ifKeyOrFn ?? (ifKeyOrFn = RealGroup._);
		var temp;
		Array.isArray(temp = this.listenerMap.get(ifKeyOrFn)) || this.listenerMap.set(ifKeyOrFn,temp = []);
		temp.push(listener);
	}
	/**
	 * 
	 * @param {(String | Symbol)[]} [keyArray] 
	 */
	protoReact(keyArray = RealGroup.tempProxy.arr){
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
		this.listenerMap.get(RealGroup._).forEach(listener=>listener());
		if(temp.length) try{this.react?.(temp);}catch(e){this.log(e?.stack);}else{
			const listenerArray = this.listenerMap.get(RealGroup._),l = listenerArray.length;
			for(var i = 0;i < l;i++) try{listenerArray[i]();}catch(e){this.log('Wrong with ',listenerArray[i]);}
		}
		return Boolean(temp.length);
	}
	/**
	 * 
	 * @param {String | Symbol | {}} [keyOrkeyObj] 
	 */
	protoGet(keyOrkeyObj){
		var temp;
		if(!arguments.length) return this.getByFilter();
		if(Object(keyOrkeyObj) !== keyOrkeyObj) return (temp = this.proxy()[keyOrkeyObj],temp instanceof RealNode ? temp.value : temp);
		const self = this.proxy(),keyArray = Reflect.ownKeys(Object(keyOrkeyObj));
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
	constructor({id,info,self = Object.create(null)} = {}){
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
	 * @type {{(element: {})=>RealTarget[];(element)=>RealElement[];}}
	 */
	static searchByObj = function(element){
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
	/**@param {...String} */
	addClassName(){return this.proto.isElement && (this.proto.self.classList.add(...arguments),true);}
	/**@param {String} className */
	toggleClassName(className){return this.proto.isElement && this.proto.self.classList.toggle(className);}
	/**@param {...String} */
	removeClassName(){return this.proto.isElement && (this.proto.self.classList.remove(...arguments),true);}
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
	/**@type {{[type: String]:Map<keyof HTMLElementTagNameMap,EventListener[]>}} */
	static selectorEventListeners = {};
	static keyboardController = (browserMode && addEventListener('keydown',e=>{
		if(/^(TEXTAREA)|(SELECT)|(INPUT)$/.test(document.activeElement?.tagName)) return;
		/**@type {?Element} */
		const onkeyboardController = document.querySelector('.onkeyboardControl') ?? document.querySelector('.keyboardController');
		if(!onkeyboardController) return;
		var i,temp,key;
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
		if(i++){
			temp = onkeyboardController,key = i ? 'nextElementSibling' : 'previousElementSibling';
			onkeyboardController.classList.remove('onkeyboardControl');
			while(temp = temp[key]) if(getComputedStyle(temp).display !== 'none') break;
			(temp || (temp = onkeyboardController.parentElement[i ? 'firstElementChild' : 'lastElementChild'])).classList.add('onkeyboardControl');
		}
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
		return Object.assign(function makeElementByString(innerHTML){
			template.innerHTML = String(innerHTML); return template.content.firstElementChild;
		},{_clear(){template.innerHTML = ''; return template.content;}});
	})();
	static createImg(){return new RealElement({self: document.createElement('img'),key: 'src'});}
	static createVideo(){return new RealElement({self: document.createElement('video'),key: 'src'});}
	static createAudio(){return new RealElement({self: document.createElement('audio'),key: 'src'});}
	static createDiv(id,initValue = ''){return new RealElement({self: document.createElement('div'),key: 'textContent'},{id,initValue});}
	static createTextarea(placeholder){return new RealElement({self: RealElement.makeElement('textarea',{placeholder: String(placeholder)}),key: 'value'});}
	/**
	 * 
	 * @template {Element} T
	 * @param {keyof HTMLElementTagNameMap | T} tagName 
	 * @param {{this: T | Element;[attr: String]: String}} [config] 
	 * @param {{this: CSSStyleDeclaration;[attr: String]: String}} [cssConfig] 
	 * @returns {T}
	 */
	static makeElement(tagName,config,cssConfig){
		tagName instanceof Element || (tagName = document.createElement(tagName));
		return Object.assign(Object.assign(tagName,config).style,cssConfig),tagName;
	}
	/**
	 * 
	 * @param {...(Element | {self: Element})}
	 */
	static applyKeyboardController(){
		for(const ele of arguments) ele instanceof Element ? ele.classList.add('keyboardController') :
		ele?.self instanceof Element && ele.self.classList.add('keyboardController');
	}
	/**
	 * 
	 * @param {...(Element | {self: Element})}
	 */
	static cancelKeyboardController(){
		for(const ele of arguments) ele instanceof Element ? ele.classList.remove('keyboardController') :
		ele?.self instanceof Element && ele.self.classList.remove('keyboardController');
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
			for(var i = 0,l = listenerArray.length;i < l;) try{listenerArray[i++](e);}catch(e){console.error,alert(e?.stack);}
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
						RealElement.selectorEventListeners[type].forEach((listenerArray,selectors)=>temp(e,listenerArray,selectors));
						log(tempStr+'-listeners completed\nin '+(performance.now() - t0).toFloat()+' ms.');
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
			document.getElementsByTagName("head")[0].
			appendChild(document.createElement("style"))[!window.createPopup && "appendChild"]?.(document.createTextNode(""));
			myCSS = document.styleSheets[document.styleSheets.length - 1];
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
			})._css.finally(),time=>log('Init defaultCSS\nin '+time.toFloat()+' ms.'))));
		};
	})();
};
{
	/**
	 * @typedef {{
	 * resolve: (value)=>void;
	 * reject: (reason?)=>void;
	 * promise: Promise;
	 * }} StoryPromise 
	 */
	/**@this {StoryPromise} */
	const executor = function(resolve,reject){this.resolve = resolve,this.reject = reject;};
	/**@type {{()=>StoryPromise; new()=>StoryPromise;}} */
	const StoryPromise = function(){
		if(!new.target) return new StoryPromise;
		/**@type {(value)=>void} */
		this.resolve = null;
		/**@type {(reason?)=>void} */
		this.reject = null;
		this.promise = new Promise(executor.bind(this));
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
		if(!i) isBusy = true;
		while(this.pages.length || this.fnList.length){
			while(this.fnList.length) try{this.info = await this.fnList.pop()?.(this.info);}
			catch(e){console.error('Depth of the fn : '+i+'\n'+String(e?.stack ?? e));}
			try{await this.pages.shift()?.launch?.();}catch(e){console.error('Depth of the page : '+i+'\n'+String(e?.stack ?? e));}
		}
		if(!i) isBusy = false;
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
	let isBusy = false;
	Reflect.getPrototypeOf(RealStory).constructor = setInterval(()=>isBusy || RealStory.launch(),50);
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
			return pathSet[path] || (pathSet[path] = (temp = RealStory.StoryPromise(),document.head.appendChild(
				script = RealElement.makeElement('script',{onload: temp.resolve,onerror: temp.reject,src: path})
			),this._push(temp.promise.finally(onfinally.bind(script)))));
		} : function(){return Promise.reject(new Error('Mode error !'));};
	})();
	get length(){return this.list.length;}
	list = [];
	/**
	 * 
	 * @param {Promise<T> | T} promise 
	 */
	constructor(promise){
		Reflect.defineProperty(this,'list',tempConfig);
		Reflect.defineProperty(this,'_push',{value: this._push.bind(this),enumerable: false,writable: false});
		Reflect.defineProperty(this,'_throw',{value: this._throw.bind(this),enumerable: false,writable: false});
		/**@type {Promise<T>} */
		this.self = Promise.resolve(promise).then(this._push,this._throw);
	}
}(RealWorld.onload);
RealPromise.self.finally(()=>RealNode.time(RealWorld.onload,time=>log('Set up\nin '+time.toFloat()+' ms.')));

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
	 * @param {Number | String} N 
	 * @param {Number} longN 
	 * @returns {String}
	 */
	static strN(N,longN){const i = String(N).length; while(longN --> i) N = '0'+N; return N};
	static preloadSrc(){
		for(var temp = RealGroup.tempProxy.arr.concat(...arguments),i = temp.length;i --> 0;) temp[i] = RealCanvas.getImageBySrc(temp[i]);
		return Promise.allSettled(temp);
	}
	/**@method @type {(src)=>Promise<HTMLImageElement>} */
	static getImageBySrc = (()=>{
		/**
		 * 
		 * @param {String} src 
		 * @param {(value)=>void} resolve 
		 * @param {(reason?)=>void} reject 
		 */
		function dealWithSrc(src,resolve,reject){
			const temp = RealCanvas.srcImageMap.get(src) ?? new Image;
			temp.src ? resolve(temp) : src && typeof src === 'string' && !(RealCanvas.useCache && RealCanvas.srcImageMap.has(src)) ?
			Object.assign(temp,{onload: ()=>(
				RealCanvas.srcImageMap.set(src,temp),temp.onload = temp.onerror = resolve(temp)
			),onerror: reject,src}) : reject();
		}
		return src=>new Promise(dealWithSrc.bind(null,src));
	})();
	static getRealGroupToClear = (()=>{
		class ConfigToClearShape{x = 0;y = 0;radiusX;radiusY;shape;relative;}
		/**
		 * 
		 * @template {RealCanvas} T 
		 * @param {T} realCanvas 
		 * @param {{initFn?: ()=>void;fnBeforeClear?: (this: T)=>void;fnAfterClear?: (this: T)=>void;}} [param1] 
		 */
		return function getRealGroupToClear(realCanvas,{initFn,fnBeforeClear,fnAfterClear} = {}){
			if(!(realCanvas instanceof RealCanvas)) throw new Error('=> "realCanvas" must be instanceof RealCanvas !');
			if(typeof fnAfterClear === 'function') fnAfterClear = fnAfterClear.bind(realCanvas);
			if(typeof fnBeforeClear === 'function') fnBeforeClear = fnBeforeClear.bind(realCanvas);
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
	/**@returns {Promise<PromiseSettledResult<HTMLImageElement>[]>} */
	preloadSrc(){return this.loaded = Promise.resolve(this.loaded).then(prevent.bind(null,RealCanvas.preloadSrc.apply(null,arguments)));}
	clear(){return this.proto.ctx.clearRect(0,0,this.proto.self.width,this.proto.self.height),this.proto.ctx.closePath(),this.proto.ctx;}
	clearTemp(){return this.proto.temp.clearRect(0,0,this.proto.self.width,this.proto.self.height),this.proto.temp.closePath(),this.proto.temp;}
	testSrc(src){return this.loaded = Promise.resolve(this.loaded).then(()=>RealCanvas.getImageBySrc(src)).then(()=>true,this.rejectSrc.bind(this,src));}
	rejectSrc(src,error){return src && console.error(
		error instanceof Error ? error : (RealCanvas.useCache && error && RealCanvas.srcImageMap.set(src),this+': Fail to load by src "'+src+'" !')
	),false;}
	protoSet(src){
		return this.loaded = Promise.resolve(this.loaded).then(()=>RealCanvas.getImageBySrc(src)).
		then(img=>(this.proto.img = img,this.proto.value = src,true),this.rejectSrc.bind(this,src));
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
		return this.loaded = Promise.resolve(this.loaded).then(()=>{this.fix(this.proto.temp.canvas);},e=>alert(e.stack));
	}
	/**
	 * 
	 * @param {{radiusX: Number;radiusY: Number;relative?: Boolean;}} param0 
	 * @param {'rect' | 'circle'} [shape] 
	 */
	applyMouseClear({radiusX,radiusY,relative} = {},shape){
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
	clearShape({x = 0,y = 0,radiusX,radiusY,relative} = {},shape){
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
	} = {}){
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
	set temp(src){return this.proto.set.call(this,src).then(()=>(this.proto.temp.drawImage(this.img,0,0),true),this.rejectSrc.bind(this,src));}
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
	 * @param {Number} [width] 
	 * @param {Number} [height] 
	 * @param {Boolean} [tryRealNode] 
	 * @param {...RealNode} [relativeRNs] 
	 */
	constructor(id,width,height,tryRealNode,...relativeRNs){
		const self = (typeof id === 'string' || (id = '',false)) && document.getElementById(id);
		self && self.tagName.toLocaleLowerCase() !== 'canvas' &&
		RealNode.error('=> "id" exists but not within an HTMLCanvasElement !');
		RealElement.addId(id,!self);
		super({self: self || RealElement.makeElement('canvas',{id})},{id},tryRealNode,...relativeRNs);
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
		class DocumentFs{get stat(){return DocumentFs.stat;}get readdir(){return DocumentFs.readdir;}}
		DocumentFs.fetch = (()=>{
			const temp = response=>response.status < 300 ? [,response] : RealLoader.error('Failed request !');
			return browserMode && document.location.protocol === 'file:' ? path=>fetch(path,{mode:'no-cors'}).then(temp) :
			path=>fetch(path).then(temp);
		})();
		/**@type {(path: String)=>Promise<[Error | null,Stats | Response]>} */
		DocumentFs.stat = nodeMode ? (async (path)=>RealWorld.cb2promise({thisArg: await nodeRequire('fs'),useFn: 'stat'},path)) :
		(path=>DocumentFs.fetch(path).catch(e=>[e]));
		/**@type {(path: String,...strArgs: (String | String[])[])=>Promise<[Error | null,String[]]>} */
		DocumentFs.readdir = nodeMode ?
		(async (path)=>RealWorld.cb2promise({thisArg: await nodeRequire('fs'),useFn: 'readdir'},path)) :
		(async (path,...strArgs)=>{try{
			const length = strArgs.length,fileNameList = [];
			var i = length,j;
			/\/$/.test(path) || (path += '/');
			iLoop: while(i --> 0){
				if(Array.isArray(strArgs[i])){
					for(j = strArgs[i].length;j --> 0;) strArgs[i][j] = String(strArgs[i][j]);
					continue iLoop;
				}
				const str = String(strArgs[i]);
				if('\\' === str[0]) switch(str[1]){
					case 'w': strArgs[i] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';break;
					case 'd': strArgs[i] = '0123456789';break;
				}
				else strArgs[i] = [str];
			}
			for(const temp = Array(length).fill(0);!('-1' in temp);){
				j = '';
				for(i = 0;i < length;i++) j+=strArgs[i][temp[i]];
				log(path+j);
				(await DocumentFs.stat(path+j))[0] || log(fileNameList.push(j),j);
				for(temp[(i = length) - 1]++;i --> 0;) strArgs[i].length > temp[i] || (temp[i] = 0,temp[i - 1]++);
			}
			return [null,fileNameList];
		}catch(e){return [e,[]];}});
		return new DocumentFs;
	})();
	static _configDescriptor = (browserMode && RealWorld.onload.then(()=>RealElement.addEventListenerBySelectors('.RealLoader',"click",async e=>{
		for(const temp of RealTarget.searchByObj(e.target)) if(temp instanceof RealLoader){
			try{const err = (await RealLoader.load(temp))[0];err ? temp.onerror?.(err) : temp.onloadend?.();}catch(e){console.error(e);}
			temp.notify(true);
			temp.react?.();
			break;
		}
	})),{writable: false,enumerable: false,configurable: false});
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
			const fs = await nodeRequire('fs');
			const data = await realLoader.dataGetter();
			const {1: prefix = 'file',2: suffix = ''} = /(.+)(\..+)/.exec(realLoader.temp.download) || [];
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
	/**@returns {FileList} */
	get files(){return 'upload' === this.type ? this.temp.files : this.error('I\'m an downloader without files !');}
	get onerror(){return this.proto.onerror;}
	set onerror(onerror){this.proto.onerror = typeof onerror === 'function' ? onerror : null;}
	get onloadend(){return this.proto.onloadend;}
	set onloadend(onloadend){this.proto.onloadend = typeof onloadend === 'function' ? onloadend : null;}
	get fileName(){return 'upload' === this.type ? this.error('Uploader bans "fileName" !') : this.temp.download;}
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
	constructor(isDownload,fileName,dataGetter,{innerHTML,onerror,onloadend} = {}){
		super({self: document.createElement('div'),key: 'innerHTML'});
		/**@type {AntiLoader} */
		this.proto;
		this.onerror = onerror;
		this.onloadend = onloadend;
		this.dataGetter = dataGetter;
		this.value = innerHTML;
		isDownload = Boolean(isDownload);
		this.temp = document.createElement(isDownload ? 'a' : 'input');
		Reflect.defineProperty(this,'temp',RealLoader._configDescriptor);
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
	 * @param {Array} value 
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
	 * @param {String | null} id 
	 * @param {Boolean} multiple 
	 * @param {{[text: String]: String}} optionConfig 
	 * @param {Boolean} [tryRealNode] 
	 * @param {String} [defaultKey] 
	 * @param {String} [defaultValue] 
	 * @param {(e: Event)=>void} [onchange] 
	 */
	constructor(id,multiple,optionConfig,tryRealNode,defaultKey,defaultValue,onchange){
		const self = (typeof id === 'string' || (id = '',false)) && document.getElementById(id);
		if(self) self.tagName.toLocaleLowerCase() === 'select' ? Object.assign(self,{multiple,onchange}) :
		RealNode.error('=> "id" exists but not within an HTMLSelectElement !');
		RealElement.addId(id,!self);
		super({
			key: 'innerHTML',self: self || RealElement.makeElement('select',{id,multiple,onchange})
		},{id,initValue: Object.assign({},optionConfig)},tryRealNode);
		/**@type {AntiSelect} */this.proto;
		this.defaultKey = defaultKey ?? '_';
		this.defaultValue = defaultValue ?? '';
		this.fix();
	}
};
var RealComtag = class RealComtag extends RealElement{
	/**@type {Map<String,[Boolean,*[],Boolean,((this: RealComtag)=>void) | null]>} */
	static comtagClassMap = new Map;
	/**
	 * 
	 * @param {String} className 
	 * @param {Boolean} tryHTML 
	 * @param {ArrayLike} optionList 
	 * @param {Boolean} [tryRealNode] 
	 * @param {{[selector: String]: {[styleName: String]: String}}} [cssRuleObjObj] 
	 * @param {(this: RealComtag)=>void} [callback] 
	 */
	static defineComtagClass(className,tryHTML,optionList,tryRealNode,cssRuleObjObj,callback){
		/^([A-Za-z]\w*)$/.test(className) || this.error('Illegal "className" !');
		this.comtagClassMap.has(className) && this.error('"className" repeated !');
		optionList?.[Symbol.iterator] || this.error('"optionList" must be Array !');
		this.addCSSRules('.'+className,cssRuleObjObj);
		this.comtagClassMap.set(className,[tryHTML,optionList,tryRealNode,typeof callback === 'function' ? callback : null]);
	}
	static createByClassName(className,...argArray){
		const config = this.comtagClassMap.get(className);
		config || this.error('"className" not found !');
		const temp = new RealComtag('',config[0],config[1],config[2]);
		return config[3].apply(temp,argArray),temp.addClassName(className),temp;
	}
	fix(){
		var temp = this.transform(this.proto.value),l = temp.length,i = 0;
		const elementList = RealElement.makeElementByString._clear();
		while(i < l) elementList.appendChild(temp[i++]);
		this.self.innerHTML = '';
		this.self.appendChild(elementList);
		return this;
	}
	protoTransform(value){
		if(!value?.[Symbol.iterator]) throw new Error('=> "value" must be Arraylike !');else{
			const list = [];
			for(const temp of value) list.push(temp instanceof Element ? temp : document.createElement(String(temp)));
			return list;
		}
	}
	/**
	 * 
	 * @param {(Element | String)[]} value 
	 */
	protoSet(value){
		if(!value?.[Symbol.iterator]) throw new Error('=> "value" must be Arraylike !');else{
			/**@type {IterableIterator<HTMLImageElement | String>} */
			const iter0 = this.proto.value[Symbol.iterator]();
			const iter1 = value[Symbol.iterator]();
			/**@type {[IteratorResult<HTMLImageElement>,IteratorResult<HTMLImageElement>]} */
			const temp = Array(2);
			while((temp[0] = iter0.next(),temp[1] = iter1.next(),!temp[0].done ^ temp[1].done)){
				if(temp[0].done) break;
				if(temp[0].value !== temp[1].value) return this.proto.value = Array.from(value),true;
			}
			return false;
		}
	}
	/**
	 * 
	 * @param {String} id 
	 * @param {Boolean} tryHTML 
	 * @param {(String | Element)[]} optionList 
	 * @param {Boolean} [tryRealNode] 
	 * @param {{[attr: String]: (event: Event)=>void}} [selfAssign] 
	 */
	constructor(id,tryHTML,optionList,tryRealNode,selfAssign){
		const self = (typeof id === 'string' || (id = '',false)) && document.getElementById(id);
		RealElement.addId(id,!self);
		super({self: self || RealElement.makeElement('div',{id})},{
			id,initValue: !optionList?.[Symbol.iterator] ? [] : Array.from(optionList)
		},tryRealNode);
		/**@type {AntiList} */
		this.proto;
		this.tryHTML = tryHTML;
		Object.assign(this.fix().self,selfAssign);
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
	/**@type {Map<String,[Boolean,*[],Boolean,((this: RealDivList)=>void) | null]>} */
	static divListClassMap = new Map;
	/**
	 * 
	 * @param {Number} length 
	 * @param {String} tagName 
	 * @param {String} [id] 
	 * @param {{[attr: String]: (event: Event)=>void}} [selfAssign] 
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
				position[1][this.tryHTML ? 'innerHTML' : 'textContent'] = tempValue;
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
	 * @param {Boolean} tryHTML 
	 * @param {ArrayLike} optionList 
	 * @param {Boolean} [tryRealNode] 
	 * @param {{[selector: String]: {[styleName: String]: String}}} [cssRuleObjObj] 
	 * @param {(this: RealDivList)=>void} [callback] 
	 */
	static defineDivListClass(className,tryHTML,optionList,tryRealNode,cssRuleObjObj,callback){
		/^([A-Za-z]\w*)$/.test(className) || this.error('Illegal "className" !');
		this.divListClassMap.has(className) && this.error('"className" repeated !');
		optionList?.[Symbol.iterator] || this.error('"optionList" must be Array !');
		this.addCSSRules('.'+className,cssRuleObjObj);
		this.divListClassMap.set(className,[tryHTML,optionList,tryRealNode,typeof callback === 'function' ? callback : null]);
	}
	static createByClassName(className,...argArray){
		const config = this.divListClassMap.get(className);
		config || this.error('"className" not found !');
		const temp = new RealDivList('',config[0],config[1],config[2]);
		return config[3].apply(temp,argArray),temp.addClassName(className),temp;
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
	 * @param {Array} value 
	 */
	protoTransform(value){
		var list = [],temp;
		if(!value?.[Symbol.iterator]) throw new Error('=> "value" must be Arraylike !');else{
			const iter = value[Symbol.iterator]();
			while(!(temp = iter.next()).done){
				list.push(temp.done = document.createElement('div'));
				temp.value instanceof Element ? temp.done.appendChild(temp.value) :
				temp.done[this.tryHTML ? 'innerHTML' : 'textContent'] = String(temp.value);
			}
			return list;
		}
	}
	/**
	 * 
	 * @param {Boolean} [toRealElement] 
	 * @param {String} [key] 
	 * @returns {{[id: String]: Element} | {[id: String]: RealElement}}}
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
	 * @param {String} id 
	 * @param {Boolean} tryHTML 
	 * @param {(Element | String)[]} optionList 
	 * @param {Boolean} [tryRealNode] 
	 * @param {{[attr: String]: (event: Event)=>void}} [selfAssign] 
	 */
	constructor(id,tryHTML,optionList,tryRealNode,selfAssign){
		const self = (typeof id === 'string' || (id = '',false)) && document.getElementById(id);
		RealElement.addId(id,!self);
		super({self: self || RealElement.makeElement('div',{id})},{
			id,initValue: !optionList?.[Symbol.iterator] ? [] : Array.from(optionList)
		},tryRealNode);
		/**@type {AntiList} */this.proto;
		this.tryHTML = tryHTML;
		Object.assign(this.fix().self,selfAssign);
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
	 * @param {Array} value 
	 */
	protoTransform(value){
		var list = [],temp;
		if(!value?.[Symbol.iterator]) throw new Error('=> "value" must be Arraylike !');
		const iter = value[Symbol.iterator]();
		while(!(temp = iter.next()).done){
			list.push(temp.done = document.createElement('div'));
			temp.done.appendChild(temp.value instanceof Image ? temp.value : Object.assign(new Image(),{src: String(temp.value)}));
		}
		return list;
	}
	/**
	 * 
	 * @param {(Element | String)[]} value 
	 */
	protoSet(value){
		if(!value?.[Symbol.iterator]) throw new Error('=> "value" must be Arraylike !');else{
			/**@type {IterableIterator<HTMLImageElement | String>} */
			const iter0 = this.proto.value[Symbol.iterator]();
			const iter1 = value[Symbol.iterator]();
			/**@type {[IteratorResult<HTMLImageElement>,IteratorResult<HTMLImageElement>]} */
			const temp = Array(2);
			while((temp[0] = iter0.next(),temp[1] = iter1.next(),!temp[0].done ^ temp[1].done)){
				if(temp[0].done) break;
				if((temp[0].value?.src ?? String(temp[0].value)) !== (temp[1].value?.src ?? String(temp[1].value))){
					return this.proto.value = Array.from(value),true;
				}
			}
			return false;
		}
	}
	/**
	 * 
	 * @param {String} id 
	 * @param {(Element | String)[]} srcList 
	 * @param {Boolean} [tryRealNode] 
	 * @param {{[attr: String]: (event: Event)=>void}} [selfAssign] 
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
finally(()=>RealDivList.defineDivListClass('realDivSelect',false,[],true,{
	'': {'background':'linear-gradient(135deg,#fff,#000)'},
	'>div': {'background-color':'#333','transform':'scale(0.8,1)'},
	'>div:hover': {'transform':'scale(0.9,1)'},
	'>.selected': {'background-color':'#555','transform':'scale(1)','font-weight':'bolder'},
},(()=>{
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
	RealElement.addEventListenerBySelectors('.realDivSelect>div','click',e=>{
		var REList = RealTarget.searchByObj(e.target.parentElement),i = 0,temp;
		while(temp = REList.pop()) if(temp && temp.self.classList.contains('realDivSelect')) break;
		if(!temp) return;
		/**@type {RealDivList} */
		const RS = temp,previousValue = RS.value[0];
		/**@type {HTMLDivElement[]} */
		REList = RS.proto.list;
		if(RS.info.multiple) e.target.classList.toggle('selected'),tempReact(RS);else{
			while(temp = REList[i++]) temp.classList[e.target === temp ? 'add' : 'remove']('selected');
			previousValue === RS.value[0] || tempReact(RS);
		}
	});
	/**@type {(this: RealDivList,optionConfig?: {[key: String]: *},multiple?: Boolean,onchange?: (this: RealDivList,e: Event)=>void)=>void} */
	return function(optionConfig,multiple,onchange){
		this.get = tempGet;
		this.set = tempSet;
		this.info = Object(this.info);
		this.info.multiple = Boolean(multiple);
		if(typeof onchange === 'function') this.self.onchange = onchange.bind(this);
		this.value = optionConfig;
	};
})()));
/**
 * 
 * @param {String} [placeholder] 
 */
var createRealDivSearch = placeholder=>RealDivList.createByClassName('realDivSearch',placeholder);
RealWorld.onload = RealWorld.onload.
finally(()=>RealDivList.defineDivListClass('realDivSearch',true,[],true,{'>:nth-child(2)>div>div:hover': {'transform':'scale(0.9,1)'}},(()=>{
	/**@type {RealDivList} */
	var tempRealDivList;
	const changeConfig = {bubbles: true,cancelable: false},now = Promise.resolve();
	/**@type {(this: RealDivList)=>String} */
	function tempGet(){return this.info.inputer.value;}
	/**@type {(this: RealDivList,value: *[])=>false} */
	function tempSet(value){
		Array.isArray(value) ? this.info.wordList = value : this.error('"value must be Array !');
		return now.then(()=>this.info.inputer.dispatchEvent(new Event('input',changeConfig))),
		(tempRealDivList || (tempRealDivList = this)).info.matcher.value = {},false;
	}
	/**@type {(target: Element)=>void} */
	function tempReact(target){tempRealDivList && target !== tempRealDivList.info.inputer && (
		tempRealDivList.info.matcher.value = {},tempRealDivList.react?.(),tempRealDivList.notify(true)
	);}
	addEventListener('click',e=>RealNode.afterNow(()=>tempReact(e.target)));
	RealElement.addEventListenerBySelectors('.realDivSearch>:nth-child(2)>div>div','click',e=>{
		var REList = RealTarget.searchByObj(e.target.parentElement.parentElement.parentElement),temp;
		while(temp = REList.pop()) if(temp && temp.self.classList.contains('realDivSearch')) break;
		if(!temp) return;
		temp.info.inputer.value = temp.info.matcher.value[0];
		tempRealDivList = temp;
		tempRealDivList.react?.(),tempRealDivList.notify(true);
		// (tempRealDivList = temp).info.inputer.dispatchEvent(new Event('input',changeConfig));
	});
	RealElement.addEventListenerBySelectors('.realDivSearch>:nth-child(1)>textarea','input',e=>{
		var REList = RealTarget.searchByObj(e.target.parentElement.parentElement),temp;
		while(temp = REList.pop()) if(temp && temp.self.classList.contains('realDivSearch')) break;
		if(!temp) return;
		const testReg = new RegExp(temp.info.inputer.value,'i');
		temp.info.matcher.value = RealNode.arrayToObject(temp.info.wordList.filter(str=>testReg.test(String(str))));
	});
	RealElement.addEventListenerBySelectors('.realDivSearch>:nth-child(1)>textarea','click',e=>{
		now.then(()=>e.target.dispatchEvent(new Event('input',changeConfig)));
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
})()));
/**
 * 
 * @param {String | RealNode | ()=>String} titleGetter 
 */
var createRealDivSeries = titleGetter=>RealDivList.createByClassName('realDivSeries',titleGetter);
RealWorld.onload = RealWorld.onload.
finally(()=>RealDivList.defineDivListClass('realDivSeries',false,[],true,{
	'>div:nth-child(1)': {'font-weight':'bolder'},
	'.hidden>div:nth-child(n + 2)': {'display':'none'},
},(()=>{
	RealElement.addEventListenerBySelectors('.realDivSeries>div:nth-child(1)','click',e=>{
		var REList = RealElement.searchByObj(e.target?.parentElement),temp;
		while(temp = REList.pop()) if(temp && temp.self.classList.contains('realDivSeries')) break;
		temp && temp.toggleClassName('hidden');
	});
	/**@type {(this: RealDivList,titleGetter: String | RealNode | ()=>String)=>(getTransform.fn | getTransform.realNode | getTransform.str)} */
	function getTransform(titleGetter){return getTransform[
		typeof titleGetter === 'function' ? 'fn' : titleGetter instanceof RealNode ? 'realNode' : 'str'
	].bind(this,titleGetter);}
	const temp = [];
	/**@type {(this: RealDivList,titleGetter: ()=>String,value: String[])=>HTMLDivElement[]} */
	getTransform.fn = function(titleGetter,value){return this.protoTransform(temp.concat(titleGetter(),value));}
	/**@type {(this: RealDivList,titleGetter: String,value: String[])=>HTMLDivElement[]} */
	getTransform.str = function(titleGetter,value){return this.protoTransform(temp.concat(String(titleGetter),value));}
	/**@type {(this: RealDivList,titleGetter: RealNode,value: String[])=>HTMLDivElement[]} */
	getTransform.realNode = function(titleGetter,value){return this.protoTransform(temp.concat(String(titleGetter.value),value));}
	/**@type {(this: RealDivList,titleGetter: String | RealNode | ()=>String)=>void} */
	return function(titleGetter){this.transform = getTransform.call(this,titleGetter),this.fix();};
})()));

}else log('No DOM !');
	log('Sync\nin '+(performance.now() - t0).toFloat()+' ms.');
}
/**## 如果使用ESM规范，请不要注释掉下面这一行，如果使用CommonJS规范，请注释掉下面这一行。  */
// export default
/**## 如果使用ESM规范，请不要注释掉上面这一行，如果使用CommonJS规范，请注释掉上面这一行。  */
exports = Object.assign(exports ?? {},{
	RealWorld,
	RealNode,RealGroup,RealTarget,RealElement,	// 5
	RealStory,
	RealPromise,
	RealCanvas,RealLoader,RealSelect,RealComtag,RealDivList,RealImgList,RealDivQueue,	// 7
	createRealDivSelect,createRealDivSearch,createRealDivSeries,	// 3
});
/**## 如果用作油猴脚本，请不要注释掉下面这一行。  */
// Object.assign(globalThis,exports);
