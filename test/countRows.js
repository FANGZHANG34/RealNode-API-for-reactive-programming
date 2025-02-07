const fs = require('fs');
const path = require('path');

['../index.js'].
reduce((s,subPath)=>fs.readFile(path.resolve(__dirname,subPath),'utf-8',(e,value)=>{
	const testReg = /^[\s\t]{0,}[/\*]/;
	console.log(
		subPath,e ?? value.split(/\n|\r/).
		reduce((c,str)=>(str && (testReg.test(str) ? c[1]++ : c[0]++),c),[0,0]).
		reduce((s,v,i,arr)=>i === 1 ? [...arr,arr[0] / (arr[0] + arr[1])] : s)
	);
}),0);
