define(function(){
	var render_tpl = {
		gl:null,
		shaderProgram:null,
		mvMatrix:null,
		pMatrix:null,
		setMVP:function(mvMatrix,pMatrix){	
			this.mvMatrix = mvMatrix;
			this.pMatrix = pMatrix;
		},
		initialize:function(g,s){	
			this.gl = g;
			this.shaderProgram = s;
		}
	}
	return render_tpl;
});