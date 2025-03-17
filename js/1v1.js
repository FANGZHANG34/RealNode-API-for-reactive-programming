"use strict";

const mode = -1;
switch(mode){
	/**
	 * 原生JS 31行
	 * RealStory
	 * RealElement
	 * RealDivList
	 */
	default: RealElement.defaultInit().then(()=>RealNode.time((()=>{
		const temp = RealStory.newPage().newPromiseObj();

		const mainEle = new RealDivList('mainEle',false,[0,0,'pending...']);
		RealElement.applyKeyboardController(mainEle);
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
		const [boy,girl,teacher] = mainEle.self.children,competition = [0,0];
		const intervalID = setInterval(()=>{Math.max(...competition) < 256 ?
			Math.random() > Math.random() ? boy.textContent = ++competition[0] : girl.textContent = ++competition[1] : (
				clearInterval(intervalID),teacher.textContent = (competition.indexOf(256) ? 'Mary' : 'Mike')+' wins!!!',
				temp.resolve('\t=>'+(competition.indexOf(256) ? 'Mary' : 'Mike')+' : +'+Math.abs(competition[0] - competition[1]))
			)
		},4);

		return temp.self;
	})()).then(result=>console.log(result.value,'in ',result.time,'ms')));break;
	/**
	 * 使用RealGroup 37行
	 * RealStory
	 * RealGroup
	 * RealElement
	 * RealDivList
	 */
	case 0: RealElement.defaultInit().then(()=>RealNode.time((()=>{
		const temp = RealStory.newPage().newPromiseObj();

		const mainEle = new RealDivList('mainEle',false,[0,0,'pending...']);
		RealElement.applyKeyboardController(mainEle);
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
		const [boy,girl,teacher] = mainEle.self.children;
		const competition = new RealGroup({self: [0,0]});
		const tempFn = ()=>Math.random() > Math.random() ? boy.textContent = ++competition.proxy[0] : girl.textContent = ++competition.proxy[1];
		competition.addSetterListener(null,function(){
			const queue = competition.proxy[0] > competition.proxy[1] ?
			[boy,girl,competition.proxy[0],competition.proxy[1]] : [girl,boy,competition.proxy[1],competition.proxy[0]];
			queue[2] < 256 ? RealGroup.afterNow(tempFn) : (
				temp.resolve('\t=>'+(queue[0] === boy ? 'Mike' : 'Mary')+' : +'+(queue[2] - queue[3])),
				teacher.textContent = (queue[0] === boy ? 'Mike' : 'Mary')+' wins!!!'
			);
		});
		competition.react();

		return temp.self;
	})()).then(result=>console.log(result.value,'in ',result.time,'ms')));break;
	/**
	 * 使用RealNode和RealNode.eventLoop 39行
	 * RealStory
	 * RealNode
	 * RealElement
	 * RealDivList
	 */
	case 1: RealElement.defaultInit().then(()=>RealNode.time((()=>{
		const temp = RealStory.newPage().newPromiseObj();

		const
		teacher = new RealNode({id: 'Ms. White',value: 'pending...'}),
		boy = new RealNode({id: 'Mike',value: 0}),
		girl = new RealNode({id: 'Mary',value: 0})
		;
		const mainEle = new RealDivList('mainEle',false,[boy,girl,teacher],true);
		const competition = RealNode.eventLoop;
		competition.intervalFn = ()=>Math.random() > Math.random() ? boy.value++ : girl.value++;
		competition.ifFn = ()=>boy >= 256 || girl >= 256;
		competition.soFn = ()=>{
			competition.intervalFn = null;
			boy >= 256 ?
			(temp.resolve('\t=>'+boy+' : +'+(boy - girl)),teacher.value = boy.id.description+' wins!!!') :
			(temp.resolve('\t=>'+girl+' : +'+(girl - boy)),teacher.value = girl.id.description+' wins!!!');
		};
		RealElement.applyKeyboardController(mainEle);
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
	})()).then(result=>console.log(result.value,'in ',result.time,'ms')));break;
	/**
	 * 使用RealNode 42行
	 * RealStory
	 * RealNode
	 * RealElement
	 * RealDivList
	 */
	case 2: RealElement.defaultInit().then(()=>RealNode.time((()=>{
		const temp = RealStory.newPage().newPromiseObj();

		const
		teacher = new RealNode({id: 'Ms. White'}),
		boy = new RealNode({id: 'Mike',value: 0}),
		girl = new RealNode({id: 'Mary',value: 0})
		;
		girl.relate(teacher);
		boy.relate(teacher);
		const tempFn = ()=>Math.random() > Math.random() ? boy.value++ : girl.value++;
		teacher.react = function(){
			const queue = boy > girl ? [boy,girl] : [girl,boy];
			queue[0] < 256 ? RealNode.afterNow(tempFn) : (
				temp.resolve('\t=>'+queue[0]+' : +'+(queue[0] - queue[1])),
				teacher.protoSet(queue[0].id.description+' wins!!!')
			);
		};
		teacher.value = 'pending...';
	
		const mainEle = new RealDivList('mainEle',false,[boy,girl,teacher],true);
		RealElement.applyKeyboardController(mainEle);
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
	})()).then(result=>console.log(result.value,'in ',result.time,'ms')));break;
	// case 3: RealElement.defaultInit().then(()=>RealNode.time((()=>{
	// 	const temp = RealStory.newPage().newPromiseObj();

	// 	const
	// 	teacher = new RealNode({id: 'Ms. White'}),
	// 	boy = new RealNode({id: 'Mike',value: 0}),
	// 	girl = new RealNode({id: 'Mary',value: 0})
	// 	;
	// 	girl.relate(teacher);
	// 	boy.relate(teacher);
	// 	const tempFn = ()=>Math.random() > Math.random() ? boy.value++ : girl.value++;
	// 	teacher.react = function(){
	// 		const queue = boy > girl ? [boy,girl] : [girl,boy];
	// 		queue[0] < 256 ? RealNode.afterNow(tempFn) : (
	// 			temp.resolve('\t=>'+queue[0]+' : +'+(queue[0] - queue[1])),
	// 			teacher.protoSet(queue[0].id.description+' wins!!!')
	// 		);
	// 	};
	// 	teacher.value = 'pending...';
	
	// 	const mainEle = new RealDivList('mainEle',false,[boy,girl,teacher],true);
	// 	RealElement.applyKeyboardController(mainEle);
	// 	mainEle.applyCSS('',{
	// 		'':{
	// 			'transform':'translate(-50%,0)',
	// 			'left':'50vw',
	// 			'color':'#fff',
	// 			'width':'40vw',
	// 			'font-size':'5vw',
	// 		},
	// 		' *':{
	// 			'text-align':'center',
	// 			'align-items':'center',
	// 			'align-content':'center',
	// 			'vertical-align':'middle',
	// 			'justify-content': 'center',
	// 		}
	// 	});
	// 	document.body.appendChild(mainEle.self);

	// 	return temp.self;
	// })()).then(result=>console.log(result.value,'in ',result.time,'ms')));break;
}
