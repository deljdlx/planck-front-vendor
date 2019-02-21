if(!Khi.Routing) {
    Khi.Routing={}
}

Khi.Routing.Router=function(application)
{
	this.application=application;
	this.routeCheckInterval=100;
    this.checkTimeout = null;

	this.routes={};

	this.requestParameters={};
	this.anchorParameters={};

	this.request = new Khi.Routing.Request();


}



Khi.Routing.Router.prototype.run=function(runOnce) {

	this.executeRoutes();

	if(runOnce) {
		return;
	}

	this.checkTimeout = setTimeout(
		this.run.bind(this),
		this.routeCheckInterval
	);
}




Khi.Routing.Router.prototype.getRequest=function() {
	return this.request;
}

Khi.Routing.Router.prototype.addRoute=function (name, validator, callback) {

	var route=new Khi.Routing.Route(validator, callback);
	this.routes[name]=route;
	return route;
}






Khi.Routing.Router.prototype.executeRoutes=function(request) {

	if(!request) {
        request = this.getRequest();
	}


	for(var routeName in this.routes) {
		var route = this.routes[routeName];
		if(route.check(request)) {
			route.execute(request);
		}
	}






/*
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
	*/
}





