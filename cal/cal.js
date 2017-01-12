;(function ($, window, document, undefined) {
	var pluginName = 'JDCal',
		varsion = '0.0.1',
		_DATE = new Date(),
		arr_mnth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		arr_day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],			
		//scrollValue = 0,
		defaults = {
			date: 1,
			month: _DATE.getMonth(),
			year: _DATE.getFullYear(),
			customDates : [],
			dateLimit: 1,
			futureDates: false,
			displayMonthName: true,
			displayMonths:true,
			controls:false,
			control:{
				nxtHtml : 'Next',
				prvHtml : 'Prev'
			},
			appendLimit: {
				year: _DATE.getFullYear(),
				month: 11,
				date: 1
			},
			_onDayClick: function ($el, data) {
				return false;
			},
			evDates: []
		};		

	//to compare date, set current date to 00:00:00
	_DATE.setSeconds(0);
	_DATE.setHours(0);
	_DATE.setMinutes(0);
	
	//Constructor
	function JDCal(element, options) {
		this.version = varsion;
		this.element = element;
		this.options = $.extend({}, defaults, options);	
		this._defaults = defaults;
		this._name = pluginName;
		this.scrollValue = 0;		
		if(typeof(options) == 'object'){
			//Call Init
			this._init();			
		}else if(typeof(options) == 'string'){
			
			//Call Public methods
			switch(options){
				case 'update' : {
						setDateBlockWidth($(this.element));
						//console.log('updated');
					}
					break;
				case 'destroy' : {
						$(this.element).html('');
						//console.log('destroyed');
					}
					break;
				default : 
					//do nothing
					break;
			}
		};
	};

	//private methods
	JDCal.prototype = {
		_init: function () {
			
			var mnthHtml = (this.options.displayMonths) ? '<div class="mWrap"><div class="months"></div></div>' : '',	
			    ctrlHtml = (this.options.controls) ? '<div class="controls">' + 
															'<a class="prv" href="javascript:void(0)">'+this.options.control.prvHtml+'</a> ' + 
															'<a class="nxt" href="javascript:void(0)">'+this.options.control.nxtHtml+'</a>' + 
													'</div>' : '';
			var $el = $(this.element),
				_html = "",
				lastDate = "",
				_htmlMnth = "",
				htmlCode = {
				coreHtml : 	mnthHtml +
							'<div class="cur-mnth"><span class="m"></span><ul></ul></div>' +
							'<div class="calwrp">'+
								'<div class="pointer"></div>'+
								'<div class="mainCalendar">'+
									'<div class="dw"></div>'+
								'</div>'+
							'</div>'+
							ctrlHtml,
				evDateHtml: '<span class="evt-tringle" style="display: block;"></span>'
			};
			
			$el.append(htmlCode.coreHtml);
			var $dW = $el.find('.dw'),
				$mainCal = $el.find('.mainCalendar'),
				curM = _DATE.getMonth();
			
			if(this.options.customDates.length){
				var cD = this.options.customDates,
					loop = 0,
					lastDateIndex = cD.length,
					inc = 0,
					lastDate = cD[cD.length-1] +"T00:00:00",
					_dString = '',
					_d;
				
				loop = (cD.length < 8) ? 7 : cD.length;
				//loop = cD.length;
				for(var i = 0 ; i < loop; i++ ){
					
					if((i+1) > cD.length){
						isDisabled = 'disabled';
						_d = new Date(lastDate);						
						inc++;						
						_d = new Date(_d.getFullYear(),_d.getMonth(),_d.getDate() + inc);						
					}else{
						isDisabled='';
						_dString = cD[i] + "T00:00:00";
						_d = new Date(_dString);
					};
					//console.log(_d);
					//console.log(cD[cD.length-1] +"T00:00:00");
					//_dString = cD[i] + "T00:00:00",
					//_d = new Date(_dString),
					var _dDate = _d.getDate(),
					_dDay = _d.getDay(),
					_dMonth = _d.getMonth() + 1,
					_dYear = _d.getFullYear();
					
					

					_html += "<a class=\"date-block "+isDisabled+"\" href=\"javascript:void(0)\" data-day-name=\""+ arr_day[_dDay] +"\" data-date=\"" + _dDate + "\" data-month=\"" + _dMonth + "\" data-year=\"" + _dYear + "\" >";
						
						_html += "<span class=\"date\">" + _dDate + "</span>";
						_html += "<span class=\"day\">" + arr_day[_dDay] + "</span>";
						_html += (this.options.displayMonthName) ? "<span class=\"month\">" + arr_mnth[_d.getMonth()] + "</span>" : "";
					
					_html += "</a>";
				}
				
				
				
			}else{
				for (var i = this.options.date; i < (this.options.dateLimit + this.options.date); i++) {
					var _d = new Date(this.options.year, this.options.month, i),
						_dd = _d.getDate(),
						_dm = _d.getMonth() + 1,
						_dy = _d.getFullYear();

					var dClass = (_d.toString() == _DATE.toString()) ? 'date-block date-today' : 'date-block';

					_html += "<a class=\"" + dClass + "\" href=\"javascript:void(0)\" data-day-name=\""+ arr_day[_d.getDay()] +"\" data-date=\"" + _dd + "\" data-month=\"" + _dm + "\" data-year=\"" + _dy + "\" >";
					_html += "<span class=\"date\">" + _d.getDate() + "</span>";
					_html += "<span class=\"day\">" + arr_day[_d.getDay()] + "</span>";
					_html += (this.options.displayMonthName) ? "<span class=\"month\">" + arr_mnth[_d.getMonth()] + "</span>" : "";
					_html += "</a>";
				}
			}
			
			$dW.html(_html);
			setDateBlockWidth($el);
					
			//resize
			$(window).on('resize',function(){
				setDateBlockWidth($el);
				scrollToMiddle($el,'days');
			});
			
			//Call methods
			if(this.options.controls){
				this._controlClick();
			}
			if(this.options.displayMonths){
				this._displayMonths();
			}
			this._dayClick();
			this._scroll();
			this._monthClick();
			
		}, //init ends
		_displayMonths : function(){
			var $el = $(this.element),
				$mainCal = $el.find('.mainCalendar'),
				$months = $el.find('.months'),
				_htmlMnth = '',
				curMonth = _DATE.getMonth(),
				nxtMnth = 0;
			_htmlMnth += '<div class="mW">';
			for(var i = 0 ; i < 12 ; i++){
				
				var curClass = (i == curMonth) ? 'active' : '' ;
				_htmlMnth += "<a class=\"month\ "+curClass+"\" href=\"javascript:vaoid(0)\" data-month=\""+ (i+1) +"\">";
					_htmlMnth += arr_mnth[i];
				 _htmlMnth += "</a>";
				nxtMnth++;
			}
			_htmlMnth +='</div>';
			
			$months.html(_htmlMnth);					
		},
		_monthClick : function(){
			
			var $self = this,
				$el = $(this.element),
				$mainCal = $el.find('.mainCalendar'),
				curM = _DATE.getMonth();
			
			/* Current month */
			$el.find(".cur-mnth .m").html(arr_mnth[curM]);
			var cm = curM;
			for(var i = 0 ; i < 3 ; i++){				
				$el.find(".cur-mnth ul").append('<li data-val="'+(cm + 1)+'">'+ arr_mnth[cm] +'</li>');
				cm++;
			}
			
			$el.find('.cur-mnth .m').click(function(){
				$(this).parent().find('ul').slideDown(300);//.fadeIn(100);
			});
			
			$el.find('.cur-mnth ul li').click(function(){
				//console.log(arr_mnth[$(this).attr('data-val') - 1]);
				
				$(this).parent().slideUp(300);//.fadeOut(100);
				//$el.find('.cur-mnth .m').html(arr_mnth[$(this).attr('data-val') - 1]);
								
				var $eel = $($el.find('.date-block[data-month='+ ($(this).attr('data-val')) +']')[0]);
				$mainCal.animate({scrollLeft:$eel.position().left},500,function(){
					$self.scrollValue = $mainCal.scrollLeft();
					//console.log("$mainCal.scrollLeft():"+$mainCal.scrollLeft());
					//console.log("scrollValue:"+$self.scrollValue);					
				});
			});
		},
		_controlClick : function(){
			var //(this.scrollingValue) = scrollValue,
				$self = this,
				$el = $(this.element),
				$mainCal = $el.find('.mainCalendar');
			
			//Control Click
			$el.on('click','.nxt',function(){				
				var addAgent = $mainCal.find('.date-block').outerWidth() * 7; //7 for week
					
				if($self.scrollValue >= ($mainCal.find('.dw').outerWidth() - addAgent )){			
					
				}else{
					$self.scrollValue += addAgent;
					$mainCal.animate({scrollLeft:$self.scrollValue},500,function(){
						
					});
				}
				//thisObj.scrollValue = thisObj.scrollValue;
				//console.log("next click: "+ $self.scrollValue);
			})
			.on('click','.prv',function(){				
				if($self.scrollValue <= 0){
					$self.scrollValue = 0;
				}else{
					var addAgent = $mainCal.find('.date-block').outerWidth() * 7;
					$self.scrollValue -= addAgent;
					$mainCal.animate({scrollLeft:$self.scrollValue},500,function(){
						
					});
				}
				//$self.scrollValue = scrollValue;
				//console.log("prev click: "+ $self.scrollValue);
			});
			
		},//control click ends
		_dayClick : function(){
			var $self = this,
				$el = $(this.element),
				$mainCal = $el.find('.mainCalendar');
			
			$el.on('click','a.date-block',function(){
				
				if(!$(this).hasClass('disabled')){
					var _this = $(this),
					_data = {
						_thisDay : $(this).attr("data-date"),
						_thisMonth :$(this).attr("data-month"),
						_thisYear : $(this).attr("data-year")
					};
					$el.find(".date-block").removeClass('active');
					$(this).addClass('active');		

					setTimeout(function(){						
						//scrollToMiddle($mainCal,'days');
						scrollToMiddle($el,'days');
						
						var test = $el.find(".date-block.active").position().left;
						$self.scrollValue = test - (($mainCal.find('.date-block').width() * 3) + 5);
						
					},300);	
					
					$self.options._onDayClick(_this,_data);
				};				
			});
		}, //day click ends
		_scroll: function () {
			var $self = this,
				$el = $(this.element),
				$mainCal = $el.find('.mainCalendar'),
				$dw = $el.find('.mainCalendar .dw'),
				timeoutId;		
			
			$mainCal.scroll(function(e){
				setDateBlockWidth($el);
				
				if (timeoutId) {
					clearTimeout(timeoutId);
				}
				timeoutId = setTimeout(function () {
					updateMonth($el);
				}, 100);
			
				//var targetScrollValue = $mainCal.scrollLeft() + ($mainCal.find('.date-block').width() * 3) + 5;
							
			});		
		}
	};

	//Public methods	
	function updateMonth(el){
		
		var $el = el,
			$mainCal = $el.find('.mainCalendar'),
			$dw = $el.find('.mainCalendar .dw');
			totalWidth = $dw.width(),
			totalLength = $dw.find('.date-block').length,
			singleBlockWidth = (totalWidth / totalLength),
			index = Math.ceil($mainCal.scrollLeft()/singleBlockWidth);
		
			$el.find('.cur-mnth .m').html(arr_mnth[$dw.find('.date-block').eq(index+3).attr('data-month') - 1]);		
			//console.log(arr_mnth[$dw.find('.date-block').eq(index+3).attr('data-month') - 1]);
	}	
	
	function setDateBlockWidth(el){
		var w = parseInt(el.width()/7);
		el.find('.date-block').css({width:w+'px'});
	}
	
	function scrollToMiddle(el,_case){
		switch(_case){
			//Scroll to middle for days
			case 'days' : {
					if(el.find('.date-block.active').length){
						var _targetOffset = el.find('.date-block.active').position().left - (el.find('.date-block').width() * 3) - 5;	
						//console.log('moving: '+el.find('.date-block.active').position().left+'px');
						el.find('.mainCalendar').animate({scrollLeft:_targetOffset},500,function(){
						
						});
					}
				}
				break;
			//Scroll to middle for months
			case 'months' : {
					if(el.find('.month.active').length){
						var _targetOffset = el.find('.month.active').position().left - (el.find('.month').width() * 1);	
						el.animate({scrollLeft:_targetOffset},500);
					}				
				}
				break;
		}
	}

	// Plugin
	$.fn[pluginName] = function (options,callback) {		
		 this.each(function () {						 
			if (!$.data(this, 'Plugin_' + pluginName)) {
				var d = $.data(this, 'plugin_' + pluginName, new JDCal(this, options));
				//return d;
			}
		});
		
		 if(typeof(callback) == 'function'){
			callback.call(this,this);
		 }		 
		//return this;
	};
})(jQuery, window, document);