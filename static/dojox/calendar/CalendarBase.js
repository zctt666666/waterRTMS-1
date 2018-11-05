//>>built
define("dojox/calendar/CalendarBase","dojo/_base/declare dojo/_base/sniff dojo/_base/event dojo/_base/lang dojo/_base/array dojo/cldr/supplemental dojo/dom dojo/dom-class dojo/dom-style dojo/dom-construct dojo/dom-geometry dojo/date dojo/date/locale dojo/_base/fx dojo/fx dojo/on dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin ./StoreMixin ./StoreManager dojox/widget/_Invalidating dojox/widget/Selection ./time dojo/i18n!./nls/buttons".split(" "),function(v,k,G,f,p,H,I,r,g,w,x,
t,y,q,z,h,A,B,C,D,u,E,F,l,m){return v("dojox.calendar.CalendarBase",[A,B,C,D,E,F],{baseClass:"dojoxCalendar",datePackage:t,startDate:null,endDate:null,date:null,minDate:null,maxDate:null,dateInterval:"week",dateIntervalSteps:1,viewContainer:null,firstDayOfWeek:-1,formatItemTimeFunc:null,editable:!0,moveEnabled:!0,resizeEnabled:!0,columnView:null,matrixView:null,columnViewProps:null,matrixViewProps:null,createOnGridClick:!1,createItemFunc:null,currentView:null,_currentViewIndex:-1,views:null,_calendar:"gregorian",
constructor:function(a){this.views=[];this.invalidatingProperties="store items startDate endDate views date minDate maxDate dateInterval dateIntervalSteps firstDayOfWeek".split(" ");a=a||{};this._calendar=a.datePackage?a.datePackage.substr(a.datePackage.lastIndexOf(".")+1):this._calendar;this.dateModule=a.datePackage?f.getObject(a.datePackage,!1):t;this.dateClassObj=this.dateModule.Date||Date;this.dateLocaleModule=a.datePackage?f.getObject(a.datePackage+".locale",!1):y;this.invalidateRendering();
this.storeManager=new u({owner:this,_ownerItemsProperty:"items"});this.storeManager.on("layoutInvalidated",f.hitch(this,this._refreshItemsRendering));this.storeManager.on("renderersInvalidated",f.hitch(this,this._updateRenderers));this.storeManager.on("dataLoaded",f.hitch(this,function(a){this.set("items",a)}));this.decorationStoreManager=new u({owner:this,_ownerItemsProperty:"decorationItems"});this.decorationStoreManager.on("layoutInvalidated",f.hitch(this,this._refreshDecorationItemsRendering));
this.decorationStoreManager.on("dataLoaded",f.hitch(this,function(a){this.set("decorationItems",a)}))},buildRendering:function(){this.inherited(arguments);null!=this.views&&0!=this.views.length||this.set("views",this._createDefaultViews())},_applyAttributes:function(){this._applyAttr=!0;this.inherited(arguments);delete this._applyAttr},_setStartDateAttr:function(a){this._set("startDate",a);this._startDateChanged=this._timeRangeInvalidated=!0},_setEndDateAttr:function(a){this._set("endDate",a);this._endDateChanged=
this._timeRangeInvalidated=!0},_setDateAttr:function(a){this._set("date",a);this._dateChanged=this._timeRangeInvalidated=!0},_setDateIntervalAttr:function(a){this._set("dateInterval",a);this._timeRangeInvalidated=!0},_setDateIntervalStepsAttr:function(a){this._set("dateIntervalSteps",a);this._timeRangeInvalidated=!0},_setFirstDayOfWeekAttr:function(a){this._set("firstDayOfWeek",a);null!=this.get("date")&&"week"==this.get("dateInterval")&&(this._timeRangeInvalidated=!0)},_setTextDirAttr:function(a){p.forEach(this.views,
function(b){b.set("textDir",a)})},refreshRendering:function(){this.inherited(arguments);this._validateProperties()},_refreshItemsRendering:function(){this.currentView&&this.currentView._refreshItemsRendering()},_updateRenderers:function(a){this.currentView&&this.currentView.updateRenderers(a)},_refreshDecorationItemsRendering:function(){this.currentView&&this.currentView._refreshDecorationItemsRendering()},resize:function(a){a&&x.setMarginBox(this.domNode,a);this.currentView&&this.currentView.resize()},
_validateProperties:function(){var a=this.dateModule,b=this.get("startDate"),c=this.get("endDate"),d=this.get("date");(-1>this.firstDayOfWeek||6<this.firstDayOfWeek)&&this._set("firstDayOfWeek",0);var e=this.get("minDate"),n=this.get("maxDate");e&&n&&0<a.compare(e,n)&&(this._set("minDate",n),this._set("maxDate",e));null!=d||null==b&&null==c?(null==this.date&&(this._set("date",new this.dateClassObj),this._timeRangeInvalidated=!0),b=this.get("dateInterval"),"day"!=b&&"week"!=b&&"month"!=b&&(this._set("dateInterval",
"day"),this._timeRangeInvalidated=!0),b=this.get("dateIntervalSteps"),f.isString(b)&&(b=parseInt(b),this._set("dateIntervalSteps",b)),0>=b&&(this.set("dateIntervalSteps",1),this._timeRangeInvalidated=!0)):(null==b&&(b=new this.dateClassObj,this._set("startDate",b),this._timeRangeInvalidated=!0),null==c&&(c=new this.dateClassObj,this._set("endDate",c),this._timeRangeInvalidated=!0),0<a.compare(b,c)&&(c=a.add(b,"day",1),this._set("endDate",c),this._timeRangeInvalidated=!0));if(this._timeRangeInvalidated)if(this._timeRangeInvalidated=
!1,b=this.computeTimeInterval(),null==this._timeInterval||0!=a.compare(this._timeInterval[0],b[0])||0!=a.compare(this._timeInterval[1],b[1])){if(this._dateChanged)this._lastValidDate=this.get("date"),this._dateChanged=!1;else if(this._startDateChanged||this._endDateChanged)this._lastValidStartDate=this.get("startDate"),this._lastValidEndDate=this.get("endDate"),this._endDateChanged=this._startDateChanged=!1;this.onTimeIntervalChange({oldStartTime:null==this._timeInterval?null:this._timeInterval[0],
oldEndTime:null==this._timeInterval?null:this._timeInterval[1],startTime:b[0],endTime:b[1]});this._timeInterval=b;a=this.dateModule.difference(this._timeInterval[0],this._timeInterval[1],"day");c=this._computeCurrentView(b[0],b[1],a);d=p.indexOf(this.views,c);null!=c&&-1!=d&&this._performViewTransition(c,d,b,a)}else if(this._dateChanged)this._dateChanged=!1,null!=this.lastValidDate&&this._set("date",this.lastValidDate);else if(this._startDateChanged||this._endDateChanged)this._endDateChanged=this._startDateChanged=
!1,this._set("startDate",this._lastValidStartDate),this._set("endDate",this._lastValidEndDate)},_performViewTransition:function(a,b,c,d){var e=this.currentView;if(this.animateRange&&(!k("ie")||8<k("ie")))if(e){e.beforeDeactivate();var n=this.isLeftToRight(),g="left"==this._animRangeInDir||null==this._animRangeInDir,h="left"==this._animRangeOutDir||null==this._animRangeOutDir;this._animateRange(this.currentView.domNode,h&&n,!1,0,h?-100:100,f.hitch(this,function(){e.afterDeactivate();a.beforeActivate();
this.animateRangeTimer=setTimeout(f.hitch(this,function(){this._applyViewChange(a,b,c,d);this._animateRange(this.currentView.domNode,g&&n,!0,g?-100:100,0,function(){a.afterActivate()});this._animRangeOutDir=this._animRangeInDir=null}),100)}))}else a.beforeActivate(),this._applyViewChange(a,b,c,d),a.afterActivate();else e&&e.beforeDeactivate(),a.beforeActivate(),this._applyViewChange(a,b,c,d),e&&e.afterDeactivate(),a.afterActivate()},onViewConfigurationChange:function(a){},_applyViewChange:function(a,
b,c,d){this._configureView(a,b,c,d);this.onViewConfigurationChange(a);b!=this._currentViewIndex&&(null==this.currentView?(a.set("items",this.items),a.set("decorationItems",this.decorationItems),this.set("currentView",a)):null==this.items||0==this.items.length?(this.set("currentView",a),this.animateRange&&(!k("ie")||8<k("ie"))&&g.set(this.currentView.domNode,"opacity",0),a.set("items",this.items),a.set("decorationItems",this.decorationItems)):(this.currentView=a,a.set("items",this.items),a.set("decorationItems",
this.decorationItems),this.set("currentView",a),this.animateRange&&(!k("ie")||8<k("ie"))&&g.set(this.currentView.domNode,"opacity",0)))},_timeInterval:null,computeTimeInterval:function(){var a=this.get("date"),b=this.get("minDate"),c=this.get("maxDate"),d=this.dateModule;if(null==a){var a=this.get("startDate"),e=d.add(this.get("endDate"),"day",1);if(null!=b||null!=c){var f=this.dateModule.difference(a,e,"day");0<d.compare(b,a)&&(a=b,e=d.add(a,"day",f));0>d.compare(c,e)&&(e=c,a=d.add(e,"day",-f));
0<d.compare(b,a)&&(a=b,e=c)}return[this.floorToDay(a),this.floorToDay(e)]}a=this._computeTimeIntervalImpl(a);null!=b&&(b=this._computeTimeIntervalImpl(b),0<d.compare(b[0],a[0])&&(a=b));null!=c&&(c=this._computeTimeIntervalImpl(c),0>d.compare(c[1],a[1])&&(a=c));return a},_computeTimeIntervalImpl:function(a){var b=this.dateModule;a=this.floorToDay(a);var c=this.get("dateInterval"),d=this.get("dateIntervalSteps");switch(c){case "day":b=b.add(a,"day",d);break;case "week":a=this.floorToWeek(a);b=b.add(a,
"week",d);break;case "month":a.setDate(1);b=b.add(a,"month",d);break;default:b=b.add(a,"day",1)}return[a,b]},onTimeIntervalChange:function(a){},views:null,_setViewsAttr:function(a){if(!this._applyAttr)for(var b=0;b<this.views.length;b++)this._onViewRemoved(this.views[b]);if(null!=a)for(b=0;b<a.length;b++)this._onViewAdded(a[b]);this._set("views",null==a?[]:a.concat())},_getViewsAttr:function(){return this.views.concat()},_createDefaultViews:function(){},addView:function(a,b){if(0>=b||b>this.views.length)b=
this.views.length;this.views.splice(b,a);this._onViewAdded(a)},removeView:function(a){0>index||index>=this.views.length||(this._onViewRemoved(this.views[index]),this.views.splice(index,1))},_onViewAdded:function(a){a.owner=this;a.buttonContainer=this.buttonContainer;a._calendar=this._calendar;a.datePackage=this.datePackage;a.dateModule=this.dateModule;a.dateClassObj=this.dateClassObj;a.dateLocaleModule=this.dateLocaleModule;g.set(a.domNode,"display","none");r.add(a.domNode,"view");w.place(a.domNode,
this.viewContainer);this.onViewAdded(a)},onViewAdded:function(a){},_onViewRemoved:function(a){a.owner=null;a.buttonContainer=null;r.remove(a.domNode,"view");this.viewContainer.removeChild(a.domNode);this.onViewRemoved(a)},onViewRemoved:function(a){},_setCurrentViewAttr:function(a){var b=p.indexOf(this.views,a);if(-1!=b){var c=this.get("currentView");this._currentViewIndex=b;this._set("currentView",a);this._showView(c,a);this.onCurrentViewChange({oldView:c,newView:a})}},_getCurrentViewAttr:function(){return this.views[this._currentViewIndex]},
onCurrentViewChange:function(a){},_configureView:function(a,b,c,d){b=this.dateModule;if("columns"==a.viewKind)a.set("startDate",c[0]),a.set("columnCount",d);else if("matrix"==a.viewKind)if(7<d){var e=this.floorToWeek(c[0]);d=this.floorToWeek(c[1]);0!=b.compare(d,c[1])&&(d=this.dateModule.add(d,"week",1));d=this.dateModule.difference(e,d,"day");a.set("startDate",e);a.set("columnCount",7);a.set("rowCount",Math.ceil(d/7));a.set("refStartTime",c[0]);a.set("refEndTime",c[1])}else a.set("startDate",c[0]),
a.set("columnCount",d),a.set("rowCount",1),a.set("refStartTime",null),a.set("refEndTime",null)},_computeCurrentView:function(a,b,c){return 7>=c?this.columnView:this.matrixView},matrixViewRowHeaderClick:function(a){var b=this.matrixView.getExpandedRowIndex();if(b==a.index)this.matrixView.collapseRow();else if(-1==b)this.matrixView.expandRow(a.index);else{var c=this.matrixView.on("expandAnimationEnd",f.hitch(this,function(){c.remove();this.matrixView.expandRow(a.index)}));this.matrixView.collapseRow()}},
columnViewColumnHeaderClick:function(a){0==this.dateModule.compare(a.date,this._timeInterval[0])&&"day"==this.dateInterval&&1==this.dateIntervalSteps?this.set("dateInterval","week"):(this.set("date",a.date),this.set("dateInterval","day"),this.set("dateIntervalSteps",1))},viewChangeDuration:0,_showView:function(a,b){null!=a&&g.set(a.domNode,"display","none");null!=b&&(g.set(b.domNode,"display","block"),b.resize(),(!k("ie")||7<k("ie"))&&g.set(b.domNode,"opacity","1"))},_setItemsAttr:function(a){this._set("items",
a);this.currentView&&(this.currentView.set("items",a),this._isEditing||this.currentView.invalidateRendering())},_setDecorationItemsAttr:function(a){this._set("decorationItems",a);this.currentView&&(this.currentView.set("decorationItems",a),this.currentView.invalidateRendering())},_setDecorationStoreAttr:function(a){this._set("decorationStore",a);this.decorationStore=a;this.decorationStoreManager.set("store",a)},floorToDay:function(a,b){return l.floorToDay(a,b,this.dateClassObj)},floorToWeek:function(a){return l.floorToWeek(a,
this.dateClassObj,this.dateModule,this.firstDayOfWeek,this.locale)},newDate:function(a){return l.newDate(a,this.dateClassObj)},isToday:function(a){return l.isToday(a,this.dateClassObj)},isStartOfDay:function(a){return l.isStartOfDay(a,this.dateClassObj,this.dateModule)},floorDate:function(a,b,c,d){return l.floor(a,b,c,d,this.classFuncObj)},isOverlapping:function(a,b,c,d,e,f){return l.isOverlapping(a,b,c,d,e,f)},animateRange:!0,animationRangeDuration:400,_animateRange:function(a,b,c,d,e,f){this.animateRangeTimer&&
(clearTimeout(this.animateRangeTimer),delete this.animateRangeTimer);b=c?q.fadeIn:q.fadeOut;g.set(a,{left:d+"px",right:-d+"px"});z.combine([q.animateProperty({node:a,properties:{left:e,right:-e},duration:this.animationRangeDuration/2,onEnd:f}),b({node:a,duration:this.animationRangeDuration/2})]).play()},_animRangeOutDir:null,_animRangeOutDir:null,nextRange:function(){this._animRangeOutDir="left";this._animRangeInDir="right";this._navigate(1)},previousRange:function(){this._animRangeOutDir="right";
this._animRangeInDir="left";this._navigate(-1)},_navigate:function(a){var b=this.get("date"),c=this.dateModule;if(null==b){var b=this.get("startDate"),d=this.get("endDate"),e=c.difference(b,d,"day");1==a?(d=c.add(d,"day",1),this.set("startDate",d),this.set("endDate",c.add(d,"day",e))):(b=c.add(b,"day",-1),this.set("startDate",c.add(b,"day",-e)),this.set("endDate",b))}else d=this.get("dateInterval"),e=this.get("dateIntervalSteps"),this.set("date",c.add(b,d,a*e))},goToday:function(){this.set("date",
this.floorToDay(new this.dateClassObj,!0));this.set("dateInterval","day");this.set("dateIntervalSteps",1)},postCreate:function(){this.inherited(arguments);this.configureButtons()},configureButtons:function(){var a=!this.isLeftToRight();this.previousButton&&(this.previousButton.set("label",m[a?"nextButton":"previousButton"]),this.own(h(this.previousButton,"click",f.hitch(this,this.previousRange))));this.nextButton&&(this.nextButton.set("label",m[a?"previousButton":"nextButton"]),this.own(h(this.nextButton,
"click",f.hitch(this,this.nextRange))));a&&this.previousButton&&this.nextButton&&(a=this.previousButton,this.previousButton=this.nextButton,this.nextButton=a);this.todayButton&&(this.todayButton.set("label",m.todayButton),this.own(h(this.todayButton,"click",f.hitch(this,this.todayButtonClick))));this.dayButton&&(this.dayButton.set("label",m.dayButton),this.own(h(this.dayButton,"click",f.hitch(this,this.dayButtonClick))));this.weekButton&&(this.weekButton.set("label",m.weekButton),this.own(h(this.weekButton,
"click",f.hitch(this,this.weekButtonClick))));this.fourDaysButton&&(this.fourDaysButton.set("label",m.fourDaysButton),this.own(h(this.fourDaysButton,"click",f.hitch(this,this.fourDaysButtonClick))));this.monthButton&&(this.monthButton.set("label",m.monthButton),this.own(h(this.monthButton,"click",f.hitch(this,this.monthButtonClick))))},todayButtonClick:function(a){this.goToday()},dayButtonClick:function(a){null==this.get("date")&&this.set("date",this.floorToDay(new this.dateClassObj,!0));this.set("dateInterval",
"day");this.set("dateIntervalSteps",1)},weekButtonClick:function(a){this.set("dateInterval","week");this.set("dateIntervalSteps",1)},fourDaysButtonClick:function(a){this.set("dateInterval","day");this.set("dateIntervalSteps",4)},monthButtonClick:function(a){this.set("dateInterval","month");this.set("dateIntervalSteps",1)},updateRenderers:function(a,b){this.currentView&&this.currentView.updateRenderers(a,b)},getIdentity:function(a){return a?a.id:null},_setHoveredItem:function(a,b){if(this.hoveredItem&&
a&&this.hoveredItem.id!=a.id||null==a||null==this.hoveredItem){var c=this.hoveredItem;this.hoveredItem=a;this.updateRenderers([c,this.hoveredItem],!0);a&&b&&this.currentView._updateEditingCapabilities(a._item?a._item:a,b)}},hoveredItem:null,isItemHovered:function(a){return null!=this.hoveredItem&&this.hoveredItem.id==a.id},isItemEditable:function(a,b){return this.editable},isItemMoveEnabled:function(a,b){return this.isItemEditable(a,b)&&this.moveEnabled},isItemResizeEnabled:function(a,b){return this.isItemEditable(a,
b)&&this.resizeEnabled},onGridClick:function(a){},onGridDoubleClick:function(a){},onItemClick:function(a){},onItemDoubleClick:function(a){},onItemContextMenu:function(a){},onItemEditBegin:function(a){},onItemEditEnd:function(a){},onItemEditBeginGesture:function(a){},onItemEditMoveGesture:function(a){},onItemEditResizeGesture:function(a){},onItemEditEndGesture:function(a){},onItemRollOver:function(a){},onItemRollOut:function(a){},onColumnHeaderClick:function(a){},onRowHeaderClick:function(a){},onExpandRendererClick:function(a){},
_onRendererCreated:function(a){this.onRendererCreated(a)},onRendererCreated:function(a){},_onRendererRecycled:function(a){this.onRendererRecycled(a)},onRendererRecycled:function(a){},_onRendererReused:function(a){this.onRendererReused(a)},onRendererReused:function(a){},_onRendererDestroyed:function(a){this.onRendererDestroyed(a)},onRendererDestroyed:function(a){},_onRenderersLayoutDone:function(a){this.onRenderersLayoutDone(a)},onRenderersLayoutDone:function(a){}})});