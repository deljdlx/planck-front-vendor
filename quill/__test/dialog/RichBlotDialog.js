
class RichBlotDialog
{

	constructor(blot) {
	
		this.fields = {};

		this.blot = blot;
	
		this.element = $('<div class="rich-blot-dialog"></div>');
		
		this.events = {
			validate : function() {
			
			}
		}
	}
	
	onValidate(callback) {
		this.events.validate = callback;
		return this;
	}
	
	close() {
		this.dialog.dialog('close');
	}
	
	
	
	renderField(name, descriptor, value)
	{
		if(descriptor.type == 'text') {
			var input = new RichBlotTextarea(name, descriptor, value);
			return input;
		}
		else if(descriptor.type == 'select') {
			var input = new RichBlotSelect(name, descriptor, value);
			return input;
		}
		
	}


	show(descriptor) {
	
		console.log(descriptor);
		

		for(var attributeName in descriptor) {
			var attributeDescriptor = descriptor[attributeName];
			var value = '';
			if(this.blot) {
				//console.log('blot ok');
				//console.log(this.blot.userAttributes);
				//$(this.element).find('.content').val(this.blot.userAttributes.content);
				if(this.blot.userAttributes[attributeName]) {
					value = this.blot.userAttributes[attributeName]
				}
			}
			
			
			this.fields[attributeName] = this.renderField(attributeName, attributeDescriptor, value);						
		}
		
		for(attributeName in this.fields) {
			
			var field = this.fields[attributeName];
			
			this.element.append(field.getElement());
		
		}
	
	

		
		this.dialog = $(this.element).dialog({
			modal: true,
			buttons: {
				"Valider": function() {
					this.getContent();
				}.bind(this),
				"Annuler": function() {
					this.dialog.dialog( "close" );
				}.bind(this)
			}				
		});	
	}
	
	getContent() {
	
		var data = {};
		
		for(var attributeName in this.fields) {
			var field = this.fields[attributeName]
			data[attributeName] = field.getValue();
		}
		
		console.log(data);
		
		/*
		var data = {
			content: $(this.element).find('.content').val()
		};
		//alert(content);
		*/
		
		this.events.validate(data);
	}
}
