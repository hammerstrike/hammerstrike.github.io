var people = ["Cloudy","Monolo","Sam","John"];

$(document).ready(function(){
    
    for(var i=0; i< people.length ;i++){
        $('.list ul').append('<li>'+people[i]+'<a class="remove" href="javascript:void(0)">X</a></li>');
    }
    
    $('.btn-addPeople').on('click',function(){
        people.push($('.txt-name').val());
        $('.list ul').append('<li>'+$('.txt-name').val()+'<a class="remove" href="javascript:void(0)">X</a></li>');
        $(".people-count").text(people.length);
        $('.txt-name').val('');
    });
    
    $('.list').on('click','.remove',function(){       
        var indx = $(this).parent().index();
        people.splice(indx,1);
        $(this).parent().remove();
        $(".people-count").text(people.length);
    });
    
    $(".people-count").text(people.length);
});
