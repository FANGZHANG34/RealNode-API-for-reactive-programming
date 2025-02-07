"use strict";

const {RealWorld,RealNode,RealElement,RealGroup,RealStory,RealPromise} = require('../');
require('./countRows.js');
RealStory.newPagePromise().then(page=>page.thenDo(()=>console.log(new RealElement({self:{}}))));
RealStory.thenDo(()=>console.log(new RealElement({self:{}})+'')).newPage().thenDo(()=>process.exit(0));
