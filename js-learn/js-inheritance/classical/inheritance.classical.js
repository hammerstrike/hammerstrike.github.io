//Inherits Defination
function inherits(ctor,superCtor){
    ctor._super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype,{
        constructor : {
            value : ctor,
            enumerable:false,
            writable:true,
            configurable:true
        }
    });
}

//Class: Person 
var Person = function(name){
    this.name = name;
}

Person.prototype.sayName = function(){
    console.log("Hi my name is "+this.name);
}

Person.prototype.shoutName = function(){
    console.log("Hi my name is "+this.name+"!!");
}


//Instances
var cloudy = new Person('Cloudy');
var monolo = new Person('Monolo');

//Method calls
cloudy.sayName();
monolo.shoutName();

//Class: Student inherits Person
inherits(Student,Person);

var Student = function(name,subject){
    Student._super_.call(this,name);
    this.subject = subject;
}


Student.prototype.getSubject = function(){
    console.log(this.name +" studies "+this.subject);
}

Student.prototype.sayName = function(){
    console.log("Student is "+ this.name);
}

var hiccup = new Student("Hiccup","JavaScript");
hiccup.getSubject();
hiccup.sayName();