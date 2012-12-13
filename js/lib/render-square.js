define(["lib/render_tpl"],function(render_tpl) {
	var render = function()	{	
		this.vertexPositionAttribute = null;
		this.vertexColorAttribute=null;
		this.verticesColorBuffer=null;
		this.verticesBuffer = null;		
	}; 
	render.prototype =  render_tpl;
	console.log(render.prototype);
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
		}
	render.prototype.executeProgram = function(){
			this.getMatrixUniforms();		
			this.getVertexAttributes();
			this.initBuffers();
			this.drawScene();
	}
	return new render();
});
	/*
	return (function(){	
		var _gl =null,_shaderProgram=null;
		var _vertexPositionAttribute = null,_vertexColorAttribute=null,
			_verticesColorBuffer=null,_verticesBuffer = null;
		var _mvMatrix,_pMatrix;
		function setMVP(mvMatrix,pMatrix){
			_mvMatrix = mvMatrix;
			_pMatrix = pMatrix;
		}
		function initialize(gl,sp){
			_gl = gl;_shaderProgram = sp;
		}

		function setMatrixUniforms(){
			_gl.uniformMatrix4fv(_shaderProgram.pMatrixUniform,false,_pMatrix);
			_gl.uniformMatrix4fv(_shaderProgram.mvMatrixUniform,false,_mvMatrix);
		}
		function getMatrixUniforms(){
			_shaderProgram.pMatrixUniform = _gl.getUniformLocation(_shaderProgram,"uPMatrix");
			_shaderProgram.mvMatrixUniform = _gl.getUniformLocation(_shaderProgram,"uMVMatrix");
		}
		function getVertexAttributes(){
			_vertexPositionAttribute = _gl.getAttribLocation(_shaderProgram,"aVertexPosition");
			_gl.enableVertexAttribArray(_vertexPositionAttribute);
			_vertexColorAttribute = _gl.getAttribLocation(_shaderProgram,"aVertexColor");
			_gl.enableVertexAttribArray(_vertexColorAttribute);
		}
		function initBuffers(){
			_verticesBuffer = _gl.createBuffer();
			_gl.bindBuffer(_gl.ARRAY_BUFFER,_verticesBuffer);
			var vertices = [
				1.0, 1.0, 0.0,
				-1.0, 1.0, 0.0,
				1.0, -1.0, 0.0,
				-1.0, -1.0, 0.0
			];
			_gl.bufferData(_gl.ARRAY_BUFFER,new Float32Array(vertices),_gl.STATIC_DRAW);	
			var colors = [
				1.0, 1.0, 1.0, 1.0, // white
				0.05, 0.05, 0.7, 1.0, // dark blue
				0.0, 1.0, 1.0, 1.0, // cyan
				0.0, 0.0, 1.0, 1.0 // blue
			];
			_verticesColorBuffer = _gl.createBuffer();
			_gl.bindBuffer(_gl.ARRAY_BUFFER,_verticesColorBuffer);
			_gl.bufferData(_gl.ARRAY_BUFFER,new Float32Array(colors),_gl.STATIC_DRAW);
		}
		function drawScene(){
			_gl.viewport(0,0,_gl.viewportWidth,_gl.viewportHeight);
			_gl.clearColor(133,133,133,1);
			_gl.clear(_gl.COLOR_BUFFER_BIT);
			mat4.perspective(45,_gl.viewportWidth / _gl.viewportHeight,0.1,100.0,_pMatrix);
			mat4.identity(_mvMatrix);
			mat4.translate(_mvMatrix,[0,0,-7.0]);
			setMatrixUniforms();
			_gl.bindBuffer(_gl.ARRAY_BUFFER,_verticesBuffer);
			_gl.vertexAttribPointer(_vertexPositionAttribute,3,_gl.FLOAT,false,0,0);
			_gl.bindBuffer(_gl.ARRAY_BUFFER,_verticesColorBuffer);
			_gl.vertexAttribPointer(_vertexColorAttribute,4,_gl.FLOAT,false,0,0);
			_gl.drawArrays(_gl.TRIANGLE_STRIP,0,4);
		}
		function executeProgram(){
			getMatrixUniforms();		
			getVertexAttributes();
			initBuffers();
			drawScene();
		}
		var render =  {
			initialize:initialize,
			executeProgram:executeProgram,
			setMVP:setMVP
		};
		return render;
	})();
	*/