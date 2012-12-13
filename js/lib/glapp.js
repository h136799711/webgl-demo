define(["http://localhost:8080/github/lib/js/webgl-utils.js","http://localhost:8080/github/lib/js/min/glMatrix.min.js"],function(WebGLUtils){

var doc = document,glapp =  function(){	};
glapp.extend = glapp.prototype.extend = function ( a, b ) {
	for ( var prop in b ) {
		if ( b[ prop ] === undefined ) {
			delete a[ prop ];
		//在IE8中避免设置window.constructor 而引起出现"Member not found"错误
		} else if ( prop !== "constructor" || a !== window ) {
			a[ prop ] = b[ prop ];
		}
	}
	return a;
};


//logger
var logger = function(){	 
	this.LOGCONSOLE = 0X000001;
	this.LOGALERT = 0X000002;
	this.LOGELEMENTBYID = 0X000004;
};

var log = logger.prototype.log = function(msg,flag){
	if(typeof flag ==="undefined" || flag & logger.LOGCONSOLE){
		console.log(msg);
	}
	if(flag & logger.LOGELEMENTBYID) {
		var id = arguments[2] || "console";
		var ele = doc.getElementById(id) || doc.getElementsByTagName("body")[0];
		var div = doc.createElement("div");
		div.innerHTML = '<div style="font:1.5em bold;color:white;">'+msg+'</div>';
		div.style.color = "white";
		div.style.border = "1px solid #dd7";
		div.style.background= " #111111 ";
		doc.body.insertBefore(div,doc.body.firstChild);
	}
	if(flag & logger.LOGALERT){
		alert(msg);
	}
};
//utils
var utils = (function(){			
	return {
		each:function (o,callback){
			if(typeof o ===  "Array" || typeof o === "NodeList" || (o && o.length)){
				for(var i=0;i<o.length;i++){
					each(o[i],callback);
				}
			}else{
				for(var prop in o){
					callback.apply(this,[prop,o]);
				}
			}
		},
		hasProp: function(obj,prop){				
			return Object.prototype.hasOwnProperty && Object.prototype.hasOwnProperty.call(obj, prop);
		},
		getOwn:function(obj,prop){
			return hasProp(obj,prop) && obj[prop];
		}
	};

})();

//event listener
var EventListener = function (){
	this._listeners= [];		
}		
EventListener.prototype.addEvent = function(type, fn,onetime) {
		if (typeof this._listeners[type] === "undefined") {
			this._listeners[type] = [];
		}
		if (typeof fn === "function") {
			if(onetime === true){
				fn.onetime = onetime;
			}
			this._listeners[type].push(fn);
				return true;
		}
		return false;
};
		
EventListener.prototype.addEventForOneTime = function(type, fn) {
		this.addEvent(type,fn,true);
};
EventListener.prototype.fireEvent = function(type, args) {
		var arrayEvent = this._listeners[type];
		if (arrayEvent instanceof Array) {
			var i;
			for (i = arrayEvent.length - 1; i >= 0; i -= 1) {
				if (typeof arrayEvent[i] === "function") {
						arrayEvent[i]({type: type,args: args	});
						if(arrayEvent[i].onetime){
							arrayEvent.splice(i, 1);
						}
				}
			}
		}
};
EventListener.prototype.removeEvent = function(type, fn) {
	if (typeof type !== "string"){
		return false;
	}
	var arrayEvent = this._listeners[type];
	if (typeof arrayEvent !== "undefined" && typeof fn === "function") {
		var i;
		for (i = arrayEvent.length - 1; i >= 0; i -= 1) {
			if (arrayEvent[i] === fn) {
				this._listeners[type].splice(i, 1);
			}
		}
	} else {
		delete this._listeners[type];
		return true;
	}
};


//logger
glapp.extend(glapp,logger.prototype);
//webglutils
//glapp.extend(utils,WebGLUtils);
glapp.extend(glapp,(function(){
	var _gl=null,	_shaderProgram = null,_render={ 	},
	_fragmentShader = null,_vertexShader = null,
	_mvMatrix = mat4.create(),_pMatrix = mat4.create();

	function initWebGL(canvasID){
		var ele = doc.getElementById(canvasID);
		if(!ele){		log("not found a canvas which id's "+canvasID);	}
		_gl = WebGLUtils.setupWebGL(ele);
		_gl.viewportWidth = ele.width;
		_gl.viewportHeight = ele.height;
		_gl.clearColor(0,0,0,1);
		_gl.clear(_gl.COLOR_BUFFER_BIT);
		return _gl;
	}
	function makeShader(src,type){
		if(!_gl){
			throw new Error(["invalid argument."]);
		}
		var shader = _gl.createShader(type);
		_gl.shaderSource(shader,src);
		_gl.compileShader(shader);
		if(!_gl.getShaderParameter(shader,_gl.COMPILE_STATUS)){
			log("Error Compiling Shader: "+_gl.getShaderInfoLog(shader),logger.LOGELEMENTBYID);
		}
		return shader;
	}
	function attachShaders(){
		_gl.attachShader(_shaderProgram,_vertexShader);
		_gl.attachShader(_shaderProgram,_fragmentShader);
		_gl.linkProgram(_shaderProgram);
		if(!_gl.getProgramParameter(_shaderProgram,_gl.LINK_STATUS)){
			log("Unable to initialize the shader program",logger.LOGELEMENTBYID);
		}
	}
	function createShaderProgram(){
		_shaderProgram = _gl.createProgram();
		attachShaders();
		_gl.useProgram(_shaderProgram);
	}
	function setupShaders(fragmentShaderSRC,vertexShaderSRC){
		_fragmentShader = makeShader(fragmentShaderSRC,_gl.FRAGMENT_SHADER);
		_vertexShader = makeShader(vertexShaderSRC,_gl.VERTEX_SHADER);
		createShaderProgram();
	}
	function initShaders(){
		var fragmentShaderSRC = null,
			vertexShaderSRC = null;
		fragmentShaderSRC = doc.getElementById("shader-fs").innerHTML;
		vertexShaderSRC = doc.getElementById("shader-vs").innerHTML;
		setupShaders(fragmentShaderSRC,vertexShaderSRC);

	}
	function executeProgram(){	
		if(!_render.initialize || typeof _render.initialize !== "function"){
			throw new Error(["not implements initialize method"]);
		}
		if(!_render.executeProgram && typeof _render.executeProgram !== "function"){
			throw new Error(["not implements executeProgram method"]);
		}
		_render.initialize(_gl,_shaderProgram);
		_render.setMVP(_mvMatrix,_pMatrix);
		_render.executeProgram();
	//	getMatrixUniforms();		
//		getVertexAttributes();
//		initBuffers();
//		drawScene();
	}
	function setRender(render){
		_render = render;
	}
	function initialize(canvasid,render){
		initWebGL(canvasid);
		initShaders();
		setRender(render);
	
	}
	function render(){
		executeProgram();
	}
	return {
	//	initWebGL:initWebGL,
	//	initShaders:initShaders,
	//	executeProgram:executeProgram,
		setRender:setRender,
		initialize:initialize,
		render:render
	};
})());







		
glapp.utils=utils;
glapp.EventListener = new EventListener();
glapp.logger = new logger();
glapp.extend(glapp,glapp.EventListener);


//window.glapp = glapp;
return glapp;
});

