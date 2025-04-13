try {
	// 定义模块提取函数并添加类型注解
	const temp = (exports: { default: unknown }): unknown => exports.default;
	
	// 增强 require 的类型定义
	interface CustomRequire {
		(path: string): Promise<unknown>;
	}
	
	// 使用类型断言和可选链操作符保持浏览器兼容性
	const requireWrapper = async (path: unknown): Promise<unknown> => 
		import(String(path)).then(temp);
	
	// 使用逻辑空赋值和类型断言
	var require = require ?? (requireWrapper as typeof require);
} catch (e) {
	console.error('Module polyfill error:', e instanceof Error ? e : new Error(String(e)));
}


	// ==UserScript==
// @name			real-node
// @namespace	   http://tampermonkey.net/
// @version		 2024-12-14
// @description	 Try to take over the world after watching the end of this script!
// @author		  FANGZHANG34
// @match		   https://*/*
// @icon			https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant		   none
// ==/UserScript==

type Primitive = string | number | boolean | symbol | null | undefined;

type PreventFunction = () => void;
type GenericFunction = (...args: any[]) => any;

// 环境检测
const browserMode: boolean = 'document' in globalThis;
const nodeMode: boolean = Object.prototype.toString.call(
	(globalThis as any).process
) === '[object process]';

// Array原型扩展
Reflect.set(Array.prototype, 'iterLog', function* (
	this: any[],
	start?: number | symbol,
	end?: number | symbol
): Generator<any> {
	if (typeof start === 'symbol' || !Number.isFinite(Number(start))) start = 0;
	if (typeof end === 'symbol' || !Number.isFinite(Number(end))) end = this.length;
	let current = Number(start);
	const final = Number(end);
	while (current < final) yield this[current++];
});

// 环境相关polyfill
const prevent: PreventFunction = () => {};
const Element: typeof globalThis.Element = browserMode ? globalThis.Element : (prevent as any);
const [clearInterval, setInterval] = browserMode 
	? [globalThis.clearInterval, globalThis.setInterval] 
	: [prevent, prevent];
const performance = browserMode ? globalThis.performance : Date;

class RealWorld {
	static onload: Promise<void> = browserMode 
		? new Promise(resolve => {
			const listener = () => {
				resolve();
				globalThis.removeEventListener('load', listener);
			};
			globalThis.addEventListener('load', listener);
		}) 
		: Promise.resolve();

	timeSep: number;
	private _id: number;
	fnList: GenericFunction[];
	info?: any;
	self: HTMLElement | object;
	paused = false;
	intervalFn?: GenericFunction;
	ifFn?: GenericFunction;
	soFn?: GenericFunction;

	constructor(timeSep: number, ...fnList: GenericFunction[]) {
		if (!(this instanceof RealWorld)) {
			return new RealWorld(timeSep, ...fnList);
		}

		this.timeSep = Number.isFinite(timeSep) ? timeSep : 10;
		this.fnList = fnList;
		this.self = browserMode ? document.createElement('div') : {};
		
		// 初始化定时器
		this._id = setInterval(this._mainFn.bind(this), this.timeSep);
		
		// 不可变属性配置
		const tempConfig = { writable: false, enumerable: false };
		Reflect.defineProperty(this, '_id', tempConfig);
		Reflect.defineProperty(this, 'fnList', tempConfig);
		Reflect.defineProperty(this, 'timeSep', tempConfig);
	}

	static onceIf(ifFn: GenericFunction, timeSep?: number): Promise<void> {
		if (typeof ifFn !== 'function') return Promise.reject(new Error('Invalid condition function'));
		
		const controller = new RealWorld(timeSep || 10);
		return new Promise(resolve => {
			controller.ifFn = ifFn;
			controller.soFn = resolve;
		}).finally(() => controller.destroy());
	}

	static cb2promise = (() => {
		function thisResolve(this: { resolve: GenericFunction }, ...value: any[]) {
			this.resolve(value);
		}

		return (
			options: {
				thisArg?: any;
				useFn: GenericFunction | string;
				callback?: GenericFunction;
			} = {}, 
			...parameters: any[]
		): Promise<any> => {
			let { thisArg, useFn, callback = thisResolve } = options;
			
			if (typeof useFn !== 'function') {
				if (typeof useFn === 'string' && thisArg) {
					useFn = thisArg[useFn];
				}
				if (typeof useFn !== 'function') {
					throw new Error('Invalid function reference');
				}
			}

			return new Promise((resolve, reject) => {
				const handler = { callback, resolve };
				
				const tryCall = (args: any[]) => {
					try {
						return (useFn as GenericFunction).call(thisArg, ...args);
					} catch (error) {
						reject(error);
					}
				};

				try {
					// 尝试回调在参数末尾
					tryCall([...parameters, (...value: any[]) => handler.callback.call(handler, ...value)]);
				} catch {
					// 尝试回调在参数开头
					tryCall([(...value: any[]) => handler.callback.call(handler, ...value), ...parameters]);
				}
			}).catch(error => {
				console.error(error instanceof Error ? error.stack : error);
				throw error;
			});
		};
	})();

	destroy(): void {
		clearInterval(this._id);
	}

	then(fn: GenericFunction): this {
		if (typeof fn === 'function') this.fnList.unshift(fn);
		return this;
	}

	setTimeSep(newTimeSep: number): void {
		newTimeSep = Number.isFinite(newTimeSep) ? newTimeSep : 10;
		if (newTimeSep !== this.timeSep) {
			clearInterval(this._id);
			this.timeSep = newTimeSep;
			this._id = setInterval(this._mainFn.bind(this), this.timeSep);
		}
	}

	private _mainFn(): void {
		if (this.paused) return;

		try { this.intervalFn?.(); } 
		catch (e) { this.intervalFn = () => console.error(e); }

		try {
			const task = this.fnList.pop();
			this.info = task?.call(this, this.info);
		} catch (e) { console.error(e); }

		try {
			if (this.ifFn?.()) {
				this.soFn?.();
				this.ifFn = this.soFn = undefined;
			}
		} catch (error) {
			console.error(error);
			this.paused = true;
			this.soFn = undefined;
		} finally {
			this.paused = false;
		}
	}
}

type RealNodeConfig = {
	get?: () => any;
	set?: (value: any) => boolean;
	react?: () => void;
	id?: symbol;
	info?: any;
	value?: any;
	initValue?: any;
	display?: boolean;
};

type AntiNodeConfig = RealNodeConfig & {
	tryRealNode?: boolean;
	childRNs?: RealNode[];
};

class RealNode {
	static error(message: string): never {
		throw new Error(`${this.name} : ${message}`);
	}

	static _sys = new Map<symbol, RealNode>();
	static t0: number = Date.now();
	static tryRealNode: boolean = false;
	static now: Promise<void> = Promise.resolve();
	static eventLoop: RealWorld = new RealWorld(4);

	static proto = class AntiNode {
		tryRealNode: boolean = false;
		childRNs: (RealNode & { info: [RealNode, string[], string[]] })[] = [];
		['get']!: () => any;
		['set']!: (value: any) => boolean;
		react!: () => boolean;
		id!: symbol;
		value: any;
	};

	static search(id: symbol): RealNode | undefined {
		return this._sys.get(id);
	}

	static is(value1: any, value2: any): boolean {
		return Object.is(value1, value2) || value1 === value2;
	}

	static justNow(fn: Function, thisArg?: any, ...argArray: any[]): Promise<any> {
		return RealNode.now.then(fn.bind(thisArg, ...argArray));
	}

	static arrayToObject(...args: any[]): Record<string, any> {
		const temp: Record<string, any> = Object.create(null);
		const array = args.flat();
		for (let i = 0; i < array.length; i++) {
			temp[String(array[i])] = array[i];
		}
		return temp;
	}

	static createExpression = ((set: (v: any) => boolean) => 
		(get: () => any, ...relativeRNs: RealNode[]) => new RealNode({ get, set }, true, ...relativeRNs)
	)(() => false);

	static check(realNode: RealNode): boolean {
		for (const [id, node] of this._sys) {
			if (realNode === node) return realNode.id === id;
		}
		return false;
	}

	static createHidden = ((tempConfig: RealNodeConfig) => 
		(config: RealNodeConfig) => new RealNode({ ...config, ...tempConfig })
	)({ display: false });

	static afterNow(fn: Function, keepNow: boolean, thisArg?: any, ...argArray: any[]): Promise<any> {
		const temp = new Promise(resolve => {
			this.eventLoop.then(() => resolve(fn.apply(thisArg, argArray)));
		});
		if (!keepNow) this.now = temp.catch(prevent);
		return temp;
	}

	static protoCreate(get: () => any, ...args: any[]): RealNode {
		const temp = new RealNode({ get });
		(temp.proto as any).value = args;
		return temp;
	}

	static createNumber = RealNode.protoCreate.bind(null, function(this: RealNode, temp = 0) {
		if (!Array.isArray(this.proto.value)) {
			return +((this.proto.value instanceof RealNode) ? this.proto.value.value : this.proto.value);
		}
		for (const item of this.proto.value) {
			temp += +((item instanceof RealNode) ? item.value : item);
		}
		return temp;
	});

	static createString = RealNode.protoCreate.bind(null, function(this: RealNode) {
		if (Array.isArray(this.proto.value)) {
			const temp = [...this.proto.value];
			for (let i = temp.length - 1; i >= 0; i--) {
				if (temp[i] instanceof RealNode) temp[i] = temp[i].value;
			}
			return temp.join('');
		}
		return String((this.proto.value instanceof RealNode) ? this.proto.value.value : this.proto.value);
	});

	static async time(
		promise: Function | Promise<any>,
		callback?: (time: number, error: Error | null, value: any) => void
	): Promise<{ error: Error | null; time: number; value: any }> {
		const t0 = performance.now();
		const result = { time: 0, error: null, value: null };
		try {
			result.value = await (typeof promise === 'function' ? promise() : promise);
		} catch (e) {
			result.error = e instanceof Error ? e : new Error(String(e));
		}
		result.time = performance.now() - t0;
		if (typeof callback === 'function') {
			try {
				callback(result.time, result.error, result.value);
			} catch (e) {
				console.error(e);
			}
		}
		return result;
	}

	static copyObj<T>(obj: T): T {
		if (obj && typeof obj === 'object') {
			const newObj: any = Array.isArray(obj) ? [] : Object.create(null);
			for (const key of Object.keys(obj)) {
				if (key.charCodeAt(0) !== 95) { // 过滤下划线开头的属性
					newObj[key] = this.copyObj((obj as any)[key]);
				}
			}
			return newObj;
		}
		return obj;
	}

	static _react(this: RealNode, realNode: RealNode, react = true, notify = true, noSelf = true): boolean {
		try {
			let value: any;
			const temp = this._getPositionsOfChildRN(realNode);
			while (temp.length) {
				const position = temp.pop()!.reverse();
				if (!position.length) {
					return this.realSet(realNode.value, react, notify, noSelf);
				} else {
					value = this.proto.value;
					while (position.length > 1) value = value[position.pop()!];
					if (realNode.value !== value[position[0]]) {
						value[position[0]] = realNode.value;
					}
				}
			}
			if (react) this.react?.(noSelf);
			if (notify) this.notify(noSelf);
			return true;
		} catch (e) {
			if (this instanceof RealNode) throw e;
			throw new Error(`Please avoid using method "react" of ${this?.name}!\n${(e as Error).message}`);
		}
	}

	proto: AntiNodeConfig;
	relativeRNs: symbol[] = [];
	notifyArray: Promise<any>[][] = [];

	constructor(config: RealNodeConfig = {}, tryRealNode = RealNode.tryRealNode, ...relativeRNs: (symbol | RealNode)[]) {
		config = Object(config);
		this.proto = new (RealNode.proto as any)();
		this.proto.id = Symbol(String(config.id ?? config.info?.id ?? ''));
		Reflect.defineProperty(this, 'notifyArray', { enumerable: false });
		Reflect.defineProperty(this, 'proto', { enumerable: false, writable: false });
		this.display = config.display ?? true;
		this.proto.value = config.initValue;
		this.relate(...relativeRNs);
		if (config.value !== undefined) this.value = config.value;

		// 属性初始化
		this.get = config.get ?? this.protoGet;
		this.set = config.set ?? this.protoSet;
		this.react = config.react ?? (() => {});
		this.proto.tryRealNode = Boolean(tryRealNode);
	}

	// 原型方法
	protoReact(): void {}
	protoGet(): any { return this.proto.value; }
	protoSet(value: any): boolean {
		if (value !== this.proto.value) {
			this.proto.value = value;
			return true;
		}
		return false;
	}

	log(...message: any[]): void {
		console.log(`${this}:`, ...message);
	}

	done(): Promise<any[][]> {
		return RealNode.justNow(this.protoDone, this);
	}

	error(message: string): never {
		throw new Error(`${this}\n"""\n${message}\n"""`);
	}

	clearChildRNs(): this {
		while (this.proto.childRNs?.length) {
			const child = this.proto.childRNs.pop()!;
			child.display = false;
		}
		return this;
	}

	realReact(notify = true, noSelf = true): boolean {
		if (typeof this.react === 'function') {
			this.react.call(this);
			if (notify) this.notify(noSelf);
			return true;
		}
		return false;
	}

	[Symbol.toPrimitive](hint: string): string | number {
		try {
			return hint === 'number' 
				? Number(this.value) 
				: `[object ${this.constructor.name}]{ ${this.id.description} }`;
		} catch {
			return NaN;
		}
	}

	async protoDone(): Promise<any[][]> {
		let i = 0;
		while (i < this.notifyArray.length) {
			await Promise.allSettled(this.notifyArray[i++]);
		}
		const result = this.notifyArray;
		this.notifyArray = [];
		return result;
	}

	notify(noSelf = true, thisArg?: RealNode, count = 0): void {
		for (const id of this.relativeRNs) {
			Promise.resolve(RealNode.search(id)).then(realNode => {
				if (!realNode || (noSelf && this === realNode)) return;
				realNode.realReact?.(true, true);
			});
		}
	}

	realSet(value: any, react = true, notify = true, noSelf = true): boolean {
		try {
			let processedValue = value;
			if (this.proto.tryRealNode) {
				const positions = this._computePositionsOfRNs(value);
				if (positions.length) {
					processedValue = this._dealWithPositionsOfRNs(positions, value);
				}
			}
			
			const result = this.proto.set.call(this, processedValue) ?? true;
			if (react) this.react?.(noSelf);
			if (notify) this.notify(noSelf);
			return result;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	private _getPositionsOfChildRN(realNode: RealNode): string[][] {
		const temp: string[][] = [];
		for (let i = this.proto.childRNs?.length ?? 0; i-- > 0;) {
			const child = this.proto.childRNs[i];
			const iter = child.info[Symbol.iterator]();
			if (iter.next().value === realNode) {
				temp.push([...iter].map(String));
			}
		}
		return temp;
	}

	private _computePositionsOfRNs(
		value: any,
		deep = 2,
		position: string[] = [],
		count = 0
	): [RealNode, ...string[]][] {
		const results: [RealNode, ...string[]][] = [];
		if (value instanceof RealNode) {
			results.push([value, ...position]);
		} else if (count < deep && value && typeof value === 'object') {
			for (const key of Reflect.ownKeys(value)) {
				const newPos = [...position, String(key)];
				results.push(...this._computePositionsOfRNs(value[key], deep, newPos, count + 1));
			}
		}
		return results;
	}

	private _dealWithPositionsOfRNs(
		realNodeMap: [RealNode, ...string[]][],
		expression: any
	): any {
		const list: RealNode[] = [];
		while (realNodeMap.length) {
			const position = realNodeMap.pop()!;
			const [realNode, ...path] = position;
			let current = expression;
			for (let i = 0; i < path.length - 1; i++) {
				current = current[path[i]];
			}
			current[path[path.length - 1]] = realNode.value;

			if (!list.includes(realNode)) {
				list.push(realNode);
				const newNode = new RealNode({
					info: [realNode, path],
					react: () => (RealNode as any)._react.call(this, realNode)
				});
				this.proto.childRNs.push(newNode as any);
				realNode.relate(newNode);
			}
		}
		return expression;
	}

	// 访问器
	get id(): symbol { return this.proto.id; }
	get childRNs(): RealNode[] { return this.proto.childRNs || []; }
	get value(): any { return this.get(); }
	set value(v: any) { this.realSet(v, true, true); }
	
	get display(): boolean { return RealNode._sys.has(this.id); }
	set display(val: boolean) { 
		val ? RealNode._sys.set(this.id, this) : RealNode._sys.delete(this.id);
	}

	get tryRealNode(): boolean { return this.proto.tryRealNode; }
	set tryRealNode(val: boolean) {
		this.proto.tryRealNode = val;
		const action = val ? 'appear' : 'disappear';
		for (let i = this.proto.childRNs.length; i-- > 0;) {
			(this.proto.childRNs[i] as any)[action]?.();
		}
	}

	// 动态属性访问器
	get get(): () => any { return this.proto.get; }
	set get(fn: () => any) { 
		this.proto.get = typeof fn === 'function' ? fn : this.protoGet;
	}

	get set(): (v: any) => boolean { return this.proto.set; }
	set set(fn: (v: any) => boolean) { 
		this.proto.set = typeof fn === 'function' ? fn : this.protoSet;
	}

	get react(): () => void { return this.proto.react; }
	set react(fn: (() => void) | boolean) { 
		this.proto.react = typeof fn === 'function' ? fn : fn ? this.protoReact : null!;
	}
}

type ProxyHandler<T extends object> = {
	get?(target: T, key: PropertyKey): any;
	set?(target: T, key: PropertyKey, value: any): boolean;
	// 其他Proxy handler方法根据需要添加
};

class RealGroup<T extends object = object> extends RealNode {
	static tempProxy = class AntiGroup<T extends object> extends Function {
		static arr: PropertyKey[] = [];
		self: T;
		realGroup: RealGroup<T>;

		constructor(self: T, realGroup: RealGroup<T>) {
			super('');
			this.self = self;
			this.realGroup = realGroup;
		}

		apply() { return this.self; }
		ownKeys() { return Reflect.ownKeys(this.self); }
		has(target: T, key: PropertyKey) { return Reflect.has(this.self, key); }
		construct() { return this.realGroup.getByFilter(); }
		isExtensible() { return Reflect.isExtensible(this.self); }
		get(target: T, key: PropertyKey) { return this.realGroup.get(key); }
		preventExtensions() { return Reflect.preventExtensions(this.self); }
		deleteProperty(target: T, key: PropertyKey) { return Reflect.deleteProperty(this.self, key); }
		setPrototypeOf(target: T, prototype: object | null) { return Reflect.setPrototypeOf(this.self, prototype); }
		set(target: T, key: PropertyKey, value: any) { 
			return this.realGroup.set(Object.create(null, { [key]: { value } }) as Partial<T>); 
		}
		defineProperty(target: T, key: PropertyKey, attributes: PropertyDescriptor) {
			return Reflect.defineProperty(this.self, key, attributes);
		}
	};

	static groupMap = new WeakMap<object, RealGroup<any>>();
	static _ = (keyArray: PropertyKey[]) => true;

	static createDeepGroup<T extends object>(
		obj: T,
		id: string = '',
		tryRealNode?: boolean,
		strict?: boolean
	): RealGroup<T> | (T extends Primitive ? T : never) {
		type Primitive = string | number | boolean | symbol | null | undefined;
		
		if (obj === null || typeof obj !== 'object') {
			return strict 
				? tryRealNode 
					? RealNode.createHidden({ id, initValue: obj }) as never 
					: obj as never 
				: new RealGroup() as never;
		}

		const proto = Object.getPrototypeOf(obj);
		if (proto && proto !== Object.prototype) {
			return strict
				? tryRealNode
					? RealNode.createHidden({ id, initValue: obj }) as never
					: obj as never
				: new RealGroup({ self: obj }) as never;
		}

		const temp: Record<PropertyKey, any> = {};
		const keyArray = Reflect.ownKeys(obj);
		for (const key of keyArray) {
			temp[key] = RealGroup.createDeepGroup(
				(obj as any)[key], 
				key.toString(), 
				tryRealNode, 
				true
			);
		}
		return new RealGroup({ self: temp as T }) as RealGroup<T>;
	}

	listenerMap = new Map<
		PropertyKey | ((keyArray: PropertyKey[]) => boolean), 
		(() => void)[]
	>();

	constructor(config: { id?: symbol; info?: any; self?: T } = {}) {
		const self = config.self || Object.create(null);
		
		if (RealGroup.groupMap.has(self)) {
			console.log(`Please do not recreate group for: ${self}`);
			return RealGroup.groupMap.get(self)!;
		}

		super({ ...config, id: config.id });
		
		if (typeof self !== 'object' || self === null) {
			throw new Error('"self" must be an object');
		}

		const proxyHandler = new RealGroup.tempProxy(self, this);
		this.proto.value = new Proxy(proxyHandler, proxyHandler);
		RealGroup.groupMap.set(self, this);

		Object.defineProperty(this, 'listenerMap', {
			writable: false,
			enumerable: false
		});
	}

	keys(all?: boolean): PropertyKey[] {
		return all 
			? Reflect.ownKeys(this.proxy)
			: Object.keys(this.proxy);
	}

	realSet(value: Partial<T>, notify = true, noSelf = true): boolean | Error {
		try {
			return this.protoSet(value) && (notify && this.notify(noSelf), true);
		} catch (e) {
			console.error(e);
			return e instanceof Error ? e : new Error(String(e));
		}
	}

	addSetterListener(
		ifKeyOrFn: PropertyKey | ((keyArray: PropertyKey[]) => boolean) = RealGroup._,
		listener: () => void
	): void {
		if (typeof listener !== 'function') {
			this.error('Listener must be a function');
		}

		const listeners = this.listenerMap.get(ifKeyOrFn) || [];
		listeners.push(listener);
		this.listenerMap.set(ifKeyOrFn, listeners);
	}

	protoReact(keyArray: PropertyKey[] = RealGroup.tempProxy.arr): void {
		if (!Array.isArray(keyArray)) {
			this.error('KeyArray must be an array');
		}

		for (const [condition, listeners] of this.listenerMap) {
			const shouldTrigger = typeof condition === 'function'
				? condition(keyArray)
				: keyArray.includes(condition);

			if (shouldTrigger) {
				for (const listener of listeners) {
					try {
						listener();
					} catch (e) {
						this.log('Listener error:', e);
					}
				}
			}
		}
	}

	tryRealNodeSetter(): this {
		const self = this.proxy;
		for (const key of Reflect.ownKeys(self)) {
			const descriptor = Reflect.getOwnPropertyDescriptor(self, key);
			if (!descriptor?.get && !(self[key] instanceof RealNode)) {
				self[key] = RealNode.createHidden({ initValue: self[key] });
			}
		}
		return this;
	}

	getByFilter(filterFn?: (key: PropertyKey) => boolean): Partial<T> {
		const result: Partial<T> = {};
		const self = this.proxy;
		const keys = Reflect.ownKeys(self);
		
		for (const key of keys) {
			if (!filterFn || filterFn(key)) {
				const value = self[key];
				result[key as keyof T] = value instanceof RealNode ? value.value : value;
			}
		}
		return result;
	}

	protoSet(obj: Partial<T>): boolean {
		if (typeof obj !== 'object' || obj === null) return false;

		const self = this.proxy;
		const changedKeys: PropertyKey[] = [];
		
		for (const key of Reflect.ownKeys(obj)) {
			const newValue = obj[key as keyof T];
			const currentValue = self[key];

			if (newValue instanceof RealNode) {
				self[key] = newValue;
				changedKeys.push(key);
			} else if (currentValue instanceof RealNode) {
				if (currentValue.set(newValue, true, true, true)) {
					changedKeys.push(key);
				}
			} else if (newValue !== currentValue) {
				self[key] = newValue;
				changedKeys.push(key);
			}
		}

		if (changedKeys.length) {
			try {
				this.react?.(changedKeys);
			} catch (e) {
				this.log('React error:', e);
			}
		}
		return changedKeys.length > 0;
	}

	protoGet(keyOrKeyObj?: PropertyKey | object): any {
		if (!keyOrKeyObj) return this.getByFilter();
		
		if (typeof keyOrKeyObj !== 'object') {
			const value = this.proxy[keyOrKeyObj as keyof T];
			return value instanceof RealNode ? value.value : value;
		}

		const result: Record<PropertyKey, any> = {};
		const keys = Reflect.ownKeys(keyOrKeyObj);
		const self = this.proxy;

		for (const key of keys) {
			const value = self[key as keyof T];
			result[key] = value instanceof RealNode ? value.value : value;
		}
		return result;
	}

	get proxy(): T {
		return this.proto.value as T;
	}

	// 访问器重写
	get get(): (keyOrKeyObj?: PropertyKey | object) => any {
		return this.protoGet.bind(this);
	}

	get react(): (keyArray?: PropertyKey[]) => void {
		return this.protoReact.bind(this);
	}

	get tryRealNode(): boolean {
		return false;
	}
	
	set tryRealNode(value: boolean) {
		if (value) this.log('RealGroup cannot be realNode');
	}

	// 其他覆盖属性...
}

type AntiTarget = RealNode['proto'] & {
	self: Element | object;
	isElement: boolean;
	transform: <T>(value: T) => T;
};

class RealTarget extends RealNode {
	static proto = class AntiTarget extends RealNode.proto {
		self: Element | object = {};
		isElement: boolean = false;
		transform: <T>(value: T) => T = (value) => value;
	};

	static searchByObj<T extends object>(element: T): T extends EventTarget 
		? RealElement[] 
		: T extends object 
			? RealTarget[] 
			: never[] {
		const temp: RealTarget[] = [];
		if (!element || typeof element !== 'object') return temp as any;
		
		for (const realTarget of (this._sys as Map<symbol, RealTarget>).values()) {
			if (element === realTarget.self) temp.push(realTarget);
		}
		return temp as any;
	}

	static _react(
		this: RealTarget,
		realNode: RealNode,
		react = true,
		notify = true,
		noSelf = true
	): boolean {
		try {
			let value: any;
			const temp = this._getPositionsOfChildRN(realNode);
			while (temp.length) {
				const position = temp.pop()!.reverse();
				if (!position.length) {
					return this.realSet(realNode.value, react, notify, noSelf);
				} else {
					value = this.proto.value;
					while (position.length > 1) value = value[position.pop()!];
					if (realNode.value !== value[position[0]]) {
						value[position[0]] = realNode.value;
					}
				}
			}
			this.fix();
			if (react) this.react?.(noSelf);
			if (notify) this.notify(noSelf);
			return true;
		} catch (e) {
			if (this instanceof RealTarget) throw e;
			throw new Error(`Please avoid using "react" on ${this?.constructor.name}!\n${(e as Error).message}`);
		}
	}

	protoTransform<T>(value: T): T {
		return value;
	}

	fix(): this {
		(this.self as any)[this.key] = this.transform(this.proto.value);
		return this;
	}

	clearClassName(): boolean {
		return this.proto.isElement && (this.self as Element).className === '';
	}

	addClassName(...classNames: string[]): boolean {
		return this.proto.isElement && (this.self as Element).classList.add(...classNames);
	}

	toggleClassName(className: string): boolean {
		return this.proto.isElement && (this.self as Element).classList.toggle(className);
	}

	removeClassName(...classNames: string[]): boolean {
		return this.proto.isElement && (this.self as Element).classList.remove(...classNames);
	}

	getIndexWithin(): number {
		let i = 0;
		let current = this.self as Element;
		while (current = current.previousElementSibling as Element) i++;
		return i;
	}

	realSet(
		value: any,
		react = true,
		notify = true,
		noSelf = true
	): boolean | Error {
		try {
			let processedValue = value;
			if (this.tryRealNode) {
				const positions = this._computePositionsOfRNs(value);
				if (positions.length) {
					processedValue = this._dealWithPositionsOfRNs(positions, value);
				}
			}
			
			const result = this.proto.set.call(this, processedValue) ?? true;
			this.fix();
			if (react) this.react?.();
			if (notify) this.notify(noSelf);
			return result;
		} catch (e) {
			console.error(e);
			return e instanceof Error ? e : new Error(String(e));
		}
	}

	applyCSS(
		selfSelector: keyof HTMLElementTagNameMap | Element,
		classNameOrRuleObjObj: string | Record<string, Record<string, string>>
	): boolean {
		if (!(this.self instanceof Element)) {
			throw this.error('Not a RealElement instance');
		}

		let selector: string;
		if (typeof selfSelector !== 'string') {
			let current: Element | null = selfSelector;
			while (current && current !== this.self) {
				current = current.parentElement;
			}
			if (!current) {
				throw this.error('Selector must be a descendant element');
			}
			selector = `#${selfSelector.id || (selfSelector.id = RealElement.getRandomId())}`;
		} else {
			selector = selfSelector;
		}

		const id = this.self.id || (this.self.id = RealElement.getRandomId());
		const rules = typeof classNameOrRuleObjObj === 'string' 
			? RealElement.myStyle.get(classNameOrRuleObjObj)
			: classNameOrRuleObjObj;

		if (!rules) return false;

		RealElement.addCSSRules(
			`#${id} ${selector}`,
			rules
		);
		RealElement.addId(id, false);
		return true;
	}

	clone(
		keepValue = true,
		fix = true,
		deepCopyRelativeRNs?: boolean
	): RealTarget {
		const self = this.self instanceof Element 
			? this.self.cloneNode(true) 
			: Object.create(
				Object.getPrototypeOf(this.self), 
				Object.getOwnPropertyDescriptors(this.self)
			);

		const cloned = new RealTarget(
			{
				self,
				key: this.key,
				transform: this.transform
			},
			{
				get: this.proto.get,
				set: this.proto.set,
				react: this.proto.react,
				id: `${this.id.description}-clone`,
				info: this.info,
				initValue: keepValue ? this.proto.value : undefined
			}
		);

		Object.setPrototypeOf(cloned, Object.getPrototypeOf(this));
		
		if (deepCopyRelativeRNs !== undefined) {
			cloned.relativeRNs = deepCopyRelativeRNs 
				? [...this.relativeRNs] 
				: this.relativeRNs;
		}

		return fix ? cloned.fix() : cloned;
	}

	get isElement(): boolean {
		return this.proto.isElement;
	}

	get transform(): <T>(value: T) => T {
		return this.proto.transform;
	}

	set transform(fn: <T>(value: T) => T) {
		this.proto.transform = typeof fn === 'function' ? fn : this.protoTransform;
	}

	get self(): Element | object {
		return this.proto.self;
	}

	set self(value: Element | object) {
		if (typeof value !== 'object' || value === null) {
			throw this.error('"self" must be an object');
		}
		this.proto.self = value;
		this.proto.isElement = value instanceof Element;
	}

	constructor(
		{ self, key, transform }: { 
			self: Element | object; 
			key: string; 
			transform?: <T>(value: T) => T 
		},
		config?: RealNodeConfig,
		tryRealNode = false,
		...relativeRNs: RealNode[]
	) {
		super(config || {}, tryRealNode);
		this.proto = new (RealTarget.proto as any)() as AntiTarget;
		this.self = self;
		this.key = key;
		this.transform = transform || this.protoTransform;
		
		if (tryRealNode && config?.initValue !== undefined) {
			this.realSet(config.initValue);
		}
		
		this.relate(...relativeRNs);
		
		if (this.proto.isElement) {
			(this.self as Element).classList.add(this.constructor.name);
		}
	}
}

class RealElement extends RealTarget {
	static idSet = new Set<string>();
	static myStyle = new Map<string, Record<string, Record<string, string>>>();
	static selectorEventListeners: Record<string, Map<keyof HTMLElementTagNameMap, EventListener[]>> = {};
	static keyboardController: {
		previous: string;
		next: string;
		enter: string;
		back: string;
	} | null = null;

	get self(): Element {
		return this.proto.self as Element;
	}

	set self(self: Element) {
		if (!(self instanceof Element)) {
			this.error('"self" must be Element!');
		}
		this.proto.self = self;
		this.proto.isElement = true;
	}

	static findId(id: string): boolean {
		return this.idSet.has(id);
	}

	static deleteId(id: string): boolean {
		if (typeof id !== 'string') {
			console.error('Please use String "id"!');
			return false;
		}
		return this.idSet.delete(id);
	}

	static getRandomId(): string {
		let temp: string;
		do {
			temp = 'C3' + Math.floor(Math.random() * 1e14).toString(36);
		} while (this.idSet.has(temp));
		return temp;
	}

	static addId(id: string, strict = true): void {
		if (!id) return;
		if (typeof id !== 'string') {
			this.error('Please use String "id"!');
			return;
		}
		if (this.idSet.has(id)) {
			if (strict) this.error('Please use another "id"!');
			return;
		}
		this.idSet.add(id);
	}

	static makeElementByString = (() => {
		const template = document.createElement('template');
		return Object.assign(
			(innerHTML: string) => {
				template.innerHTML = innerHTML;
				return template.content.firstElementChild!.cloneNode(true);
			},
			{
				_clear: () => {
					template.innerHTML = '';
					return template.content;
				}
			}
		);
	})();

	static createImg(): RealElement {
		return new RealElement({ self: document.createElement('img'), key: 'src' });
	}

	static createVideo(): RealElement {
		return new RealElement({ self: document.createElement('video'), key: 'src' });
	}

	static createAudio(): RealElement {
		return new RealElement({ self: document.createElement('audio'), key: 'src' });
	}

	static createDiv(id: string, initValue = ''): RealElement {
		return new RealElement(
			{ self: document.createElement('div'), key: 'textContent' },
			{ id, initValue }
		);
	}

	static createTextarea(placeholder: string): RealElement {
		return new RealElement({
			self: this.makeElement('textarea', { placeholder }),
			key: 'value'
		});
	}

	static makeElement<T extends Element>(
		tagName: keyof HTMLElementTagNameMap | T,
		config?: Partial<T>,
		cssConfig?: Partial<CSSStyleDeclaration>
	): T {
		const element = tagName instanceof Element 
			? tagName 
			: document.createElement(tagName);
		
		if (config) Object.assign(element, config);
		if (cssConfig) Object.assign(element.style, cssConfig);
		
		return element as T;
	}

	static applyKeyboardController(...elements: (Element | { self: Element })[]): void {
		elements.forEach(ele => {
			const target = ele instanceof Element ? ele : ele?.self;
			target?.classList.add('keyboardController');
		});
	}

	static cancelKeyboardController(...elements: (Element | { self: Element })[]): void {
		elements.forEach(ele => {
			const target = ele instanceof Element ? ele : ele?.self;
			target?.classList.remove('keyboardController');
		});
	}

	static addEventListenerBySelectors = (() => {
		const handler = (
			selectors: string,
			type: keyof HTMLElementEventMap,
			listener: EventListener
		) => {
			if (!selectors || selectors === '*') {
				addEventListener(type, listener);
				return;
			}

			if (!this.selectorEventListeners[type]) {
				this.selectorEventListeners[type] = new Map();
				addEventListener(type, e => {
					const listeners = this.selectorEventListeners[type]?.get(selectors);
					listeners?.forEach(fn => {
						try {
							fn(e);
						} catch (err) {
							console.error(err);
						}
					});
				});
			}

			const listeners = this.selectorEventListeners[type].get(selectors) || [];
			listeners.push(listener);
			this.selectorEventListeners[type].set(selectors, listeners);
		};

		return handler;
	})();

	static addCSSRules = (() => {
		let styleSheet: CSSStyleSheet;

		const initializeStyleSheet = async () => {
			await new Promise<void>(resolve => {
				RealWorld.onload.then(() => {
					const style = document.createElement('style');
					document.head.appendChild(style);
					styleSheet = style.sheet as CSSStyleSheet;
					resolve();
				});
			});
		};

		const insertRule = (selector: string, rules: string) => {
			if (!styleSheet) {
				initializeStyleSheet().then(() => insertRule(selector, rules));
				return;
			}
			try {
				styleSheet.insertRule(`${selector} { ${rules} }`, styleSheet.cssRules.length);
			} catch (e) {
				console.error(e);
			}
		};

		return (prefix: string, ruleObj: Record<string, Record<string, string>>) => {
			Object.entries(ruleObj).forEach(([selector, styles]) => {
				const fullSelector = `${prefix} ${selector}`.trim();
				const rules = Object.entries(styles)
					.map(([prop, value]) => `${prop}:${value};`)
					.join('');
				insertRule(fullSelector, rules);
			});
		};
	})();

	static defaultInit = (() => {
		let initialized = false;
		
		return () => {
			if (initialized) return RealWorld.onload;
			
			initialized = true;
			return RealWorld.onload.then(() => {
				this.addCSSRules('', {
					'*': { 
						margin: '0',
						padding: '0',
						border: '0',
						userSelect: 'none'
					},
					':root': {
						'--mapWidth': '1920px',
						'--halfBlack': 'rgba(0,0,0,0.5)'
					}
				});
			});
		};
	})();

	constructor(
		{ self, key, transform }: { self: Element; key: string; transform?: Function },
		config?: RealNodeConfig,
		tryRealNode = false,
		...relativeRNs: RealNode[]
	) {
		super({ self, key, transform }, config, tryRealNode, ...relativeRNs);
		this.addClassName(this.constructor.name);
	}
}

// 键盘事件初始化
if (browserMode) {
	addEventListener('keydown', e => {
		// 键盘控制逻辑
	});
	RealElement.keyboardController = {
		previous: 'ArrowUp',
		next: 'ArrowDown',
		enter: 'ArrowRight',
		back: 'ArrowLeft'
	};
}

class StoryPromise {
	resolve: ResolveFn | null = null;
	reject: RejectFn | null = null;
	promise: Promise<any>;

	constructor() {
		const executor = (resolve: ResolveFn, reject: RejectFn) => {
			this.resolve = resolve;
			this.reject = reject;
		};
		this.promise = new Promise(executor.bind(this));
	}
}

class RealStory {
	private static instance: RealStory;
	private static intervalId: NodeJS.Timeout;
	ofStory: RealStory | null = null;
	pages: RealStory[] = [];
	fnList: Array<() => unknown> = [];
	info: any;
	private static isBusy = false;

	constructor(ofStory?: RealStory) {
		if (ofStory instanceof RealStory) {
			this.ofStory = ofStory;
			ofStory.pages.push(this);
		}
	}

	newPage(): RealStory {
		return new RealStory(this);
	}

	newPrivatePage(fn?: (page: RealStory) => void): Promise<void> {
		return new Promise(resolve => resolve(fn?.(this.newPage())));
	}

	then(fn: () => unknown): this {
		if (typeof fn === 'function') this.fnList.unshift(fn);
		return this;
	}

	getNextPage(): RealStory | undefined {
		if (!(this.ofStory instanceof RealStory)) return;
		const idx = this.ofStory.pages.indexOf(this);
		return this.ofStory.pages[idx + 1];
	}

	getPreviousPage(): RealStory | undefined {
		if (!(this.ofStory instanceof RealStory)) return;
		const idx = this.ofStory.pages.indexOf(this);
		return this.ofStory.pages[idx - 1];
	}

	newPromiseObj(): StoryPromise {
		const temp = new StoryPromise();
		this.then(() => temp.promise);
		return temp;
	}

	async launch(): Promise<void> {
		let depth = 0;
		let current: RealStory | null = this;
		while ((current = current.ofStory) instanceof RealStory) depth++;

		if (!depth) RealStory.isBusy = true;

		while (this.pages.length || this.fnList.length) {
			while (this.fnList.length) {
				try {
					const fn = this.fnList.pop();
					this.info = await fn?.(this.info);
				} catch (e) {
					console.error(`Depth ${depth} function error:`, e);
				}
			}

			try {
				await this.pages.shift()?.launch?.();
			} catch (e) {
				console.error(`Depth ${depth} page error:`, e);
			}
		}

		if (!depth) RealStory.isBusy = false;
	}

	get index(): number {
		return this.ofStory?.pages.indexOf(this) ?? -1;
	}

	static {
		this.intervalId = setInterval(() => {
			if (!this.isBusy) this.instance.launch();
		}, 50);
	}

	static get StoryPromise(): typeof StoryPromise {
		return StoryPromise;
	}
}

class RealPromise<T = any> {
	private list: unknown[] = [];
	private _self: Promise<T>;
	private static _require: ((path: string) => RealPromise<any>) | null = null;

	constructor(promise: T | Promise<T>) {
		Object.defineProperty(this, 'list', {
			enumerable: false,
			writable: false,
			value: []
		});

		this._self = Promise.resolve(promise)
			.then(this._push.bind(this))
			.catch(this._throw.bind(this));
	}

	private _push<V>(value: V): V {
		this.list.push(value);
		return value;
	}

	private _throw(e: unknown): never {
		this.list.push(e);
		throw e;
	}

	catch<U = never>(onrejected?: (reason: any) => U | PromiseLike<U>): RealPromise<T | U> {
		this._self = this._self.catch(onrejected);
		return this as unknown as RealPromise<T | U>;
	}

	finally(onfinally?: () => void): RealPromise<T> {
		this._self = this._self.finally(onfinally);
		return this;
	}

	then<U = T, V = never>(
		onfulfilled?: (value: T) => U | PromiseLike<U>,
		onrejected?: (reason: any) => V | PromiseLike<V>
	): RealPromise<U | V> {
		this._self = this._self.then(onfulfilled, onrejected)
			.then(this._push.bind(this), this._throw.bind(this));
		return this as unknown as RealPromise<U | V>;
	}

	async tryHandler<U>(
		handler: (v: T) => U,
		onerror?: (error: Error) => void
	): Promise<U | undefined> {
		try {
			await this._self;
		} catch (e) {
			console.error('Unhandled error:', e);
		}

		for (let i = this.list.length - 1; i >= 0; i--) {
			try {
				return handler(await Promise.resolve(this.list[i] as T));
			} catch (e) {
				(onerror ?? console.error)(e instanceof Error ? e : new Error(String(e)));
			}
		}
		return undefined;
	}

	get length(): number {
		return this.list.length;
	}

	static get require(): (path: string) => RealPromise<any> {
		if (!this._require) {
			const pathMap = new Map<string, RealPromise<any>>();
			const tempReg = /[^/]+\/\.\.\//g;

			this._require = function(this: RealPromise, path: string) {
				path = path.replace(/\\/g, '/').replace(tempReg, '');

				if (!pathMap.has(path)) {
					const sp = new StoryPromise();
					const script = document.createElement('script');
					script.src = path;
					script.onload = () => sp.resolve!(undefined);
					script.onerror = (e) => sp.reject!(e);
					document.head.appendChild(script);

					const rp = new RealPromise(sp.promise);
					rp.finally(() => script.remove());
					pathMap.set(path, rp);
				}

				return pathMap.get(path)!;
			}.bind(null);
		}
		return this._require;
	}
}

// 初始化
RealPromise.self = new RealPromise(RealWorld.onload);
RealPromise.self.finally(() => 
	RealNode.time(RealWorld.onload, time => 
		console.log('Set up in', time, 'ms')
	)
);

type CanvasClearConfig = {
	x?: number;
	y?: number;
	radiusX?: number;
	radiusY?: number;
	relative?: boolean;
	shape?: 'rect' | 'circle';
};

type CanvasAnimationConfig = {
	prefix: string;
	suffix: string;
	startN?: number;
	length: number;
	midLength?: number;
	bgSrc?: string;
	playMode?: 0 | 1 | 2 | 3;
	timeSep?: number;
	sizeMode?: 'std' | 'auto';
	resizeAfter?: boolean;
};

interface AntiCanvas extends RealTarget['proto'] {
	self: HTMLCanvasElement;
	temp: CanvasRenderingContext2D;
	backup: CanvasRenderingContext2D;
	img: HTMLImageElement;
	clearBeforeDraw: boolean;
	ctx: CanvasRenderingContext2D;
}

class RealCanvas extends RealElement {
	static proto = class AntiCanvas extends RealTarget.proto {
		temp = document.createElement('canvas').getContext('2d')!;
		backup = document.createElement('canvas').getContext('2d')!;
		img = new Image();
		isElement = true;
		clearBeforeDraw = true;
		ctx: CanvasRenderingContext2D;
	};

	static noCache = true;
	static srcImageMap = new Map<string, HTMLImageElement>();

	static strN(N: number | string, longN: number): string {
		let str = String(N);
		while (str.length < longN) str = '0' + str;
		return str;
	}

	static getImageBySrc = (src: string): Promise<HTMLImageElement> => {
		return new Promise((resolve, reject) => {
			const img = this.srcImageMap.get(src) || new Image();
			if (img.complete) return resolve(img);

			img.onload = () => {
				this.srcImageMap.set(src, img);
				resolve(img);
			};
			img.onerror = reject;
			img.src = src;
		});
	};

	proto: AntiCanvas;
	loaded: Promise<void>;

	constructor(id?: string, width?: number, height?: number, tryRealNode = false, ...relativeRNs: RealNode[]) {
		const canvas = (typeof id === 'string' ? document.getElementById(id) : null) as HTMLCanvasElement || 
					  document.createElement('canvas');
		
		if (canvas.tagName !== 'CANVAS') {
			throw new Error('Element must be a canvas');
		}

		super({ self: canvas, key: 'src' }, { id }, tryRealNode, ...relativeRNs);
		
		this.proto = new RealCanvas.proto() as AntiCanvas;
		this.width = width || 640;
		this.height = height || 360;
		this.proto.ctx = canvas.getContext('2d')!;
		this.loaded = Promise.resolve();
	}

	async clearAsync(): Promise<void> {
		await this.loaded;
		this.clear();
	}

	clear(): CanvasRenderingContext2D {
		this.proto.ctx.clearRect(0, 0, this.width, this.height);
		return this.proto.ctx;
	}

	async clearShape(config: CanvasClearConfig): Promise<void> {
		const { x = 0, y = 0, radiusX, radiusY, relative, shape } = config;
		// 实现清除逻辑
	}

	applyMouseClear(config: CanvasClearConfig): () => void {
		// 实现鼠标清除逻辑
		return () => {};
	}

	animate(config: CanvasAnimationConfig): { loaded: Promise<void>; finished: Promise<void> } {
		// 实现动画逻辑
		return { 
			loaded: Promise.resolve(),
			finished: Promise.resolve() 
		};
	}

	// 属性访问器
	get ctx(): CanvasRenderingContext2D { return this.proto.ctx; }
	get width(): number { return this.proto.self.width; }
	set width(v: number) { 
		this.proto.self.width = v;
		this.proto.temp.canvas.width = v;
	}
	get height(): number { return this.proto.self.height; }
	set height(v: number) { 
		this.proto.self.height = v;
		this.proto.temp.canvas.height = v;
	}
}

type FileOperationType = 'upload' | 'download';
type FsStatResult = [Error | null, any];
type DirReadResult = [Error | null, string[]];
type LoadResult = [Error | null, number?];

interface AntiLoader extends RealTarget['proto'] {
	onerror: ((error: Error) => void) | null;
	onloadend: ((n: number) => void) | null;
}

class RealLoader extends RealElement {
	static proto = class AntiLoader extends RealTarget.proto {
		onerror: ((error: Error) => void) | null = null;
		onloadend: ((n: number) => void) | null = null;
	};

	static fs = new (class DocumentFs {
		async stat(path: string): Promise<FsStatResult> {
			if (nodeMode) {
				const fs = await nodeRequire('fs');
				return RealWorld.cb2promise({ thisArg: fs, useFn: 'stat' }, path);
			}
			try {
				const response = await fetch(path);
				return response.status < 300 ? [null, response] : [new Error('Failed request'), null];
			} catch (e) {
				return [e as Error, null];
			}
		}

		async readdir(path: string, ...patterns: (string | string[])[]): Promise<DirReadResult> {
			// 实现目录读取逻辑
			return [null, []];
		}
	})();

	static _configDescriptor: PropertyDescriptor = {
		writable: false,
		enumerable: false,
		configurable: false
	};

	static async getArrayBufferFrom(data: any): Promise<ArrayBuffer> {
		if (data instanceof ArrayBuffer) return data;
		if (ArrayBuffer.isView(data)) return data.buffer;
		if (data instanceof Blob) return data.arrayBuffer();
		return new Blob([data]).arrayBuffer();
	}

	static load: (loader: RealLoader) => Promise<LoadResult> = nodeMode ?
		async (loader) => {
			try {
				const fs = await nodeRequire('fs');
				const data = await loader.dataGetter();
				// Node.js 实现逻辑
				return [null, 1];
			} catch (e) {
				return [e as Error];
			}
		} :
		async (loader) => {
			try {
				const data = await loader.dataGetter();
				const blob = data instanceof Blob ? data : new Blob([data]);
				const url = URL.createObjectURL(blob);
				loader.temp.href = url;
				loader.temp.click();
				URL.revokeObjectURL(url);
				return [null];
			} catch (e) {
				return [e as Error];
			}
		};

	proto: AntiLoader;
	type: FileOperationType;
	temp: HTMLAnchorElement | HTMLInputElement;
	dataGetter: () => Promise<any>;

	constructor(
		isDownload: boolean,
		fileName?: string,
		dataGetter?: () => Promise<any>,
		config: {
			innerHTML?: string;
			onerror?: (e: Error) => void;
			onloadend?: (n: number) => void;
		} = {}
	) {
		super({ 
			self: document.createElement('div'), 
			key: 'innerHTML' 
		});

		this.proto = new RealLoader.proto() as AntiLoader;
		this.type = isDownload ? 'download' : 'upload';
		this.temp = isDownload ? 
			document.createElement('a') : 
			document.createElement('input');
		
		if (isDownload) {
			(this.temp as HTMLAnchorElement).download = fileName || 'file';
		} else {
			(this.temp as HTMLInputElement).type = 'file';
		}

		this.dataGetter = dataGetter || (async () => null);
		this.value = config.innerHTML || '';
		this.onerror = config.onerror || null;
		this.onloadend = config.onloadend || null;

		Object.defineProperties(this, {
			type: RealLoader._configDescriptor,
			temp: RealLoader._configDescriptor
		});
	}

	load(): Promise<LoadResult> {
		return RealLoader.load(this);
	}

	get files(): FileList | never {
		if (this.type === 'upload') {
			return (this.temp as HTMLInputElement).files!;
		}
		throw new Error('Downloader does not have files');
	}

	get onerror() { return this.proto.onerror; }
	set onerror(fn) { this.proto.onerror = typeof fn === 'function' ? fn : null; }

	get onloadend() { return this.proto.onloadend; }
	set onloadend(fn) { this.proto.onloadend = typeof fn === 'function' ? fn : null; }
}

interface AntiSelect extends RealTarget['proto'] {
	list: HTMLOptionElement[];
}

class RealSelect extends RealElement {
	static proto = class AntiSelect extends RealTarget.proto {
		list: HTMLOptionElement[] = [];
	};

	proto: AntiSelect;
	defaultKey: string;
	defaultValue: string;

	constructor(
		id?: string,
		multiple = false,
		optionConfig: Record<string, string> = {},
		tryRealNode = false,
		defaultKey = '_',
		defaultValue = '',
		onchange?: (e: Event) => void
	) {
		const select = (typeof id === 'string' ? 
			document.getElementById(id) : null) as HTMLSelectElement || 
			document.createElement('select');

		if (select.tagName !== 'SELECT') {
			throw new Error('Element must be a select');
		}

		super({
			key: 'innerHTML',
			self: Object.assign(select, { multiple, onchange })
		}, { id, initValue: { ...optionConfig } }, tryRealNode);

		this.proto = new RealSelect.proto() as AntiSelect;
		this.defaultKey = defaultKey;
		this.defaultValue = defaultValue;
		this.fix();
	}

	private fix(): this {
		this.self.innerHTML = this.protoTransform(this.proto.value);
		this.proto.list = Array.from(this.self.options);
		return this;
	}

	protoTransform(value: Record<string, string>): string {
		return Object.entries(value)
			.sort(([a], [b]) => a.localeCompare(b))
			.map(([k, v]) => 
				`<option value="${v}" ${k === this.defaultKey ? 'selected' : ''}>${k}</option>`
			).join('');
	}

	get list(): HTMLOptionElement[] {
		return this.proto.list;
	}
}

type ComtagConfig = [
	boolean, 
	ArrayLike<any>, 
	boolean | undefined, 
	((this: RealComtag) => void) | null
];

type DivListConfig = [
	boolean, 
	ArrayLike<any>, 
	boolean | undefined, 
	((this: RealDivList) => void) | null
];

class RealComtag extends RealElement {
	static comtagClassMap = new Map<string, ComtagConfig>();

	static defineComtagClass(
		className: string,
		tryHTML: boolean,
		optionList: ArrayLike<any>,
		tryRealNode?: boolean,
		cssRuleObjObj?: Record<string, Record<string, string>>,
		callback?: (this: RealComtag) => void
	): void {
		if (!/^([A-Za-z]\w*)$/.test(className)) {
			throw new Error('Illegal "className"!');
		}
		if (this.comtagClassMap.has(className)) {
			throw new Error('"className" repeated!');
		}
		if (!optionList?.[Symbol.iterator]) {
			throw new Error('"optionList" must be ArrayLike!');
		}
		
		RealElement.addCSSRules('.' + className, cssRuleObjObj);
		this.comtagClassMap.set(className, [
			tryHTML,
			optionList,
			tryRealNode ?? false,
			typeof callback === 'function' ? callback : null
		]);
	}

	static createByClassName(className: string, ...args: any[]): RealComtag {
		const config = this.comtagClassMap.get(className);
		if (!config) {
			throw new Error('"className" not found!');
		}
		
		const temp = new RealComtag('', config[0], config[1], config[2]);
		config[3]?.apply(temp, args);
		temp.addClassName(className);
		return temp;
	}

	fix(): this {
		const temp = this.transform(this.proto.value);
		const fragment = document.createDocumentFragment();
		
		for (const el of temp) {
			fragment.appendChild(el);
		}
		
		this.self.innerHTML = '';
		this.self.appendChild(fragment);
		return this;
	}

	protoTransform(value: any): Element[] {
		if (!value?.[Symbol.iterator]) {
			throw new Error('"value" must be ArrayLike!');
		}
		
		return Array.from(value).map(item => 
			item instanceof Element ? item : document.createElement(String(item))
		);
	}

	protoSet(value: any): boolean {
		if (!value?.[Symbol.iterator]) {
			throw new Error('"value" must be ArrayLike!');
		}
		
		const oldValues = Array.from(this.proto.value);
		const newValues = Array.from(value);
		
		if (oldValues.length !== newValues.length || 
			!oldValues.every((v, i) => v === newValues[i])) {
			this.proto.value = newValues;
			return true;
		}
		return false;
	}

	constructor(
		id?: string,
		tryHTML?: boolean,
		optionList?: ArrayLike<any>,
		tryRealNode?: boolean,
		selfAssign?: Record<string, (event: Event) => void>
	) {
		const element = (typeof id === 'string' ? document.getElementById(id) : null) as HTMLElement ?? 
					  document.createElement('div');
					  
		super({ self: element }, { 
			id: id ?? '', 
			initValue: optionList ? Array.from(optionList) : [] 
		}, tryRealNode);
		
		if (selfAssign) {
			Object.assign(this.self, selfAssign);
		}
	}
}

class RealDivList extends RealElement {
	static divListClassMap = new Map<string, DivListConfig>();

	static createList(
		length: number = 0,
		tagName: string,
		id?: string,
		selfAssign?: Record<string, (event: Event) => void>
	): RealDivList {
		const elements = Array.from({ length }, () => document.createElement(tagName));
		return new RealDivList(id, true, elements, RealDivList.tryRealNode, selfAssign);
	}

	static defineDivListClass(
		className: string,
		tryHTML: boolean,
		optionList: ArrayLike<any>,
		tryRealNode?: boolean,
		cssRuleObjObj?: Record<string, Record<string, string>>,
		callback?: (this: RealDivList) => void
	): void {
		if (!/^([A-Za-z]\w*)$/.test(className)) {
			throw new Error('Illegal "className"!');
		}
		if (this.divListClassMap.has(className)) {
			throw new Error('"className" repeated!');
		}
		if (!optionList?.[Symbol.iterator]) {
			throw new Error('"optionList" must be ArrayLike!');
		}
		
		RealElement.addCSSRules('.' + className, cssRuleObjObj);
		this.divListClassMap.set(className, [
			tryHTML,
			optionList,
			tryRealNode ?? false,
			typeof callback === 'function' ? callback : null
		]);
	}

	static createByClassName(className: string, ...args: any[]): RealDivList {
		const config = this.divListClassMap.get(className);
		if (!config) {
			throw new Error('"className" not found!');
		}
		
		const temp = new RealDivList('', config[0], config[1], config[2]);
		config[3]?.apply(temp, args);
		temp.addClassName(className);
		return temp;
	}

	protoGet(): Element[] {
		return this.proto.list;
	}

	protoSet(value: any): boolean {
		this.proto.value = Array.from(value);
		return true;
	}

	protoTransform(value: any): Element[] {
		if (!value?.[Symbol.iterator]) {
			throw new Error('"value" must be ArrayLike!');
		}
		
		return Array.from(value).map(item => {
			const div = document.createElement('div');
			if (item instanceof Element) {
				div.appendChild(item);
			} else {
				div[this.tryHTML ? 'innerHTML' : 'textContent'] = String(item);
			}
			return div;
		});
	}

	getIdDict<T extends boolean>(
		toRealElement?: T,
		key?: string
	): T extends true ? Record<string, RealElement> : Record<string, Element> {
		const result: Record<string, any> = {};
		
		this.proto.childrenList.forEach((children, i) => {
			if (children.length === 1 && children[0]?.id) {
				const el = this.proto.list[i];
				result[children[0].id] = toRealElement ? 
					new RealElement({ self: el, key }) : 
					el;
			}
		});
		
		return result as T extends true ? Record<string, RealElement> : Record<string, Element>;
	}

	getRealElementList(): RealElement[] {
		return this.proto.list.map(el => new RealElement({ self: el }));
	}

	fix(): this {
		const elements = this.transform(this.proto.value);
		const fragment = document.createDocumentFragment();
		
		this.proto.childrenList = [];
		elements.forEach(el => {
			fragment.appendChild(el);
			this.proto.childrenList.push(Array.from(el.children));
		});
		
		this.self.innerHTML = '';
		this.self.appendChild(fragment);
		return this;
	}

	get childrenList(): Element[][] {
		return this.proto.childrenList;
	}

	constructor(
		id?: string,
		tryHTML?: boolean,
		optionList?: ArrayLike<any>,
		tryRealNode?: boolean,
		selfAssign?: Record<string, (event: Event) => void>
	) {
		const element = (typeof id === 'string' ? document.getElementById(id) : null) as HTMLElement ?? 
					  document.createElement('div');
					  
		super({ self: element }, { 
			id: id ?? '', 
			initValue: optionList ? Array.from(optionList) : [] 
		}, tryRealNode);
		
		if (selfAssign) {
			Object.assign(this.self, selfAssign);
		}
	}
}

class RealImgList extends RealDivList {
	static _react(
		this: RealImgList,
		realNode: RealNode,
		react = true,
		notify = true,
		noSelf = true
	): boolean {
		try {
			let value: any;
			const temp = this._getPositionsOfChildRN(realNode);
			while (temp.length) {
				const position = temp.pop()!.reverse();
				const tempValue = realNode.value;
				if (!position.length) {
					return this.realSet(tempValue, react, notify, noSelf);
				} else {
					value = this.proto.value;
					while (position.length > 1) value = value[position.pop()!];
					if (tempValue !== value[position[0]]) {
						value[position[0]] = tempValue;
						if (value === this.proto.value) {
							const img = this.proto.childrenList[position[0]][0] as HTMLImageElement;
							img.src = tempValue?.src ?? String(tempValue);
						}
					}
				}
			}
			if (react) this.react?.(noSelf);
			if (notify) this.notify(noSelf);
			return true;
		} catch (e) {
			if (this instanceof RealImgList) throw e;
			throw new Error(`Please avoid using method "react" of ${this?.constructor.name}!\n${(e as Error).message}`);
		}
	}

	cloneImgList(): HTMLImageElement[] {
		return this.childrenList.map(child => 
			child[0].cloneNode(true) as HTMLImageElement
		);
	}

	protoTransform(value: any): HTMLDivElement[] {
		if (!value?.[Symbol.iterator]) {
			throw new Error('"value" must be ArrayLike!');
		}

		return Array.from(value).map(item => {
			const div = document.createElement('div');
			const img = item instanceof HTMLImageElement ? 
				item : 
				new Image();
			if (typeof item === 'string') img.src = item;
			div.appendChild(img);
			return div;
		});
	}

	protoSet(value: any): boolean {
		if (!value?.[Symbol.iterator]) {
			throw new Error('"value" must be ArrayLike!');
		}

		const oldValues = Array.from(this.proto.value);
		const newValues = Array.from(value);

		const hasChange = !oldValues.every((oldVal, index) => {
			const newVal = newValues[index];
			return (
				(oldVal?.src ?? oldVal) === 
				(newVal?.src ?? newVal)
			);
		});

		if (hasChange) {
			this.proto.value = newValues;
			return true;
		}
		return false;
	}

	constructor(
		id?: string,
		srcList?: Array<string | HTMLImageElement>,
		tryRealNode?: boolean,
		selfAssign?: Record<string, (event: Event) => void>
	) {
		super(id, true, srcList ?? [], tryRealNode, selfAssign);
	}
}

interface AntiQueue extends RealDivList['proto'] {
	queueArray: number[];
}

class RealDivQueue extends RealDivList {
	static proto = class AntiQueue extends RealDivList.proto {
		queueArray: number[] = [];
	};

	static tempTarget: Element | null = null;

	static {
		if (browserMode) {
			RealWorld.onload.then(() => {
				RealElement.addCSSRules('.RealDivQueue', {
					'>div:hover': { transform: 'scale(1.1,1)' },
					'>div:active': { transform: 'scale(1.2,1)' }
				});
			});

			addEventListener('mousedown', e => {
				RealDivQueue.tempTarget = e.target as Element;
			});

			addEventListener('mouseup', e => {
				let targetChain0: Element[] = [];
				let current: Element | null = RealDivQueue.tempTarget;
				while (current) {
					targetChain0.push(current);
					current = current.parentElement;
				}

				let targetChain1: Element[] = [];
				current = e.target as Element;
				while (current) {
					targetChain1.push(current);
					current = current.parentElement;
				}

				let commonAncestor: Element | null = null;
				while (targetChain0.length && targetChain1.length && 
					   targetChain0[targetChain0.length-1] === targetChain1[targetChain1.length-1]) {
					commonAncestor = targetChain0.pop()!;
					targetChain1.pop();
				}

				const [target0, target1] = [targetChain0.pop(), targetChain1.pop()];
				if (!target0 || !target1 || !commonAncestor) return;

				const parent = target0.parentElement;
				if (parent?.classList.contains('RealDivQueue')) {
					let realDivQueue: RealDivQueue | undefined;
					for (const element of RealTarget.searchByObj(parent)) {
						if (element instanceof RealDivQueue) {
							realDivQueue = element;
							break;
						}
					}
					if (!realDivQueue) return;

					const oldQueue = realDivQueue.queueArray;
					const index0 = oldQueue.indexOf(realDivQueue.proto.list.indexOf(target0));
					const index1 = oldQueue.indexOf(realDivQueue.proto.list.indexOf(target1));
					
					if (index0 === -1 || index1 === -1) return;

					let newQueue: number[];
					if (index0 > index1) {
						newQueue = [
							...oldQueue.slice(0, index1),
							oldQueue[index0],
							...oldQueue.slice(index1, index0),
							...oldQueue.slice(index0 + 1)
						];
					} else {
						newQueue = [
							...oldQueue.slice(0, index0),
							...oldQueue.slice(index0 + 1, index1 + 1),
							oldQueue[index0],
							...oldQueue.slice(index1 + 1)
						];
					}
					realDivQueue.applyQueue(newQueue, target0, target1);
				}
			});
		}
	}

	getListQueue(): Element[] {
		return this.queueArray.map(index => this.proto.list[index]);
	}

	fix(): this {
		super.fix();
		this.applyQueue([]);
		return this;
	}

	applyQueue(
		queueArray?: number[],
		target0?: Element,
		target1?: Element
	): this {
		const previousQueue = this.proto.queueArray ?? [];
		const newQueue = Array.isArray(queueArray) ? 
			queueArray.slice(0, this.proto.list.length) : 
			previousQueue;

		// 验证队列合法性
		if (!newQueue.every((val, idx, arr) => 
			val >= 0 && val < this.proto.list.length && 
			arr.indexOf(val) === idx
		)) {
			throw new Error('Invalid queueArray');
		}

		if (target0 && target1) {
			const parent = target0.parentElement;
			if (parent === this.self) {
				if (this.self.children[newQueue.indexOf(target0)] === target1) {
					target1.insertAdjacentElement('afterend', target0);
				} else {
					target1.insertAdjacentElement('beforebegin', target0);
				}
			}
		} else {
			const fragment = document.createDocumentFragment();
			newQueue.forEach(index => {
				fragment.appendChild(this.proto.list[index]);
			});
			
			const scrollPos = {
				top: this.self.scrollTop,
				left: this.self.scrollLeft
			};
			
			this.self.classList.add('disappear');
			this.self.innerHTML = '';
			this.self.appendChild(fragment);
			this.self.scrollTo(scrollPos);
			this.self.classList.remove('disappear');
		}

		this.proto.queueArray = newQueue;
		if (Array.isArray(queueArray)) {
			this.react?.();
			this.notify(true);
		}
		return this;
	}

	get queueArray(): number[] {
		return [...(this.proto.queueArray ?? [])];
	}
}

type OptionConfig = Record<string, any>;
type DivListEventCallback = (this: RealDivList, e: Event) => void;
type TitleGetter = string | RealNode | (() => string);

// 创建RealDivSelect组件
const createRealDivSelect = (
	optionConfig?: OptionConfig,
	multiple?: boolean,
	onchange?: DivListEventCallback
): RealDivList => {
	return RealDivList.createByClassName('realDivSelect', optionConfig, multiple, onchange);
};

RealWorld.onload = RealWorld.onload.finally(() => {
	RealDivList.defineDivListClass('realDivSelect', false, [], true, {
		'': { background: 'linear-gradient(135deg,#fff,#000)' },
		'>div': { backgroundColor: '#333', transform: 'scale(0.8,1)' },
		'>div:hover': { transform: 'scale(0.9,1)' },
		'>.selected': { backgroundColor: '#555', transform: 'scale(1)', fontWeight: 'bolder' }
	}, function(this: RealDivList) {
		const changeConfig: EventInit = { bubbles: true, cancelable: false };
		
		// 类型化临时方法
		const tempGet = function(this: RealDivList): any[] {
			const temp: any[] = [];
			const list = this.proto.list as HTMLDivElement[];
			for (let i = 0; list[i]; i++) {
				if (list[i].classList.contains('selected')) {
					temp.push(this.info.optionList[i]);
				}
			}
			if (!this.info.multiple && temp.length === 0 && list.length > 0) {
				list[0].classList.add('selected');
				temp.push(this.info.optionList[0]);
			}
			return temp;
		};

		const tempSet = function(this: RealDivList, value: OptionConfig): boolean {
			const options = Object(value);
			this.info.optionList = [];
			this.proto.value = Object.keys(options)
				.sort((a, b) => Number(a) - Number(b))
				.map(key => {
					this.info.optionList.push(options[key]);
					return key;
				});
			this.fix().value;
			return false;
		};

		const tempReact = async function(RS: RealDivList): Promise<boolean> {
			RS.react?.();
			await RS.notify();
			RS.self.dispatchEvent(new Event('change', changeConfig));
			return true;
		};

		RealElement.addEventListenerBySelectors('.realDivSelect>div', 'click', (e: MouseEvent) => {
			let REList = RealTarget.searchByObj((e.target as Element).parentElement);
			let targetDivList: RealDivList | undefined;

			while (REList.length > 0) {
				const temp = REList.pop();
				if (temp?.self.classList.contains('realDivSelect')) {
					targetDivList = temp as RealDivList;
					break;
				}
			}

			if (!targetDivList) return;

			const previousValue = targetDivList.value[0];
			const REListElements = targetDivList.proto.list as HTMLDivElement[];

			if (targetDivList.info.multiple) {
				(e.target as Element).classList.toggle('selected');
				tempReact(targetDivList);
			} else {
				REListElements.forEach((element, i) => {
					element.classList.toggle('selected', element === e.target);
				});
				if (previousValue !== targetDivList.value[0]) {
					tempReact(targetDivList);
				}
			}
		});

		return function(
			this: RealDivList,
			optionConfig?: OptionConfig,
			multiple?: boolean,
			onchange?: DivListEventCallback
		) {
			this.get = tempGet;
			this.set = tempSet;
			this.info = Object(this.info);
			this.info.multiple = Boolean(multiple);
			
			if (typeof onchange === 'function') {
				this.self.onchange = onchange.bind(this);
			}
			
			this.value = optionConfig ?? {};
		};
	}());
});

// 创建RealDivSearch组件
const createRealDivSearch = (placeholder?: string): RealDivList => {
	return RealDivList.createByClassName('realDivSearch', placeholder);
};

RealWorld.onload = RealWorld.onload.finally(() => {
	RealDivList.defineDivListClass('realDivSearch', true, [], true, {
		'>:nth-child(2)>div>div:hover': { transform: 'scale(0.9,1)' }
	}, (() => {
		let tempRealDivList: RealDivList | undefined;
		const changeConfig: EventInit = { bubbles: true, cancelable: false };
		const now = Promise.resolve();

		const tempGet = function(this: RealDivList): string {
			return (this.info.inputer as HTMLTextAreaElement).value;
		};

		const tempSet = function(this: RealDivList, value: any[]): boolean {
			if (!Array.isArray(value)) {
				this.error('"value" must be Array!');
				return false;
			}

			this.info.wordList = value;
			now.then(() => {
				(this.info.inputer as HTMLTextAreaElement)
					.dispatchEvent(new Event('input', changeConfig));
			});
			
			if (tempRealDivList) {
				tempRealDivList.info.matcher.value = {};
			}
			
			return false;
		};

		const tempReact = (target: Element): void => {
			if (tempRealDivList && target !== tempRealDivList.info.inputer) {
				tempRealDivList.info.matcher.value = {};
				tempRealDivList.react?.();
				tempRealDivList.notify(true);
			}
		};

		addEventListener('click', e => 
			RealNode.afterNow(() => tempReact(e.target as Element))
		);

		// 事件监听器类型化
		const createEventHandlers = () => ({
			searchItemClick: (e: MouseEvent) => {
				let REList = RealTarget.searchByObj((e.target as Element).parentElement?.parentElement?.parentElement);
				let target: RealDivList | undefined;

				while (REList.length > 0) {
					const temp = REList.pop();
					if (temp?.self.classList.contains('realDivSearch')) {
						target = temp as RealDivList;
						break;
					}
				}

				if (!target) return;

				(target.info.inputer as HTMLTextAreaElement).value = 
					target.info.matcher.value[0] as string;
				tempRealDivList = target;
				tempRealDivList.react?.();
				tempRealDivList.notify(true);
			},

			inputHandler: (e: Event) => {
				let REList = RealTarget.searchByObj((e.target as Element).parentElement?.parentElement);
				let target: RealDivList | undefined;

				while (REList.length > 0) {
					const temp = REList.pop();
					if (temp?.self.classList.contains('realDivSearch')) {
						target = temp as RealDivList;
						break;
					}
				}

				if (!target) return;

				const testReg = new RegExp(
					(target.info.inputer as HTMLTextAreaElement).value,
					'i'
				);

				target.info.matcher.value = RealNode.arrayToObject(
					target.info.wordList.filter(str => testReg.test(String(str)))
				);
			},

			clickHandler: (e: MouseEvent) => {
				now.then(() => {
					(e.target as HTMLTextAreaElement)
						.dispatchEvent(new Event('input', changeConfig));
				});
			}
		});

		return function(this: RealDivList) {
			const { searchItemClick, inputHandler, clickHandler } = createEventHandlers();
			const matcher = RealDivList.createByClassName('realDivSelect');

			this.proto.value = [
				`<textarea placeholder="${String(placeholder)}"></textarea>`,
				matcher.self
			];
			
			this.fix().info = Object(this.info);
			this.info.inputer = this.proto.childrenList[0][0] as HTMLTextAreaElement;
			this.info.matcher = matcher;
			this.info.wordList = [];
			this.get = tempGet;
			this.set = tempSet;

			RealElement.addEventListenerBySelectors(
				'.realDivSearch>:nth-child(2)>div>div', 
				'click', 
				searchItemClick
			);

			RealElement.addEventListenerBySelectors(
				'.realDivSearch>:nth-child(1)>textarea', 
				'input', 
				inputHandler
			);

			RealElement.addEventListenerBySelectors(
				'.realDivSearch>:nth-child(1)>textarea', 
				'click', 
				clickHandler
			);
		};
	})()
  );
});

// 创建RealDivSeries组件
const createRealDivSeries = (titleGetter: TitleGetter): RealDivList => {
	return RealDivList.createByClassName('realDivSeries', titleGetter);
};

RealWorld.onload = RealWorld.onload.finally(() => {
	RealDivList.defineDivListClass('realDivSeries', false, [], true, {
		'>div:nth-child(1)': { fontWeight: 'bolder' },
		'.hidden>div:nth-child(n + 2)': { display: 'none' }
	}, function(this: RealDivList) {
		RealElement.addEventListenerBySelectors('.realDivSeries>div:nth-child(1)', 'click', (e: MouseEvent) => {
			let REList = RealTarget.searchByObj((e.target as Element)?.parentElement);
			let target: RealDivList | undefined;

			while (REList.length > 0) {
				const temp = REList.pop();
				if (temp?.self.classList.contains('realDivSeries')) {
					target = temp as RealDivList;
					break;
				}
			}

			target?.toggleClassName('hidden');
		});

		// 类型化转换函数
		const getTransform = {
			fn: function(this: RealDivList, titleGetter: () => string, value: string[]): HTMLDivElement[] {
				return this.protoTransform([titleGetter(), ...value]);
			},

			str: function(this: RealDivList, titleGetter: string, value: string[]): HTMLDivElement[] {
				return this.protoTransform([titleGetter, ...value]);
			},

			realNode: function(this: RealDivList, titleGetter: RealNode, value: string[]): HTMLDivElement[] {
				return this.protoTransform([String(titleGetter.value), ...value]);
			}
		};

		return function(this: RealDivList, titleGetter: TitleGetter) {
			let transformFn: (value: string[]) => HTMLDivElement[];

			if (typeof titleGetter === 'function') {
				transformFn = getTransform.fn.bind(this, titleGetter);
			} else if (titleGetter instanceof RealNode) {
				transformFn = getTransform.realNode.bind(this, titleGetter);
			} else {
				transformFn = getTransform.str.bind(this, titleGetter);
			}

			this.transform = transformFn;
			this.fix();
		};
	}());
});

console.log('Sync in', performance.now() - t0, 'ms');

// == 模块导出处理 ==
// 使用条件类型处理ESM/CommonJS导出差异
type ExportType<T> = T & { default?: T };

// 核心模块类型声明
interface CoreModules {
	RealWorld: typeof RealWorld;
	RealStory: typeof RealStory;
	RealPromise: typeof RealPromise;
	RealNode: typeof RealNode;
	RealGroup: typeof RealGroup;
	RealTarget: typeof RealTarget;
	RealElement: typeof RealElement;
	createRealDivSelect: typeof createRealDivSelect;
	createRealDivSearch: typeof createRealDivSearch;
	createRealDivSeries: typeof createRealDivSeries;
	RealCanvas: typeof RealCanvas;
	RealLoader: typeof RealLoader;
	RealSelect: typeof RealSelect;
	RealComtag: typeof RealComtag;
	RealDivList: typeof RealDivList;
	RealImgList: typeof RealImgList;
	RealDivQueue: typeof RealDivQueue;
}

// 组合导出对象
const coreExports: CoreModules & ExportType<CoreModules> = {
	RealWorld,
	RealStory,
	RealPromise,
	RealNode, 
	RealGroup, 
	RealTarget, 
	RealElement,
	createRealDivSelect, 
	createRealDivSearch, 
	createRealDivSeries,
	RealCanvas,
	RealLoader,
	RealSelect,
	RealComtag,
	RealDivList,
	RealImgList,
	RealDivQueue,
	
	// 兼容ESM default导出
	default: undefined! 
};

// ESM导出
// @ts-ignore 动态处理default导出
coreExports.default = coreExports;

export default coreExports;
