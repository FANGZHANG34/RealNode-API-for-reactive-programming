
class RealGroup{
	/**
	 * 
	 * @throws
	 * @param {String} message 
	 * @returns {never}
	 */
	error(message,...proof){console.log(...proof);throw new Error('RealGroup """\n'+String(message)+'\n"""');}
	/**
	 * 
	 * @param {String[]} [without] 
	 * @param {String[]} [within] 
	 */
	fix(without,within){for(const realNode of this[Symbol.iterator](without,within,true)) realNode.fix?.();}
	/**
	 * 
	 * @param {String[]} [without] 
	 * @param {String[]} [within] 
	 */
	react(without,within){for(const realNode of this[Symbol.iterator](without,within,true)) realNode.react?.();}
	/**
	 * 
	 * @returns {Promise<(0 | void)[]>}
	 */
	notify(){
		const temp = Reflect.ownKeys(this.dict);
		for(var i = temp.length;i --> 0;) temp[i] = this.dict[temp[i]].notify(true);
		return Promise.all(temp);
	}
	/**
	 * 
	 * @param {{[key: String]: RealNode}} realNodeDict 
	 * @returns {RealGroup}
	 */
	extra(realNodeDict){
		return realNodeDict && typeof realNodeDict === 'object' ?
		new RealGroup(Object.assign(Object.create(null),this.dict,realNodeDict)) :
		this.error('=> "realNodeDict" must be Object !');
	}
	/**
	 * 
	 * @param {String[]} [without] 
	 * @param {String[] | IterableIterator<String>} [within] 
	 * @param {Boolean} [all] 
	 */
	*[Symbol.iterator](without,within,all){
		Array.isArray(without) || (without = []);
		for(const key of (within[Symbol.iterator] ? within : all ? Reflect.ownKeys(this.dict) : this.keys)){
			without.includes(key) || (yield [key,this.dict[key]]);
		}
	}
	/**
	 * 
	 * @param {{[key: String]}} value 
	 * @param {Boolean} react 
	 * @param {Boolean} notify 
	 * @returns {Boolean}
	 */
	set(value,react,notify){
		if(value && typeof value === 'object'){
			const temp = [];
			for(const [,realNode] of this[Symbol.iterator](null,Reflect.ownKeys(value),true)) realNode.realSet(value[key],react) && temp.push(realNode);
			if(temp.length) react && this.react?.(keys1),notify && this.notify();
			return temp;
		}else this.error('=> "value" must be Object !');
	}
	get value(){
		const temp = {},keys = Object.keys(this.dict);
		for(var i = keys.length;i --> 0;) temp[keys[i]] = this.dict[keys[i]].value;
		return temp;
	}
	/**@param {{[key: String]}} value */
	set value(value){this.set(value,true,true);}
	/**@type {readonly {[key: String]: RealNode}} */
	dict = Object.create(null);
	/**@type {String[]} */
	keys;
	/**
	 * 
	 * @param {{[key: String]: RealNode}} realNodeDict 
	 */
	constructor(realNodeDict){var i;if(realNodeDict && typeof realNodeDict === 'object'){
		Reflect.defineProperty(this,'dict',{enumerable: false,writable: false,configurable: false});
		const temp = Reflect.ownKeys(realNodeDict);
		for(i = temp.length;i --> 0;) realNodeDict[temp[i]] instanceof RealNode && (this.dict[temp[i]] = realNodeDict[temp[i]]);
		// this.error('=> Value ['+String(temp[i])+'] in "realNodeDict" must be RealNode !');
		Object.freeze(this.dict);
		Reflect.defineProperty(this,'keys',{value: Object.freeze(Object.keys(this.dict)),writable: false,configurable: false});
	}else this.error('=> "realNodeDict" must be Object !');}
}