angular.module('myApp', [])

/* controllers
========================*/
.controller('MainController', ['$scope', function($scope) {

    }])
    .controller('DragController', ['$scope', function($scope) {

    }])


/* Factorys
IMP NOTE : dont inject $scope in service or else you 'll get 'MAD'
========================*/
.factory('DragService', [function() {
    var self = this;



    return this;
}])

//Touch service : require Modernizr
.factory('TouchService', [function() {
    return {
        isTouch: Modernizr.touchevents
    };
}])


/* Directives
========================*/
.directive('ngDragable', ['TouchService', function(TouchService) {

    var dragEls = [];
    var DragBoard = null,
        mouse_x = 0,
        mouse_y = 0,
        sl_top = 0,
        sl_left = 0;


    function _dragInit(el) {
		$(el).addClass('grabbing').removeClass('grab');
        DragBoard = el;
        sl_left = mouse_x - DragBoard.offsetLeft;
        sl_top = mouse_y - DragBoard.offsetTop;
    }

    function _moveElement(e) {

        if (TouchService.isTouch) {
			console.log(e.originalEvent.touches);
            mouse_x = e.originalEvent.touches[0].pageX;
            mouse_y = e.originalEvent.touches[0].pageY;
        } else {
            mouse_x = document.all ? window.event.clientX : e.pageX;
            mouse_y = document.all ? window.event.clientY : e.pageY;
        }

        if (DragBoard !== null) {

            DragBoard.style.left = (mouse_x - sl_left) + 'px';
            DragBoard.style.top = (mouse_y - sl_top) + 'px';
        }
    }

    function _destroyDragEl(el) {
		$(el).removeClass('grabbing').addClass('grab');
        DragBoard = null;
    }

	function action(el){
		if($(el).hasClass('resize-controll')){
            var resizeVal = $(el).attr('data-resize');
			return {action:'resize',resizeval:resizeVal};
		}else{
			return {action:'reposition'};
		}
	}

    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            dragEls.push(el[0]);
			var elHtml = '';
			elHtml += '<div class="grab-controll">';
				elHtml += '<span class="resize-controll resize-controll-top" data-resize="top"></span>';
				elHtml += '<span class="resize-controll resize-controll-right" data-resize="right"></span>';
				elHtml += '<span class="resize-controll resize-controll-bottom" data-resize="bottom"></span>';
				elHtml += '<span class="resize-controll resize-controll-left" data-resize="left"></span>';
			elHtml += '</div>';
			elHtml += $(el).html();


			$(el).html(elHtml);
			$(el).addClass('grab');

            //if touch
            if (TouchService.isTouch) {
                $(el)
                    .on('touchstart', function(e) {
                        _dragInit(this);
                        return false;
                    })
                    .on('touchmove', function(e) {
                        _moveElement(e);
                    })
                    .on('touchend', function(e) {
                        _destroyDragEl(this);
                    });
            } else {

                $(el)
                    .on('mousedown', function(e) {
                        console.log($.inArray(el[0], dragEls));

						_dragInit(this);

                    })
                    .on('mousemove', function(e) {
                        _moveElement(e);
                    })
                    .on('mouseup', function() {
                        _destroyDragEl(this);
                    });
            }
        }
    }
}]);
