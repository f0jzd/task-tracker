import { getTaskArray, SetTaskArray, tasks } from "./types";

export function saveTasks(): void{
    const json = JSON.stringify(getTaskArray());

    localStorage.setItem(
        "tasks",
        json
    )
}


export function loadTasks(): void{
    const json = localStorage.getItem("tasks");

    if(json === null){
        return;
    }

    getTaskArray()

    //tasks = JSON.parse(json);
    SetTaskArray(JSON.parse(json));
}