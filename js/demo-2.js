require.config({
    packages: [
         "lib",
 		"test"
		
     ]
 });

require(["pathconfig"],function(pathConfig){
	if(!pathConfig){
		console.log(pathConfig);
		alert("pathConfig not defined.");
		return ;
	}
	var liburl = pathConfig.lib;
require(["lib/glapp","lib/render-animate",liburl+"js/jquery-1.8.3.js",liburl+"js/compat.js" ],
function(glapp,render){
	console.log(arguments);
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
if(!render){
	log("render undefined!");
	return ;
}

SyntaxHighlighter.all();
	


try{
	
//变量
glapp.initialize("canvas",render);
glapp.render();
	
}catch(e){
	var ele = doc.createElement("div");
	ele.style.font = " 2em Verdana";
	ele.style.color = "#ee1111";
	ele.innerText = e.message;
	doc.body.insertBefore(ele,doc.body.firstChild);
}


});
});