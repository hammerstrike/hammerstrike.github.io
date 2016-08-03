
var peopleModule = (function(window,$){
    
    var people = ["Cloudy","Monolo","Sam","John"];
    var $list = $('.list');
    var $listUl = $list.find('ul');
    var $btnAdd = $('.btn-addPeople');
    var $txtName = $('.txt-name');
    var $peopleCount = $(".people-count");
 
    $btnAdd.on('click',addPerson);
    $list.on('click','.remove',deletePerson);
    
    renderList();
    
    function renderList(){
        var listHtml = "";
        for(var i=0; i< people.length ;i++){
            listHtml += '<li>'+people[i]+'<a class="remove" href="javascript:void(0)">X</a></li>';
        }
        $listUl.html(listHtml);
        
        //Depends on Module:Stats 
        //statsModule.updateCount(people.length);
        events.emit('peopleChange',{people:people});
    }
    
    function addPerson(value){
        var name = (typeof value == "string") ? value : $txtName.val();
        people.push(name);
        $txtName.val('');
        renderList();
    }
    
    function deletePerson(event){
        var i;
        if(typeof event == "number"){
            i = event;
        }else{
            var $targetLi = $(event.target).closest('li');
            var i = $listUl.find('li').index($targetLi);
        }
        
        people.splice(i,1);
        renderList();
    }
    
    function getPeople(){
        return people;
    }
    
    return {
        getPeople: getPeople,
        addPerson : addPerson,
        deletePerson : deletePerson
    }
    
})(window,$);