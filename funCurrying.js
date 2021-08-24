// let numbers = {
//     num1:123,
//     num2:3
// }

let multiply = function(num1,num2){
    console.log(num1*num2);
}

//bind method
let multiplybytwo = multiply.bind(this,2);
multiplybytwo(123);

//using closures

let multiplication = function(x){
    return function(y){
        console.log(x*y)
    }
}

let multiplybytwo2 = multiplication(2);
multiplybytwo2(123);
