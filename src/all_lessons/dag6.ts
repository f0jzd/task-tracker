// type Task = {
//     name: string,
//     completed: boolean ,
//     priority: number
// }


// const task: Task = {
//     name: "Lära mig ts",
//     completed: false,
//     priority: 1,
// };
// const task2: Task = {
//     name: "Diska",
//     completed: false,
//     priority: 2,
// };


// const tasks: Task[] = [];

// tasks.push({
//     name: "Träna",
//     completed:false,
//     priority: 1
// })

// function showTask(task: Task): void{
//     console.log(task.name);
// }

// showTask(task2);

// const task4: Task = {
//     name: "Träna"
// };


// let status = "pending";

// status = "completed"
// status = "done";
// status = "pizza";
// status = "banan";

// let value: string | number;

// value = "done";
// value = 10;
// value = true;

// type id = string | number;

// const userID: id = 22;
// const userID2: id = "hje";

///UNION TYPES

// type Status = "Pending" | "Completed";
// type Priority = "Low"|"Medium"|"High";

// type Task = {
//     name: string,
//     status: "Pending" | "Completed",
//     priority: "Low"|"Medium"|"High"
// };

// const task1: Task = {
//     name: "Träna",
//     status: "Pending",
//     priority: "High"

// };

// function updateStatus(status: "Pending" | "Completed"): void{
//     console.log(status)
// }

// updateStatus("Pending")

// type Task = {
//     name: string,
//     completed: boolean
// };

// interface Task2 {
//     name: string,
//     completed: boolean
// }

// interface User {
//     name: string,
//     age: number
// }

// const user: User = {
//     name: "John",
//     age: 45
// }

// interface Task {
//     name: string;
//     completed: boolean;

//     toggle(): void;
// }

// const task: Task = {
//     name: "träna",
//     completed: false,
//     toggle() {
//         this.completed = !this.completed;

//     },
// };

// interface Person {
//     name: string;
// }

// interface contactInfo {
//     email:string;
// }

// interface Student extends Person, contactInfo {
//     course: string;
// }

// const student1: Student = {
//     name:"Vaguete",
//     course: "Sapsls",
//     email: "ASLIDHJK"
// };

// interface BaseTask {
//     name:string;
// }

// interface Task extends BaseTask{
//     status: "Pending" | "Completed";
// }

// interface TimedTask extends Task {
//     dueDate: string;
// }

// type Person = {
//     name:string
// }

// type contactInfo = {
//     email:string
// }

// type User = Person & contactInfo;

// const user: User = {
//     name: "John",
//     email: "ÖASKDLJ"
// }

// type Person = {
//     name:string
// }

// interface Student extends Person {
//     course:string
// }
// type Student = Person & {
//     name: string
// }

//////////////////////////////////////////////////////

// interface Task {
//     name: string;
//     status: "Pending" | "Completed";

//     toggle(): void;
// }

// interface TimedTask extends Task{
//     dueDate: string;
// }

// const task1: TimedTask = {
//     name: "Lämna in uppgift",
//     status: "Pending",
//     dueDate: "2026-07-12",

//     toggle() {
//         this.status = "Completed";
//     },
// }

// interface User {
//     name:string;
// }
// interface User{
//     age: number;
// }

///////////////////////////////////////////////////////

// function add(a: number, b: number): void{
//     console.log(a+b);
// }

// const result = add (3,5);

// console.log(result);

// type Task = {
//     name:string;
//     status: "pending" | "completed";
// }

// function showTask(task:Task): void{
//     console.log(task.name);
// }

// function createTask(name: string): Task{
//     return{
//         name,
//         status:"pending"
//     }
// }

///////////////////////////////////////////////////////

// type Task = {
//     name: string;
//     status: "pending" | "completed";

//     toggle: () => void;
// }

// const task: Task = {
//     name:"träikjmasd",
//     status: "pending",


//     toggle(){
//         this.status = this.status === "pending" ? "completed" : "pending";
//     }
// }

///////////////////////////////////////////////////////
// type Status = "pending" | "completed";

enum Status {
    Pending = "pending", // 0
    Completed= "completed" // 1
}

enum UserRoles{
    Admin,
    Teacher, 
    Student

}

type Task = {
    name: string,
    status: Status
}

interface Task1 {
    name: string;
    type: Task

}

const task: Task = {
    name:"drlaskj",
    status: Status.Pending
};

const status = Status.Completed;

console.log(Status.Completed);

enum Direction {
    Up,     //0
    Down,   //1
    Left,   //2
    Right   //3
}   

///////////////////////////////////////////////////////