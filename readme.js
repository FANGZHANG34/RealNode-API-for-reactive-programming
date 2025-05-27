/**@type {{}} */
var exports;

addEventListener('click',function tempFn(){
	removeEventListener('click',tempFn);
	const exports = {
		RealWorld,RealNode,RealGroup,RealTarget,
		RealStory,RealPromise,
		RealElement,RealCanvas,RealLoader,RealSelect,
		RealComtag,RealSVG,
		RealDivList,RealImgList,RealDivQueue,
		createRealDivSelect,createRealDivSearch,createRealDivSeries,
	};
	const keyOutput = Reflect.ownKeys(exports).map(String);
	const startStr = '## **',sepStr = '\n\n';
	const banTargrtKeys = Reflect.ownKeys(function(){}).concat(['proto']);
	const banProtoKeys = Reflect.ownKeys((function(){}).prototype);
	function filterTargrtKeys(key){return banTargrtKeys.indexOf(key) === -1;}
	function filterProtoKeys(key){return banProtoKeys.indexOf(key) === -1;}
	const propArray = [2,3,4,5,6,7].map(v=>'### **'+(v>>1)+'级'+(v%2 ? '' : '只读')+'属性**');
	const methodArray = ['一','二','三'].map(v=>'### **'+v+'级方法**');
	const result = keyOutput.map(v=>`- [**\`${v}\`**](#${v})`);
	for(const key of keyOutput){
		const temp = [startStr+key+'**',''];
		if(key.startsWith('Real')){
			let targrt,proto,targrtKeys,protoKeys,tempPropArray = [],tempMethodArray = [];
			const keyType = typeof (targrt = exports[key]);
			switch(keyType){
				case 'function': {
					temp.push('### **构造函数** ``');
					proto = targrt.prototype;
					protoKeys = Reflect.ownKeys(proto).filter(filterProtoKeys);
					break;
				}
				case 'object': {
					proto = targrt ? Reflect.getPrototypeOf(targrt) : null;
					protoKeys = proto ? Reflect.ownKeys(proto).filter(filterProtoKeys) : [];
					break;
				}
			}
			targrtKeys = Reflect.ownKeys(targrt).filter(filterTargrtKeys);
			temp.push(...propArray,...methodArray);
			switch(keyType){
				case 'function': {
					for(const key of protoKeys) try{
						typeof proto[key] === 'function' ?
						tempMethodArray.push('- `'+String(key)+'()` 实例方法，返回``','\t') :
						tempPropArray.push('- `'+String(key)+'` 实例属性','\t');
					}catch{
						tempPropArray.push('- `'+String(key)+'` 实例属性','\t');
					}
					for(const key of targrtKeys) try{
						typeof targrt[key] === 'function' ?
						tempMethodArray.push('- `'+String(key)+'()` 静态方法，返回``','\t') :
						tempPropArray.push('- `'+String(key)+'` 静态属性','\t');
					}catch{
						tempPropArray.push('- `'+String(key)+'` 静态属性','\t');
					}
					break;
				}
				case 'object': {
					for(const key of protoKeys) try{
						typeof proto[key] === 'function' ?
						tempMethodArray.push('- `'+String(key)+'()` 方法，返回``','\t') :
						tempPropArray.push('- `'+String(key)+'` 属性','\t');
					}catch{
						tempPropArray.push('- `'+String(key)+'` 属性','\t');
					}
					for(const key of targrtKeys) try{
						typeof targrt[key] === 'function' ?
						tempMethodArray.push('- `'+String(key)+'()` 方法，返回``','\t') :
						tempPropArray.push('- `'+String(key)+'` 属性','\t');
					}catch{
						tempPropArray.push('- `'+String(key)+'` 属性','\t');
					}
					break;
				}
			}
			temp.push(...tempPropArray,...tempMethodArray);
		}else if(typeof exports[key] === 'function') temp.push('``');
		result.push(temp.join(sepStr));
	}
	new RealLoader(true,'tempREADME.md',()=>result.join(sepStr)).load().then(result=>result[0] && console.error(result[0]));
});
