"use strict";
const getPath = (()=>{
	const path = require('path');
	return path.resolve.bind(path,__dirname);
})();
require(getPath('./countRows.js'));
const {RealWorld,RealNode,RealElement,RealGroup,RealStory,RealPromise} = require(getPath('../'));
const process = require('process');

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
	return temp.self;
})()).then(result=>console.log(result.value,'in +',result.time,'ms'));
RealStory.then(()=>console.log(new RealElement({self:{}})+'')).newPage().then(async()=>console.log(await RealNode.afterNow(()=>'成功承诺化')))
.then(()=>process.exit(0));
