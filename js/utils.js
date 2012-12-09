utils = (function(window){
	var addEvent = (function () {
	  if (document.addEventListener) {
		return function (el, type, fn) {
		  if (el && el.nodeName || el === window) {
			el.addEventListener(type, fn, false);
		  } else if (el && el.length) {
			for (var i = 0; i < el.length; i++) {
			  addEvent(el[i], type, fn);
			}
		  }
		};
	  } else {
		return function (el, type, fn) {
		  if (el && el.nodeName || el === window) {
			el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
		  } else if (el && el.length) {
			for (var i = 0; i < el.length; i++) {
			  addEvent(el[i], type, fn);
			}
		  }
		};
	  }
	 })();
	var loadXML    = function(xmlFile)
	{
		var xmlDoc;
		if(window.ActiveXObject)
		{
			xmlDoc    = new ActiveXObject('Microsoft.XMLDOM');
			xmlDoc.async    = false;
			xmlDoc.load(xmlFile);
		}
		else if (document.implementation&&document.implementation.createDocument)
		{
			xmlDoc    = document.implementation.createDocument('', '', null);
			
			var xmlhttp = new window.XMLHttpRequest();
			xmlhttp.open("GET", xmlFile, false);
			xmlhttp.send(null);
			xmlDoc = xmlhttp.responseXML;
			
		}
		else
		{ 
			alert('您的浏览器不支持xml文件读取,推荐使用IE5.0以上可以解决此问题!');
 			return null;
		}
		
		return xmlDoc;
	};
	var getEleById = function(id){
		return document.getElementById(id);
	};
	var getEle = function(id){
		return document.getElementById(id) || document.getElementsByTagName(id);
	};
	function getAttrValue(ele,attrName){
		return  ele.hasAttribute(attrName) && ele.attributes.getNamedItem(attrName).value;
	}
	var getNode = function(xmlDoc,xPath){
		return xmlDoc.getElementsByTagName(xPath);		 
	};
	var createNode  = function(xmlDoc,nodeName){
			return xmlDoc.createElement(nodeName);
	};
	
	var set=function (c_name,value,expiredays)
	{
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=c_name+ "=" +escape(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
		
	};
	var get = function (c_name){
		if (document.cookie.length>0)
		 {
		  c_start=document.cookie.indexOf(c_name + "=")
		  if (c_start != -1)
			{ 
			c_start=c_start + c_name.length+1 
			c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1) c_end=document.cookie.length
			return unescape(document.cookie.substring(c_start,c_end))
			} 
		  }
		return "";
	};
	var createTag = function(tagName){
		return document.createElement(tagName);
	};
	var getQueryString = function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]); 
		}
		return null;
    };
	var queryAll  = function(ele,param){
		if(!ele.querySelectorAll){
			if(!document.querySelectorAll){
				alert("为了更好的使用,请升级浏览器版本或换一个浏览器查看");
				return undefined;
			}
			return document.querySelectorAll(param);
		}
		return ele.querySelectorAll(param);
	};
	var query  = function(ele,param){
		if(ele.querySelector){
			return ele.querySelector(param);
		}
		return null;
	};
	var hide= function(ele){
		ele.style.display = "none";
	};
	var show=function(ele){
		ele.style.display = "block";
	};
	var attr = function(ele,att,value){
		if(value){
			ele.setAttribute(att,value);
		}else{
			return ele.getAttribute(att);
		}
	};
	var getBaseURL = function(){
		return document.URL.split("?")[0];
	};
		
	var logger = (function(){
		var write = function(msg,isAppend){
			isAppend ? this.innerHTML += msg : this.innerHTML = msg;
		};
		return {
			write:write
		};
	})();
	
	
	return {
		addEvent:addEvent,
		loadXML : loadXML,
		getNode : getNode,
		getEleById:getEleById,
		getAttrValue:getAttrValue,
		createNode:createNode,
		createTag:createTag,
		getQueryString:getQueryString,
		queryAll:queryAll,
		query:query,
		hide:hide,
		show:show,
		attr:attr,
		getBaseURL:getBaseURL,
		getEle:getEle,
		logger:logger,
		cookies:{
			get:get,
			set:set
		}
	};
	
})(window);

