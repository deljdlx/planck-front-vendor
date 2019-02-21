Khi.AjaxForm = function (selector, options)
{

    this.extraData = {};

    var options = $.extend({
        inputSelector: '.form-data'
    }, options);

    this.options = options;

    this.events = {
        submit: this.submit.bind(this),
        beforeSubmit: function(instance) {
            return true;
        },
        afterSubmit: function(instance) {
       }
    };

    this.formElement = $(selector);


    this.formElement.on('submit', function(event) {
        this.events.submit();
        return false;
    }.bind(this));

};


Khi.AjaxForm.prototype.addData = function(key, value)
{
    this.extraData[key] = value;
    return this;
};

Khi.AjaxForm.prototype.on = function(eventName, callback)
{
   this.events[eventName]  = callback;
   return this;
};



Khi.AjaxForm.prototype.reset = function()
{
   this.formElement.get(0).reset();
   return this;
};

Khi.AjaxForm.prototype.getData = function()
{
    var inputs = this.formElement.find(this.options.inputSelector);
    var data = {};

    $(inputs).each(function(index, input) {
        var value = $(input).val();
        var name = $(input).attr('name');
        if(!name) {
            return;
        }

        //array value
        if(name.match(/\[\]/)) {

            if(!isset(data[name])) {
                data[name] = [];
            }
            if($(input).attr('type') =='checkbox') {
                if($(input).prop('checked')) {
                    data[name].push(value);
                }
                else {
                    //data[name].push(0);
                }
            }
            else {
                data[name].push(value);
            }
        }
        else {
            if($(input).attr('type') =='radio' || $(input).attr('type') =='checkbox') {
                if($(input).prop('checked')) {
                    data[name]= value;
                }
                else {
                    data[name]= 0;
                }
            }
            else {
                data[name] = value;
            }
        }

    });

    return data;
};


Khi.AjaxForm.prototype.submit = function()
{

    if(!this.events.beforeSubmit(this)) {
        return false;
    }

    var url = this.formElement.attr('action');
    var method = this.formElement.attr('method');
    var data = $.extend(this.extraData, this.getData());


    Khi.ajax({
        url: url,
        method: method,
        data: data,
        success: function(data) {
            console.log(data);
            this.events.afterSubmit(data, this);
        }.bind(this)
    });
};