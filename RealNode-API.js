'use strict';
var HTMLElement = HTMLElement ?? (()=>{});
// function interval(fn,timeout){fn();setTimeout(fn,timeout);}
// var setInterval = setInterval ?? ((handler,timeout = 4,...argArray)=>setTimeout(()=>interval(handler),timeout,...argArray));
// var clearInterval = clearInterval ?? (()=>{throw 0;});
// var t0 = Date.now();
class RealNode{
    /**@throws */
    static error(message){throw new Error(this.name+' : '+message);}
    /**@type {Map<Symbol,RealNode>} */
    static sys = new Map;
    static t0 = Date.now();
    static now = Promise.resolve();
    static eventLoop = new class EventLoop{
        destroy(){clearInterval(this.intervalId);}
        /**
         * 
         * @param {()=>target} fn 
         * @returns {Promise<target,Error>}
         */
        then(fn,thisArg,...argArray){return new Promise(r=>this.fnArray.unshift(()=>r(fn.apply(thisArg,argArray))));}
        constructor(timeSep = 10){
            /**@type {(()=>target)[]} */
            this.fnArray = [];
            this.intervalId = setInterval(this.intervalFn = ()=>{
                const fn = this.fnArray.pop();
                try{fn?.();}catch(e){console.error(e,fn);}
            },timeSep);
        }
    }(4);
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
        info;
        value;
    };
    /**
     * 
     * @param {Symbol} id 
     */
    static search(id){return this.sys.get(id);}
    /**
     * 
     * @param {()=>target} fn 
     * @returns {Promise<target>}
     */
    static justNow(fn,thisArg,...argArray){return RealNode.now.then(fn.bind(thisArg,...argArray));}
    /**
     * 
     * @param {()=>target} fn 
     * @param {Boolean} keepNow 
     * @returns {Promise<target>}
     */
    static afterNow(fn,keepNow,thisArg,...argArray){
        const temp = this.eventLoop.then(fn,thisArg,...argArray);
        return keepNow || (this.now = temp.finally()),temp;
    }
    /**@type {(promise: (() => target) | Promise<target>,longAge?: Boolean)=>Promise<{value: target | Error,time: Number}>} */
    static timeRecord = (temp=>(promise,longAge)=>(
        longAge = longAge ? RealNode.t0 : Date.now(),
        Promise.resolve(promise instanceof Function ? promise() : promise).
        then(temp,temp).then(value=>({value,time: Date.now() - longAge}))
    ))(e=>e);
    [Symbol.toPrimitive](hint){return 'number' === hint ? Number(this.value) : '[object '+this.constructor.name+']( '+this.id.description+' )';}
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
    }catch(e){if(this instanceof RealNode) throw e;else this.error('Please avoid using method "react" of typeof '+this?.name+' !\n'+e.message);}}
    protoGet(){return this.proto.value;}
    disappear(){return RealNode.sys.delete(this.id);}
    log(...message){console.log(this+' :',...message);}
    appear(){return RealNode.sys.set(this.id,this),this;}
    done(){return RealNode.justNow(this.protoDone,this);}
    // done(keepNow){return RealNode.afterNow(this.protoDone,keepNow,this);}
    /**
     * 
     * @returns {Boolean}
     */
    protoSet(value){return value !== this.proto.value && (this.proto.value = value,true);}
    clearChildRNs(){while(this.proto.childRNs.length){this.proto.childRNs.pop().disappear();}return this;}
    error(message){throw new Error("RealNode "+(this.id.description ?? '')+'\n"""\n'+String(message)+'\n"""');}
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
        return this.proto._set.call(
            this,
            this.proto.tryRealNode && (temp = this.computePositionsOfRNs(value)).length ?
            this.dealWithPositionsOfRNs(temp,value,react,notify,noSelf) : value
        ) && (react && this.react?.(),notify && this.notify(noSelf),true);
    }
    /**
     * 
     * @param {RealNode} realNode 
     * @returns {String[][]}
     */
    getPositionsOfChildRN(realNode){
        const temp = [],childRNs = this.proto.childRNs;
        for(var i  = childRNs.length;i --> 0;) realNode === childRNs[i].info[0] && temp.push(...childRNs[i].info.slice(1));
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
        r();}));
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
            typeof id === 'symbol' || (id instanceof RealNode ? id = id.id : this.error(
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
        while(i --> 0) typeof unrelativeRNs[i] === 'symbol' || (unrelativeRNs[i] = unrelativeRNs[i]?.id);
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
        var value,i,length;
        while(realNodeMap.length){
            /**@type {[RealNode, ...string[]]} */
            const [realNode,...dir] = realNodeMap.pop();
            if(!dir.length) expression = realNode.value;else{
                for(value = expression,i = 0,length = dir.length - 1;i < length;i++) value = value[key];
                value[dir[i]] = realNode.value;
            }
            i = list.indexOf(realNode);
            i < 0 ? (list.push(realNode),temp.push(realNode.relate(
                new RealNode({info: [realNode,dir],react: this.constructor.react.bind(this,realNode)})
            ))) : temp[i].info.push(dir);
        }
        return expression;
    }
    get tryRealNode(){return this.proto.tryRealNode;}
    get childRNs(){return this.proto.childRNs;}
    /**@type {Symbol} */
    get id(){return this.proto.id;}
    get set(){return this.realSet;}
    get get(){return this.proto._get;}
    /**@type {()=>void} */
    get react(){return this.proto.react;}
    get value(){return this.get();}
    set tryRealNode(tryRealNode){
        var i;
        tryRealNode = (this.proto.tryRealNode = Boolean(tryRealNode)) ? 'appear' : 'disappear';
        for(i = this.proto.childRNs.length;i --> 0;) this.proto.childRNs[tryRealNode]();
    }
    /**@param {()=>*} get  */
    set get(get){this.proto._get = typeof get === 'function' ? get : this.protoGet;}
    set set(set){this.proto._set = typeof set === 'function' ? set : this.protoSet;}
    set react(react){this.proto.react = typeof react === 'function' ? react : null;}
    set value(value){this.realSet(value,true,true);}
    /**@type {Symbol[]} */
    relativeRNs = [];
    /**@type {Promise[][]} */
    notifyArray = [];
    /**
     * 
     * @param {{get?: ()=>*,set?: (value)=>Boolean,react?: ()=>void,id?,info?,value?}} config 
     * @param  {...(Symbol | RealNode)} relativeRNs 
     */
    constructor(config,tryRealNode = true,...relativeRNs){
        const {get,set,react,id,info} = Object(config);
        /**@type {AntiNode} */
        this.proto = new this.constructor.proto;
        this.proto.id = Symbol(String(id ?? info?.id ?? ''));
        Reflect.defineProperty(this,'notifyArray',{enumerable: false});
        Reflect.defineProperty(this,'proto',{enumerable: false,writable: false})
        this.appear();
        this.info = info;
        this.get = get;
        this.set = set;
        this.react = react;
        this.relate(...relativeRNs);
        this.tryRealNode = tryRealNode;
        if('value' in config) this.value = config.value;
        // for(var keys = Reflect.ownKeys(this.proto),i = keys.length;i --> 0;) Reflect.defineProperty(this.proto,keys[i],{enumerable: false});
    }
}
class RealElement extends RealNode{
    /**@typedef {AntiNode & {self: HTMLElement,isElement: Boolean,transform(value)=>*}} AntiHTMLNode */
    static proto = class AntiHTMLNode extends RealNode.proto{
        /**@type {HTMLElement} */
        self;
        /**@type {Boolean} */
        isElement;
        /**@type {(value)=>*} */
        transform;
    };
    static idSet = new Set;
    static myStyle = new Set;
    static getDomByString = (template=>innerHTML=>{
        template.innerHTML = innerHTML;
        return template.content.firstElementChild;
    })('document' in globalThis ? document.createElement('template') : {content: {}});
    protoTransform(value){return value;}
    static findId(id){return this.idSet.has(id);}
    static deleteId(id){return typeof id !== 'string' ? this.error('=> Please use String "id" !') : this.idSet.delete(id);}
    /**
     * 
     * @param {String | HTMLElement} tagName 
     * @param {{[attr: String]: String}} config 
     * @param {{[attr: String]: String}} cssConfig 
     * @returns {HTMLElement}
     */
    static makeElement(tagName,config,cssConfig){
        tagName instanceof HTMLElement || (tagName = document.createElement(tagName));
        return Object.assign(Object.assign(tagName,config).style,cssConfig),tagName;
    }
    static addId(id,strict = true){id && (
        typeof id !== 'string' ? this.error('=> Please use String "id" !') :
        this.idSet.has(id) ? strict && this.error('=> Please use another "id" !') :
        this.idSet.add(id)
    );}
    /**@typedef {(ruleObjObj: {[selector: String]: {[styleName: String]: String}},prefix?: String)=>addCSSRules} addCSSRules */
    /**@type {addCSSRules} */
    static addCSSRules = (()=>{if('document' in globalThis){
        document.getElementsByTagName("head")[0].
        appendChild(document.createElement("style"))[!window.createPopup && "appendChild"]?.(document.createTextNode(""));
        const myCSS = document.styleSheets[document.styleSheets.length - 1];
        const getKeys = obj=>obj && typeof obj === 'object' ? Object.keys(obj) : [];
        /**@type {(selector: String,rulesStr: String)=>Number} */
        const tempInsertRule = !myCSS.insertRule ? (selector,rulesStr)=>myCSS.addRule(selector,rulesStr,-1) :
        (selector,rulesStr)=>myCSS.insertRule(selector+"{"+rulesStr+"}",myCSS.cssRules.length);
        return function addCSSRules(ruleObjObj,prefix = ''){
            typeof prefix === 'string' ? prefix && RealElement.myStyle.add(prefix) :
            RealElement.error('"prefix" in addCSSRules must be String !');
            for(const selector of getKeys(ruleObjObj)){
                const ruleObj = ruleObjObj[selector],temp = [];
                for(const key of getKeys(ruleObj)){temp.push(key,':',String(ruleObj[key]),';');}
                tempInsertRule(prefix+' '+selector,temp.join(''));
            }
            return addCSSRules;
        }({'.disappear': {visibility: 'hidden'}});
    }})();
    fix(){return this.self[this.key] = this.transform(this.proto.value),this;}
    clearClassName(){return this.proto.isElement && (this.self.className = '',true);}
    /**@param {...String} */
    addClassName(){return this.proto.isElement && (this.self.classList.add(...arguments),true);}
    /**@param {String} className */
    toggleClassName(className){return this.proto.isElement && this.self.classList.toggle(className);}
    /**@param {...String} */
    removeClassName(){return this.proto.isElement && (this.self.classList.remove(...arguments),true);}
    /**
     * 
     * @param {Boolean} react 
     * @param {Boolean} notify 
     * @returns {Boolean}
     */
    realSet(value,react,notify){
        var temp;
        return this.tryRealNode && (temp = this.getRealNodeEntries(value)).length ? this.dealWithRealNodeEntries(temp) :
        this.proto._set.call(this,value) && (this.fix(),react && this.react,notify && this.notify(),true);
    }
    /**
     * 
     * @param {Boolean} keepValue 
     * @param {Boolean} fix 
     * @param {Boolean} [deepCopyRelativeRNs] 
     */
    clone(keepValue,fix,deepCopyRelativeRNs){
        const self = this.self instanceof HTMLElement ? this.self.cloneNode() :
        Object.assign(Object.create(Reflect.getPrototypeOf(this.self)),this.self);
        const param0 = {self,key: this.key,transform: this.transform},param1 = {};
        if(keepValue) param0.initValue = this.proto.value;
        param1.get = this.proto._get;
        param1.set = this.proto._set;
        param1.react = this.proto.react;
        param1.id = this.id.description+'-clone';
        param1.info = this.proto.info;
        const temp = new RealElement(param0,param1);
        Reflect.setPrototypeOf(temp,Reflect.getPrototypeOf(this));
        if(null == deepCopyRelativeRNs) temp.relativeRNs = deepCopyRelativeRNs ? this.relativeRNs : this.relativeRNs.concat();
        if(fix) temp.fix();
        return temp;
    }
    get self(){return this.proto.self;}
    get isElement(){return this.proto.isElement;}
    get transform(){return this.proto.transform;}
    /**@param {(value)=>*} transform  */
    set transform(transform){this.proto.transform = typeof transform === 'function' ? transform : this.protoTransform;}
    set self(self){
        self && typeof self === 'object' ? this.proto.isElement = (this.proto.self = self)instanceof HTMLElement :
        this.error('=> "self" must be HTMLElement !');
    }
    /**
     * 
     * @param {{self: HTMLElement,key,transform?: (value)=>*},initValue} param0 
     * @param {{get?: ()=>*,set?: (value)=>Boolean,react?: ()=>void,id?,info?,value?}} config 
     * @param {Boolean} [tryRealNode] 
     * @param  {...RealNode} relativeRNs 
     */
    constructor({self,key,transform,initValue},config,tryRealNode,...relativeRNs){
        super(config,tryRealNode,...relativeRNs);
        /**@type {AntiHTMLNode} */this.proto;
        this.proto.value = initValue;
        this.self = self;
        this.key = key;
        this.transform = transform;
    }
}
class RealDivList extends RealElement{
    /**@typedef {AntiHTMLNode & {list: HTMLElement[],childrenList: HTMLElement[][]}} AntiList */
    static proto = class AntiList extends RealElement.proto{
        /**@type {HTMLDivElement[]} */
        list = [];
        /**@type {HTMLElement[][]} */
        childrenList = [];
    }
    /**
     * 
     * @returns {HTMLElement[]}
     */
    protoGet(){return this.proto.list;}
    /**
     * 
     * @param {(HTMLElement | String)[]} value 
     */
    protoSet(value){return this.proto.value = Array.from(value),true;}
    /**
     * 
     * @param {Array} value 
     */
    protoTransform(value){
        var list = [],temp;
        const mode = this.tryHTML ? 'innerHTML' : 'textContent';
        if(!value?.[Symbol.iterator]) throw new Error('=> "value" must be Arraylike !'); else{
            const iter = value[Symbol.iterator]();
            while(!(temp = iter.next()).done){
                list.push(temp.done = document.createElement('div'));
                temp.value instanceof HTMLElement ? temp.done.appendChild(temp.value) : temp.done[mode] = String(temp.value);
            }
            return list;
        }
    }
    getIdDict(){
        const list = Object.create(null);
        for(var i = this.proto.list.length,temp;i --> 0;){
            (temp = this.proto.childrenList[i]).length > 1 || !temp[0]?.id || (list[temp[0].id] = this.proto.list[i]);
        }
        return list;
    }
    fix(){
        var i = 0;
        this.self.classList.add('disappear');
        this.self.innerHTML = '';
        /**@type {HTMLDivElement[]} list */
        const list = this.proto.list = this.transform(this.proto.value),childrenList = this.proto.childrenList = [];
        while(i < list.length){childrenList.push(Array.from(this.self.appendChild(list[i++]).children));}
        this.self.classList.remove('disappear');
        return this;
    }
    /**@type {HTMLElement[][]} */
    get childrenList(){return this.proto.childrenList;}
    /**
     * 
     * @param {String} id 
     * @param {Boolean} tryHTML 
     * @param {(HTMLElement | String)[]} optionList 
     * @param {Boolean} [tryRealNode] 
     * @param {{[attr: String]: (event: Event)=>void}} selfAssign 
     */
    constructor(id,tryHTML,optionList,tryRealNode,selfAssign){
        const self = (typeof id === 'string' || (id = '',false)) && document.getElementById(id);
        RealElement.addId(id,!self);
        super({
            self: self || RealElement.makeElement('div',{id}),
            initValue: !optionList?.[Symbol.iterator] ? [] : Array.from(optionList)
        },{id},tryRealNode);
        /**@type {AntiList} */this.proto;
        this.tryHTML = tryHTML;
        Object.assign(this.fix().self,selfAssign);
    }
}
class RealImgList extends RealDivList{
    /**
     * 
     * @this {RealDivList}
     * @param {(HTMLElement | String)[]} value 
     */
    static protoSet(value){
        if(!value?.[Symbol.iterator]) throw new Error('=> "value" must be Arraylike !'); else{
            /**@type {IterableIterator<HTMLImageElement | String>} */
            const iter0 = this.proto.value[Symbol.iterator]();
            const iter1 = value[Symbol.iterator]();
            /**@type {[IteratorResult<HTMLImageElement>,IteratorResult<HTMLImageElement>]} */
            const temp = new Array(2);
            while((temp[0] = iter0.next(),temp[1] = iter1.next(),!temp[0].done ^ temp[1].done)){
                if(temp[0].done) break;
                if((temp[0].value?.src ?? String(temp[0].value)) !== (temp[0].value?.src ?? String(temp[0].value))){
                    return this.proto.value = Array.from(value),true;
                }
            }
            return false;
        }
    }
    /**
     * 
     * @param {Array} value 
     */
    protoTransform(value){
        var list = [],temp;
        if(!value?.[Symbol.iterator]) throw new Error('=> "value" must be Arraylike !'); else{
            const iter = value[Symbol.iterator]();
            while(!(temp = iter.next()).done){
                list.push(temp.done = document.createElement('div'));
                temp.done.appendChild(temp.value instanceof Image ? temp.value : Object.assign(new Image(),{src: String(temp.value)}));
            }
            return list;
        }
    }
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
     * @param {String} id 
     * @param {(HTMLElement | String)[]} srcList 
     * @param {Boolean} [tryRealNode] 
     * @param {{[attr: String]: (event: Event)=>void}} selfAssign 
     */
    constructor(id,srcList,tryRealNode,selfAssign){super(id,true,srcList,tryRealNode,selfAssign);}
}
class RealSelect extends RealElement{
    static proto = RealDivList.proto;
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
     * @param {{[text: String]: String}} value 
     */
    protoSet(value){return this.proto.value = Object.assign({},value),true;}
    /**
     * 
     * @param {Array} value 
     */
    protoTransform(value){
        var now;
        this instanceof RealSelect && !this.self.multiple && (value = Object.assign({_: ''},value));
        const innerHTML = [],iterator = Object.entries(value).values();
        while(!(now = iterator.next()).done)
            innerHTML.push(`<option value="${String(now.value[1])}" ${now.value[0] === '_' ? 'selected' : ''}>${now.value[0]}</option>`);
        return innerHTML.join('');
    }
    fix(){
        this.self[this.key] = this.proto.value;
        this.proto.list = Array.from(this.self.children);
    }
    /**@returns {HTMLElement[]} */
    get list(){return this.proto.list;}
    /**
     * 
     * @param {String | null} id 
     * @param {(value: {[text: String]: String})=>String} transform 
     * @param {Boolean} multiple 
     * @param {(e: Event)=>void} onchange 
     * @param {{[text: String]: String}} optionConfig 
     * @param {Boolean} [tryRealNode] 
     */
    constructor(id,multiple,transform,onchange,optionConfig,tryRealNode){
        const self = (typeof id === 'string' || (id = '',false)) && document.getElementById(id);
        self && (
            self.tagName.toLocaleLowerCase() === 'select' ? Object.assign(self,{multiple,onchange}) :
            RealNode.error('=> "id" exists but not within an HTMLSelectElement !')
        );
        RealElement.addId(id,!self);
        super({
            self: self || RealElement.makeElement('select',{id,multiple,onchange}),
            key: 'innerHTML',
            transform,
            initValue: Object.assign({},optionConfig)
        },{id},tryRealNode);
        this.fix();
    }
}
class RealExpression extends RealNode{}
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
            temp.length && (react && this.react(keys1),notify && this.notify());
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
// console.log(Date.now() - t0,'ms');
1 === 10
? RealNode.eventLoop.destroy() : RealNode.timeRecord(new Promise(r=>{
    const realNode = new RealNode({id: 213,info: [0,0],value: 0,react(){
        Math.random() > Math.random() * 5 ? this.info[0]++ : this.info[1]++;
    },set(value){return (value = ~~value) < 1e3 ? ((this.proto.value = value + 1),true) : r(realNode.info);}});
    // console.log(realNode - 1,realNode+'',!realNode,realNode+realNode);
    // console.log((Math.sqrt(5) - 1) / 2);
    realNode.value = realNode;
    // const tempFn = ()=>(RealNode.afterNow(tempFn,true),console.log(realNode.value));
    // RealNode.afterNow(tempFn,true);
})).then(({value,time})=>(console.log(value,'in',time,'ms'),RealNode.eventLoop.destroy()));
