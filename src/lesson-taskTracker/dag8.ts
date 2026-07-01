import type { Task, TaskPriority } from "./types.js"
import { renderTasks } from "./render.js";
import { loadTasks } from "./storage.js";
import { addTask } from "./tasks.js";

import { taskExists } from "./tasks.js";
//import { taskExists as newFunkyName } from "./tasks.js";



//let tasks: Task[] = [];

//const testButton = document.querySelector("#test-button") as HTMLButtonElement;

// testButton.addEventListener("click", () => {
//     console.log("Button clicked!")
// });

// testButton.addEventListener("click",handleClick);

// function handleClick(event: MouseEvent): void{
//     const button = event.target as HTMLButtonElement;
//     console.log(button.textContent)
// }

export const taskInput = document.querySelector("#task-input") as HTMLInputElement;
//const addButton = document.querySelector("#add-task") as HTMLButtonElement;
export const priorityInput = document.querySelector("#priority-input") as HTMLSelectElement;
const completeBtn = document.querySelectorAll(".compButton");

const form  = document.querySelector("#task-form") as HTMLFormElement;

const errorMessage = document.querySelector("#error-message") as HTMLParagraphElement;


form.addEventListener("submit", (event) => {//Event innehåller informatioen av som ska hända
    
    //event.preventDefault();//Stop, skicka inte iväg, vi tar hand om informationen först
    handleSubmit(event);


    //console.log(event)
})

function handleSubmit(event: SubmitEvent): void{
    event.preventDefault();

    //.value för formulär event
    const taskName = taskInput.value.trim();
    const taskPriority = priorityInput.value as TaskPriority;

    const error = validateTaskName(taskName);    
    
    if (error !== ""){
        errorMessage.textContent = error;
        return;
    }

    errorMessage.textContent = "";

    addTask(taskName,taskPriority);
    renderTasks();

    console.log("Form Submitted")
}

function validateTaskName(name: string): string{
    if (name === ""){
      return "Taskname is required";  
    }
    if (name.length < 3){
        return "Too short";   
    }
    if (name.length > 20 ){
        return "Too long";   
    }

    if (taskExists(name)) {
        return "Task with that name already exists";
    }
    return "";
}

loadTasks();
renderTasks();