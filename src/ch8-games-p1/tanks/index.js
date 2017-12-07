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
	
	let nextNode;
	let currentNode;
	let currentNodeIndex = 0;
	let rowDelta = 0;
	let colDelta = 0;
	let tankX = 0;
	let tankY = 0;
	let angleInRadians = 0;
	let tankStarted = false;
	let tankMoving = false;
	let finishPath = false;

	//set up tile map
	var mapRows=15;
	var mapCols=15;
	
	var tileMap=[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	   ,[0,1,2,1,1,1,1,1,1,1,1,1,1,1,0]
	   ,[0,1,0,1,0,0,1,0,1,0,0,1,0,1,0]
	   ,[0,1,0,1,0,0,1,0,1,0,0,1,0,1,0]
	   ,[0,1,0,1,0,0,1,1,1,0,0,1,0,1,0]
	   ,[0,1,1,1,1,1,0,0,0,1,1,1,1,1,0]
	   ,[0,2,0,0,0,1,0,0,0,1,0,0,0,1,0]
	   ,[0,1,1,1,1,1,0,0,0,1,1,1,1,1,0]
	   ,[0,0,0,0,0,1,1,1,1,1,0,0,0,0,0]
	   ,[0,1,1,1,1,1,0,0,0,1,1,1,1,1,0]
	   ,[0,1,0,1,0,0,1,1,1,0,0,1,0,1,0]
	   ,[0,1,0,1,0,0,1,0,1,0,0,1,0,1,0]
	   ,[0,1,0,1,0,0,1,0,1,0,0,1,0,1,0]
	   ,[0,1,1,1,1,1,1,1,1,1,1,1,1,1,0]
	   ,[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
 	];
	
	console.log("tileMap.length=" , tileMap.length);
	
	//set up a* graph
	var graph = new Graph(tileMap);
	var startNode={x:4,y:1}; // use values of map turned on side
	var endNode={x:13,y:10};
	
	//create node list
	var start = graph.nodes[startNode.x][startNode.y];
    var end = graph.nodes[endNode.x][endNode.y];
    var result = astar.search(graph.nodes, start, end, false);
	
	//load in tile sheet image
	var tileSheet=new Image();
	tileSheet.addEventListener('load', eventSheetLoaded , false);
	tileSheet.src=tiles;

	const FRAME_RATE = 40;
	const intervalTime = 1000 / FRAME_RATE;

	function gameLoop() {
		drawScreen();
		window.setTimeout(gameLoop, intervalTime);
	}

	function eventSheetLoaded() {
		gameLoop();
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
		
		if (!finishPath) {
			if (!tankStarted) {
				currentNode = startNode;
				tankStarted = true;
				nextNode = result[0];
				tankX = currentNode.x * 32;
				tankY = currentNode.y * 32;
			}
			if (tankX === nextNode.x * 32 && tankY == nextNode.y * 32) {
				currentNodeIndex++;
				if (currentNodeIndex === result.length) {
					finishPath = true;
				}
				currentNode = nextNode;
				nextNode = result[currentNodeIndex];
				tankMoving = false;
			}
			if (!finishPath) {
				if (nextNode.x > currentNode.x) {
					colDelta = 1;
				} else if (nextNode.x < currentNode.x) {
					colDelta = -1;
				} else {
					colDelta = 0;
				}

				if (nextNode.y > currentNode.y) {
					rowDelta = 1;
				} else if (nextNode.y < currentNode.y) {
					rowDelta = -1;
				} else {
					rowDelta = 0;
				}
				angleInRadians = Math.atan2(colDelta, rowDelta);
				tankMoving = true;
			}
			tankX += colDelta;
			tankY += rowDelta;
		}

		const tankSourceX = Math.floor(3 % 5) * 32;
		const tankSourceY = Math.floor(3 / 5) * 32;
		context.save();
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.translate(tankY + 16, tankX + 16);
		context.rotate(angleInRadians);
		context.drawImage(tileSheet, tankSourceX, tankSourceY, 32, 32, -16, -16, 32, 32);
		context.restore();
	}
	
}
