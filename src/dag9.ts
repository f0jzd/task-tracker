// type Run = {
//     distance: number,
//     pace: string,
//     location: string
// }

// const run: Run = {
//     distance: 12.4,
//     pace: "5:12",
//     location:"Malmö"
// }

// //Kört desturctring och plocka ur, destructuring på objekt
// const { 
//     distance, 
//     pace, 
//     location: city
//  } = run;

//Slipper detta med destructuring
// console.log(run.distance)
// console.log(run.pace)
// console.log(run.location)

// console.log(distance);
// console.log(pace);
// console.log(city);

//Destructuring på array

// const runners = [
//     "Anna",
//     "Peter",
//     "Johan"
// ]

// // const [first, second] = runners;

// const [,second, third] = runners;

// console.log(runners)


//Spread operator på array

const easyRuns = [
    "Monday",
    "Wednesday"
];

const workOuts = [
    "Tuesday",
    "Thursday"
]

// const week = [
//     easyRuns,
//     workOuts
// ]


// const week = [
//     ...easyRuns,
//     "Friday",
//     ...workOuts
// ]

// console.log(week)

// const numbers = [
//     1,
//     2,
//     3
// ]

// const copy = [
//     ...numbers
// ];

// copy.push(4)

// console.log(copy)

// const runners = {
//     name: "Pter",
//     age: 52
// }

// const copy = {
//     runners 
// }

// const runner2 = {
//     ...runners,
//     ben: "John"
    
// }

// console.log(runner2)

// const runner = {
//     name: "Robert",
//     pace: "5:30"
// }

// const fasterRunner = {
//     ...runner,
//     pace: "4:50"
// }

type Run = {
    name: string, 
    distance: number,
    pace: string,
    location: string
}

const run: Run = {
    name:"Peter",
    distance: 15,
    pace: "5:05",
    location:  "Stockholm"
}

const updateRun = {
    ...run,
    pace: "4:55"
}


function printRunner({distance, pace}: Run ): void {

    console.log(distance);
    console.log(pace);
    
}


printRunner(updateRun);