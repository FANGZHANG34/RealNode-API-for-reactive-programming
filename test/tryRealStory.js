"use strict";
import process from "process";
try{
	const temp = ({default: exports})=>exports;
	var require = require ?? (path=>import(String(path)).then(temp));
}catch(e){console.error(e);}
const {RealWorld,RealNode,RealElement,RealGroup,RealStory} = await require('../index.js');

RealStory.newPrivatePage(async page=>console.log(await page.then(()=>new RealElement({self:{}}))));
RealNode.time((()=>{
	const temp = RealStory.newPage().newPromiseObj();
	var
	teacher = new RealNode({id: 'Ms. White'}),
	boy = new RealNode({id: 'Mike',value: 0}),
	girl = new RealNode({id: 'Mary',value: 0})
	;
	boy.relate(girl.relate(teacher));
	const tempFn = ()=>Math.random() > Math.random() ? boy.value++ : girl.value++;
	teacher.react = function(){
		const queue = boy > girl ? [boy,girl] : [girl,boy];
		queue[0] < 512 ? tempFn() : temp.resolve('\t=>'+queue[0]+' : '+(queue[0] - queue[1]),teacher.value = queue[0].id.description+' wins!!!');
	};
	teacher.value = 'pending...';
	return temp.promise;
})()).then(result=>console.log(result.value,'in +',result.time,'ms'));
RealStory.then(()=>console.log(new RealElement({self:{}})+'')).newPage().then(async()=>console.log(await RealNode.afterNow(()=>'成功承诺化')))
.then(()=>process.exit(0));
