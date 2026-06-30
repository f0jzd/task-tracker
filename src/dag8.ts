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
//const addButton = document.querySelector("#add-task") as HTMLButtonElement;
const priorityInput = document.querySelector("#priority-input") as HTMLSelectElement;
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

function clearForm(): void{
    taskInput.value = "";
    priorityInput.value= "medium";
}

function taskExists(name:string): boolean{
    for (const task of tasks) {
        if(task.name.toLowerCase() === name.toLowerCase()){
            return true

        }
    }
    return false;
}


function addTask(taskName:string, taskPriority: TaskPriority): void{

    const newTask: Task= {
        id: nextId,
        name: taskName,// kan skriva taskName bara 
        status:"pending",
        priority: taskPriority
        //kan skrivar priority bara
    }

    nextId++;

    tasks.push(newTask);
    //console.log(tasks)
    saveTasks();

    clearForm();
}

//JSON SAKER

function saveTasks(): void{
    const json = JSON.stringify(tasks);

    localStorage.setItem(
        "tasks",
        json
    )
}


function loadTasks(): void{
    const json = localStorage.getItem("tasks");

    if(json === null){
        return;
    }

    tasks = JSON.parse(json);

}
//////



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

    saveTasks();

    renderTasks();
}

function deleteTask(taskId: number): void{
    tasks = tasks.filter((task) => task.id !== taskId);

    saveTasks();

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

loadTasks();

renderTasks();