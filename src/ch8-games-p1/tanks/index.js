import { astar } from './astar';
import { Graph, BinaryHeap } from './graph';

import tiles from './tiles.png';

export function canvasApp(){
    const appElement = document.getElementById('app');
    appElement.innerHTML = 
        `<video autoplay loop controls id="theVideo" width="640" height="480" style="display: none;">
        </video>
        <canvas id="theCanvas" width="690" height="530">
        </canvas>`;

    var theCanvas = document.getElementById('theCanvas');
    var context = theCanvas.getContext('2d');
	
	//set up tile map
	var mapRows=5;
	var mapCols=5;
	
	var tileMap=[
		[0,1,0,0,0]
	,	[0,1,0,0,0]
	,	[0,1,0,0,0]
	,	[0,1,0,0,0]
	,	[0,0,0,0,0]
		
	];
	
	console.log("tileMap.length=" , tileMap.length);
	
	//set up a* graph
	var graph = new Graph(tileMap);
	var startNode={x:0,y:1}; // use values of map turned on side
	var endNode={x:3,y:1};
	
	//create node list
	var start = graph.nodes[startNode.x][startNode.y];
    var end = graph.nodes[endNode.x][endNode.y];
    var result = astar.search(graph.nodes, start, end, false);
	
	//load in tile sheet image
	var tileSheet=new Image();
	tileSheet.addEventListener('load', eventSheetLoaded , false);
	tileSheet.src=tiles;

	function eventSheetLoaded() {
		drawScreen()
	}

	function drawScreen() {
		for (var rowCtr=0;rowCtr<mapRows;rowCtr++) {
			for (var colCtr=0;colCtr<mapCols;colCtr++){
			
				var tileId=tileMap[rowCtr][colCtr];
				var sourceX=Math.floor(tileId % 5) *32;
				var sourceY=Math.floor(tileId / 5) *32;
				
				context.drawImage(tileSheet, sourceX, sourceY,32,32,colCtr*32,rowCtr*32,32,32);
				
			}
		}
		
		
		//draw green circle at start node
		context.beginPath();
		context.strokeStyle="green";
		context.lineWidth=5;
		context.arc((startNode.y*32)+16, (startNode.x*32)+16, 10, 0,(Math.PI/180)*360,false);
		context.stroke();
		context.closePath();
		
		//draw red circle at end node
		context.beginPath();
		context.strokeStyle="red";
		context.lineWidth=5;
		context.arc((endNode.y*32)+16, (endNode.x*32)+16, 10, 0,(Math.PI/180)*360,false);
		context.stroke();
		context.closePath();
		
		//draw black circles on path
		for (var ctr=0;ctr<result.length-1;ctr++) {
			var node=result[ctr];
			context.beginPath();
			context.strokeStyle="black";
			context.lineWidth=5;
			context.arc((node.y*32)+16, (node.x*32)+16, 10, 0,(Math.PI/180)*360,false);
			context.stroke();
			context.closePath();
		}
	
	}
	
}
