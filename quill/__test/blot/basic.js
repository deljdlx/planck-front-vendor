
class UnderlineBlot extends Inline { }
UnderlineBlot.blotName = 'underline';
UnderlineBlot.tagName = 'u';
//Quill.register(UnderlineBlot);


class StrikeBlot extends Inline { }
StrikeBlot.blotName = 'strike';
StrikeBlot.tagName = 'strike';
//Quill.register(StrikeBlot);

class BoldBlot extends Inline { }
BoldBlot.blotName = 'bold';
BoldBlot.tagName = 'strong';
//Quill.register(BoldBlot);


class SupBlot extends Inline { }
SupBlot.blotName = 'sup';
SupBlot.tagName = 'sup';
Quill.register(SupBlot);

class H1Blot extends Block { }
H1Blot.blotName = 'h1';
H1Blot.tagName = 'h1';
Quill.register(H1Blot);

class H2Blot extends Block { }
H2Blot.blotName = 'h2';
H2Blot.tagName = 'h2';
Quill.register(H2Blot);


class ItalicBlot extends Inline {
};
ItalicBlot.blotName = 'em';
ItalicBlot.tagName = 'em';