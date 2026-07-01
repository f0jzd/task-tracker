// // const tasks = [
// //     "lära mig ts",
// //     "treänmaa",
// //     "handla"
// // ]

// // const task = "lära mig ts";
// // const completed  = false;
// // const priority = 1;

// // const task = {
// //     name: "lära mig ts",
// //     completed: false,
// //     priority: 1
// // };

// // console.log(task.name);
// // console.log(task.completed);
// // console.log(task.priority);
// // console.log(`Task: ${task.name}`);
// // console.log(task);

// // task.completed = true;
// // console.log(task.completed);

// // const tasks = [
// //     {
// //         name: "Lära mig ts",
// //         completed: false,
// //         priority: 3
// //     },
// //     {
// //         name: "Träna",
// //         completed: true,
// //         priority: 1
// //     },
// //     {
// //         name: "Handla",
// //         completed: false,
// //         priority: 2
// //     }
// // ];

// // for (const task of tasks) {
// //     console.log(task.name, task.completed)
// // }

// // for (const task of tasks){
// //     if(!task.completed){
// //         console.log(task)
// //     }
// // }

// //Typing objects

// type Task = {
//     name: string,
//     completed: boolean,
//     priority:number
// }

// // const task: Task = {
// //     name:"Lära miog tS",
// //     completed: false,
// //     priority: 1
// // }

// const tasks: Task[] = [
//     {
//         name: "lära mig ts",
//         completed: false,
//         priority:1
//     },
//     {
//         name: "handla",
//         completed: true,
//         priority: 2
//     }
// ]


// function addTask (taskName:string, taskPriority = 1): void{
//     tasks.push({name:taskName, completed: false, priority: taskPriority});
// }

// console.log(tasks);
// addTask("laga mat")
// console.log(tasks);
// addTask("diska", 4)

// // for(const task of tasks){
// //     console.log(task)
// // }

// const taskNames = tasks.map(task => task.name);

// console.log(taskNames)

// tasks.forEach(task => {
//     console.log(task.name)
// })

//Optional Properties
// type Task = {
//     name: string,
//     completed: boolean,
//     description?:string
// }


// const task: Task = {
//     name: "Träöna",
//     completed: false,
//     description: "springa iväg"
// }

// const task2: Task = {
//     name: "Duska",
//     completed: false
// }

// console.log(task2.description)

type Task = {
    name: string
    completed: boolean,
    priority: number
}

const tasks: Task[] = [
    {
        name: "lära mig ts",
        completed: false,
        priority:1
    },
    {
        name: "handla",
        completed: true,
        priority: 2
    }
]

function showTask(task: Task){
    console.log(task.name)
}

showTask(tasks[1]!);
