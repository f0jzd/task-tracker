enum Status{
    Pending = "Pending",
    Started = "Started",
    Completed = "Completed"
}
enum Priority{
    Low = "Low",
    Medium = "Medium",
    High = "High"
}


interface Task {
    name: string;
    status: Status;
    priority: Priority;
    description?:string;
    notes?:string;


    markAsComplete(): void;
}

// Class Implementation to fix not having a method
// class TaskItem implements Task {
//     name:string;
//     status: Status;
//     priority: Priority;
//     description?: string;
//     notes?: string;

//     constructor(name:string, status:Status,priority:Priority, description?:string, notes?:string) {
//         this.name = name;
//         this.status = status;
//         this.priority = priority;
//         if (description) this.description = description;
//         if (notes) this.notes = notes;
//     }

//     markAsComplete(): void{
//         this.status = Status.Completed;
//     }
// }


const TaskList: Task[] = [];

//THIS IS BAD PRACTICE ONLY FOR ASSIGNMENT :( -> CREATE A FACTORY AND CREATE THEM THERE INSTEAD
// const TaskList: Task[] = [
//     {
//         name:"Fix login authentication bug",
//         status: Status.Completed,
//         priority: Priority.Low,

//         markAsComplete() {
//             this.status = Status.Completed;
//             console.log(`${this.name} marked as complete.`)
//         },
//     },
//     {
//         name:"Design landing page layout",
//         status: Status.Completed,
//         priority: Priority.Low,

//         markAsComplete() {
//             this.status = Status.Completed;
//             console.log(`${this.name} marked as complete.`)
//         },
//     },
//     {
//         name:"Refactor API error handling",
//         status: Status.Pending,
//         priority: Priority.Low,

//         markAsComplete() {
//             this.status = Status.Completed;
//             console.log(`${this.name} marked as complete.`)
//         },
//     },
//     {
//         name:"Write unit tests for user service",
//         status: Status.Started,
//         priority: Priority.Medium,

//         markAsComplete() {
//             this.status = Status.Completed;
//             console.log(`${this.name} marked as complete.`)
//         },
//     },
//     {
//         name:"Set up CI/CD pipeline",
//         status: Status.Pending,
//         priority: Priority.Low,

//         markAsComplete() {
//             this.status = Status.Completed;
//             console.log(`${this.name} marked as complete.`)
//         },
//     },
//     {
//         name:"Improve mobile responsiveness",
//         status: Status.Started,
//         priority: Priority.High,

//         markAsComplete() {
//             this.status = Status.Completed;
//             console.log(`${this.name} marked as complete.`)
//         },
//     },
//     {
//         name:"Add input validation to forms",
//         status: Status.Started,
//         priority: Priority.High,

//         markAsComplete() {
//             this.status = Status.Completed;
//             console.log(`${this.name} marked as complete.`)
//         },
//     },
//     {
//         name:"Update user profile page UI",
//         status: Status.Started,
//         priority: Priority.High,

//         markAsComplete() {
//             this.status = Status.Completed;
//             console.log(`${this.name} marked as complete.`)
//         },
//     },

// ];

function addTask(taskName:string, taskPriority: Priority, taskDesc?: string, taskNotes?:string): void{
    
    //Option 1
    const task: Task = {
        name: taskName,
        status: Status.Pending,
        priority: taskPriority,
        markAsComplete: function (): void {
            this.status = Status.Completed;
            console.log(`${this.name} marked as complete.`)
        }
    };

    if (taskDesc) {task.description = taskDesc}
    if (taskNotes) {task.notes = taskNotes}
    

    TaskList.push(task);

    // //Option 2
    // TaskList.push({
    //     name: taskName,
    //     status: Status.Pending,
    //     priority: taskPriority,
    //     ...(taskDesc?{description: taskDesc} : {}),
    //     ...(taskNotes?{notes: taskNotes} : {})
    // })
};


function displayTask(task: Task): void{
    console.log([
            `Task: ${task.name}`,
            `Status: ${task.status}`,
            `Priority: ${task.priority}`,
            task.description && `Description: ${task.description}`,
            task.notes && `Notes: ${task.notes}`].
            filter(Boolean).join("\n"))
            console.log("-----------------------------")
}

function showTasks(): void{
    TaskList.forEach(task => {
        displayTask(task)
    });
}

//Must Pass Enum Values
function filterTasks(filter: Status | Priority): void{
    
    console.log(`\n ***** ${filter} Tasks *****`)
    
    
    TaskList.forEach(task => {
        if(task.priority === filter || task.status === filter){
            displayTask(task);
        }
    });
}

//Typeguard, is good apparently?
function isStatus(value: any): value is Status{
    return Object.values(Status).includes(value);
}

function completeTask(taskName:string): void{
    const task=TaskList.find(t => t.name === taskName);

    if (!task) return;

    task.markAsComplete();
    //console.log(`${task.name} marked as complete.`)
}

function updateTask(taskName:string, taskUpdate: Status | Priority): void{
    
    const task=TaskList.find(t => t.name === taskName);

    if (!task) return;

    if(isStatus(taskUpdate)){
        task.status = taskUpdate;
    }
    else{
        task.priority = taskUpdate;
    }


    // // Bad practice?
    // if (Object.values(Status).includes(taskUpdate as Status)) {
    //     task.status = taskUpdate as Status;
    //     console.log(`Updated status to: ${taskUpdate}`);

}

//Generics???
// function filterTasks<Type extends "status" | "priority">( key:Type, value:Type extends "status" ? Status : Priority): void{
    
    
//     console.log(`\n ***** ${status} Tasks *****`)

//     TaskList.forEach(task => {
//         if(task[key] === value){
//             displayTask(task);
//         }
//     });
// }




addTask("Optimize database query performance",Priority.Low,);
addTask("Fix login authentication bug",Priority.Low,);
addTask("Design landing page layout",Priority.Low,);
addTask("Refactor API error handling",Priority.Low,);
addTask("Write unit tests for user service",Priority.Low,);
addTask("Set up CI/CD pipeline",Priority.Low,);
addTask("Improve mobile responsiveness",Priority.Low,);
addTask("Add input validation to forms",Priority.Low,);
addTask("Update user profile page UI",Priority.Low,);

addTask("Implement dark mode toggle",Priority.High, "Ben cant see, needs dark mode toggle", "Johns idea");
addTask("test",Priority.Low);
//showTasks();
// updateTask("test",Priority.Low);
// filterTasks(Status.Pending);
// updateTask("test",Status.Started);
// filterTasks(Status.Started);
// completeTask("test");
// filterTasks(Status.Started);



filterTasks(Status.Started);
completeTask("Implement dark mode toggle");
filterTasks(Status.Completed);






