"use strict";
var __dirname;
const fs = require('fs');
const path = require('path');
const getPath = path.resolve.bind(path,__dirname);

['../index.js'].
reduce((s,subPath)=>fs.readFile(getPath(subPath),'utf-8',(e,value)=>{
	const testReg = /^[\s\t]{0,}[/\*]/;
	console.log(
		subPath,e ?? value.split(/\n|\r/).
		reduce((c,str)=>(str && (testReg.test(str) ? c[1]++ : c[0]++),c),[0,0]).
		reduce((s,v,i,arr)=>i === 1 ? [...arr,arr[0] / (arr[0] + arr[1])] : s)
	);
}),0);
