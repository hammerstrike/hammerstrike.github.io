"use strict"

class Person{
    
    constructor(details){
        this.details = {};
        this.details.name = details.name;
        this.details.location = details.location;
    }
    
    giveDetails(){
        return this.details;
    }
};

const hiccup = new Person({name:"Hiccup",location:"Dadar"});
const astrid = new Person({name:"Astrid",location:"Elphinston"});

class Employee extends Person{
    constructor(details){
        var sup = super(details);
        console.log(sup);
        this.empid = details.empid;
    }
}

const amardeep = new Employee({name:"Astrid",location:"Elphinston",empid:123123});








