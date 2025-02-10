"use strict";

RealElement.defaultInit().then(()=>RealNode.time((()=>{
	const temp = RealStory.newPage().newPromiseObj();
	var
	teacher = new RealNode({id: 'Ms. White'}),
	boy = new RealNode({id: 'Mike',value: 0}),
	girl = new RealNode({id: 'Mary',value: 0})
	;
	globalThis.temp = [boy,girl,teacher];
	boy.relate(girl.relate(teacher));
	const tempFn = ()=>Math.random() > Math.random() ? boy.value++ : girl.value++;
	teacher.react = function(){
		const queue = boy > girl ? [boy,girl] : [girl,boy];
		queue[0] < 512 ? RealNode.afterNow(tempFn) : temp.resolve('\t=>'+queue[0]+' : '+(queue[0] - queue[1]),teacher.value = queue[0].id.description+' wins!!!');
	};
	teacher.value = 'pending...';

	/**@type {RealElement} */
	const mainEle = new RealDivList('mainEle',false,[boy,girl,teacher],true);
	mainEle.applyCSS('',{
		'':{
			'transform':'translate(-50%,0)',
			'left':'50vw',
			'color':'#fff',
			'width':'40vw',
			'font-size':'5vw',
		},
		' *':{
			'text-align':'center',
			'align-items':'center',
			'align-content':'center',
			'vertical-align':'middle',
			'justify-content': 'center',
		}
	});
	document.body.appendChild(mainEle.self);
	return temp.self;
})()).then(result=>console.log(result.value,'in +',result.time,'ms')));