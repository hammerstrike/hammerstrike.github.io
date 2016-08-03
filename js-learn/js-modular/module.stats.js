var statsModule = (function(window,$){

    var peopleCount = 0;
    var $stats = $('.people-count');
    var $on = $('.on');
    var $off = $('.off');
    var updateCountCall = 0;
    renderCount();
    on();
    
    $on.on('click',on);
    $off.on('click',off);
    
    function renderCount(){
        $stats.text(peopleCount);
    }
    
    function updateCount(people){        
        peopleCount = people.people.length;
        renderCount();
    }
    
    function on(){
        events.on('peopleChange',updateCount);
    }
    
    function off(){
        events.off('peopleChange',updateCount);
    }
    
    
})(window,jQuery);