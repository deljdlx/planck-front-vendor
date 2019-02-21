Khi = {};




Khi.ajax = function(options)
{
    return $.ajax(options);
};

Khi.isFunction = function(functionToCheck)
{
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
};


Khi.isString = function(element)
{

    if(typeof(element) == 'string') {
        return true;
    }
    return false;
};

Khi.isObject = function(element)
{
    if(typeof(element) == 'object') {
        return true;
    }
    return false;
};



Khi.pad=function(n)
{
    return n<10 ? '0'+n : n
};


function isset(variable) {
    if(typeof (variable) !== 'undefined') {
        return true;
    }
    return false;
}


Khi.removeAccents = function(strAccents) {
    var strAccents = strAccents.split('');
    var strAccentsOut = new Array();
    var strAccentsLen = strAccents.length;
    var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
    for (var y = 0; y < strAccentsLen; y++) {
        if (accents.indexOf(strAccents[y]) != -1) {
            strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
        } else
            strAccentsOut[y] = strAccents[y];
    }
    strAccentsOut = strAccentsOut.join('');
    return strAccentsOut;
}