Khi.ModuleLoader = function (application) {
    this.views = {};
    this.javascripts = {};
    this.css = {};


    this.application = application;
};


Khi.ModuleLoader.prototype.addView = function (name, content) {
    this.views[name] = content;
    return this;
};

Khi.ModuleLoader.prototype.addCSS = function (name, content) {
    this.css[name] = content;
    return this;
};

Khi.ModuleLoader.prototype.addJavascript = function (name, content) {
    this.javascripts[name] = content;
    return this;
};
Khi.ModuleLoader.prototype.getView = function (name) {
    if (typeof(this.views[name]) != 'undefined') {
        return this.views[name];
    }
    else {
        return false;
    }

};


Khi.ModuleLoader.prototype.loadData = function (data) {

    for (var name in data.views) {
        this.addView(name, data.views[name]);
    }
    for (var name in data.javascripts) {
        this.addJavascript(name, data.javascripts[name]);
    }
    for (var name in data.css) {
        this.addCSS(name, data.css[name]);
    }
    return this;
};


Khi.ModuleLoader.prototype.run = function (callback) {

    for (var name in this.css) {
        this.loadCSS(name);
    }
    this.loadJavascripts(callback);
};


Khi.ModuleLoader.prototype.loadJavascripts = function (endCallback) {
    var customCallback = function () {

        customCallback.nbScriptLoaded++;

        if (customCallback.nbScriptLoaded == customCallback.nbScript) {
            customCallback.endCallback();
        }
        else {
            console.log('loading js ' + customCallback.javascripts[customCallback.nbScriptLoaded].url);
            $.getScript(customCallback.javascripts[customCallback.nbScriptLoaded].url, customCallback).fail(function (jqxhr, settings, exception) {
                console.log(exception)
            });
        }


    };

    console.log(this.javascripts);

    customCallback.nbScript = Object.keys(this.javascripts).length
    customCallback.nbScriptLoaded = 0;
    customCallback.endCallback = endCallback;
    customCallback.javascripts = [];


    for (var name in this.javascripts) {
        customCallback.javascripts.push(this.javascripts[name]);
    }

    if (isset(customCallback.javascripts[0])) {
        $.getScript(customCallback.javascripts[0].url, customCallback);
    }
    else {
        endCallback();
    }

};


Khi.ModuleLoader.prototype.loadJavascript = function (name, callback) {
    $.getScript(this.javascripts[name].url, callback).fail(function (jqxhr, settings, exception) {
        console.log(exception)
    });
};

Khi.ModuleLoader.prototype.loadCSS = function (name) {
    $('head').append('<link rel="stylesheet" href="' + this.css[name].url + '" data-name="'+name+'"/>');
};


