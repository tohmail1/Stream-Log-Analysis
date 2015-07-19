
/////////////////////////////////////////////////
///////////////////// Model /////////////////////
/////////////////////////////////////////////////


function Node(nodename, nodeValue) {

	this.childNode = [];

    this.valueDistribution = [];
    this.currentMaxValueDistributionNodeValue = 0;
    this.currentValueModeArray = [];
    this.currentValueDistributionModeArray = [];
    this.currentNumberOfValueDistributionNode = 0

    this.nameDistribution = [];
    this.currentMaxNameDistributionNodeValue = 0;
    this.currentNameModeArray = [];
    this.currentNameDistributionModeArray = [];
    this.currentNumberOfNameDistributionNode = 0

    
	this.name = nodename;
	this.value = nodeValue;
	this.count = 0;
	this.currentMaxChildNodeValue = 0;
    

	
	this.currentMedian = 0;
	this.currentMean = 0;
	this.currentSum = 0;
	this.currentNumberOfChildNode = 0;
    
	this.hasOwn = Object.prototype.hasOwnProperty;


    // map function will store output to this tree structure.
    // everytime they insert new node, reduce function will transpost and calculate hierarchical on the fly

	this.insertChildNode = function(nodename, nodeValue){
		var nodeToInsert = new Node(nodename, nodeValue);
		

		/////////////// sorted childnode for median ///////////////

		var idx = 0;
		if (this.childNode.length > 0) {
			idx = findInsertionPoint(this.childNode, nodeValue);
			this.childNode.splice(idx, 0, nodeToInsert);
			//console.log('childNode.length > 0 ', idx);
		}else{
			this.childNode.push(nodeToInsert);
			idx = this.childNode.length - 1;
			//console.log('this.childNode.length == 0 ', idx);
		}
		
        this.currentNumberOfChildNode++;
		

		//////////////// reduce for median ////////////

		if(this.childNode.length < 2) {
			
			this.currentMedian = this.childNode[this.childNode.length-1].value;
		}else{
			var middle = this.childNode.length/2;

			//console.log('childNode.length', childNode.length);
    		
			if (this.childNode.length%2 == 1) {
				//// odd length
				//console.log('middle', middle);
    			this.currentMedian = this.childNode[middle-0.5].value;
        	
    		} else {
    			//// even length
    			this.currentMedian = (this.childNode[middle-1].value + this.childNode[middle].value) / 2;
        	
    		}
		}


        /////////////// mapreduce distribution for value mode ///////////////

        //console.log('nodeValue.toString()', nodeValue.toString());

        var valueDistributionNodeToInsert = new Node(nodeValue.toString(), 1); //transpost matrix
        var valueDistributionIdx = 0;

        if (this.valueDistribution.length > 0) {
            var existingValueDistributionNode = this.getValueDistributionNodeByName(nodeValue.toString());

            if (!existingValueDistributionNode) {
                // if their is no the value exist, insert the new one to paticular order
                valueDistributionNodeToInsert.childNode = [nodeToInsert];

                valueDistributionIdx = findInsertionPoint(this.valueDistribution, nodeValue.toString());
                this.valueDistribution.splice(valueDistributionIdx, 0, valueDistributionNodeToInsert);
                //console.log('distributionIdx', distributionIdx);

                if (valueDistributionNodeToInsert.value > this.currentMaxValueDistributionNodeValue) {
                    // if the value is higher than before, replace it to mode array
                    this.currentMaxValueDistributionNodeValue = valueDistributionNodeToInsert.value;
                    this.currentValueDistributionModeArray = [valueDistributionNodeToInsert];
                    this.currentValueModeArray = [nodeToInsert];
                    //console.log('new distribution and be currentMaxDistributionNodeValue', nodeToInsert.name);

                }else if (valueDistributionNodeToInsert.value == this.currentMaxValueDistributionNodeValue) {
                    // if this value is equal to the highest, insert it to mode array to keep them both
                    this.currentValueDistributionModeArray.push(valueDistributionNodeToInsert);
                    this.currentValueModeArray.push(nodeToInsert);
                    //console.log('new distribution and equal to currentMaxDistributionNodeValue', nodeToInsert.name);
                }
            }else{
                // if their is the value exist, increase their counting
                ++existingValueDistributionNode.value;

                ////// their are no dyno collect in each distribution //////
                existingValueDistributionNode.childNode.push(nodeToInsert);

                if (existingValueDistributionNode.value > this.currentMaxValueDistributionNodeValue) {
                    this.currentMaxValueDistributionNodeValue = existingValueDistributionNode.value;
                    this.currentValueDistributionModeArray = [existingValueDistributionNode];
                    this.currentValueModeArray = [nodeToInsert];
                    //console.log('have existingDistributionNode and be currentMaxDistributionNodeValue', nodeToInsert.name);

                }else if (existingValueDistributionNode.value == this.currentMaxValueDistributionNodeValue) {
                    //console.log('have existingDistributionNode and equal to currentMaxDistributionNodeValue', nodeToInsert.name);
                    this.currentValueDistributionModeArray.push(existingValueDistributionNode);
                    this.currentValueModeArray.push(nodeToInsert);
                    
                }
            }
            
            //console.log('childNode.length > 0 ', idx);
        }else{
            //console.log('first distribution: ', nodeToInsert.name);
            valueDistributionNodeToInsert.childNode = [nodeToInsert];
            this.valueDistribution.push(valueDistributionNodeToInsert);
            this.currentValueDistributionModeArray = [valueDistributionNodeToInsert];
            this.currentValueModeArray.push(nodeToInsert);
            this.currentMaxValueDistributionNodeValue = 1;
            
            
            
        }


        
        this.currentNumberOfValueDistributionNode++;


        /////////////// mapreduce distribution for name mode ///////////////

        //console.log('nodeValue.toString()', nodeValue.toString());

        var nameDistributionNodeToInsert = new Node(nodename.toString(), 1); //transpost matrix
        var nameDistributionIdx = 0;

        if (this.nameDistribution.length > 0) {
            var existingNameDistributionNode = this.getNameDistributionNodeByName(nodename.toString());

            if (!existingNameDistributionNode) {
                // if their is no the value exist, insert the new one to paticular order
                nameDistributionNodeToInsert.childNode = [nodeToInsert];

                nameDistributionIdx = findInsertionPoint(this.nameDistribution, nodename.toString());
                this.nameDistribution.splice(nameDistributionIdx, 0, nameDistributionNodeToInsert);
                //console.log('distributionIdx', distributionIdx);

                if (nameDistributionNodeToInsert.value > this.currentMaxNameDistributionNodeValue) {
                    // if the value is higher than before, replace it to mode array
                    this.currentMaxNameDistributionNodeValue = nameDistributionNodeToInsert.value;
                    this.currentNameistributionModeArray = [nameDistributionNodeToInsert];
                    this.currentNameModeArray = [nodeToInsert];
                    //console.log('new distribution and be currentMaxDistributionNodeValue', nodeToInsert.name);

                }else if (nameDistributionNodeToInsert.value == this.currentMaxNameDistributionNodeValue) {
                    // if this value is equal to the highest, insert it to mode array to keep them both
                    this.currentNameDistributionModeArray.push(nameDistributionNodeToInsert);
                    this.currentNameModeArray.push(nodeToInsert);
                    //console.log('new distribution and equal to currentMaxDistributionNodeValue', nodeToInsert.name);
                }
            }else{
                // if their is the value exist, increase their counting
                ++existingNameDistributionNode.value;

                ////// their are no dyno collect in each distribution //////
                existingNameDistributionNode.childNode.push(nodeToInsert);

                if (existingNameDistributionNode.value > this.currentMaxNameDistributionNodeValue) {
                    this.currentMaxNameDistributionNodeValue = existingNameDistributionNode.value;
                    this.currentNameistributionModeArray = [existingNameDistributionNode];
                    this.currentNameModeArray = [nodeToInsert];
                    //console.log('have existingDistributionNode and be currentMaxDistributionNodeValue', nodeToInsert.name);

                }else if (existingNameDistributionNode.value == this.currentMaxNameDistributionNodeValue) {
                    //console.log('have existingDistributionNode and equal to currentMaxDistributionNodeValue', nodeToInsert.name);
                    this.currentNameDistributionModeArray.push(existingNameDistributionNode);
                    this.currentNameModeArray.push(nodeToInsert);
                    
                }
            }
            
            //console.log('childNode.length > 0 ', idx);
        }else{
            //console.log('first distribution: ', nodeToInsert.name);
            nameDistributionNodeToInsert.childNode = [nodeToInsert];
            this.nameDistribution.push(nameDistributionNodeToInsert);
            this.currentNameDistributionModeArray = [nameDistributionNodeToInsert];
            this.currentNameModeArray.push(nodeToInsert);
            this.currentMaxNameDistributionNodeValue = 1;
            
            
            
        }


        
        this.currentNumberOfNameDistributionNode++;



    	//////////////// mean calculate on the fly //////////////

    	this.currentSum += nodeValue;
    	this.currentMean = this.currentSum / this.currentNumberOfChildNode;
    	
        // for testing
    	return nodeToInsert;
    	
	}

	this.getChildNodeByName = function(name){
		//console.log('getChildNode', this[name]);
		if (this.childNode.length > 0) {
			
			var idx = this.childNode.reduce( function( cur, val, index ){

    			if( val.name === name && cur === -1 ) {
        			return index;
    			}
    			return cur;

			}, -1 );

			return this.childNode[idx];

		}else{
			return null;
		}
	}

    this.getValueDistributionNodeByName = function(name){
        //console.log('getChildNode', this[name]);
        if (this.valueDistribution.length > 0) {
            //return this.childNode[this[name]];
            var idx = this.valueDistribution.reduce( function( cur, val, index ){

                if( val.name === name && cur === -1 ) {
                    return index;
                }
                return cur;

            }, -1 );
            //console.log('getDistributionNodeByName idx: ', idx);
            if (idx === -1) {
                return null;
            };
            return this.valueDistribution[idx];

        }else{
            return null;
        }
    }

    this.getNameDistributionNodeByName = function(name){
        //console.log('getChildNode', this[name]);
        if (this.nameDistribution.length > 0) {
            //return this.childNode[this[name]];
            var idx = this.nameDistribution.reduce( function( cur, val, index ){

                if( val.name === name && cur === -1 ) {
                    return index;
                }
                return cur;

            }, -1 );
            //console.log('getDistributionNodeByName idx: ', idx);
            if (idx === -1) {
                return null;
            };
            return this.nameDistribution[idx];

        }else{
            return null;
        }
    }

    
};


// find correct array insert index to maintain sorting

function findInsertionPoint(sortedArr, val) {
	//console.log(sortedArr.length);
   var low = 0, high = sortedArr.length;
   var mid = -1, c = 0;

   while(low < high)   {
      mid = parseInt((low + high)/2);

      if(sortedArr[mid].value){
      	c = numComparator(sortedArr[mid].value, val);

      	if(c < 0)   {
         	low = mid + 1;

      	}else if(c > 0) {
         	high = mid;

      	}else {
         	return mid;
      	}
      }else{
      	//console.log("node did not have value!!: "+sortedArr[mid].value+' mid: '+mid);
      	//alert("node did not have value!!");
      	return low;
      }
      
      //alert("mid=" + mid + ", c=" + c + ", low=" + low + ", high=" + high);
   }
   return low;
}

function numComparator(val1, val2)  {
   
   return val1 - val2;
}


////////////////////////////////////////////////////
///////////////////// Controller ///////////////////
////////////////////////////////////////////////////

var interestedEndpoint = ['count_pending_messages', 'get_messages', 'get_friends_progress', 'get_friends_score'];
var interestedMethod = ['GET', 'POST'];



// start here
// simulate stream
// filter particular line in the endpoint list

function doFilter(filename){

	var fs = require('fs')
    , util = require('util')
    , stream = require('stream')
    , es = require("event-stream")
    , logfmt = require('logfmt')
    , path = require('path');

	var lineNr = 1;
	
	var logNode = new Node(filename, 0);


	s = fs.createReadStream(filename)
    	.pipe(es.split())
    	.pipe(es.mapSync(function(line){
    		//console.log(lineNr);
        	// pause the readstream
        	//s.pause();

        	lineNr += 1;

        	(function(){

            	// process line here and call s.resume() when rdy
            	
            	var lineJSON = logfmt.parse(line);
            	var lastPath = path.basename(lineJSON.path);
            
            	if (interestedEndpoint.indexOf(lastPath) > -1) {
    				// User with endpoint
    				//console.log('in interestedEndpoint store: ' + lineJSON.method +':' + lastPath);
            		doMap(logNode, lineJSON.method, lastPath, lineJSON.connect, lineJSON.service, lineJSON.dyno, lineNr);

				} else {
    				// User without endpoint
    				var cur = {};
    				var pathArray = lineJSON.path.split("/");
    				if((pathArray[1]=='api') && (pathArray[2]=='users') && (pathArray.length == 4)){
    					//console.log('not in interestedEndpoint store: ' + lineJSON.method +':' + lastPath);
    					doMap(logNode, lineJSON.method, '/api/user/', lineJSON.connect, lineJSON.service, lineJSON.dyno, lineNr);
    				}
				}

            	// resume the readstream
            	//s.resume();

        	})();
    	})
    	.on('error', function(){
        	console.log('Error while reading file.');
    	})
    	.on('end', function(){
    		console.log('\n-------------------Begin----------------\n');
    		doView(logNode);
            console.log('\n-------------------End----------------\n');
    		//console.log(logNode);
    	})
	);
	return logNode; 
}


// map the filter data to tree structure

function doMap(node, method, path, connect, service, dyno, lineNr) {
	//console.log('storage', method);
	var responseTime = parseInt(connect) + parseInt(service);
	var methodNode = node.getChildNodeByName(method);
	var pathNode;
	var dynoNode;
	if(methodNode){
		
		pathNode = methodNode.getChildNodeByName(path);

		if (pathNode) {
			pathNode.insertChildNode(dyno, responseTime);

		}else{
			pathNode = methodNode.insertChildNode(path, responseTime);
			pathNode.insertChildNode(dyno, responseTime);
		}
	}else{
		methodNode = node.insertChildNode(method, 0);
		pathNode = methodNode.insertChildNode(path, responseTime);
		pathNode.insertChildNode(dyno, responseTime);
	}

	return node;
}



//////////////////////////////////////////////
///////////////////// View ///////////////////
//////////////////////////////////////////////

// reduce again for display

function doView(node) {

	interestedMethod.forEach(function(method){
		var methodNode = node.getChildNodeByName(method);
		if(methodNode){
			interestedEndpoint.forEach(function(path){
				var pathNode = methodNode.getChildNodeByName(path);
				if (pathNode) {
                    
					var dyno = pathNode.currentNameModeArray.map(function(node) {
                        return node.name;
                    });
                    

                    

                    var mode = pathNode.currentValueModeArray.map(function(node) {
                        return node.value;
                    });

					console.log(methodNode.name + ':' + pathNode.name);
					console.log('called:' + pathNode.currentNumberOfChildNode + ' response_time [mean:' + pathNode.currentMean.toFixed(2) + ' median:' + pathNode.currentMedian + ' mode:' + mode + '] most_dyno:' + dyno);
					console.log('');
				};
			});

			var pathNode = methodNode.getChildNodeByName('/api/user/');
            
			if (pathNode) {
                //console.log('currentDistributionModeArray', pathNode.currentValueDistributionModeArray);
				var dyno = pathNode.currentNameModeArray.map(function(node) {
                        return node.name;
                    });

                var mode = pathNode.currentValueModeArray.map(function(node) {
                        return node.value;
                    });

				console.log(methodNode.name + ':' + pathNode.name);
				console.log('called:' + pathNode.currentNumberOfChildNode + ' response_time [mean:' + pathNode.currentMean.toFixed(2) + ' median:' + pathNode.currentMedian + ' mode:' + mode + '] most_dyno:' + dyno);
				console.log('');
			}else{
                console.log(methodNode.name + ':' + '/api/user/' + ' had never called.\n');
            }
		}
	});
}
	

///////////// for unit/integration test

exports.node = Node;
exports.findInsertionPoint = findInsertionPoint;
exports.doFilter = doFilter;
exports.doMap = doMap;

