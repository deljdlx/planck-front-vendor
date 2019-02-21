
class RichBlot extends BlockEmbed
{

	static create(value)
	{
		
		
		let node = super.create();
		node.setAttribute('contenteditable', false);
		
		console.log(value);
		node.setAttribute('data-attributes', JSON.stringify(value));

		return node;
	}


	static wrap(content)
	{
		var wrapped =
			'<'+this.componentTagWrapper+' class="'+this.componentClassName+'" contenteditable="false">'+
				this.getToolbar()+
				'<div class="content">'+
					content
				'</div>'+
			'</'+this.componentTagWrapper+'>';
			
		return wrapped;
	}
	
	static getToolbar()
	{
		return '<div class="'+this.toolbarClassName+'">'+
			'<i class="button button-edit fas fa-pen-square"></i>'+
			'<i class="button button-delete fas fa-minus-square"></i>'+
		'</div>';	
	}
	
	static getAttributesFromNode(node)
	{
		return JSON.parse(node.getAttribute('data-attributes'));
	}

	static value(node)
	{
  
  
		return RichBlot.getAttributesFromNode(node);
	}

	static formats(node)
	{	
		return RichBlot.getAttributesFromNode(node);
	} 
	
	
    constructor(domNode) {
        super(domNode);
		
		this.userAttributes = RichBlot.getAttributesFromNode(domNode);
	
        $(domNode).find('.button-delete').on('click', this.deleteHandler.bind(this));
		$(domNode).find('.button-edit').on('click', this.editHandler.bind(this));
				
    }
	
	
	getDescriptor()
	{
		return this.__proto__.statics.attributesDescriptors;
	}
	
	
	deleteHandler(event) {
		this.remove()
	}
	
	
    editHandler(event) {
		//var value = prompt('Content', this.content);
        console.log("ClickableSpan was clicked. Blot: ", this);
		
		console.log('instance class name : '+this.constructor.name);
		
		
		var dialog = new RichBlotDialog(this);
		dialog.onValidate(function(data) {
			dialog.close();
			
			this.userAttributes = data;
			this.updateNode();
			
			//quill.format('plk-code', data);
			//console.log(quill.getContents());
		}.bind(this));
		
		dialog.show(this.getDescriptor());
    }
	
	updateNode()
	{
		this.domNode.setAttribute(
			'data-attributes',
			JSON.stringify(this.userAttributes)
		);
	}

}

RichBlot.toolbarClassName = 'toolbar';
RichBlot.componentTagWrapper = 'div';
RichBlot.componentClassName = 'plk-component';
