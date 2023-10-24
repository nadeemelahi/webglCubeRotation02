// author: "nadeem@webscripts.biz"

var gl = ngl.get_gl();

var idx , jdx;

var xAngle=10, yAngle=10, zAngle=0;
var xScale=0.5, yScale=0.5, zScale=0.5;
var xLoc=0.0, yLoc=0.0, zLoc=0; 

// mouse event - we are using fullscreen canvas
// so we can listen on window just the same
window.addEventListener("mousedown", mouseDown, false);
window.addEventListener("mouseup", mouseUp, false);
window.addEventListener("mouseout", mouseUp, false);
window.addEventListener("mousemove", mouseMove, false);

var isDragging = false, rotdamp = 0.1;
var pvmx , pvmy ;
// pv -previous  mx -mouse x location 
function mouseDown(e){ 
	isDragging = true; 
	pvmx = e.clientX ;
	pvmy = e.clientY ;
}
function mouseMove(e){
	if(!isDragging) return;
	// dragging on x should rotate y and vice versa
	yAngle += (e.clientX - pvmx) * rotdamp;
	xAngle += (e.clientY - pvmy) * rotdamp;
}
function mouseUp(e){ isDragging = false; }

// 3 quads: 3 x 6 x 3D(x,y,z) geometry vertices 
// 6 x 3D(red,green,blue) colour channels 
var cnt = 48;
var dim = 3;

var verts8 =  [ 
	-1,-1,-1 , 1,-1,-1 , 1,1,-1 , -1,1,-1 , // front -left hand rule
	-1,-1, 1 , 1,-1, 1 , 1,1, 1 , -1,1, 1 , // back +z further away
];

var twoColours = [ 
	1,0,0 , // red 
	0,1,0 , // green
	0,0,1 , // blue 
	0,1,1 , // cyan
	1,0,1 , // magenta
	1,1,0 , // yellow 
]; 

var indices = [ 
	0,1,2 , 0,2,3  , // front 
	4,7,5 , 5,7,6  , // back
	1,5,6 , 1,6,2  , // right 
	0,3,7 , 0,7,4  , // left
	0,4,5 , 0,5,1  , // bottom
	3,2,6 , 3,6,7  , // top
];

var cntVerts = [];
// loop indices[]
for(idx = 0; idx < cnt; idx++){ 
	cntVerts.push( verts8[ indices[idx] * dim ] );
	cntVerts.push( verts8[ (indices[idx] * dim) + 1 ] );
	cntVerts.push( verts8[ (indices[idx] * dim) + 2 ] );
}

var cntColours = [];
// loop colours2[] by three(rgb)
var verts2paintCnt = 6; // 3 indices/verts x 2 triangles/quad
for(idx = 0; idx < cnt; idx += 3){ 
	// setting same colour for 2 triangles
	for( jdx = 0; jdx < verts2paintCnt; jdx++){ 
		cntColours.push( twoColours[ idx ] );     // red
		cntColours.push( twoColours[ idx + 1 ] ); // green
		cntColours.push( twoColours[ idx + 2 ] ); // blue
	}
}

var verts = new Float32Array(cntVerts);
var colours =  new Float32Array(cntColours);


ngl.configureDraw();
loadData();
drawframe();

function drawframe(){
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, cnt);
	
	ngl.loadUniform1f("yAngle",yAngle);
	ngl.loadUniform1f("xAngle",xAngle);
	
	setTimeout(drawframe,50);
}

function loadData(){
	ngl.loadAttribute("vert",verts,dim);
	ngl.loadAttribute("colour",colours,dim);

	ngl.loadUniform1f("xAngle",xAngle);
	ngl.loadUniform1f("yAngle",yAngle);
	ngl.loadUniform1f("zAngle",zAngle);

	ngl.loadUniform1f("xScale",xScale);
	ngl.loadUniform1f("yScale",yScale);
	ngl.loadUniform1f("zScale",zScale);

	ngl.loadUniform1f("xLoc",xLoc);
	ngl.loadUniform1f("yLoc",yLoc);
	ngl.loadUniform1f("zLoc",zLoc);
}


