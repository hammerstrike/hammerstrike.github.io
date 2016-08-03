//Super Class
var Person = {
    name : "Default Person",
    creat : function(name){
        var instance = Object.create(this);
        instance.name = name;
        return instance;
    },
    sayName : function(){
        console.log(this.name);
    }
}

var Student = Person.creat("Student");
Student.name = "Default Student";
Student.getSubject = function(){
    console.log(this.subject);
}

var hiccup = Student.creat("hiccup");
hiccup.name = "Hiccup";
hiccup.subject = "Training Dragons";

/*
//Child Class Student inherits Person
var Student = Object.create(Person);

//Child class has own properties and methods
Student.getSubject = function(){
    console.log("Subject: " + this.subject);
}

//Instance
var hiccup = Object.create(Student);
hiccup.name = "Hiccup";
hiccup.subject = "Training Dragons";

console.log(hiccup);
*/
console.log(hiccup);