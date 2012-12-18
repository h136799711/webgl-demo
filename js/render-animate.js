

define(["http://localhost:8080/github/lib/js/glapp/render_tpl.js","http://localhost:8080/github/lib/js/glapp/compat.js"],function(render_tpl) {
	
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
		this.input  = null;
	};
	render.prototype = new render_tpl();
	render.prototype.bindKeyListener = function(){
		if(this.input){
			this.input.keyup(this.input.KEYS.P,(function(){
				this.paused = !this.paused;
			}).bind(this));
		}
	};
	render.prototype.setMatrixUniforms = function(){
			this.gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform,false,this.pMatrix);
			this.gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform,false,this.mvMatrix);
	}
	render.prototype.getMatrixUniforms = function(){
			this.shaderProgram.pMatrixUniform = this.gl.getUniformLocation(this.shaderProgram,"uPMatrix");
			this.shaderProgram.mvMatrixUniform = this.gl.getUniformLocation(this.shaderProgram,"uMVMatrix");
	};
	render.prototype.getVertexAttributes = function(){
			this. vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram,"aVertexPosition");
			this.gl.enableVertexAttribArray(this. vertexPositionAttribute);
			this. vertexColorAttribute = this. gl.getAttribLocation(this. shaderProgram,"aVertexColor");
			this. gl.enableVertexAttribArray(this. vertexColorAttribute);
	};
	render.prototype.executeProgram = function(){
			this.getMatrixUniforms();		
			this.getVertexAttributes();
			this.initBuffers();
			this.drawScene();
	};
	
	render.prototype.initBuffers = function(){
		this.octahedronVertexPositionBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRY_BUFFER,this.octahedronVertexPositionBuffer);
		var vertices =[
		// top faces
		0.0, this.height, 0.0,
		1.0, 0.0, 1.0,
		-1.0, 0.0, 1.0,
		0.0, this.height, 0.0,
		1.0, 0.0, -1.0,
		-1.0, 0.0, -1.0,
		0.0,this.height, 0.0,
		1.0, 0.0, 1.0,
		1.0, 0.0, -1.0,
		0.0, this.height, 0.0,
		-1.0, 0.0, 1.0,
		-1.0, 0.0, -1.0,
		//bottom faces
		0.0, -this.height, 0.0,
		1.0, 0.0, 1.0,	
		-1.0, 0.0, 1.0,
		0.0, -this.height, 0.0,
		1.0, 0.0, -1.0,
		-1.0, 0.0, -1.0,
		0.0, -this.height, 0.0,
		1.0, 0.0, 1.0,
		1.0, 0.0, -1.0,
		0.0, -this.height, 0.0,
		-1.0, 0.0, 1.0,
		-1.0, 0.0, -1.0
		];
		this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(vertices),this.gl.STATIC_DRAW);
		this.octahedronVertexPositionBuffer.itemSize = 3;
		this.octahedronVertexPositionBuffer.numItems = 24;
		var colors =[
			[1.0, 0.0, 0.0, 1.0], // red
			[0.0, 1.0, 0.0, 1.0], // green
			[0.0, 0.0, 1.0, 1.0], // blue
			[1.0, 1.0, 0.0, 1.0], // yellow
			[1.0, 1.0, 1.0, 1.0], // white
			[0.0, 0.0, 0.0, 1.0], // black
			[1.0, 0.0, 1.0, 1.0], // magenta
			[0.0, 1.0, 1.0, 1.0] // cyan
		];
		
		var unpackedColors = [];
		//8 colors by 4 channels - rgba
		for(var i=0; i < 8; ++i){
			for(var k=0; k < 3; ++k){
				var color = colors[i];
				unpackedColors = unpackedColors.concat(color);
			}
		}
		this.octahedronVertexColorBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.octahedronVertexColorBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(unpackedColors),this.gl.STATIC_DRAW);
		this.octahedronVertexColorBuffer.itemSize = 4;
		this.octahedronVertexColorBuffer.numItems = 24;
		var octahedronVertexIndices = [
		//top
		0, 1, 2, 3, 4, 5,
		6, 7, 8, 9, 10, 11,
		//bottom
		12, 13, 14, 15, 16, 17,
		18, 19, 20, 21, 22, 23
		];
		this.octahedronVertexIndexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.octahedronVertexIndexBuffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new
		Uint16Array(octahedronVertexIndices), this.gl.STATIC_DRAW);
		this.octahedronVertexIndexBuffer.itemSize = 1;
		this.octahedronVertexIndexBuffer.numItems = 24;
		
	}
	render.prototype.drawScene = function(){		

		this. gl.viewport(0,0,this. gl.viewportWidth,this. gl.viewportHeight);
		this. gl.clearColor(0,5,0,0.2);
		this. gl.clear(this. gl.COLOR_BUFFER_BIT);
		mat4.perspective(45,this. gl.viewportWidth / this. gl.viewportHeight,1,100.0,this. pMatrix);
		mat4.identity(this.mvMatrix);
		this.setMatrixUniforms();
		this.gl.bindBuffer(this.gl.ARRY_BUFFER,this.octahedronVertexPositionBuffer);
		this. gl.vertexAttribPointer(this. vertexPositionAttribute,3,this. gl.FLOAT,false,0,0);
		this.gl.bindBuffer(this.gl.ARRY_BUFFER, this.octahedronVertexColorBuffer);
		this. gl.vertexAttribPointer(this. vertexColorAttribute,4,this. gl.FLOAT,false,0,0);
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.octahedronVertexIndexBuffer);
		this. gl.vertexAttribPointer(this. octahedronVertexIndexBuffer,1,this. gl.Uint16,false,0,0);
		this. gl.drawArrays(this. gl.TRIANGLE_STRIP,0,4);
		mat4.translate(this.mvMatrix, [3*this.x, this.y, -12.0 + 5*this.z]);
		if(!this.paused){
		this.x = Math.cos(this.translationAngle);
		this.y = this.x;
		this.z = Math.sin(this.translationAngle);
		this.rotationRadians = this.rotationIncrement/(180/Math.PI);
		this.rotationIncrement++;
		this.translationAngle += .01;
		}
		mat4.rotate(this.mvMatrix, this.rotationRadians, this.rotationVector);
	};
	return render;
});

