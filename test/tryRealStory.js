"use strict";

const {RealWorld,RealNode,RealElement,RealGroup,RealStory,RealPromise} = require('../');
require('./countRows.js');
RealStory.newPagePromise().then(page=>page[0].then(()=>console.log(new RealElement({self:{}}))));
RealStory.then(()=>console.log(new RealElement({self:{}})+'')).newPage().then(()=>process.exit(0));
