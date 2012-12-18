define(["http://localhost:8080/github/lib/js/glapp/render_tpl.js"],function(render_tpl) {
	var render = function()	{	
		this.vertexPositionAttribute = null;
		this.vertexColorAttribute=null;
		this.verticesColorBuffer=null;
		this.verticesBuffer = null;		
	}; 
	render.prototype =  new render_tpl();
	render.prototype.setMatrixUniforms = function(){
			this.gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform,false,this.pMatrix);
			this.gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform,false,this.mvMatrix);
	}
	render.prototype.getMatrixUniforms = function(){
			this.shaderProgram.pMatrixUniform = this.gl.getUniformLocation(this.shaderProgram,"uPMatrix");
			this.shaderProgram.mvMatrixUniform = this.gl.getUniformLocation(this.shaderProgram,"uMVMatrix");
	}
	render.prototype.getVertexAttributes = function(){
			this. vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram,"aVertexPosition");
			this.gl.enableVertexAttribArray(this. vertexPositionAttribute);
			this. vertexColorAttribute = this. gl.getAttribLocation(this. shaderProgram,"aVertexColor");
			this. gl.enableVertexAttribArray(this. vertexColorAttribute);
		}
	render.prototype.initBuffers = function(){
			this. verticesBuffer = this. gl.createBuffer();
			this. gl.bindBuffer(this. gl.ARRAY_BUFFER,this. verticesBuffer);
			var vertices = [
				1.0, 1.0, 0.0,
				-1.0, 1.0, 0.0,
				1.0, -1.0, 0.0,
				-1.0, -1.0, 0.0
			];
			this. gl.bufferData(this. gl.ARRAY_BUFFER,new Float32Array(vertices),this. gl.STATIC_DRAW);	
			var colors = [
				1.0, 1.0, 1.0, 1.0, // white
				0.05, 0.05, 0.7, 1.0, // dark blue
				0.0, 1.0, 1.0, 1.0, // cyan
				0.0, 0.0, 1.0, 1.0 // blue
			];
			this. verticesColorBuffer = this. gl.createBuffer();
			this. gl.bindBuffer(this. gl.ARRAY_BUFFER,this. verticesColorBuffer);
			this. gl.bufferData(this. gl.ARRAY_BUFFER,new Float32Array(colors),this. gl.STATIC_DRAW);
	};
	render.prototype.drawScene = function(){
			this. gl.viewport(0,0,this. gl.viewportWidth,this. gl.viewportHeight);
			this. gl.clearColor(0,5,0,0.2);
			this. gl.clear(this. gl.COLOR_BUFFER_BIT);
			mat4.perspective(45,this. gl.viewportWidth / this. gl.viewportHeight,1,100.0,this. pMatrix);
			mat4.identity(this.mvMatrix);
			mat4.translate(this.mvMatrix,[-1,0,-7.0]);
			this.setMatrixUniforms();
			this. gl.bindBuffer(this. gl.ARRAY_BUFFER,this. verticesBuffer);
			this. gl.vertexAttribPointer(this. vertexPositionAttribute,3,this. gl.FLOAT,false,0,0);
			this. gl.bindBuffer(this. gl.ARRAY_BUFFER, this.verticesColorBuffer);
			this. gl.vertexAttribPointer(this. vertexColorAttribute,4,this. gl.FLOAT,false,0,0);
			this. gl.drawArrays(this. gl.TRIANGLE_STRIP,0,4);
	};
	render.prototype.executeProgram = function(){
			this.getMatrixUniforms();		
			this.getVertexAttributes();
			this.initBuffers();
			this.drawScene();
	};
	return render;
});
