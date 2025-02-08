"use strict";
const getPath = (()=>{
    const path = require('path');
    return path.resolve.bind(path,__dirname);
})();
// require(getPath('./countRows.js'));
const {RealWorld,RealNode,RealElement,RealGroup,RealStory,RealPromise} = require(getPath('../'));
const process = require('process');

RealStory.newPrivatePage(async page=>console.log(await page.then(()=>new RealElement({self:{}}))));
RealNode.time((temp=>{
	var
	teacher = new RealNode({id: 'Ms. White'}),
	boy = new RealNode({id: 'Mike',value: 0},false,teacher),
	girl = new RealNode({id: 'Mary',value: 0},false,teacher)
	;
	teacher.react = ()=>{
		const queue = boy > girl ? [boy,girl] : [girl,boy];
		queue[0] < 1e6 ? Math.random() > Math.random() ? boy.value++ : girl.value++ : temp.resolve(queue[0]+' : '+(queue[0] - queue[1]));
	};
	teacher.react();
	return temp.self;
})(RealStory.newPage().newPromiseObj())).then(result=>console.log('\n',result.value,'in +',result.time,'ms\n'));
RealStory.then(()=>console.log(new RealElement({self:{}})+'')).newPage().then(async()=>console.log(await RealNode.afterNow(()=>'成功承诺化')))
.then(()=>process.exit(0));
