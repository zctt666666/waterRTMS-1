//>>built
define("dojox/drawing/annotations/Label",["exports","dojo/_base/lang","../util/oo","../stencil/Text"],function(f,e,g,h){f.Label=g.declare(h,function(a){this.master=a.stencil;this.labelPosition=a.labelPosition||"BR";e.isFunction(this.labelPosition)&&(this.setLabel=this.setLabelCustom);this.setLabel(a.text||"");this.connect(this.master,"onTransform",this,"setLabel");this.connect(this.master,"destroy",this,"destroy");this.style.labelSameColor&&this.connect(this.master,"attr",this,"beforeAttr")},{_align:"start",
drawingType:"label",setLabelCustom:function(a){var b=e.hitch(this.master,this.labelPosition)();this.setData({x:b.x,y:b.y,width:b.w||this.style.text.minWidth,height:b.h||this._lineHeight});a&&!a.split&&(a=this.getText());this.render(this.typesetter(a))},setLabel:function(a){var b,c,d=this.master.getBounds();c=/B/.test(this.labelPosition)?d.y2-this._lineHeight:d.y1;/R/.test(this.labelPosition)?b=d.x2:(c=d.y1,this._align="end");!this.labelWidth||a&&a.split&&a!=this.getText()?(this.setData({x:b,y:c,height:this._lineHeight,
width:this.style.text.minWidth}),this.labelWidth=this.style.text.minWidth,this.render(this.typesetter(a))):(this.setData({x:b,y:c,height:this.data.height,width:this.data.width}),this.render())},beforeAttr:function(a,b){if(void 0!==b){var c=a;a={};a[c]=b}delete a.x;delete a.y;delete a.width;delete a.height;this.attr(a);!this.created&&this.render()}})});