var analysis = require('./analysis.js');

/*
///////// test findInsertionPoint //////

var sortedArr = [{value:1},{value:3}];
var val = 4;

var index = analysis.findInsertionPoint(sortedArr, val);
console.log(index);
*/


/*
///////// test node  ///////
var myNode = Object.create(analysis.node);
myNode.insertChildNode('test', 1);
myNode.insertChildNode('test', 2);
myNode.insertChildNode('test', 3);
myNode.insertChildNode('test', 5);
console.log(myNode);
*/

/*
///////// test node  ///////
var myNode2 = Object.create(analysis.node);
myNode2.insertChildNode('test', 1);
myNode2.insertChildNode('test', 2);
//myNode2.insertChildNode('test', 3);
//myNode2.insertChildNode('test', 5);
console.log(myNode2);
*/

/*
///////// test getchildnode  ///////
var myNode2 = Object.create(analysis.node);
myNode2.insertChildNode('a', 1);
myNode2.insertChildNode('b', 2);
myNode2.insertChildNode('c', 3);
myNode2.insertChildNode('d', 5);
console.log(myNode2.getChildNode('d'));
*/

/*
///////// test storage  ///////
var myNode2 = new analysis.node('root', 0);
analysis.storage(myNode2, 'method1', 'path1', 1, 2, 'dyno1', 1)
analysis.storage(myNode2, 'method1', 'path1', 2, 2, 'dyno2', 1)

console.log('test storage', myNode2.getChildNode('method1').getChildNode('path1'));
*/


/*
///////// test mode reduce  ///////
var myNode2 = new analysis.node('root', 0);
analysis.storage(myNode2, 'method1', 'path1', 2, 2, 'dyno1', 1);
//analysis.storage(myNode2, 'method1', 'path2', 1, 2, 'dyno2', 1);
//analysis.storage(myNode2, 'method1', 'path3', 1, 2, 'dyno3', 1);


console.log('test storage', myNode2.distribution);
*/

/*
///////// test mode reduce  ///////
var myNode2 = new analysis.node('root', 0);
myNode2.insertChildNode('a', 2);
myNode2.insertChildNode('b', 1);
myNode2.insertChildNode('c', 2);
//myNode2.insertChildNode('d', 5);
console.log(myNode2.distribution);
*/



///////// test parsing  ///////

analysis.doFilter('sample test.log')

//console.log(analysis.parsing());






