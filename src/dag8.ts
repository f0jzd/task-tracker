const app = document.getElementById("app");

const testButton = document.querySelector("#test-button") as HTMLButtonElement;

let nextId = 1;

// testButton.addEventListener("click", () => {
//     console.log("Button clicked!")
// });

// testButton.addEventListener("click",handleClick);

// function handleClick(event: MouseEvent): void{
//     const button = event.target as HTMLButtonElement;
//     console.log(button.textContent)
// }

const taskInput = document.querySelector("#task-input") as HTMLInputElement;
const addButton = document.querySelector("#add-task") as HTMLButtonElement;
const priorityInput = document.querySelector("#priority-input") as HTMLSelectElement;


addButton.addEventListener("click", () => {
    const taskName = taskInput.value.trim();
    if(taskName === ""){ 
        console.log("Rrequierd");
        return;
    }

    const priority = priorityInput.value as TaskPriority;
    
    addTask(taskName, priority);
 
});

const completeBtn = document.querySelectorAll(".compButton");

completeBtn.forEach(button => {

    
    console.log("Hej")
    // button.addEventListener("click" , () => {
    // console.log("Hej");
    // });
});




function addTask(taskName:string, taskPriority: TaskPriority): void{


    const newTask: Task= {
        id: nextId,
        name: taskName,
        status:"pending",
        priority: taskPriority
        //kan skrivar priority bara
    }

    nextId++;

    tasks.push(newTask);
    renderTasks();

    console.log(tasks)

    taskInput.value = "";
}

function completeTask(taskName: string): void{
    tasks.forEach(task => {
        if(task.name === taskName){
            task.status = "completed";
        }
    });

    renderTasks();
};

function toggleTask(taskId: number): void{
    tasks.forEach(task => {
        if(task.id === taskId){
            task.status = task.status === "pending" ? "completed" : "pending"
        }
    });

    renderTasks();
}

function deleteTask(taskId: number): void{
    tasks = tasks.filter((task) => task.id !== taskId);
    renderTasks();
 
}


type Task = {
    id: number,
    name: string,
    status: "pending" | "completed",
    priority: "low" | "medium" | "high"
}

type  TaskPriority = "low" | "medium" | "high"

let tasks: Task[] = [
    // {
    // name: "Träna",
    // status: "pending",
    // priority:"high"
    // },
    // {
    // name: "Handla",
    // status: "completed",
    // priority:"low"
    // }
];


function renderTasks(): void{
    
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

renderTasks();