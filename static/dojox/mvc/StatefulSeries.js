//>>built
define("dojox/mvc/StatefulSeries",["dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojox/mvc/at"],function(l,m,a,n){return m("dojox.mvc.StatefulSeries",null,{constructor:function(f){function g(){d.series&&(d.series.chart.updateSeries(d.series.name,d),d.series.chart.delayedRender())}var d=this;this._handles=[];this.data=l.map(f,function(c,f){if("dojox.mvc.at"==(c||{}).atsignature){var b=c.target,e=c.targetProp;if(a.isString(b))throw Error("Literal-based dojox/mvc/at is not supported in dojox/mvc/StatefulSeries.");
!c.bindDirection||c.bindDirection&n.from||console.warn("Data binding bindDirection option is ignored in dojox/mvc/StatefulSeries.");if(e&&a.isFunction(b.set)&&a.isFunction(b.watch)){var h=c.converter,k=(h||{}).format&&a.hitch({target:b,source:this},h.format);this._handles.push(b.watch(e,function(b,c,a){d.data[f]=k?k(a):a;g()}))}return e?a.isFunction(b.get)?b.get(e):b[e]:b}return c},this);g()},destroy:function(){for(var a=null;a=this._handles.pop();)a.unwatch()},setSeriesObject:function(a){this.series=
a}})});