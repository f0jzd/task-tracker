import { renderTasks } from "./render.js";
import { saveTasks } from "./storage.js";
import type { Task, TaskPriority } from "./types.js";
import { SetTaskArray,getTaskArray, state,tasks } from "./types.js";

import { taskInput,priorityInput } from "./dag8";



export function addTask(taskName:string, taskPriority: TaskPriority): void{

    const newTask: Task= {
        id: state.nextId,
        name: taskName,// kan skriva taskName bara 
        status:"pending",
        priority: taskPriority
        //kan skrivar priority bara
    }

    state.nextId++;

    getTaskArray().push(newTask);

    tasks.push(newTask);
    //console.log(tasks)
    saveTasks();

    clearForm();
}

//JSON SAKER


//////



export function completeTask(taskName: string): void{
    tasks.forEach(task => {
        if(task.name === taskName){
            task.status = "completed";
        }
    });

    renderTasks();
};

export function toggleTask(taskId: number): void{
    tasks.forEach(task => {
        if(task.id === taskId){
            task.status = task.status === "pending" ? "completed" : "pending"
        }
    });

    saveTasks();

    renderTasks();
}

export function deleteTask(taskId: number): void{
    
    SetTaskArray(getTaskArray().filter((task) => task.id !== taskId));

    saveTasks();

    renderTasks();
 
}


export function clearForm(): void{
    taskInput.value = "";
    priorityInput.value= "medium";
}


export function taskExists(name:string): boolean{
    for (const task of tasks) {
        if(task.name.toLowerCase() === name.toLowerCase()){
            return true

        }
    }
    return false;
}