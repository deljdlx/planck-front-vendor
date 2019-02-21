


class CodeBlot extends RichBlot
{
	static create(value)
	{		
		let node = super.create(value);
	
		node.innerHTML= this.wrap(
			'<code data-attribute-name="+content">'+value.content+'</code>'
		);

		return node;
	}
	
	updateNode()
	{
		super.updateNode();
		console.log(
			$(this.domNode).find('code')
		);
		console.log(this.userAttributes);
		$(this.domNode).find('code').html(this.userAttributes.content);
	}
	
	
}

CodeBlot.blotName = 'plk-code';
CodeBlot.tagName = 'div';
CodeBlot.className = 'plk-component-code';
CodeBlot.attributesDescriptors = {
	content: {
		type: 'text'
	},
	language: {
		type: 'select',
		options: [
			{value: 'raw', label: 'Aucun'},
			{value: 'javascript', label: 'Javascript'},
			{value: 'php', label: 'PHP'}
		]
	}
	
}



