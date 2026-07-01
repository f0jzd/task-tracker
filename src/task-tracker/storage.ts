import type { Task } from "./types.js";
//import { getList } from "./state";

export function saveTasks(tasks: Task[]): void{

    //localStorage.setItem("taskList",JSON.stringify(getList().items));
    localStorage.setItem("taskList",JSON.stringify(tasks))

};

//Same as loadTask? alternative if the parse return null (!parsedList)
export function loadTasks(): Task[]{

    const storedList = localStorage.getItem("taskList");
    
    console.log("List Loaded")
    
    if(!storedList) {
        return[];
    }

    try{
        return JSON.parse(storedList) as Task[];
    } catch {
        return [];
    }
    
    
   // return storedList ? JSON.parse(storedList) : [];


    
    //getList().items = storedList ? JSON.parse(storedList) : [];

    

    // if(storedList === null){
    //     return;
    // }

    // taskList.items = JSON.parse(storedList);
};

