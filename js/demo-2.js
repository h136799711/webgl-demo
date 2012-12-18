require.config({
    packages: [
 		"test"
		
     ]
 });
require(["http://localhost:8080/github/lib/js/glapp/glapp.js","render-animate","render-square","http://localhost:8080//github/lib/js/jquery-1.8.3.js"],
	function(glapp,renderAnim,renderSquare){
	console.log("demo-2");
	console.log(arguments);
	
	glapp = glapp || window.glapp;
	var doc = document,ele,infodiv = "console";
	function log(msg){		
			var ele = doc.getElementById(infodiv) || doc.createElement("div");
			ele.style.font = " 2em Verdana";
			ele.style.color = "#ee1111";
			ele.innerText = msg;
			if(ele.id !== infodiv){
				ele.id = infodiv;
				doc.body.insertBefore(ele,doc.body.firstChild);
			}
	}
	if(!jQuery){		
		log("jQuery undefined!");
		return ;
	}
	if(!glapp){
		log("glapp undefined!");
		return ;
	}
	if(!renderSquare){
		log("render undefined!");
		return ;
	}


	var ele = doc.body,input = glapp.Input,canvas = glapp.Canvas;
	try{
		input.initialize();
		input.bindAll(ele);

		var ani = new renderAnim(),sq = new renderSquare();
		ani.input = input;
		ani.bindKeyListener();
		glapp.addListener("initWebGL",function(){
			console.log("InitWebGL");
		});
		canvas.initialize("canvas",ani);
		canvas.executeProgram();
		(function animLoop(){
			canvas.executeProgram();
//			setTimeout(square,4000);
			requestAnimFrame(animLoop,document.getElementById("canvas"));
		})();
//		function square(){
	//		log("draw a square");
//			canvas.initialize("canvas",sq);
//			canvas.render();	
//			setTimeout(anim,4000);
//		}
		
//	anim();
		
		//input.keydown(function(){
		//	render.togglePause(arguments[0]);
		//});

	}catch(e){
		log("Error message : "+e.message);
	}finally{
	}

});