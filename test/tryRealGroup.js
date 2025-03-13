"use strict";
var nodeRequire = require;
const getPath = (()=>{
	const path = nodeRequire('path');
	return path.resolve.bind(path,__dirname);
})();
nodeRequire(getPath('./countRows.js'));
const {RealWorld,RealNode,RealElement,RealGroup,RealStory,RealPromise} = nodeRequire(getPath('../'));
const process = nodeRequire('process');

console.log('\n','====== test1 ======'); // 测试1
var group = new RealGroup();
console.log('\n',group);

console.log('\n','====== test2 ======'); // 测试2
var proxy = group.proxy;
console.log('\n',proxy);
console.log('\n',proxy());

console.log('\n','====== test3 ======'); // 测试3
group.addListener(()=>console.log('\n','something changes !'));
group.set({a: 1});
proxy.b = 2;
console.log('\n',group.get());
console.log('\n',group.get('a'),proxy.a);
console.log('\n',group.get({a: 0}));

console.log('\n','====== test4 ======'); // 测试4
group.addListener(()=>console.log('\n','"a" changes !'),'a');
group.addListener(()=>console.log('\n','"b" changes !'),(keyArray)=>keyArray.includes('b'));
group.set({a: 3,b: 4});
group.value = {a: 1,b: 2};

console.log('\n','====== test5 ======'); // 测试5
group.set(Array(3));
console.log('\n',group.getByFilter(isNaN));

process.exit(0);