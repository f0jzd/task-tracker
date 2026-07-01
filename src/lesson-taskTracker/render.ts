import { app } from "./types";
import { tasks } from "./types";
import { toggleTask, deleteTask } from "./tasks";


export function renderTasks(): void{
    
    if (app) {
        app.innerHTML = "";
    }    
    
    tasks.forEach(task => {
        const card = document.createElement("div");
        card.classList.add("task") //lägger till klassen task på kortet 
        // div.textContent = `Task: ${task.name} | Status: ${task.status} | Priority: ${task.priority}`;
        
        if(task.priority === "high"){
            card.classList.add("high-priority");
        }
        if(task.status === "completed"){
            card.classList.add("completed");
        }


        
        const title = document.createElement("h3");
        title.textContent = task.name;

        const status = document.createElement("p");
        status.textContent = `Status: ${task.status}`;

        const priority = document.createElement("p");
        priority.textContent  = `${task.priority}`;


        

        const completeBtn = document.createElement("button");
        completeBtn.classList.add("btn");
        completeBtn.textContent = task.status === "pending" ? "Complete" : "Undo";
        //completeBtn.classList.add("compButton")
        completeBtn.addEventListener("click", () => {
            //completeTask(task.name);
            toggleTask(task.id)
        })

    
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("btn");
        removeBtn.textContent = "Remove";

        removeBtn.addEventListener("click", () => {
            deleteTask(task.id);
        })

        // card.append(title);
        // card.append(status);
        // card.append(priority);
        // card.append(completeBtn);
        // card.append(removeBtn);
        
        card.append(
            title,
            status,
            priority,
            completeBtn,
            removeBtn);


        app?.append(card);
    });
};