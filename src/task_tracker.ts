const title = document.querySelector("#title") as HTMLHeadingElement;

title.textContent ="My Tasks"

const app = document.querySelector("#app");//We add our app.

enum Status{
    Pending = "Pending",
    Started = "Started",
    Completed = "Completed"
}

enum Priority{
    Low = "Low",
    Medium = "Medium",
    High = "High"
}

const priorityWeight: Record<Priority, number> = {
    [Priority.Low]: 1,
    [Priority.Medium]: 2,
    [Priority.High]: 3
}


interface Task {
    id:string;
    name: string;
    status: Status;
    priority: Priority;
    description?:string;
    notes?:string;

    // markAsComplete(): void;
    // markAsStarted(): void;
    changeState(status: Status): void;

}

const taskInput = document.querySelector("#task-input") as HTMLInputElement;
const addTaskBtn = document.querySelector("#add-task") as HTMLButtonElement;
const priorityInput = document.querySelector("#priority-input") as HTMLSelectElement;
const defaultValue = Priority.Low;


//Set Priorites based on the enum above
const priorities = Object.values(Priority);

priorities.forEach(value => {
    const option = document.createElement("option");

    option.value = value;

    option.textContent = value;
    priorityInput.appendChild(option);

    

});

addTaskBtn.addEventListener("click", () => {
    const taskName = taskInput.value.trim();
    if(taskName === ""){ 
        //Throw warning
        console.log("Required Input");
        return;
    }

    const priority = priorityInput.value as Priority;

    console.log(priority)

    addTask(taskName,priority)
})

let taskList: Task[] = [];

function addTask(taskName:string, taskPriority: Priority, taskDesc?: string, taskNotes?:string): void{
    
    //Option 1
    const task: Task = {
        id: crypto.randomUUID(),
        name: taskName,
        status: Status.Pending,
        priority: taskPriority,

        // markAsComplete: function (): void {
        //     this.status = Status.Completed;
        //     console.log(`${this.name} marked as complete.`)
        //     renderTasks();
        // },
        // markAsStarted: function (): void{
        //     this.status = Status.Started;
        //     console.log(`${this.name} marked as started.`)
        //     renderTasks();
        // },

        changeState(newStatus: Status): void {
            this.status = newStatus;
            console.log(`${this.name} marked as ${this.status}`)
            
        },
    };

    if (taskDesc) {task.description = taskDesc}
    if (taskNotes) {task.notes = taskNotes}

    taskList.unshift(task);


    // //Option 2
    // TaskList.push({
    //     name: taskName,
    //     status: Status.Pending,
    //     priority: taskPriority,
    //     ...(taskDesc?{description: taskDesc} : {}),
    //     ...(taskNotes?{notes: taskNotes} : {})
    // })

    renderTasks();
};

function deleteTask(taskId: string): void{
    taskList = taskList.filter((task) => task.id !== taskId);
    console.log(taskList.length);
    renderTasks();
}

function filterTasks(filter: Status | Priority): Task[]{
    
    const filteredList: Task[] = [];
    taskList.forEach(task => {
        if(task.priority === filter || task.status === filter){
            filteredList.push(task);
        }
    });
    return filteredList;
}

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

function prioPicker(priority: Priority): void{
    listCheck = priority;
    renderTasks();
}

/************************ RENDER ************************** */

let placeholderList: Task[] = taskList;
let listCheck: Priority | undefined;

function renderTasks(): void {
    if (app) {
        app.innerHTML = "";
    }

    taskInput.value = "";

    const totalTasks = document.createElement("h2")
    totalTasks.textContent = `Total Tasks: ${taskList.length}`
    priorityInput.value = defaultValue;


    const lowPriorityList = createPrioButton("Show Low Priority");
    const midPriorityList = createPrioButton("Show Medium Priority");
    const highPriorityList = createPrioButton("Show High Priority");
    const showAllTasks = createPrioButton("Show All Tasks")

    lowPriorityList.addEventListener("click", () => {
        prioPicker(Priority.Low)
    });
    midPriorityList.addEventListener("click", () => {
        prioPicker(Priority.Medium)
    });
    highPriorityList.addEventListener("click", () => {
        prioPicker(Priority.High)
    });
    showAllTasks.addEventListener("click", () => {
        listCheck = undefined;
        renderTasks();
    })

    switch (listCheck) {
        case Priority.Low:
            placeholderList = filterTasks(Priority.Low)
            break;

        case Priority.Medium:
            placeholderList = filterTasks(Priority.Medium)
            break;

        case Priority.High:
            placeholderList = filterTasks(Priority.High)
            break;
    
        default:
            placeholderList = taskList
            break;
    }

    
    app?.append(
        totalTasks,
        lowPriorityList,
        midPriorityList,
        highPriorityList,
        showAllTasks,
    )

    placeholderList.forEach(task => {
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

        const existingOverlayBtn = card.querySelector(".overlay-btn");
        if (existingOverlayBtn) {
            existingOverlayBtn.remove();
        }

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
            deleteTask(task.id);
            renderTasks();
        })


        card.append(
            taskTitle,
            taskState,
            taskNotes,
            taskDesc,
            stateButton,
            deleteButton
        );

        app?.append(card);

    });

  
    
}


addTask("Optimize database query performance",Priority.Low,);
addTask("Fix login authentication bug",Priority.High,);
addTask("Design landing page layout",Priority.Medium,);
addTask("Refactor API error handling",Priority.Low,);
addTask("Write unit tests for user service",Priority.High,);
addTask("Set up CI/CD pipeline",Priority.Low,);
addTask("Improve mobile responsiveness",Priority.Medium,);
addTask("Add input validation to forms",Priority.Medium,);
addTask("Update user profile page UI",Priority.Low,);

addTask("Implement dark mode toggle",Priority.High, "Ben cant see, needs dark mode toggle", "Johns idea");
addTask("test",Priority.Low);

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







