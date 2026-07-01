// let i = 0;

// while (i < 5){
//     console.log(i)
//     i++;
// }

//Do..while

// let j = 0;
// do{
//     console.log(j);
//     j++;
// }while(j<5);


// let k = 10;

// while (k<10){
//     console.log(k)
// }

// do{ //Vid automation eller i script när man vill ha input först.
//     console.log(k);
// }while(k < 10);

// const tasks = [
//     "typescwipt",
//     "hello",
//     "world"

// ];

// tasks.forEach(function(task){ console.log(task)})

// tasks.forEach(element => {
//     console.log(element)
// });

///////////////////////////////////////////

// const age = 20;

// if (age >= 18){
//     console.log('vuxen')

// }else{console.log('barn')}

// const message = age >= 18 ? 'vuxen' : 'barn' ;

// console.log(message)

//////////////////////

// Funktioner

const tasks = [
    "lära mig ts",
    "train",
    "handla"
];

console.log("TASK TRACKER")

for (const task of tasks){
    console.log(task)
}

console.log(`Antal uppgifter: ${tasks.length}`)


function sayHello(name: string, age:number) {
    console.log(`Hej ${name}, you are are ${age} yeers oald`)
}

sayHello("kwanza",2521);

function add(a:number,b:number){
    return a+b;
}

const result = add(5,10)

console.log(result);

function getFullName(firstName:string ,lastName: string){
    return `${firstName} ${lastName}`
}

const fullName = getFullName("George","Washington");

const taskList = [
    "TS",
    "CSS",
    "HTML"
]

function showTask(){
    for(const task of tasks)
    {
        console.log(task)
    }
}

showTask();

function checkAge(age: number){
    if(age >= 18)
    {
        console.log("Vuxeb")
    }
    else{
        console.log("barn ")
    }
}

checkAge(5);


//Arroow function

function greetOld(name: string): void{
    console.log`${name}`;
}

const greetArrow = (name: string): void => {
    console.log(`Hej ${name}`)
}

function addNumbers (a: number, b:number):number {
    return a+b;
}

const addNumberArrow = (a:number, b:number):number => {
    return a+b;
}

const addArrowShorter = (a:number, b:number): number => a+b;

addNumberArrow(10,20);