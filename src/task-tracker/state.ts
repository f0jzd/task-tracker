import type { TaskList,Task } from "./types.js";
import {Priority,Status, ShowAllBy} from "./types.js"
import { saveTasks } from "./storage.js";
import { getDateTime } from "./utils.js";

let taskList: TaskList = createTaskList();
let placeholderList: TaskList = createTaskList();

//let placeholderList: TaskList = {...getList()};
let listDisplay: ShowAllBy | undefined;

//Instead of defining a let tasklist = {} we set the tasklist to be 
//what is returned from the createTasklist which is the same but more readable?
function createTaskList(): TaskList {
  return {
    items: [],

    addTask(taskName: string, taskPriority: Priority, taskDesc?: string, taskNotes?: string, ): void {
      const task: Task = {
        id: crypto.randomUUID(),
        name: taskName,
        status: Status.Pending,
        priority: taskPriority,
        timeCreated: getDateTime(),
        // ...(timeCreated? {timeCreated: getDateTime()} : {}),
        ...(taskDesc ? { description: taskDesc } : {}),
        ...(taskNotes ? { notes: taskNotes } : {}),
      };

      this.items.unshift(task);
      saveTasks(this.items);
    },
    
    filterTasks(filter: Status | Priority): Task[] {
      return this.items.filter((task) => task.priority === filter || task.status === filter);
    },


    deleteTask(taskId: string): void {
      this.items = this.items.filter((task) => task.id !== taskId);
      saveTasks(this.items);
    },
    duplicateTask(taskName: string): boolean {
      //loadTasks();
      return this.items.some((task) => task.name.toLowerCase() === taskName.toLowerCase());
    },
};
}

export function getList(){
    return taskList;
}

export function getPlaceholderList(): TaskList{
    return placeholderList;
}

export function getListDisplay(): ShowAllBy | undefined{
    return listDisplay
}

export function setListDisplay(val: ShowAllBy | undefined){
    listDisplay = val;
}

export function changeState(task: Task, status: Status): void { 
    task.status = status;
    saveTasks(taskList.items);
}

//let placeholderList: TaskList = {...taskList};
//export placeholderList: ;

// export function placeholderListState(taskList: TaskList): void{
//     TaskList = {...taskList}
// }


//let listDisplay: ShowAllBy | undefined;


// let taskList: TaskList = {

//     items: [],
    
//     addTask( taskName:string, taskPriority: Priority, taskDesc?: string, taskNotes?:string): void{

//     this.items = loadTasks();

//     const task: Task = {
//         id: crypto.randomUUID(),
//         name: taskName,
//         status: Status.Pending,
//         priority: taskPriority,
//         timeCreated: getDateTime(),
//         // ...(timeCreated? {timeCreated: getDateTime()} : {}),
//         ...(taskDesc?{description: taskDesc} : {}),
//         ...(taskNotes?{notes: taskNotes} : {}),
//     };

//     console.log(`Task was created ${getDateTime()}`)

//     taskList.items.unshift(task);

//     saveTasks(this.items);
//     renderTasks();

//     },
//     filterTasks(filter: Status | Priority): Task[]{
//             //Filter instead
//         const filteredList: Task[] = [];
//         taskList.items.forEach(task => {
//             if(task.priority === filter || task.status === filter){
//                 filteredList.push(task);
//             }
//         });
//         return filteredList;
        
//     },

//     deleteTask(taskId: string): void{
//         this.items = this.items.filter((task) => task.id !== taskId);
//         saveTasks(this.items);
//         renderTasks();
//     },    
//     duplicateTask(taskName: string): boolean{

//     loadTasks();
        
//     for (const task of this.items) {
//         if(task.name.toLowerCase() === taskName.toLowerCase()){
//         return true
//         }
//     }
    
//     return false;
//     }

// };