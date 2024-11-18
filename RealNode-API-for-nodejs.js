'use strict';
var setInterval = setInterval ?? function(){},HTMLElement = HTMLElement ?? setInterval,performance = performance ?? Date;
var t0 = performance === Date ? performance.now() : 0;
class RealWorld{
    /**@type {RealWorld & RealWorld[]} */
    static app;
    static onload = new Promise(r=>'window' in globalThis ? window.onload = r : r());
    static get onlyWorld(){return !Array.isArray(this.app);}
    /**@this {RealWorld} */
    static onEvent(){if(this.fnArray.length){const fn = this.fnArray.pop();try{fn?.();}catch(e){console.error(e,fn);}}}
    static set onlyWorld(onlyWorld){if(onlyWorld === Array.isArray(this.app)){
        if(onlyWorld){while(this.app.length) this.app.pop().destroy();this.app = null;}
        else this.app = this.app ? [this.app] : [];
    }}
    /**
     * cb2promise 回调转异步类
     * @param {{thisArg: {},methodName: String,callback?: (...value: *[])=>"this.resolve(value)"}} param0 
     * @param  {...*} [parameters] 
     * @returns {Promise<[Error | null,*] | undefined>}
     */
    static cb2promise({thisArg,methodName,callback = function(...value){this.resolve(value);}} = {},...parameters){
        if(thisArg && 'object' === typeof thisArg && methodName in thisArg) return new Promise(resolve=>{
            const temp = {callback,resolve};
            try{thisArg[methodName](...parameters,(...value)=>temp.callback(...value));}catch({stack: message0}){
                try{thisArg[methodName]((...value)=>temp.callback(...value),...parameters);}catch({stack: message1}){
                    return [new Error('=> Neither head or tail of parameters is Callback !\n'+message0+'\n'+message1)];
                }
            }
        }).catch(e=>console.error(e.stack));
        else throw new Error('=> Wrong:\n    "thisArg" is not Object\n  or\n    "methodName" not in "thisArg" !');
    }
    stop(){clearInterval(this.intervalId);}
    destroy(){return this.then(()=>clearInterval(this.intervalId));}
    /**@type {<T extends never>(fn:()=>T,thisArg,...argArray)=>Promise<T,Error>} */
    then(fn,thisArg,...argArray){return new Promise(r=>this.fnArray.unshift(()=>r(fn.apply(thisArg,argArray))));}
    run(){clearInterval(this.intervalId);this.intervalId = setInterval(RealWorld.onEvent.bind(this),this.timeSep);}
    /**
     * 
     * @param {String} id2set 
     */
    setup(id2set){return document.body.innerHTML = '',arguments.length && (document.body.appendChild(this.body).id = id2set),this.body;}
    body = globalThis.document?.createElement?.('div');
    constructor(timeSep = 10,onlyProcess,...fnArray){
        if(!onlyProcess) RealWorld.onlyWorld ? (RealWorld.app?.destroy?.(),RealWorld.app = this) : RealWorld.app.push(this);
        /**@type {(()=>*)[]} */
        this.fnArray = fnArray;
        this.intervalId = setInterval(RealWorld.onEvent.bind(this),this.timeSep = timeSep);
    }
}
class RealNode{
    /**@throws {Error} */
    static error(message){throw new Error(this.name+' : '+message);}
    /**@type {Map<Symbol,RealNode>} */
    static sys = new Map;
    static t0 = Date.now();
    static now = Promise.resolve();
    static eventLoop = new RealWorld(4);
    /**
     * @typedef {{
     * tryRealNode: Boolean,
     * childRNs: ({info: [RealNode,String[],String[]]} & RealNode)[],
     * _get()=>*,
     * _set(value)=>Boolean,
     * react()=>Boolean,
     * id: Symbol,
     * value,
     * }} AntiNode 
     */
    static proto = class AntiNode{
        tryRealNode;
        /**@type {(RealNode  &  {info: [RealNode,String[],String[]]})[]} */
        childRNs = [];
        /**@type {()=>*} */
        _get;
        /**@type {(value)=>Boolean} */
        _set;
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
    static search(id){return this.sys.get(id);}
    /**
     * 
     * @param {()=>*} fn 
     * @returns {Promise}
     */
    static justNow(fn,thisArg,...argArray){return RealNode.now.then(fn.bind(thisArg,...argArray));}
    static arrayToObject(){
        const temp = {},array = Array.from(arguments).flat(),length = array.length;
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
    static check(realNode){for(const temp of this.sys.entries()) if(realNode === temp[1]) return realNode.id === temp[0];}
    /**
     * 
     * @param {()=>*} fn 
     * @param {Boolean} keepNow 
     * @returns {Promise}
     */
    static afterNow(fn,keepNow,thisArg,...argArray){
        const temp = this.eventLoop.then(fn,thisArg,...argArray);
        return keepNow || (this.now = temp.finally()),temp;
    }
    /**@method @type {(promise: (()=>*) & Promise)=>Promise<{value: * & Error,time: Number}>} */
    static time = (temp=>promise=>{
        const t0 = performance.now();
        return Promise.resolve('function' === typeof promise ? promise() : promise).
        then(temp,temp).then(value=>({value,time: performance.now() - t0}));
    })(e=>e);
    /**@method */
    static copyObj = function copyObj(obj){
        if(obj === Object(obj)){
            const newObj = Array.isArray(obj) ? [] : {};
            for(const i of Object.keys(obj)){95 === i.charCodeAt(0) || (newObj[i] = copyObj(obj[i]));}
            return newObj;
        }else return new.target ? Object(obj) : obj;
    }
    /**
     * 
     * @this {RealNode}
     * @param {RealNode} realNode 
     */
    static react(realNode,react = true,notify = true,noSelf = true){var value;try{
        const temp = this.getPositionsOfChildRN(realNode);
        while(temp.length){
            const position = temp.pop().reverse();
            if(!position.length) return this.realSet(realNode.value,react,notify,noSelf);else{
                value = this.proto.value;
                while(position.length > 1) value = value[position.pop()];
                realNode.value === value[position[0]] || (value[position[0]] = realNode.value);
            }
        }
        return react && this.react(noSelf),notify && this.notify(noSelf),true;
    }catch(e){
        if(this instanceof RealNode) throw e;
        this.error('Please avoid using method "react" of typeof '+this?.name+' !\n'+e.message);
    }}
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
    static createString = this.protoCreate.bind(null,function(){
        if(Array.isArray(this.proto.value)){
            const temp = this.proto.value.concat();
            for(var i = temp.length;i --> 0;) if(temp[i] instanceof RealNode) temp[i] = temp[i].value;
            return temp.join('');
        }else return String(this.proto.value instanceof RealNode ? this.proto.value.value : this.proto.value);
    });
    /**@method @type {((...args)=>RealNode)} */
    static createNumber = this.protoCreate.bind(null,function(temp = 0){
        if(!Array.isArray(this.proto.value)) return +(this.proto.value instanceof RealNode ? this.proto.value.value : this.proto.value);
        else for(const i of this.proto.value) temp +=+(i instanceof RealNode ? i.value : i);
        return temp;
    });
    protoGet(){return this.proto.value;}
    log(...message){console.log(this+' :',...message);}
    done(){return RealNode.justNow(this.protoDone,this);}
    // done(keepNow){return RealNode.afterNow(this.protoDone,keepNow,this);}
    /**
     * 
     * @returns {Boolean}
     */
    protoSet(value){return value !== this.proto.value && (this.proto.value = value,true);}
    clearChildRNs(){while(this.proto.childRNs.length){this.proto.childRNs.pop().display = false;}return this;}
    error(message){throw new Error("RealNode "+(this.id.description ?? '')+'\n"""\n'+String(message)+'\n"""');}
    [Symbol.toPrimitive](hint){return 'number' === hint ? Number(this.value) : '[object '+this.constructor.name+']{ '+this.id.description+' }';}
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
     * @returns {0 | Promise<void>}
     */
    notify(noSelf,thisArg,count){return this.relativeRNs.length && this.done().finally(this.protoNotify.bind(this,noSelf,thisArg,count));}
    /**
     * 
     * @param {Boolean} react 
     * @param {Boolean} notify 
     * @param {Boolean} noSelf 
     * @returns {Boolean}
     */
    realSet(value,react,notify,noSelf){
        var temp;
        const oldValue = this.proto.value;
        return (this.proto._set.call(
            this,
            this.proto.tryRealNode && (temp = this.computePositionsOfRNs(value)).length ?
            this.dealWithPositionsOfRNs(temp,value) : value
        ) ?? oldValue !== this.proto.value) && (react && this.react?.(),notify && this.notify(noSelf),true);
    }
    /**
     * 
     * @param {RealNode} realNode 
     * @returns {String[][]}
     */
    getPositionsOfChildRN(realNode){
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
        (thisArg.notifyArray[count] ??= []).push(new Promise(r=>{
            for(var id of this.relativeRNs){
                !(noSelf && id === this.id) && (id = RealNode.search(id)) && (id.react?.(),id.notify(noSelf,thisArg,count));
            }
            r();
        }));
    }
    /**
     * 
     * @param  {...(RealNode | Symbol)} relativeRNs 
     */
    relate(...relativeRNs){
        var id = relativeRNs[relativeRNs.length - 1];
        const temp = RealNode.search(id?.id ?? id);
        while(relativeRNs.length){
            id = relativeRNs.pop();
            'symbol' === typeof id || (id instanceof RealNode ? id = id.id : this.error(
                '=> "relativeRNs['+relativeRNs.length+']" is not legal id !'
            ));
            RealNode.search(id) && !this.relativeRNs.includes(id) && this.relativeRNs.push(id);
        }
        return temp;
    }
    /**
     * 
     * @param  {...(RealNode | Symbol)} unrelativeRNs 
     */
    unrelate(...unrelativeRNs){
        if(!unrelativeRNs.length) return false;
        const temp = this.relativeRNs.concat();
        var i = unrelativeRNs.length;
        this.relativeRNs.splice(0);
        while(i --> 0) 'symbol' === typeof unrelativeRNs[i] || (unrelativeRNs[i] = unrelativeRNs[i]?.id);
        for(i = temp.length;i --> 0;) unrelativeRNs.includes(temp[i]) || this.relativeRNs.push(temp[i]);
        return temp.length !== this.relativeRNs.length;
    }
    /**
     * 
     * @param {String[]} [position] 
     * @returns {[RealNode, ...string[]][]} 
     */
    computePositionsOfRNs(value,deep = 2,position = [],count = 0){
        /**@type {[RealNode, ...string[]][]} */
        var temp = [],i,keys;
        if(value instanceof RealNode) return temp.push((position.unshift(value),position)),temp;
        else if(count < deep && 'object' === typeof value && value) for(i = (keys = Reflect.ownKeys(value)).length;i --> 0;){
            temp = temp.concat(this.computePositionsOfRNs(value[keys[i]],deep,[...position,keys[i]],count + 1));
        }
        return temp;
    }
    /**
     * 
     * @param {[RealNode, ...string[]][]} realNodeMap 
     */
    dealWithPositionsOfRNs(realNodeMap,expression){
        const temp = this.clearChildRNs().proto.childRNs,list = [];
        var value,i,end;
        while(realNodeMap.length){
            /**@type {[RealNode, ...string[]]} */
            const [realNode,...dir] = realNodeMap.pop();
            if(!dir.length) expression = realNode.value;else{
                for(value = expression,i = 0,end = dir.length - 1;i < end;i++) value = value[key];
                value[dir[i]] = realNode.value;
            }
            i = list.indexOf(realNode);
            i < 0 ? (list.push(realNode),temp.push(realNode.relate(
                new RealNode({info: [realNode,dir],react: this.constructor.react.bind(this,realNode)})
            ))) : temp[i].info.push(dir);
        }
        return expression;
    }
    get childRNs(){return this.proto.childRNs;}
    get display(){return RealNode.sys.has(this.id);}
    get tryRealNode(){return this.proto.tryRealNode;}
    /**@type {Symbol} */
    get id(){return this.proto.id;}
    get set(){return this.realSet;}
    get get(){return this.proto._get;}
    /**@type {()=>void} */
    get react(){return this.proto.react;}
    get value(){return this.get();}
    set display(display){display ? RealNode.sys.set(this.id,this) : RealNode.sys.delete(this.id);}
    set tryRealNode(tryRealNode){
        var i;
        tryRealNode = (this.proto.tryRealNode = Boolean(tryRealNode)) ? 'appear' : 'disappear';
        for(i = this.proto.childRNs.length;i --> 0;) this.proto.childRNs[tryRealNode]();
    }
    /**@param {()=>*} get  */
    set get(get){this.proto._get = 'function' === typeof get ? get : this.protoGet;}
    set set(set){this.proto._set = 'function' === typeof set ? set : this.protoSet;}
    set react(react){this.proto.react = 'function' === typeof react ? react : null;}
    set value(value){this.realSet(value,true,true);}
    /**@type {Symbol[]} */
    relativeRNs = [];
    /**@type {Promise[][]} */
    notifyArray = [];
    /**
     * 
     * @param {{get?: ()=>*,set?: (value)=>Boolean,react?: ()=>void,id?,info?,value?}} [config] 
     * @param  {...(Symbol | RealNode)} [relativeRNs] 
     */
    constructor(config,tryRealNode = true,...relativeRNs){
        const {get,set,react,id,info} = config = Object(config);
        /**@type {AntiNode} */
        this.proto = new this.constructor.proto;
        this.proto.id = Symbol(String(id ?? info?.id ?? ''));
        Reflect.defineProperty(this,'notifyArray',{enumerable: false});
        Reflect.defineProperty(this,'proto',{enumerable: false,writable: false});
        this.display = true;
        this.info = info;
        this.get = get;
        this.set = set;
        this.react = react;
        this.relate(...relativeRNs);
        this.tryRealNode = tryRealNode;
        if('value' in config) this.value = config.value;
    }
}
class RealGroup{
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
        return realNodeDict && 'object' === typeof realNodeDict ?
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
        if(value && 'object' === typeof value){
            const temp = [];
            for(const [,realNode] of this[Symbol.iterator](null,Reflect.ownKeys(value),true)) realNode.realSet(value[key],react) && temp.push(realNode);
            if(temp.length) react && this.react(keys1),notify && this.notify();
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
    constructor(realNodeDict){var i;if(realNodeDict && 'object' === typeof realNodeDict){
        Reflect.defineProperty(this,'dict',{enumerable: false,writable: false,configurable: false});
        const temp = Reflect.ownKeys(realNodeDict);
        for(i = temp.length;i --> 0;) realNodeDict[temp[i]] instanceof RealNode && (this.dict[temp[i]] = realNodeDict[temp[i]]);
        // this.error('=> Value ['+String(temp[i])+'] in "realNodeDict" must be RealNode !');
        Object.freeze(this.dict);
        Reflect.defineProperty(this,'keys',{value: Object.freeze(Object.keys(this.dict)),writable: false,configurable: false});
    }else this.error('=> "realNodeDict" must be Object !');}
}
var RealStory = new class RealStory{
    /**@type {RealStory[]} */
    static pages = [];
    static isClearing = false;
    static intervalId = setInterval(()=>(RealStory.isClearing || (
        RealStory.isClearing = true,RealStory.pages[0].clear().then(()=>RealStory.isClearing = false)
    )),50);
    static promise = class StoryPromise{
        /**
         * 
         * @this {StoryPromise}
         * @param {(value)=>void} resolve 
         * @param {(reason?)=>void} reject 
         */
        static executor(resolve,reject){this.resolve = resolve,this.reject = reject;}
        /**@type {(value)=>void} */
        resolve;
        /**@type {(reason?)=>void} */
        reject;
        promise = new Promise(StoryPromise.executor.bind(this));
    };
    newPage(){return new RealStory(this);}
    /**
     * 
     * @param {()=>*} fn 
     */
    then(fn){return 'function' === typeof fn && this.fnList.push(fn),this;}
    promise(){
        const temp = new RealStory.promise;
        return this.then(()=>temp.promise),temp;
    }
    async clear(){
        var i = 0,temp = this;
        while(RealStory !== temp) temp = temp.ofStory,i++;
        while(this.pages.length || this.fnList.length){
            while(this.fnList.length) try{await this.fnList.shift()?.();}catch(e){console.error('Depth of the fn : '+i);console.error(e);}
            try{await this.pages.shift()?.clear?.();}catch(e){console.error('Depth of the page : '+i);console.error(e);}
        }
    }
    /**@type {RealStory[]} */
    pages = [];
    /**@type {(()=>*)[]} */
    fnList = [];
    constructor(ofStory){(this.ofStory = ofStory instanceof RealStory ? ofStory : RealStory).pages.push(this);}
}();
var RealPromise = (()=>{
    /**
     * 
     * @returns {Promise<Boolean>}
     */
    const RealPromise = ()=>Promise.resolve(
        'function' !== typeof RealPromise.resolve && new Promise(value=>Reflect.defineProperty(RealPromise,'resolve',{value})).
        then(()=>Reflect.defineProperty(RealPromise,'resolve',{value: undefined}))
    );
    return Reflect.defineProperty(RealPromise,'resolve',{configurable: true,writable: false}),RealPromise;
})();
Object.assign(module.exports,{
    RealWorld,RealNode,RealGroup,
    RealPromise,RealStory,
});
