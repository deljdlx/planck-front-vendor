if(!Khi.Routing) {
    Khi.Routing={}
}

Khi.Routing.Request = function(options) {

    this.url=null;
    this._GET=null;
    this.anchors=null;

    if(options !== null) {
        for(var key in options) {
            this[key] = options[key];
        }
    }

    var url = document.location.toString();

    if(this.url === null) {
        this.url = url;
    }

    if(this._GET === null) {
        this._GET = this.getRequestParameters(url);
    }

    if(this.anchors === null) {
        this.anchors = this.getAnchorParameters(url);
    }
}


Khi.Routing.Request.prototype.get = function(name)
{
    if(isset(this._GET[name])) {
        return this._GET[name];
    }
    return false;
}




Khi.Routing.Request.prototype.getAnchorParameters=function(buffer) {


    var customParameters={};

    if(!buffer.match(/#/)) {
        return customParameters;
    }


    var anchorString=buffer.replace(/.*?#(.*)/g, '$1');
    anchorString=anchorString.replace(/\?/g, '&');
    anchorString=anchorString.replace(/^&/, '');
    var parameterStrings=anchorString.split('&');

    if(parameterStrings.length) {
        for(var i=0; i<parameterStrings.length; i++) {
            var parametersData=parameterStrings[i].split('=');
            var parameterName=parametersData[0];
            var value=parametersData[1];
            customParameters[parameterName]=value;
        }
    }
    return customParameters;
}







Khi.Routing.Request.prototype.getRequestParameters=function(buffer) {

    var customParameters={};

    var url=buffer.replace(/(#.*)/g, '');

    if(url.match(/\?/)) {

        var queryString=url.replace(/.*?\?(.*)/, '$1');

        var parameterStrings=queryString.split('&');

        if(parameterStrings.length) {
            for(var i=0; i<parameterStrings.length; i++) {
                var parametersData=parameterStrings[i].split('=');
                var parameterName=parametersData[0];
                var value=parametersData[1];
                customParameters[parameterName]=value;
            }
        }
    }
    return  customParameters;
}
