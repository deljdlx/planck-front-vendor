if(!Khi.Routing) {
    Khi.Routing={}
}

Khi.Routing.Route=function(validator, callback)
{


	this.validator=validator;
	this.callback=callback;

}

Khi.Routing.Route.prototype.check=function(requestObject) {
	return this.validator(requestObject);
}


Khi.Routing.Route.prototype.execute=function(requestObject) {
	return this.callback(requestObject);
}