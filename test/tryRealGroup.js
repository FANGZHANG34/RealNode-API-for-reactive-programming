"use strict";
var nodeRequire = require;
const getPath = (()=>{
	const path = nodeRequire('path');
	return path.resolve.bind(path,__dirname);
})();
const {RealWorld,RealNode,RealElement,RealGroup,RealStory} = nodeRequire(getPath('../'));
const process = nodeRequire('process');

const obj = {};
console.log('\n','====== test1 ======'); // 测试1
var group = new RealGroup();
console.log('\n\t',group);
{
	const groupA = new RealGroup({id: 'groupA',self: obj});
	const groupB = new RealGroup({id: 'groupB',self: obj});
	console.log('\n\t',''+groupA,''+groupB,groupA === groupB);
	group = groupA;
}
console.log('\n\t',group);

console.log('\n','====== test2 ======'); // 测试2
var proxy = group.proxy;
console.log('\n\t',proxy,typeof proxy);
console.log('\n\t',proxy(),proxy() === obj);

console.log('\n','====== test3 ======'); // 测试3
group.addSetterListener(null,()=>console.log('\n\t','something changes !'));
group.set({a: 1});
proxy.b = 2;
console.log('\n\t',group.get());
console.log('\n\t',group.get('a'),proxy.a);
console.log('\n\t',group.get({a: 0}));

console.log('\n','====== test4 ======'); // 测试4
group.addSetterListener('a',()=>console.log('\n\t','"a" changes !'));
group.addSetterListener(keyArray=>keyArray.includes('b'),()=>console.log('\n\t','"b" changes !'));
group.set({a: 3,b: 4});
group.value = {a: 1,b: 2};

console.log('\n','====== test5 ======'); // 测试5
group.set(Array(3));
console.log('\n\t',group.getByFilter(isNaN));

process.exit(0);