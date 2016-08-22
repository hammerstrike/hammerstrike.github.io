'use strict'

/* let : block scoping.
  --------------------- **/
console.log(`
--------------------
let : block scoping.
--------------------`);
if(true){
    var varName = "var name";
    let name = "Hiccup";
    console.log(name);
}
console.log(`varName:` + varName);
console.log(`name:` + name);


/* const : define constants read only with block scoping.
  --------------------- **/
console.log(`
-------------------------
const : define constants 
read only with block scoping.
-------------------------`
);
const pi = 3.14;
//pi = 1.00; //ERROR : Uncaught TypeError: Assignment to constant variable.
console.log(pi);


/* template : String format templating with multiline
  --------------------- **/
console.log(`
-------------------------
template : String format 
templating with multiline.
-------------------------`);
let fName = "Hiccup";
let stringTemplate = `Hello, My name is ${fName}.
And this is new Line`;

console.log(stringTemplate);


/* arrow function : 
  --------------------- **/
console.log(`
---------------------
arrow function : 
---------------------`);
let add = (a,b) => {
    return a+b;
}
//single line
//let add = (a,b)=> a+b;
console.log(add(4,5));


let numbers = [2,3,4,5];

let doubled = numbers.map(function(n){
    return n * 2;
});
console.log(doubled);

let doubledArrow = numbers.map((n)=> n*2);
console.log("Using arrow fn",doubledArrow);

//With object
let Person = {
    name : "Hiccup",
    hobbies: ["Dragons","Drawing","Computers"],
    sayName : function(){
        console.log(`Hi, I'm ${this.name}`);
    },
    sayHobbies(){
        this.hobbies.forEach( h => {
            console.log(`${this.name} likes ${h}`);
        });
    }
}

Person.sayName();
Person.sayHobbies();


/* Rest parameters and Spread operators : 
  --------------------- **/
console.log(`
---------------------
Rest parameters and 
Spread operators : 
---------------------`);

//rest parameter returns an array of all the parameters passed (rest of the parameters).
//eg 1
let sum = function(...args){
    console.log(args);
}
console.log(sum(3,4,5));

//eg 2 : 
let multiply = function(mul,...rest){
    return rest.map(n => {
       return mul * n; 
    });
}
console.log(multiply(2,3,4,5));

//Spread Operators : Spreads with comma separated
//eg 1:

let num1 =[1,2,3,4];
let num2 =[...num1,5,6,7];
//concat 2 arrays
console.log(num2);


/* Destructuring : 
  --------------------- **/
console.log(`
---------------------
Destructuring : 
Works with Objects and Arrays
[can use in import statement]
---------------------`);
//with arrays
var something = [1,2,3,{name:"Cloudy"}];
let [first,second,...rest] = something;
//first, second, rest variables available
console.log(`first:${first}, second:${second}, rest:${rest} , ${rest[1].name}`);

//with objects
let Car = {
    name : "Lamborghini",
    model : "Gallardo"
}

Car.name;//Lamborghini
Car["name"];//Lamborghini

//Destructure : 'carname' and 'modal' is new variable available
let {name : carname, model } = Car;
console.log(`carname: ${carname}, car model: ${model}`);

//computed properties
let keyModel = "model"; //Car.model
//carmodel is new variable available as computed property
let {[keyModel] : carmodel } = Car;
console.log(`variable carmodel: ${carmodel}`);


/* ES6 Promises : 
  --------------------- **/
console.log(`
---------------------
ES6 Promises : (resolve , reject)
---------------------`);

let myPromise = new Promise((res,rej)=>{
    //Assume ajx call, taking some time, mimic with setTimeout :D
    setTimeout(()=>{
        res('Good to go ! :)'); 
    },3000);
    
    //Something called before and reject
    setTimeout(()=>{
        rej('Oh ho!! Somethings not good in promise 1:( '); 
    },2000);
    
});

myPromise.then((res,rej)=>{
    console.log(res);
},(err)=> {
    console.error(err);
});

//catch errors simillar to above error catching
myPromise.catch((err)=> {
    console.error(err);
});

let myPromise2 = new Promise((res,rej)=>{
    //Assume ajx call, taking some time, mimic with setTimeout :D
    setTimeout(()=>{
        res('Promise 2! Promissing !!'); 
    },1000);    
});

Promise.all([myPromise,myPromise2]).then((data) => {
    console.log(data);
}).catch((err)=> {
    console.error(err);
});


//usong fetch
fetch('data.json').then((res)=>{
    res.json().then((data)=>{
        console.log(data);
    })
})
.catch((err)=>{
    console.log(err);
});