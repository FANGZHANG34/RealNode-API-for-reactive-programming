'use strict';
// import('os').then(os=>console.log(os));
const browserMode = 'document' in globalThis;
var setInterval = setInterval ?? function(){},HTMLElement = HTMLElement ?? setInterval,performance = performance ?? Date;
var exports = exports ?? {};
var t0 = performance === Date ? performance.now() : 0;
class RealWorld{
    /**@type {RealWorld & RealWorld[]} */
    static app;
    static onload = new Promise(r=>'window' in globalThis ? window.onload = r : r());
    static get onlyWorld(){return !Array.isArray(this.app);}
    /**@this {RealWorld} */
    static onEvent(){if(this.fnArray.length){const fn = this.fnArray.pop();try{fn?.();}catch(e){console.error(e,fn);}}};
    static set onlyWorld(onlyWorld){if(onlyWorld === Array.isArray(this.app)){
        if(onlyWorld){while(this.app.length) this.app.pop().destroy();this.app = null;}
        else this.app ? [this.app] : [];
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
            try{thisArg[methodName](...parameters,(...value)=>temp.callback(...value));}catch({message: message0}){
                try{thisArg[methodName]((...value)=>temp.callback(...value),...parameters);}catch({message: message1}){
                    throw new Error('=> Neither head or tail of parameters is Callback !\n'+message0+'\n'+message1);
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
    static myStyle = new Map;
    /**@type {{[type: String]:Map<keyof HTMLElementTagNameMap,EventListener[]>}} */
    static selectorEventListeners = {};
    /**@method @type {(innerHTML: String)=>HTMLElement | null}*/
    static getDomByString = (template=>innerHTML=>{
        template.innerHTML = innerHTML;
        return template.content.firstElementChild;
    })(browserMode ? document.createElement('template') : {content: {}});
    static findId(id){return this.idSet.has(id);}
    static createImg(){return new RealElement({self: document.createElement('img'),key: 'src'});}
    static createVideo(){return new RealElement({self: document.createElement('video'),key: 'src'});}
    static createAudio(){return new RealElement({self: document.createElement('audio'),key: 'src'});}
    static createTextarea(placeholder){return new RealElement({self: RealElement.makeElement('textarea',{placeholder: String(placeholder)}),key: 'value'});}
    static deleteId(id){typeof id !== 'string' && this.error('=> Please use String "id" !');return this.idSet.delete(id);}
    static getRandomId(){
        for(var temp;this.idSet.has(temp = 'C3'+Math.floor(Math.random() * 1e14).toString(36)););
        return temp;
    }
    /**
     * 
     * @param {keyof HTMLElementTagNameMap | HTMLElement} tagName 
     * @param {{[attr: String]: String}} [config] 
     * @param {{[attr: String]: String}} [cssConfig] 
     * @returns {HTMLElement}
     */
    static makeElement(tagName,config,cssConfig){
        tagName instanceof HTMLElement || (tagName = document.createElement(tagName));
        return Object.assign(Object.assign(tagName,config).style,cssConfig),tagName;
    }
    static addId(id,strict = true){
        if(id) typeof id !== 'string' ? this.error('=> Please use String "id" !') :
        this.idSet.has(id) ? strict && this.error('=> Please use another "id" !') :
        this.idSet.add(id);
    }
    /**
     * 
     * @param {{}} element 
     */
    static searchByElement(element){
        /**@type {RealElement[]} */const temp = [];
        if('object' !== typeof element || !element) return temp;
        for(const realElement of this.sys.values()) if(element === realElement.self) temp.push(realElement);
        return temp;
    }
    /**@method */
    static addEventListenerBySelectors = (()=>{
        /**
         * 
         * @param {Event} e 
         * @param {((event: Event)=>void)[]} listenerArray 
         * @param {keyof HTMLElementTagNameMap} selectors 
         */
        function temp(e,listenerArray,selectors){if(Array.from(document.querySelectorAll(selectors)).includes(e.target)){
            for(var i = 0,l = listenerArray.length;i < l;) try{listenerArray[i++](e);}catch(e){console.error,alert(e.stack);}
        }}
        /**
         * 
         * @param {keyof HTMLElementTagNameMap} selectors 
         * @param {keyof HTMLElementEventMap} type 
         * @param {(event: Event)=>void} listener 
         */
        return(selectors,type,listener)=>{
            !selectors || '*' === selectors ? document.addEventListener(type,listener) : (
                !RealElement.selectorEventListeners[type] && (
                    RealElement.selectorEventListeners[type] = new Map,
                    document.addEventListener(type,e=>RealElement.selectorEventListeners[type].forEach((listenerArray,selectors)=>temp(e,listenerArray,selectors)))
                ),
                RealElement.selectorEventListeners[type].has(selectors) ? RealElement.selectorEventListeners[type].get(selectors).push(listener) :
                RealElement.selectorEventListeners[type].set(selectors,[listener])
            );
        }
    })();
    /**
     * 
     * @this {RealElement}
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
        return this.fix(),react && this.react(noSelf),notify && this.notify(noSelf),true;
    }catch(e){
        if(this instanceof RealElement) throw e;
        this.error('Please avoid using method "react" of typeof '+this?.name+' !\n'+e.message);
    }}
    /**@typedef {(prefix: String,ruleObjObj: {[selector: String]: {[styleName: String]: String}})=>addCSSRules} addCSSRules */
    /**@method @type {addCSSRules} */
    static addCSSRules = (()=>{if(browserMode){
        document.getElementsByTagName("head")[0].
        appendChild(document.createElement("style"))[!window.createPopup && "appendChild"]?.(document.createTextNode(""));
        const myCSS = document.styleSheets[document.styleSheets.length - 1];
        const testReg = /^\.([A-Za-z][A-Z0-9a-z]{0,})$/;
        const strReg0 = /[A-Za-z]$/,strReg1 = /^[A-Za-z]/;
        const getKeys = obj=>obj && 'object' === typeof obj ? Object.keys(obj) : [];
        /**@type {(selector: keyof HTMLElementTagNameMap,rulesStr: String)=>Number} */
        const tempInsertRule = !myCSS.insertRule ? (selector,rulesStr)=>myCSS.addRule(selector,rulesStr,-1) :
        (selector,rulesStr)=>myCSS.insertRule(selector+"{\n"+rulesStr+"}",myCSS.cssRules.length);
        return function addCSSRules(prefix,ruleObjObj){
            'string' === typeof prefix || RealElement.error('"prefix" in addCSSRules must be String !');
            for(const selector of getKeys(ruleObjObj)){
                const ruleObj = ruleObjObj[selector],temp = [];
                for(const key of getKeys(ruleObj)){temp.push(key,':',String(ruleObj[key]),';\n');}
                tempInsertRule(prefix+(strReg0.test(prefix) && strReg1.test(selector) ? ' ' : '')+selector+' ',temp.join(''));
            }
            const cssName = testReg.exec(prefix)?.[1];
            cssName && RealElement.myStyle.set(cssName,Object.assign({},RealElement.myStyle.get(cssName),ruleObjObj));
            return addCSSRules;
        };
    }})();
    static defaultInit = (()=>{
        var temp = true;
        return function(){if(temp) temp = false,RealElement.addCSSRules('',{
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
                'overflow':'hidden scroll',
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
        })('.relativeSquare',{
            '':{'width':'20vmin','height':'20vmin'},
        })('.fontTitle',{
            '':{'font-size':'20vmin'},
        })('.fontHead',{
            '':{'font-size':'10vmin'},
        })('.fontNormal',{
            '':{'font-size':'3vmin'},
        })('.scrollY',{
            '':{'overflow':'hidden scroll'}
        })('.scrollX',{
            '':{'overflow':'scroll hidden'}
        })('.scrollXY',{
            '':{'overflow':'scroll'}
        })('.scrollNone',{
            '':{'overflow':'hidden'}
        })('.centerCenter',{
            '':{
                'text-align':'center',
                'align-content':'center',
            }
        })('.autoFull',{
            '':{'width':'100vmax','height':'100vmin'}
        })('.selfTextCenter',{'': {'left':'50%','transform':'translateX(-50%)'}});};
    })();
    getIndexWithin(){
        for(var i = 0,temp;temp = this.self.previousElementSibling;i++);
        return i;
    }
    protoTransform(value){return value;}
    fix(){return this.self[this.key] = this.transform(this.proto.value),this;}
    clearClassName(){return this.proto.isElement && (this.self.className = '',true);}
    /**@param {...String} */
    addClassName(){return this.proto.isElement && (this.self.classList.add(...arguments),true);}
    /**@param {String} className */
    toggleClassName(className){return this.proto.isElement && this.self.classList.toggle(className);}
    /**@param {...String} */
    removeClassName(){return this.proto.isElement && (this.self.classList.remove(...arguments),true);}
    rememberParent(){if(this.self instanceof HTMLElement) this.info = this.self.parentElement;return this;}
    /**
     * 
     * @param {HTMLElement} element 
     */
    appendIn(element){return element.appendChild(this.self) && this.rememberParent();}
    /**
     * 
     * @param {Boolean} react 
     * @param {Boolean} notify 
     * @param {Boolean} noSelf 
     * @returns {Boolean}
     */
    realSet(value,react,notify,noSelf){
        var temp;
        return this.tryRealNode && (temp = this.computePositionsOfRNs(value)).length ? this.dealWithPositionsOfRNs(temp,value) :
        this.proto._set.call(this,value) && (this.fix(),react && this.react,notify && this.notify(noSelf),true);
    }
    /**
     * 
     * @param {keyof HTMLElementTagNameMap} selfSelector 
     * @param {String | {[selector: String]: {[styleName: String]: String}}} classNameOrRuleObjObj 
     */
    applyCSS(selfSelector,classNameOrRuleObjObj){
        const strReg = /^[A-Za-z]/;
        if(this.self instanceof HTMLElement){
            'string' === typeof selfSelector || this.error('"selfSelector" must be String');
            const id = '' === this.self.id ? this.self.id = RealElement.getRandomId() : this.self.id;
            'string' === typeof classNameOrRuleObjObj ? classNameOrRuleObjObj = RealElement.myStyle.get(classNameOrRuleObjObj) :
            classNameOrRuleObjObj = Object(classNameOrRuleObjObj);
            return !classNameOrRuleObjObj ? false : (RealElement.addCSSRules(
                '#'+id+(strReg.test(selfSelector) ? ' ' : '')+selfSelector,classNameOrRuleObjObj
            ),RealElement.addId(id,false),true);
        }else this.error('I am not Element !');
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
        const param0 = {self,key: this.key,transform: this.transform};
        if(keepValue) param0.initValue = this.proto.value;
        const temp = new RealElement(param0,{
            get: this.proto._get,
            set: this.proto._set,
            react: this.proto.react,
            id: this.id.description+'-clone',
            info: this.info,
        });
        Reflect.setPrototypeOf(temp,Reflect.getPrototypeOf(this));
        if(null == deepCopyRelativeRNs) temp.relativeRNs = deepCopyRelativeRNs ? this.relativeRNs : this.relativeRNs.concat();
        if(fix) temp.fix();
        return temp;
    }
    get self(){return this.proto.self;}
    get isElement(){return this.proto.isElement;}
    get transform(){return this.proto.transform;}
    /**@param {(value)=>*} transform  */
    set transform(transform){this.proto.transform = 'function' === typeof transform ? transform : this.protoTransform;}
    set self(self){
        self && 'object' === typeof self ? this.proto.isElement = (this.proto.self = self) instanceof HTMLElement :
        this.error('=> "self" must be HTMLElement !');
    }
    /**
     * 
     * @param {{self: HTMLElement,key,transform?: (value)=>*},initValue} param0 
     * @param {{get?: ()=>*,set?: (value)=>Boolean,react?: ()=>void,id?,info?,value?}} [config] 
     * @param {Boolean} [tryRealNode] 
     * @param  {...RealNode} [relativeRNs] 
     */
    constructor({self,key,transform,initValue},config,tryRealNode,...relativeRNs){
        super(config,tryRealNode,...relativeRNs);
        /**@type {AntiHTMLNode} */this.proto;
        this.proto.value = initValue;
        this.self = self;
        this.key = key;
        this.transform = transform;
        this.addClassName(this.constructor.name);
    }
}
class RealCanvas extends RealElement{
    /**@typedef {AntiHTMLNode & {
     * self: HTMLCanvasElement;
     * temp: CanvasRenderingContext2D;
     * img: HTMLImageElement;
     * clearBeforeDraw: Boolean;
     * ctx: CanvasRenderingContext2D;
     * }} AntiCanvas */
    static proto = class AntiCanvas extends RealElement.proto{
        temp = document.createElement('canvas').getContext('2d');
        img = new Image;
        isElement = true;
        clearBeforeDraw = true;
        /**@type {CanvasRenderingContext2D} */
        ctx;
    }
    static noCache = true;
    /**@type {Map<String,HTMLImageElement>} */
    static srcImageMap = new Map;
    /**
     * 
     * @param {Number | String} N 
     * @param {Number} longN 
     * @returns {String}
     */
    static strN(N,longN){const i = String(N).length; while(longN --> i) N = '0'+N; return N};
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
            temp.src ? resolve(temp) : src && 'string' === typeof src && !(RealCanvas.noCache && RealCanvas.srcImageMap.has(src)) ?
            Object.assign(temp,{onload: ()=>(
                RealCanvas.srcImageMap.set(src,temp),temp.onload = temp.onerror = resolve(temp)
            ),onerror: reject,src}) : reject();
        }
        return src=>new Promise(dealWithSrc.bind(null,src));
    })();
    protoTransform(){}
    protoGet(){return this.loaded.then(()=>this.proto.value);}
    clearAsync(){return this.loaded = this.loaded.then(()=>{this.clear();});}
    fix(imgOrCanvas = this.proto.temp.canvas){(this.proto.clearBeforeDraw ? this.clear() : this.proto.ctx).drawImage(imgOrCanvas,0,0);}
    testSrc(src){return this.loaded = this.loaded.then(()=>RealCanvas.getImageBySrc(src)).then(()=>true,this.rejectSrc.bind(this,src));}
    clear(){return this.proto.ctx.clearRect(0,0,this.proto.self.width,this.proto.self.height),this.proto.ctx.closePath(),this.proto.ctx;}
    clearTemp(){return this.proto.temp.clearRect(0,0,this.proto.self.width,this.proto.self.height),this.proto.temp.closePath(),this.proto.temp;}
    rejectSrc(src,error){return src && console.error(
        error instanceof Error ? error : (RealCanvas.noCache && error && RealCanvas.srcImageMap.set(src),this+': Fail to load by src "'+src+'" !')
    ),false;}
    protoSet(src){
        return this.loaded = this.loaded.then(()=>RealCanvas.getImageBySrc(src)).
        then(img=>(this.proto.img = img,this.proto.value = src,true),this.rejectSrc.bind(this,src));
    }
    resizeBySrc(src){return this.loaded = this.loaded.then(()=>RealCanvas.getImageBySrc(src)).then(img=>{
        if(this.self.width !== img.naturalWidth) this.width = img.naturalWidth;
        if(this.self.height !== img.naturalHeight) this.height = img.naturalHeight;
    });}
    /**
     * 
     * @returns {Promise<Blob>}
     */
    toBlob(){try{return RealWorld.cb2promise({thisArg: this.self,methodName: 'toBlob'}).then(result=>result[0]);}catch(e){this.error('Canvas has been dirty !')}}
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
        Promise.resolve(this.proto._set.call(
            this,
            this.proto.tryRealNode && (temp = this.computePositionsOfRNs(value)).length ?
            this.dealWithPositionsOfRNs(temp,value) : value
        )).then(v=>v && (this.fix(this.img),react && this.react?.(),notify && this.notify(noSelf),true));
    }
    multiDrawSrcArray({bgSrc,autoOpacity,resize},...srcArray){
        var i = -1,temp = bgSrc ?? srcArray[0] ?? false;
        resize && temp && this.resizeBySrc(temp);
        this.loaded = this.loaded.then(()=>this.clearTemp());
        if(Array.isArray(bgSrc)){for(temp = bgSrc.length;temp >++ i;) this.temp = bgSrc[i];}
        else bgSrc && 'string' === typeof bgSrc && (this.temp = bgSrc);
        if(srcArray.length > 1 && autoOpacity){
            for(i = srcArray.length,temp = 0;i --> 0;) this.tempOpacity = .625 ** i,this.temp = srcArray[temp++];
        }else for(i = -1,temp = srcArray.length;temp >++ i;) this.temp = srcArray[i];
        return this.loaded = this.loaded.then(()=>{this.fix(this.proto.temp.canvas);},e=>alert(e.stack));
        // CGM.constructor.mainCanvas.temp.toBlob(
        //     async blob=>{
        //         var i = 0;
        //         while(true) if(fs.existsSync('./save/'+i+'.png')) i++; else break;
        //         try{fs.writeFile('./save/'+i+'.png',Buffer.from(await blob.arrayBuffer()),()=>alert('Achieved "./save/'+i+'.png" !'))}catch(e){alert(e.stack)}
        //     } // {protoCGM.downloader.makeDownloadUrl(blob),protoCGM.downloader.temp.click();}
        // )
    }
    /**
     * 
     * @param {{
     * prefix: String; suffix: String; startN: Number; length: Number; midLength?: Number;
     * bgSrc?: String; playMode?: 0 | 1 | 2 | 3; timeSep?: Number; sizeMode?: 'std' | 'auto';
     * }} param0 
     * @returns {{loaded: Promise<void>,finished: Promise<void>}}
     */
    animate({
        prefix = './img/w99_',suffix = '.png',startN = 1,length = 79,midLength = 2,
        bgSrc = './img/w99_00.png',playMode = 0,timeSep = 100,sizeMode = 'std'
    } = {}){
        const size = {width: this.width,height: this.height},config = [1,2,3,5],temp = {};
        var i = startN + length + playMode;
        length *= config[playMode] ?? 1;
        timeSep /= config[playMode] ?? 1;
        while(i --> 0) this.testSrc(prefix+RealCanvas.strN(i,midLength)+suffix);
        i = 0;
        return {loaded: this.loaded,finished: this.loaded.then(()=>{
            /**@type {RealWorld} */
            const temp = new RealWorld(timeSep,true);
            switch(sizeMode){
                case 'auto':this.proto._set.call(this,bgSrc || prefix+RealCanvas.strN(startN,midLength)+suffix).
                then(value=>{value && (this.width = this.imgW,this.height = this.imgH);});break;
            }
            switch(playMode){
                default: while(length --> 0) temp.then(this.multiDrawSrcArray,this,{bgSrc},prefix+RealCanvas.strN(startN++,midLength)+suffix);
                case 1:{
                    while(length --> 0) temp.then(
                        this.multiDrawSrcArray,this,{bgSrc,autoOpacity: true},
                        (i = !i) || prefix+RealCanvas.strN(startN++,midLength)+suffix,
                        false,
                        prefix+RealCanvas.strN(startN,midLength)+suffix
                    );
                    break;
                }
                case 2:{
                    while(length --> 0) temp.then(
                        this.multiDrawSrcArray,this,{bgSrc,autoOpacity: true},
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
                        this.multiDrawSrcArray,this,{bgSrc,autoOpacity: true},
                        1 === i ? prefix+RealCanvas.strN(startN + 1,midLength)+suffix : 4 === i && prefix+RealCanvas.strN(startN,midLength)+suffix,
                        false,
                        2 === i ? prefix+RealCanvas.strN(startN + 1,midLength)+suffix : 3 === i && prefix+RealCanvas.strN(startN,midLength)+suffix,
                        false,
                        3 > i ? prefix+RealCanvas.strN(startN,midLength)+suffix : 2 < i && prefix+RealCanvas.strN(startN + 1,midLength)+suffix
                    ),5 ===++ i && (startN++,i %= 5);
                    break;
                }
            }
            return temp.then(()=>(this.clearTemp(),Object.assign(this,size),temp.destroy()));
        })};
    }
    get ctx(){return this.proto.ctx;}
    get img(){return this.proto.img;}
    get self(){return this.proto.self;}
    get temp(){return this.proto.temp.canvas;}
    get width(){return this.proto.self.width;}
    get height(){return this.proto.self.height;}
    get imgW(){return this.proto.img.naturalWidth;}
    get imgH(){return this.proto.img.naturalHeight;}
    get opacity(){return this.loaded.then(()=>this.proto.ctx.globalAlpha);}
    get clearBeforeDraw(){return this.loaded.then(()=>this.proto.clearBeforeDraw);}
    set self(self){this.proto.self ??= self;}
    set width(width){this.proto.self.width = this.proto.temp.canvas.width = width ?? 640;}
    set height(height){this.proto.self.height = this.proto.temp.canvas.height = height ?? 360;}
    /**@param {[(Promise<Number>|Number),Number]} opacityConfig  */
    set opacity(opacityConfig){
        Array.isArray(opacityConfig) || (opacityConfig = [opacityConfig]);
        this.loaded = this.loaded.then(()=>opacityConfig[0]).
        then(value=>{this.proto.ctx.globalAlpha = value * (opacityConfig[1] ?? 1);});
    }
    set clearBeforeDraw(clearBeforeDraw){
        this.loaded = this.loaded.then(()=>this.proto.clearBeforeDraw = clearBeforeDraw);
        // const loaded = this.loaded;
        // this.loaded = Promise.resolve(clearBeforeDraw).then(value=>loaded.then(()=>{this.proto.clearBeforeDraw = value;}));
    }
    set temp(src){return this.proto._set.call(this,src).then(()=>(this.proto.temp.drawImage(this.img,0,0),true),this.rejectSrc.bind(this,src));}
    /**@param {[(Promise<Number>|Number),Number]} opacityConfig  */
    set tempOpacity(opacityConfig){
        Array.isArray(opacityConfig) || (opacityConfig = [opacityConfig]);
        this.loaded = this.loaded.then(()=>opacityConfig[0]).
        then(value=>{this.proto.temp.globalAlpha = value * (opacityConfig[1] ?? 1);});
    }
    loaded = RealNode.now;
    /**
     * 
     * @param {Number} [width] 
     * @param {Number} [height] 
     * @param {Boolean} [tryRealNode] 
     * @param  {...RealNode} [relativeRNs] 
     */
    constructor(id,width,height,tryRealNode,...relativeRNs){
        const self = ('string' === typeof id || (id = '',false)) && document.getElementById(id);
        self && self.tagName.toLocaleLowerCase() !== 'canvas' &&
        RealNode.error('=> "id" exists but not within an HTMLCanvasElement !');
        RealElement.addId(id,!self);
        super({self: self || RealElement.makeElement('canvas',{id})},{id},tryRealNode,...relativeRNs);
        /**@type {AntiCanvas} */
        this.proto;
        this.width = width;
        this.height = height;
        this.rememberParent().proto.ctx = this.proto.self.getContext('2d');
    }
}
class RealLoader extends RealElement{
    /**@typedef {AntiHTMLNode & {onerror: null | (error: Error)=>void,onloadend: null | (n: Number)=>void}} AntiLoader */
    static proto = class AntiLoader extends RealElement.proto{
        /**@type {null | (error: Error)=>void} */
        onerror;
        /**@type {null | (n: Number)=>void} */
        onloadend;
    };
    static readdir = (
        globalThis.require ?
        /**@type {(path: String)=>Promise<String[]>}  */
        (path=>RealWorld.cb2promise({thisArg: require('fs'),methodName: 'readdir'},path).then(result=>result[1])) :
        /**@type {(path: String,...strArgs: (String | String[])[])=>Promise<String[]>}  */
        (async (path,...strArgs)=>{
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
                (await new Promise(resolve=>{RealLoader.readdir.resolve = resolve;RealElement.getDomByString(
                    '<object data="'+path+j+'" onload="RealLoader.readdir.resolve(true)" onerror="RealLoader.readdir.resolve(false)"></object>'
                );})) && fileNameList.push(j);
                for(temp[(i = length) - 1]++;i --> 0;) strArgs[i].length > temp[i] || (temp[i] = 0,temp[i - 1]++);
            }
            return fileNameList;
        })
    );
    static configDescriptor = (browserMode && RealWorld.onload.then(()=>RealElement.addEventListenerBySelectors('.RealLoader',"click",e=>{
        for(const temp of RealElement.searchByElement(e.target)) if(temp instanceof RealLoader){
            RealLoader.load(temp).then(result=>result[0] ? temp.onerror?.(result[0]) : temp.onloadend?.(result[1]));
            temp.react?.();
            temp.notify(true);
            break;
        }
    }),{writable: false,enumerable: false,configurable: false}));
    static getArrayBufferFrom(data){return Promise.resolve(
        data instanceof ArrayBuffer ? data : ArrayBuffer.isView(data) ? data.buffer :
        data instanceof Blob ? data.arrayBuffer() : new Blob(Array.isArray(data) ? data.join('') : String(data)).arrayBuffer()
    );}
    /**@type {(realLoader: RealLoader)=>Promise<[Error | null,Number | undefined]>} @method */
    static load = (
        globalThis.require ? (async (realLoader)=>{try{
            if('upload' === realLoader.type) return realLoader.temp.click(),[];
            const fs = require('fs');
            const data = await realLoader.dataGetter();
            const [,prefix,suffix] = /(.+)(\..+)/.exec(realLoader.temp.download) || [,'file',''];
            return RealWorld.cb2promise({thisArg: fs,methodName: 'stat'},'./'+realLoader.temp.download).
            then(async (value)=>{
                if(!value) this.error('Unknown Error !');
                if(value[0]) return RealLoader.getArrayBufferFrom(data).
                then(ab=>RealWorld.cb2promise({thisArg: fs,methodName: 'writeFile'},'./'+realLoader.temp.download,Buffer.from(ab)));
                for(var i = 1;true;i++){
                    const path = './'+prefix+' - '+i+suffix;
                    if((await RealWorld.cb2promise({thisArg: fs,methodName: 'stat'},path))[0]) return RealLoader.getArrayBufferFrom(data).
                    then(ab=>RealWorld.cb2promise({thisArg: fs,methodName: 'writeFile'},path,Buffer.from(ab))).then(result=>[result[0],i]);
                }
            });
        }catch(e){return [e];}}) :
        (()=>{
            const toBlob = data=>new Blob(data);
            /**
             * 
             * @this {RealLoader}  
             * @param {Blob} blob 
             */
            function temp(blob){
                const href = URL.createObjectURL(blob);
                this.temp.href = href;
                this.temp.click();
                URL.revokeObjectURL(href);
                return [];
            }
            return async (realLoader)=>{try{
                if('upload' === realLoader.type) return realLoader.temp.click(),[];
                const data = await realLoader.dataGetter();
                return Promise.resolve(
                    'string' === typeof data ? new Blob(data) : data instanceof Blob ? data :
                    RealLoader.getArrayBufferFrom(data).then(toBlob)
                ).then(temp.bind(realLoader)).catch(e=>[e]);
            }catch(e){this.error(e);}}
        })()
    );
    protoSet(value){this.self[this.key] = value;}
    get onerror(){return this.proto.onerror;}
    get onloadend(){return this.proto.onloadend;}
    get fileName(){return 'upload' === this.type ? this.error('Uploader bans "fileName" !') : this.temp.download;}
    /**@returns {FileList} */
    get files(){return 'upload' === this.type ? this.temp.files : this.error('I\'m an downloader without files !');}
    set onerror(onerror){this.proto.onerror = 'function' === typeof onerror ? onerror : null;}
    set onloadend(onloadend){this.proto.onloadend = 'function' === typeof onloadend ? onloadend : null;}
    set fileName(fileName){
        'upload' === this.type && this.error('Uploader bans "fileName" !');
        'symbol' === typeof fileName && this.error('"fileName" must be String but not Symbol !');
        if(globalThis.require && !/^\.\//.test(fileName)) fileName = './'+fileName;
        this.temp.download = fileName;
    }
    /**@type {()=>*} */
    dataGetter;
    /**@type {Promise<Buffer | String>} */
    data;
    constructor(isDownload,fileName,dataGetter,{innerHTML,onerror,onloadend} = {}){
        super({self: document.createElement('div'),key: 'innerHTML'});
        /**@type {AntiLoader} */
        this.proto;
        this.onerror = onerror;
        this.onloadend = onloadend;
        this.dataGetter = dataGetter;
        this.value = String(innerHTML);
        isDownload = Boolean(isDownload);
        this.type = isDownload ? 'download' : 'upload';
        this.temp = document.createElement(isDownload ? 'a' : 'input');
        Reflect.defineProperty(this,'type',RealLoader.configDescriptor);
        isDownload ? this.fileName = fileName || 'file' : this.temp.type = 'file';
    }
}
class RealSelect extends RealElement{
    /**@typedef {AntiHTMLNode & {list: HTMLOptionElement[]}} AntiSelect */
    static proto = class AntiSelect extends RealElement.proto{
        /**@type {HTMLOptionElement[]} */
        list = [];
    };
    /**
     * 
     * @this {RealSelect}
     * @param {RealNode} realNode 
     */
    static react(realNode,react = true,notify = true,noSelf = true){var value,i;try{
        const temp = this.getPositionsOfChildRN(realNode);
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
        return react && this.react(noSelf),notify && this.notify(noSelf),true;
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
        this.self[this.key] = this.proto.value;
        this.proto.list = Array.from(this.self.children);
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
    protoTransform(value){
        var now;
        if(this instanceof RealSelect && !this.self.multiple) value = Object.assign({_: ''},value);
        const innerHTML = [],iterator = Object.entries(value).values();
        while(!(now = iterator.next()).done)
            innerHTML.push(`<option value="${String(now.value[1])}" ${now.value[0] === '_' ? 'selected' : ''}>${now.value[0]}</option>`);
        return innerHTML.join('');
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
        const self = ('string' === typeof id || (id = '',false)) && document.getElementById(id);
        if(self) self.tagName.toLocaleLowerCase() === 'select' ? Object.assign(self,{multiple,onchange}) :
        RealNode.error('=> "id" exists but not within an HTMLSelectElement !');
        RealElement.addId(id,!self);
        super({
            self: self || RealElement.makeElement('select',{id,multiple,onchange}),
            key: 'innerHTML',
            transform,
            initValue: Object.assign({},optionConfig)
        },{id},tryRealNode);
        this.fix().rememberParent();
    }
}
class RealComtag extends RealElement{
    fix(){
        this.self.classList.add('disappear');
        this.self.innerHTML = '';
        for(const temp of this.transform(this.proto.value)) this.self.appendChild(temp);
        this.self.classList.remove('disappear');
        return this;
    }
    protoTransform(value){
        if(!value?.[Symbol.iterator]) throw new Error('=> "value" must be Arraylike !');else{
            const list = [];
            for(const temp of value) list.push(temp instanceof HTMLElement ? temp : document.createElement(String(temp)));
            return list;
        }
    }
    /**
     * 
     * @param {(HTMLElement | String)[]} value 
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
     * @param {(String | HTMLElement)[]} optionList 
     * @param {Boolean} [tryRealNode] 
     * @param {{[attr: String]: (event: Event)=>void}} [selfAssign] 
     */
    constructor(id,tryHTML,optionList,tryRealNode,selfAssign){
        const self = ('string' === typeof id || (id = '',false)) && document.getElementById(id);
        RealElement.addId(id,!self);
        super({
            self: self || RealElement.makeElement('div',{id}),
            initValue: !optionList?.[Symbol.iterator] ? [] : Array.from(optionList)
        },{id},tryRealNode);
        /**@type {AntiList} */this.proto;
        this.tryHTML = tryHTML;
        Object.assign(this.fix().rememberParent().self,selfAssign);
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
        return new RealDivList(id,true,temp,true,selfAssign);
    }
    /**
     * 
     * @this {RealDivList}
     * @param {RealNode} realNode 
     */
    static react(realNode,react = true,notify = true,noSelf = true){var value;try{
        const temp = this.getPositionsOfChildRN(realNode);
        while(temp.length){
            const position = temp.pop().reverse(),tempValue = realNode.value;
            if(!position.length) return this.realSet(tempValue,react,notify,noSelf);else{
                value = this.proto.value;
                while(position.length > 1) value = value[position.pop()];
                tempValue === value[position[0]] || (value[position[0]] = tempValue);
                if(value === this.proto.value) (position[1] = this.proto.list[position[0]]).innerHTML = '';
                tempValue instanceof HTMLElement ? position[1].appendChild(tempValue) :
                position[1][this.tryHTML ? 'innerHTML' : 'textContent'] = tempValue;
            }
        }
        return react && this.react(noSelf),notify && this.notify(noSelf),true;
    }catch(e){
        if(this instanceof RealDivList) throw e;
        this.error('Please avoid using method "react" of typeof '+this?.name+' !\n'+e.message);
    }}
    /**
     * 
     * @param {*} className 
     * @param {*} tryHTML 
     * @param {*} optionList 
     * @param {*} [tryRealNode] 
     * @param {{[selector: String]: {[styleName: String]: String}}} [cssRuleObjObj] 
     * @param {(this: RealDivList)=>void} [callback] 
     */
    static defineDivListClass(className,tryHTML,optionList,tryRealNode,cssRuleObjObj,callback){
        /^([A-Za-z]\w*)$/.test(className) || this.error('Illegal "className" !');
        this.divListClassMap.has(className) && this.error('"className" repeated !');
        optionList?.[Symbol.iterator] || this.error('"optionList" must be Array !');
        this.addCSSRules('.'+className,cssRuleObjObj);
        this.divListClassMap.set(className,[tryHTML,optionList,tryRealNode,'function' === typeof callback ? callback : null]);
    }
    static createByClassName(className,...argArray){
        const config = this.divListClassMap.get(className);
        config || this.error('"className" not found !');
        const temp = new RealDivList('',config[0],config[1],config[2]);
        return config[3].apply(temp,argArray),temp.addClassName(className),temp;
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
        if(!value?.[Symbol.iterator]) throw new Error('=> "value" must be Arraylike !');else{
            const iter = value[Symbol.iterator]();
            while(!(temp = iter.next()).done){
                list.push(temp.done = document.createElement('div'));
                temp.value instanceof HTMLElement ? temp.done.appendChild(temp.value) :
                temp.done[this.tryHTML ? 'innerHTML' : 'textContent'] = String(temp.value);
            }
            return list;
        }
    }
    /**
     * 
     * @param {Boolean} [toRealElement] 
     * @param {String} [key] 
     * @returns {{[id: String]: HTMLElement} | {[id: String]: RealElement}}}
     */
    getIdDict(toRealElement,key){
        /**@type {{[id: String]: HTMLElement} | {[id: String]: RealElement}} */
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
     * @param {{[attr: String]: (event: Event)=>void}} [selfAssign] 
     */
    constructor(id,tryHTML,optionList,tryRealNode,selfAssign){
        const self = ('string' === typeof id || (id = '',false)) && document.getElementById(id);
        RealElement.addId(id,!self);
        super({
            self: self || RealElement.makeElement('div',{id}),
            initValue: !optionList?.[Symbol.iterator] ? [] : Array.from(optionList)
        },{id},tryRealNode);
        /**@type {AntiList} */this.proto;
        this.tryHTML = tryHTML;
        Object.assign(this.fix().rememberParent().self,selfAssign);
    }
}
class RealImgList extends RealDivList{
    /**
     * 
     * @this {RealImgList}
     * @param {RealNode} realNode 
     */
    static react(realNode,react = true,notify = true,noSelf = true){var value;try{
        const temp = this.getPositionsOfChildRN(realNode);
        while(temp.length){
            const position = temp.pop().reverse(),tempValue = realNode.value;
            if(!position.length) return this.realSet(tempValue,react,notify,noSelf);else{
                value = this.proto.value;
                while(position.length > 1) value = value[position.pop()];
                tempValue === value[position[0]] || (value[position[0]] = tempValue);
                if(value === this.proto.value) this.proto.childrenList[position[0]][0].src = String(tempValue?.src ?? tempValue);
            }
        }
        return react && this.react(noSelf),notify && this.notify(noSelf),true;
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
        if(!value?.[Symbol.iterator]) throw new Error('=> "value" must be Arraylike !');else{
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
     * @param {(HTMLElement | String)[]} value 
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
     * @param {(HTMLElement | String)[]} srcList 
     * @param {Boolean} [tryRealNode] 
     * @param {{[attr: String]: (event: Event)=>void}} [selfAssign] 
     */
    constructor(id,srcList,tryRealNode,selfAssign){super(id,true,srcList,tryRealNode,selfAssign);}
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
console.log(performance.now() - t0,'ms');
browserMode || (1 === 10
? RealNode.eventLoop.destroy() : RealNode.time(new Promise(r=>{
    test1:{
        break test1;
        const realNode = new RealNode;
        console.log(realNode - 1,realNode+'',!realNode,realNode+realNode);
        console.log(((Math.sqrt(5) - 1) / 2).toFixed(64));
        realNode.proto.tryRealNode = false;
        realNode.value = realNode.dealWithPositionsOfRNs([[realNode]]);
    }
    test2:{
        break test2;
        const realNode = new RealNode({id: 213,info: [0,0],value: 0,react(){
            Math.random() > Math.random() ? this.info[0]++ : this.info[1]++;
        },set(value){return 1e6 > value ? ((this.proto.value = value + 1),true) : r(realNode.info);}});
        realNode.value = realNode;
    }
    test3:{
        // break test3;
        const f = new RealNode({id: 'Marry',value: 0}),m = new RealNode({id: 'Mike',value: 0});
        m.relate(f.relate(new RealNode({id: 'Mr. White',react(){
            m < 1e6 && f < 1e6 ? Math.random() * 1 > Math.random() ? f.value++ : m.value++ : r((m > f ? m : f)+': +'+Math.abs(f-m));
        }}))).react();
    }
    test4:{
        break test4;
        // const tempfn = n=>n>1 ? Promise.all([RealNode.justNow(tempfn,null,n - 1),RealNode.justNow(tempfn,null,n - 2)]).then(v=>v[0] + v[1]) : 1;
        RealNode.justNow(function tempFn(n){return n>1 ? tempFn(n - 1) + tempFn(n - 2) : 1;},null,50).then(v=>r(v));
    }
    // const tempFn = ()=>(RealNode.afterNow(tempFn,true),console.log(realNode.value));
    // RealNode.afterNow(tempFn,true);
})).then(({value,time})=>(console.log(value,'in',time,'ms'),RealNode.eventLoop.destroy())));
// (()=>{
//     var t0 = performance.now(),i = 1e8,temp = [0,0];
//     while(i --> 0) Math.random() > Math.random() ? temp[0]++ : temp[1]++;
//     console.log(temp,performance.now() - t0);
// })()
browserMode && RealWorld.onload.then(()=>RealDivList.defineDivListClass('realDivSelect',false,[],true,{
    '': {'background':'linear-gradient(135deg,#fff,#000)'},
    '>div': {'background-color':'#333','transform':'scale(0.8,1)'},
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
        for(const key of (this.info.optionList = [],this.proto.value = Object.keys(value = Object(value)).sort())) this.info.optionList.push(value[key]);
        return this.fix().value,false;
    }
    /**@type {(RS: RealDivList)=>Boolean} */
    function tempReact(RS){return RS.react?.(),RS.self.dispatchEvent(new Event('change',changeConfig)),RS.notify();}
    RealElement.addEventListenerBySelectors('.realDivSelect>div','click',({target})=>{
        var REList = RealElement.searchByElement(target.parentElement),i = 0,temp;
        while(temp = REList.pop()) if(temp && temp.self.classList.contains('realDivSelect')) break;
        if(!temp) return;
        /**@type  {RealDivList} */
        const RS = temp,previousValue = RS.value[0];
        /**@type {HTMLDivElement[]} */
        REList = RS.proto.list;
        if(RS.info.multiple) target.classList.toggle('selected'),tempReact(RS);else{
            while(temp = REList[i++]) temp.classList[target === temp ? 'add' : 'remove']('selected');
            previousValue === RS.value[0] || tempReact(RS);
        }
    });
    /**@type {(this: RealDivList,optionConfig?: {[key: String]: *},multiple?: Boolean,onchange?: (e: Event)=>void)=>void} */
    return function(optionConfig,multiple,onchange){
        this.get = tempGet;
        this.set = tempSet;
        this.info = Object(this.info);
        this.info.multiple = Boolean(multiple);
        if('function' === typeof onchange) this.self.onchange = onchange;
        this.value = optionConfig;
    };
})()));
/**
 * 
 * @param {{[key: String]: *}} [optionConfig] 
 * @param {Boolean} [multiple] 
 * @param {(e: Event)=>void} [onchange] 
 */
function createRealDivSelect(optionConfig,multiple,onchange){return RealDivList.createByClassName('realDivSelect',optionConfig,multiple,onchange);}
browserMode && RealWorld.onload.then(()=>RealDivList.defineDivListClass('realDivSearch',true,[],true,{'>:nth-child(2)>div>div:hover': {'transform':'scale(0.9,1)'}},(()=>{
    /**@type {RealDivList} */
    var tempRealDivList;
    const changeConfig = {bubbles: true,cancelable: false};
    /**@type {(this: RealDivList)=>String} */
    function tempGet(){return this.info.inputer.value;}
    /**@type {(this: RealDivList,value: *[])=>false} */
    function tempSet(value){
        Array.isArray(value) ? this.info.wordList = value : this.error('"value must be Array !');
        return this.info.inputer.dispatchEvent(new Event('change',changeConfig)),(tempRealDivList ??= this).info.matcher.value = {},false;
    }
    /**@type {(target: HTMLElement)=>void} */
    function tempReact(target){tempRealDivList && target !== tempRealDivList.info.inputer && (
        tempRealDivList.info.matcher.value = {},tempRealDivList.react?.(),tempRealDivList.notify(true)
    );}
    document.addEventListener('click',e=>RealNode.afterNow(()=>tempReact(e.target)));
    document.addEventListener('keyup',e=>{
        var REList = RealElement.searchByElement(document.activeElement?.parentElement?.parentElement),temp;
        while(temp = REList.pop()) if(temp && temp.self.classList.contains('realDivSearch')) break;
        if(!temp) return;
        (1 === e.key.length || 'Backspace' === e.key || 'Delete' === e.key) && temp.info.inputer.dispatchEvent(new Event('change',changeConfig));
    });
    RealElement.addEventListenerBySelectors('.realDivSearch>:nth-child(2)>div>div','click',e=>{
        var REList = RealElement.searchByElement(e.target.parentElement.parentElement.parentElement),temp;
        while(temp = REList.pop()) if(temp && temp.self.classList.contains('realDivSearch')) break;
        if(!temp) return;
        temp.info.inputer.value = temp.info.matcher.value[0];
        tempRealDivList = temp;
        tempRealDivList.react?.(),tempRealDivList.notify(true);
        // (tempRealDivList = temp).info.inputer.dispatchEvent(new Event('change',changeConfig));
    });
    RealElement.addEventListenerBySelectors('.realDivSearch>:nth-child(1)>textarea','change',e=>{
        var REList = RealElement.searchByElement(e.target.parentElement.parentElement),temp;
        while(temp = REList.pop()) if(temp && temp.self.classList.contains('realDivSearch')) break;
        if(!temp) return;
        const testReg = new RegExp(temp.info.inputer.value,'i');
        temp.info.matcher.value = RealNode.arrayToObject(temp.info.wordList.filter(str=>testReg.test(String(str))));
    });
    RealElement.addEventListenerBySelectors('.realDivSearch>:nth-child(1)>textarea','click',e=>{
        e.target.dispatchEvent(new Event('change',changeConfig));
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
 * @param {String} [placeholder] 
 */
function createRealDivSearch(placeholder){return RealDivList.createByClassName('realDivSearch',placeholder);}
const RealStory = new class RealStory{
    /**@type {RealStory[]} */
    static pages = [];
    static isClearing = false;
    static intervalId = setInterval(
        ()=>RealStory.isClearing || RealStory.pages[0].
        clear(RealStory.isClearing = true).then(()=>RealStory.isClearing = false),50
    );
    newPage(){return new RealStory(this);}
    then(fn){'function' === typeof fn && this.fnList.push(fn);}
    async clear(){
        var i = 0,temp = this;
        while(RealStory !== temp) temp = temp.ofStory,i++;
        while(this.pages.length || this.fnList.length){
            try{await this.fnList.shift()?.();}catch(e){console.error('Depth of the fn : '+i);console.error(e);}
            try{await this.pages.shift()?.clear?.();}catch(e){console.error('Depth of the page : '+i);console.error(e);}
        }
    }
    /**@type {RealStory[]} */
    pages = [];
    /**@type {(()=>*)[]} */
    fnList = [];
    constructor(ofStory){(this.ofStory = ofStory instanceof RealStory ? ofStory : RealStory).pages.push(this);}
}();
const RealPromise = (()=>{
    /**
     * 
     * @returns {false | Promise<true>}
     */
    const RealPromise = ()=>'function' !== typeof RealPromise.resolve &&
    new Promise(value=>Reflect.defineProperty(RealPromise,'resolve',{value})).
    then(()=>Reflect.defineProperty(RealPromise,'resolve',{value: undefined}));
    Reflect.defineProperty(RealPromise,'resolve',{configurable: true,writable: false});
    return RealPromise;
})();
Object.assign(exports,{
    RealWorld,RealNode,RealElement,RealCanvas,RealLoader,RealDivList,RealImgList,RealSelect,RealComtag,RealGroup,
    createRealDivSelect,createRealDivSearch,RealPromise,
    RealStory,
});
