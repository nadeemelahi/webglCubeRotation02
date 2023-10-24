// author: "nadeem@webscripts.biz"
// ned vertex generator
var nvg = {
	genVerts4imageQuad : function(x,y,w,h){
		return new Float32Array ( [
			x     ,	y     , // bottom left
			x + w ,	y     , // bottom right
			x + w ,	y + h , // top right

			x     ,	y     , // bottom left
			x + w ,	y + h , // top right
			x     ,	y + h   // top left
		]  );                               
	},

	// top left is 0,0
	genImageQuad : function(){
		return new Float32Array([   
			0.0,  1.0, // bottom left
			1.0,  1.0, // bottom right
			1.0,  0.0, // top right

			0.0,  1.0, // bottom left
			1.0,  0.0, // top right
			0.0,  0.0, // top left
		]);
	},

	// COLUMN MAJOR MATRIX LAYOUT CONVENTION REQUIRED
	genTranslationMatrix : function(tx,ty,tz){
		return new Float32Array ( [
			1.0 , 0.0 , 0.0 , 0.0 ,
			0.0 , 1.0 , 0.0 , 0.0 ,
			0.0 , 0.0 , 1.0 , 0.0 ,
			tx  , ty  , tz  , 1.0
		] ) ;
	},

	genScaleMatrix : function(sx,sy,sz){
		return new Float32Array ( [
			sx  , 0.0 , 0.0 , 0.0 ,
			0.0 , sy  , 0.0 , 0.0 ,
			0.0 , 0.0 , sz  , 0.0 ,
			0.0 , 0.0 , 0.0 , 1.0
		] ) ;
	},

	calcCOS : function(degrees){
		return Math.cos(degrees*3.1416/180);
	},

	calcSIN : function(degrees){
		return Math.sin(degrees*3.1416/180);
	},


	genIdentityMatrix : function(){
		return new Float32Array ( [
			1.0  ,  0.0  ,  0.0  ,  0.0  ,
			0.0  ,  1.0  ,  0.0  ,  0.0  ,
			0.0  ,  0.0  ,  1.0  ,  0.0  ,
			0.0  ,  0.0  ,  0.0  ,  1.0
		] ) ;
	},

	// COLUMN MAJOR MATRIX LAYOUT CONVENTION REQUIRED
	genRotateAboutXmatrix : function(degrees){

		var cos = this.calcCOS(degrees);
		var sin = this.calcSIN(degrees);

		return new Float32Array ( [
			1.0  ,  0.0  ,  0.0  ,  0.0  ,
			0.0  ,  cos  ,  sin  ,  0.0  ,
			0.0  , -sin  ,  cos  ,  0.0  ,
			0.0  ,  0.0  ,  0.0  ,  1.0
		] ) ;
	},

	genRotateAboutYmatrix : function(degrees){

		var cos = this.calcCOS(degrees);
		var sin = this.calcSIN(degrees);

		return new Float32Array ( [
			cos  ,  0.0  , -sin  ,  0.0  ,
			0.0  ,  1.0  ,  0.0  ,  0.0  ,
			sin  ,  0.0  ,  cos  ,  0.0  ,
			0.0  ,  0.0  ,  0.0  ,  1.0
		] ) ;
	},

	genRotateAboutZmatrix : function(degrees){

		var cos = this.calcCOS(degrees);
		var sin = this.calcSIN(degrees);

		return new Float32Array ( [
			cos  ,  sin  ,  0.0  ,  0.0  ,
			-sin  ,  cos  ,  0.0  ,  0.0  ,
			0.0  ,  0.0  ,  1.0  ,  0.0  ,
			0.0  ,  0.0  ,  0.0  ,  1.0
		] ) ;
	}
};
