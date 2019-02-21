Khi.Application=function() {



	this.moduleRoot='moduleview';

	this.mainPanelNodeSelector='main.mainPanel';
	this.mainPanel=$(this.mainPanelNodeSelector);

	this.request = new Khi.Routing.Request();


	this.modules={};
	this.controllers={};

	Khi.Application.mainInstance=this;

}


Khi.Application.prototype.start=function() {

	this.currentUser=new User();



	this.currentUser.load(function() {
		this.view=new View(this);
		this.route();
	}.bind(this));


}


Khi.Application.getInstance=function() {
	return Application.mainInstance;
}


Khi.Application.prototype.getModule=function (name) {
	return this.modules[name];
}


Khi.Application.prototype.setMainPanelContent=function(content) {
	this.mainPanel.html(content);


	if(typeof(componentHandler)!='undefined') {
		var components=this.mainPanel.get(0).querySelectorAll('.mdl-textfield');
		for(var i=0; i<components.length; i++) {
			componentHandler.upgradeElement(components[i]);
		}

	}

}



Khi.Application.prototype.getParameters=function(buffer) {

	var parametersBuffer=buffer.replace(/.*?#(.*)/g, '$1');
	parametersBuffer=parametersBuffer.replace(/^&/, '');

	var callParametersBuffer=parametersBuffer.replace(/(.*?)\?.*/, '$1');
	var userParametersBuffer=parametersBuffer.replace(/.*?\?(.*)/, '$1');


	var parametersBuffers=callParametersBuffer.split('&');
	var parameters={};

	for(var i=0; i<parametersBuffers.length; i++) {
		var userParameters=parametersBuffers[i].split('=');
		parameters[userParameters[0]]=userParameters[1];
	}


	var parametersBuffers=userParametersBuffer.split('&');
	var customParameters={};

	for(var i=0; i<parametersBuffers.length; i++) {
		var userParameters=parametersBuffers[i].split('=');
		customParameters[userParameters[0]]=userParameters[1];
	}

	if(!parameters.module) {
		parameters={
			module: 'Home',
			controller:'Home',
			method:'initialize'
		}
	}

	return {
		call: parameters,
		parameters: customParameters
	};
}

Khi.Application.prototype.route=function() {

	this.lastModule=null;
	this.lastController=null;
	this.lastMethod=null;


	this.checkRoute=function() {
		var request=this.getParameters(document.location.toString())

		if(this.lastModule!=request.call.module) {
			this.lastModule=request.call.module;
			this.loadModule(request.call.module, request);
		}


		else if(this.lastController!=request.call.controller || this.lastMethod!=request.call.method) {

			this.lastController=request.call.controller;
			this.lastMethod=request.call.method;
			this.runAction(request.call.module, request);
		}


		this.lastController=request.call.controller;
		this.lastMethod=request.call.method;

	};


	this.routeInterval=setInterval(this.checkRoute.bind(this), this.routeCheckInterval);

}


Khi.Application.prototype.runAction=function(moduleName, request) {

	//var action=request.call.action;

	//var data=action.split('.');
	var controller=request.call.controller;
	var method=request.call.method;


	//console.debug('module '+moduleName);
	//console.debug('module '+method);

	this.controllers[controller][request.call.method].apply(this.controllers[controller]);

	/*
	 if(typeof(Application.modules[moduleName])!='undefined') {
	 this.controllers[request.call.controller][request.call.method].apply(this.controllers[request.call.controller]);
	 console.debug('run');

	 var module=Application.modules[moduleName]
	 module[controller][method].call();
	 }
	 */
}





Khi.Application.prototype.registerController=function(name, controller) {


	controller.loader=this.moduleLoader;


	for(var prototype in ModuleLoader.prototype) {
		controller[prototype]=ModuleLoader.prototype[prototype].bind(controller);
	}

	for(var property in this.moduleLoader) {
		controller[property]=this.moduleLoader[property];
	}


	this.controllers[name]=controller;

	return this;
};



Khi.Application.prototype.loadModule=function(moduleName, request) {


	/*
	 if(this.currentModule) {
	 if(this.currentModule.destroy) {
	 this.currentModule.destroy();
	 }
	 }
	 */



	this.ajax({
		url: this.moduleRoot+'/'+moduleName+'/initialize',
		success: function(data) {

			this.moduleLoader=new ModuleLoader(this);
			this.moduleLoader.loadData(data);


			this.moduleLoader.start(function() {
				this.controllers[request.call.controller][request.call.method].apply(this.controllers[request.call.controller]);
			}.bind(this));

			return;

		}.bind(this)
	});
}



Khi.Application.prototype.ajax=function(options) {
	options= $.extend({
		cache:false,
		dataType: 'json'
	}, options);

	return $.ajax(options);
}



Khi.Application.prototype.setURLParameter=function(name, value) {
	var location=document.location.toString();
	if(location.match(/#/)) {
		var regexp=new RegExp('&'+name+'=');
		if(!location.match(regexp)) {
			location+='&'+name+'='+value;
		}
		else {
			var regexp=new RegExp('&'+name+'=.*?(&|$)');
			location=location.replace(regexp, '&'+name+'='+value+'$1');
		}
	}
	document.location=location;
}


Khi.Application.prototype.getURLParameter=function(name) {
	var location=document.location.toString();
	if(location.match(/#/)) {

		var regexp=new RegExp('&'+name+'=');
		if(location.match(regexp)) {
			var regexp=new RegExp('.*?&'+name+'=(.*?)(&|$).*', 'g');
			return location.replace(regexp, '$1');
		}
		return
	}


	return null;
}





