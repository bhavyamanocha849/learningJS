let name1 = {firstName:"Bhavya", secondName:"Manocha"}
let name2 = {firstName:"Ujjwal", secondName:"Manocha"}

let printFullName = function(param1,param2){
    console.log(this.firstName + " " + this.secondName +" " + param1+" "+param2);
}


printFullName.call(name1,"Delhi","India");
printFullName.apply(name2,["Delhi","India"]);


let printName  = printFullName.bind(name1 ,"Delhi","India");

printName();


//polyfill for bind

Function.prototype.myBind = function(...args){
    obj = this;
    return function(...args2){
        obj.apply(args[0],[...args.slice(1),args2]);
    } 
}

if(printFullName instanceof Function){
    let myName = printFullName.myBind(name2,"Delhi");
    myName("Earth");
}