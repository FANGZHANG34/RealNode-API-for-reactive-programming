"use strict";

const fs = require('fs');
try{var uglifyJS = require('./uglify-js');}catch{}
try{var uglifyJS = require('uglify-js');}catch{}
if(!uglifyJS) throw new Error('Require package "uglify-js" !!!');

const indexJS = fs.readFileSync('./index.js','utf-8');
minifyIndexJS('cjs');
minifyIndexJS('esm');
minifyIndexJS('usr');
fs.writeFile('./_type.js',indexJS.replace(/\/\/ export default[\n\r]+\(/,'var').replace(/\);[\n\r]+var[\n\r]+([\n\r]|.)+$/,';'),prevent);

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
		replace('// Object.assign(globalThis,EXPORTS);','Object.assign(globalThis,EXPORTS);');break;
	}
	const temp = uglifyJS.minify(targetCode,{sourceMap: {url: './real-node-'+mode+'.min.js.map',includeSources: true},keep_fnames: true});
	fs.writeFile('./real-node-'+mode+'.min.js',(user ?
`"use strict";
// ==UserScript==
// @name			real-node
// @namespace		http://tampermonkey.net/
// @version			2024-12-14
// @description		Try to take over the world after watching the end of this script!
// @author			FANGZHANG34
// @match			https://*/*
// @grant			none
// ==/UserScript==
`+temp.code.replace(/[\n\r].+$/,'') : temp.code)+'\n',prevent);
	user || fs.writeFile('./real-node-'+mode+'.min.js.map',temp.map,prevent);
	console.log(mode+'=>'+(temp.code.length / targetCode.length).toFixed(4));
}