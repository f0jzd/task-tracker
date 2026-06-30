const title = document.querySelector("#title") as HTMLHeadingElement;

title.textContent ="My Tasks"

const app = document.querySelector("#app");//We add our app.

enum Status{
    Pending = "Pending",
    Started = "Started",
    Completed = "Completed"
}

enum Priority{
    High = "High",
    Medium = "Medium",
    Low = "Low"
}

enum ShowAllBy{
    Low,
    Medium,
    High,
    Sorted
}

const priorityWeight: Record<Priority, number> = {
    [Priority.Low]: 1,
    [Priority.Medium]: 2,
    [Priority.High]: 3
}

interface TaskList{

    items: Task[],
    
    addTask(
        taskName:string, 
        taskPriority: Priority, 
        dueDate?:string,
        taskDesc?: string, 
        taskNotes?:string): void;

    filterTasks(filter: Status | Priority): Task[];
    deleteTask(taskId:string): void;
    duplicateTask(taskName:string): boolean;
    
}

let taskList: TaskList = {

    items: [],
    
    addTask( taskName:string, taskPriority: Priority, dueDate, taskDesc?: string, taskNotes?:string): void{
    
        console.log(taskDesc,taskNotes)


    const task: Task = {
        id: crypto.randomUUID(),
        name: taskName,
        status: Status.Pending,
        priority: taskPriority,
        ...(dueDate? {dueDate} : {}),
        ...(taskDesc?{description: taskDesc} : {}),
        ...(taskNotes?{notes: taskNotes} : {}),
        

        changeState(newStatus: Status): void { this.status = newStatus; },
    };

    taskList.items.unshift(task);
    renderTasks();

    },
    filterTasks(filter: Status | Priority): Task[]{
            //Filter instead
        const filteredList: Task[] = [];
        taskList.items.forEach(task => {
            if(task.priority === filter || task.status === filter){
                filteredList.push(task);
            }
        });
        return filteredList;
        
    },

    deleteTask(taskId: string): void{
        this.items = this.items.filter((task) => task.id !== taskId);
        renderTasks();
    },    
    duplicateTask(taskName: string): boolean{ 
        for (const task of this.items) {
        if(task.name.toLowerCase() === taskName.toLowerCase()){
            return true
        }
    }
    
    return false;

    }

};

interface Task {
    id:string;
    name: string;
    status: Status;
    priority: Priority;
    dateAdded?: string;
    description?:string;
    notes?:string;

    changeState(status: Status): void;
}

//Buttons for adding Tasks

const form = document.querySelector("#task-form") as HTMLFormElement;
const errorMessage = document.querySelector("#error-message") as HTMLParagraphElement;

const taskInput = document.querySelector("#task-input") as HTMLInputElement;
const addTaskBtn = document.querySelector("#add-task") as HTMLButtonElement;
const priorityInput = document.querySelector("#priority-input") as HTMLSelectElement;

const taskDesc = document.querySelector("#task-desc") as HTMLTextAreaElement;
const taskNotes = document.querySelector("#task-notes") as HTMLTextAreaElement;

const defaultValue = Priority.Medium;

//Linking Priority to Values
const priorities = Object.values(Priority);
priorities.forEach(value => {
    const option = document.createElement("option");

    option.value = value;

    option.textContent = value;
    priorityInput.appendChild(option);

});

form.addEventListener("submit", (event) => {

    event.preventDefault();
    handleSubmit(event);
})

taskInput.addEventListener("input", () => {

   errorMessage.textContent = inputValidation(taskInput.value);
   taskInput.setCustomValidity(inputValidation(taskInput.value));

   taskInput.classList.remove("invalid-input");

   taskInput.reportValidity();
   

    if(errorMessage.textContent !== ""){
        taskInput.classList.add("invalid-input")
        return;
    }
})


function handleSubmit(event: SubmitEvent): void{


    const formElement = event.target as HTMLFormElement;

    const data = new FormData(formElement);
    
    const taskName = (data.get("task-input") ?? "").toString().trim();
    const taskDesc = (data.get("task-desc") ?? "").toString().trim();
    const taskNotes = (data.get("task-notes") ?? "").toString().trim();
    const taskDueDate = (data.get("date-created") ?? "").toString();

    console.log(taskDueDate)

    //const taskName = taskInput.value.trim();
    
    errorMessage.textContent = inputValidation(taskName)

    if(errorMessage.textContent !== ""){
        return;
    }

    //const priority = priorityInput.value as Priority;
    const priority = data.get("priority-input") as Priority;

    if(taskList.duplicateTask(taskName)){
        errorMessage.textContent = "Duplicate Found"
        return;
    }

    taskList.addTask(
        taskName,
        priority,
        taskDueDate,
        taskDesc, 
        taskNotes
    )
    
}


function inputValidation(taskName: string): string{

    if(/[^a-zA-Z0-9\s]/.test(taskName)){

        

        return "Contains Invalid characters"
    }

    if(/^\s+$/.test(taskName)){
        return "Invalid input"
    }
    
    if(taskName === ""){
        return "Required Input";
    }

    if(taskName.length < 3){
        return "Too short"
    }
    if(taskName.length > 40){
        return "Too Long"
    }


    return "";
}

function filterTasks(filter: Status | Priority, taskList: TaskList): Task[]{
    
    const filteredList = taskList.items.filter(task => task.priority === filter || task.status === filter);
    return filteredList;
};

//Typeguard, is good apparently?
function isStatus(value: any): value is Status{
    return Object.values(Status).includes(value);
}

function sortByPriority(taskList:Task[]): Task[]{
    const sortedTaskList = [...taskList].sort((a,b) => {
       return priorityWeight[b.priority] - priorityWeight[a.priority]
    } );
    return sortedTaskList;
}

function createPrioButton(label: string){
    const btn = document.createElement("button");
    btn.textContent = label;
    return btn;
}



function prioPicker(priority: ShowAllBy): void{
    listDisplay = priority;

    renderTasks();
}

/************************ RENDER ************************** */



let placeholderList: TaskList = {...taskList};
let listDisplay: ShowAllBy | undefined;


function renderTasks(): void {
    if (app) {
        app.innerHTML = "";
    }

    taskInput.value = "";
    taskDesc.value = "";
    taskNotes.value = "";

    const totalTasks = document.createElement("h2")
    totalTasks.textContent = `Total Tasks: ${taskList.items.length}`
    priorityInput.value = defaultValue;


    const sortBtn = document.createElement("button") as HTMLButtonElement;
    sortBtn.textContent = "Sort by Priority"

    
    
    const lowPriorityList = createPrioButton("Show Low Priority");
    const midPriorityList = createPrioButton("Show Medium Priority");
    const highPriorityList = createPrioButton("Show High Priority");
    const showAllTasks = createPrioButton("Default View")
    
    sortBtn.addEventListener("click", () => {
        renderTasks();
    })

    lowPriorityList.addEventListener("click", () => {
        prioPicker(ShowAllBy.Low)
    });
    midPriorityList.addEventListener("click", () => {
        prioPicker(ShowAllBy.Medium)
    });
    highPriorityList.addEventListener("click", () => {
        prioPicker(ShowAllBy.High)
    });
    sortBtn.addEventListener("click", () => {
        prioPicker(ShowAllBy.Sorted)
    });
    showAllTasks.addEventListener("click", () => {
        listDisplay = undefined;
        renderTasks();
    });

    switch (listDisplay) {
        case ShowAllBy.Low:
            
            placeholderList.items = filterTasks(Priority.Low,taskList)
            //filterTasks(Priority.Low)
            break;

        case ShowAllBy.Medium:
            placeholderList.items = filterTasks(Priority.Medium,taskList)
            //filterTasks(Priority.Medium)
            break;

        case ShowAllBy.High:
            placeholderList.items = filterTasks(Priority.High,taskList)
            break;
        case ShowAllBy.Sorted:
            placeholderList.items = sortByPriority(taskList.items)
            break;
    
        default:
            placeholderList.items = taskList.items
            //filterTasks(Priority.High)
            break;
    }

    
    app?.append(
        totalTasks,
        lowPriorityList,
        midPriorityList,
        highPriorityList,
        sortBtn,
        showAllTasks,
    )

    
    placeholderList.items.forEach(task => {
        const card = document.createElement("div"); 
        card.classList.add("task") 

        if (task.priority === Priority.High) {
            card.classList.add("high-prio") 
        }
        if (task.priority === Priority.Medium) {
            card.classList.add("medium-prio") 
        }
        if (task.priority === Priority.Low) {
            card.classList.add("low-prio") 
        }

        const taskTitle = document.createElement("h3");
        taskTitle.textContent = task.name;

        const taskState = document.createElement("p");
        taskState.textContent = `Status: ${task.status} | Priority: ${task.priority}`;

        const taskAdded= document.createElement("p");
        taskAdded.textContent = task.dateAdded ?? null;

        const taskNotes = document.createElement("p");
        taskNotes.textContent = task.notes ?? null;

        const taskDesc = document.createElement("p");
        if(taskDesc.textContent = task.description ?? null){
            taskDesc.classList.add("task-desc")
        }
        
        const stateButton = document.createElement("button");
        stateButton.classList.add("btn");

        const taskActive = task.status === Status.Pending || task.status === Status.Started;
        stateButton.textContent = taskActive ? "Start" : "Undo";

        

        stateButton.addEventListener("click", () =>{

            switch (task.status) {
                case Status.Pending:
                    task.changeState(Status.Started);
                    stateButton.textContent = "Completed?";
                    break;

                case Status.Started:
                    task.changeState(Status.Completed);
                    card.classList.add("completed")
                    stateButton.textContent = "Undo?";
                    break;
                    
                case Status.Completed:
                    task.changeState(Status.Started);
                    card.classList.remove("completed")
                    stateButton.textContent = "Comepleted?"   
                    break;

            }

            taskState.textContent = `Status: ${task.status} | Priority: ${task.priority}`;
        });


        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn");

        deleteButton.addEventListener("click", () => {
            taskList.deleteTask(task.id);
            renderTasks();
        })


        card.append(
            taskTitle,
            taskState,
            taskAdded,
            taskNotes,
            taskDesc,
            stateButton,
            deleteButton
        );

        app?.append(card);

    });
    
}

//test.addTask("Optimize database query performance",Priority.Low,);

taskList.addTask("Optimize database query performance",Priority.Low,);
taskList.addTask("Fix login authentication bug",Priority.High,);
taskList.addTask("Design landing page layout",Priority.Medium,);
taskList.addTask("Refactor API error handling",Priority.Low,);
taskList.addTask("Write unit tests for user service",Priority.High,);
taskList.addTask("Set up CI/CD pipeline",Priority.Low,);
taskList.addTask("Improve mobile responsiveness",Priority.Medium,);
taskList.addTask("Add input validation to forms",Priority.Medium,);
taskList.addTask("Update user profile page UI",Priority.Low,);

taskList.addTask("Implement dark mode toggle",Priority.High, "Ben cant see, needs dark mode toggle", "Johns idea");
taskList.addTask("test",Priority.Low);




//showTasks();
// updateTask("test",Priority.Low);
// filterTasks(Status.Pending);
// updateTask("test",Status.Started);
// filterTasks(Status.Started);
// completeTask("test");
// filterTasks(Status.Started);
// filterTasks(Status.Started);
// completeTask("Implement dark mode toggle");
// filterTasks(Status.Completed);

//filterTasks(Status.Started);



// renderTasks(filterTasks(Priority.High));
// renderTasks(filterTasks(Priority.Medium));

renderTasks();
//taskList = sortByPriority(taskList);

//renderTable();

// showTable(taskList);
// showSortedTable(taskList);







