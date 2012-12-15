

define(["http://localhost:8080/github/lib/js/glapp/render_tpl.js","http://localhost:8080/github/lib/js/glapp/input.js","http://localhost:8080/github/lib/js/glapp/compat.js"],function(render_tpl,input) {
	
	var render = function()	{
		this.octahedronVertexPositionBuffer = null;
		this.octahedronVertexColorBuffer = null;
		this.octahedronVertexIndexBuffer = null;
		this.canvas = null;
		this.paused = false;
		this.height=1.41;
		this.rotationRadians = 0.0;
		this.rotationVector = [1.0,1.0,1.0];
		this.rotationIncrement = 0;
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.translationAngle = 0;
	};
	render.prototype = new render_tpl();
	render.prototype.executeProgram = function(){
		console.log("render -animate");
	};

	return render;
});

