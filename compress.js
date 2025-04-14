"use strict";

const fs = require('fs');
uglifyJS = require('./uglify-js');
try{var uglifyJS = require('uglify-js');}catch{}

// const targetJS = fs.readFileSync('./real-node-cjs.min.js','utf-8');
// /**
//  * 
//  * @param  {...String} codes 
//  */
// function compareCode(...codes){
// 	var i = 0,j = 0;
// 	codes.splice(2);
// 	if(codes[0].length < codes[1].length) codes.reverse();
// 	const code0 = codes[0],code1 = codes[1],temp = [];
// 	console.log(code0.length - code1.length);
// 	while(code0[i]) code0[i] === code1[j] ? (i++,j++) : temp.push(code0[i++]);
// 	return temp.join('');
// }
const indexJS = fs.readFileSync('./index.js','utf-8').
replace('exports = Object.assign(exports,','Object.assign(exports,');
function prevent(){}
/**
 * 
 * @param {keyof{cjs;esm;usr;user;}} mode 
 */
function minifyIndexJS(mode){
	mode = String(mode);
	var targetCode,user;
	switch(mode){
		default: targetCode = indexJS;break;
		case 'esm': targetCode = indexJS.replace('// export default','export default');break;
		case 'usr':case 'user': user = true,targetCode = indexJS.
		replace('// Object.assign(globalThis,exports);','Object.assign(globalThis,exports);');break;
	}
	const temp = uglifyJS.minify(targetCode,{sourceMap: {url: './real-node-'+mode+'.min.js.map',includeSources: true}});
	fs.writeFile('./real-node-'+mode+'.min.js',user ? 
`"use strict";
// ==UserScript==
// @name			real-node
// @namespace		http://tampermonkey.net/
// @version			2024-12-14
// @description		Try to take over the world after watching the end of this script!
// @author			FANGZHANG34
// @match			https://*/*
// @icon			https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant			none
// ==/UserScript==
`.concat(temp.code.replace(/[\n\r].+$/,'')) : temp.code,prevent);
	fs.writeFile('./real-node-'+mode+'.min.js.map',temp.map,prevent);
}
minifyIndexJS('cjs');
minifyIndexJS('esm');
minifyIndexJS('usr');