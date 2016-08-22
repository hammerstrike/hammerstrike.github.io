//closure with function factory
function buildFn(){
    var arr=[];
    
    for(var i = 0 ; i < 3 ; i++ ){
        arr.push(function(i){
            var j = i;
            return function(){
                console.log(j);
            }            
        }(i));  
    };
    return arr;
}

var fn1 = buildFn();


//Callbacks : Simply passing function as argument
function myFn(callback){
    var futureTime = new Date().getTime() + 3000;
    var  i = 0;
    
    while(new Date() < futureTime ){
        //nothing, just for delay
    };
    
    callback();
}

myFn(function(){
    console.log("this is callback !!");
});



