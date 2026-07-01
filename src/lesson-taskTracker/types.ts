export type Task = {
    id: number,
    name: string,
    status: "pending" | "completed",
    priority: "low" | "medium" | "high"
}

export type  TaskPriority = "low" | "medium" | "high"

export const app = document.getElementById("app");

export let tasks: Task[] = [];

export function getTaskArray(){
    return tasks;
}

export function SetTaskArray(newTask: Task[]){
    tasks = newTask;
}

//export let nextId = 1;
//exportera object istället, ändrar på värdet i objektet.
export const state = {
    nextId: 1
}