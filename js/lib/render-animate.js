define(["lib/render_tpl","http://localhost:8080/github/lib/js/input.js","http://localhost:8080/github/lib/js/compat.js"],function(render_tpl,input) {
	console.log(input);
	if(input){
		input.initialize();
		input.bindListeners();
		input.update();
	}
	function loop(){

		requestAnimFrame(loop);
		if(input.isKeyDown(input.KEYS.A)){
			console.log('a');
		}
		if(input.isKeyDown(input.KEYS.LEFT)){
			console.log('LEFT');
		}
		if(input.isKeyDown(input.KEYS.RIGHT)){
			console.log('RIGHT');
		}
		if(input.isKeyDown(input.KEYS.DOWN)){
			console.log('DOWN');
		}
		if(input.isKeyDown(input.KEYS.UP)){
			console.log('UP');
		}
		var cnt = 0;
		if((cnt = input.getPressCount(input.KEYS.UP))){
			console.log("press= "+cnt);
		}
	}
	
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
	render.prototype = render_tpl;
	render.prototype.executeProgram = function(){
		console.log("executeProgram");
	};
	loop();
	return new render();
});

