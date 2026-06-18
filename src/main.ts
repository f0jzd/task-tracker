// console.log("Hello typescript!")

// const frukt = "banan";
// let antal = 50;

// antal = 5;

// //String

// const firstName = "Toams";
// const city = 'Göteboarg';
// const lastName = "Doe";

// // const fullName = firstName + " " + lastName;
// // console.log(fullName)

// console.log(`Hej ${firstName} ${lastName}`) //Template literal

// //Number

// let age = 42;
// const distance = 10.5;

// // console.log(age + distance);
// // console.log(age - distance); //* , - , / etc

// // const myAge = ++age; // --, 
// // console.log(myAge);

// //Modulus
// const thirdAge = age % 5; //delar på 5 och tar det som blir över, resten t.ex. 5 / 42 = 40(5*8) + 2 = 2
// console.log(thirdAge);

// //Boolean
// const isLoggedIn = true;
// const isSubscribed = false;

// //Type:ing

// const isRegistered: boolean = true;

// const carBrand: string = "Volvo";

// let numberCars: number = 3;

// // numberCars = "hej"; //går ej för type missmatch

// // let test = 3; //Tillåtet i javascript
// // test = "hej";

// const myAge = 34;

// //debugger//funkar som en breakpoint åt konsolen på sidan

// let anyType: any = 3; //helst undiv any, finns nödfall, kör inte det. 

// let value: any = "Hello";

// console.log(value.toUpperCase())

// let value2: unknown = "Hello";

// // console.log(value2.toUpperCase())

// if (typeof value2 === "string"){

//     console.log(value2.toUpperCase())
// }

// const firstName = "John";
// const age = 42;
// const occupation = "student";

// console.log(`My name is ${firstName}`);
// console.log(`I am ${age} years old`);
// console.log(`My occupation is ${occupation}`);

//-----------------------------------------------------------------------------------------

// const antal = 43;
// antal % 2; //----> 1   resultaet blir 1

// const task1Name: string = "Learn TypeScript";
// const task1Priority: number = 4;
// const task1Completed: boolean = false;


// const task2Name: string  = "Walk doge";
// const task2Priority: number = 5;
// const task2Completed: boolean = true;


// const task3Name: string  = "Make Dinner";
// const task3Priority: number = 3;
// const task3Completed: boolean = false;

// const completedTasks = 1;
// const totalTasks = 3;

// const completionRate = completedTasks / totalTasks * 100;


// console.log(`
//     Task: ${task1Name}
//     Priority: ${task1Priority}
//     Completed: ${task1Completed}`)

// console.log(`
//     Task: ${task2Name}
//     Priority: ${task2Priority}
//     Completed: ${task2Completed}`)

// console.log(`
//     Task: ${task3Name}
//     Priority: ${task3Priority}
//     Completed: ${task3Completed}`)

// console.log(`Completion rate ${completionRate}%`)

//------------------------------------------------------------------------------

// let numbers: number[] = [23,63,12,68,25,97,69,42]

// numbers.sort()

// for (let n of numbers) {
    
//     if (n % 2 === 0) {
//         console.log(`${n} is even`)
//     }
//     if (n % 2 !== 0) {
//         console.log(`${n} is not even`)
//     }
    
// }
const tasks = [
    "Lära oss Ts",
    "Träna",
    "Handla",
    "Tvätta",
    "Plugga",
    "borshta tender"
]



// for (let i = 0; i < tasks.length; i++) {
    //     console.log(`${i+1}: ${tasks[i]}`)    
    // }
    
    
    
    
function showHeader(): void{
    console.log("==================")
    console.log("Task Tracker")
    console.log("==================")
}

function showTasks(): void{
    tasks.forEach(task => {
        console.log(task)
    })
}

function showStatistics(): void{
    console.log(`Antal uppgifter: ${tasks.length}`)
}

function addTask(taskName: string): void {
    tasks.unshift(taskName);
}


showHeader();

showTasks();

showStatistics();

addTask("Gå ut med hoonden")
addTask("ta hem hoonden")

showTasks();

showStatistics();

    
    /*----FUNCTION TESTING----*/
    
    // function addTwoNumbers(a: number, b: number): number{
        //     return a+b;
        // }
        
        // const subtractTwoNumbers = (a: number, b:number):number => {
            //     return a - b;
            // };
            
            // console.log(addTwoNumbers(3,7))

// console.log(subtractTwoNumbers(9,5))

// function addAllNumbers(items: number[]){
//     const total = items.reduce((a,c) => a + c,0)
//     console.log(total);
// }

// function combineNumbers(items: number[]){
//     const total = items.reduce((a,c) => a + c,0)
//     return "total";
// }

// const result = combineNumbers([1,5,7,212,5,23,1]);
