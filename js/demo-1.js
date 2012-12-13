require.config({
    packages: [
         "lib",
 		"test"
     ]
 });

require(["lib/glapp","lib/render-square","http://localhost:8080/github/lib/js/jquery-1.8.3.js","http://localhost:8080/github/lib/js/compat.js"],
function(glapp,render){
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