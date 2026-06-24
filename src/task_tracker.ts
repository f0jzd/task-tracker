const title = document.querySelector("#title") as HTMLHeadingElement;

title.textContent ="My Tasks"

const app = document.querySelector("#app");//We add our app.


function renderTasks(): void {
    if (app) {
        app.innerHTML = "";
    }

    const totalTasks = document.createElement("h2")
    totalTasks.textContent = `Total Tasks: ${taskList.length}`

    app?.append(totalTasks)

    taskList.forEach(task => {
        const card = document.createElement("div"); //Create a card wrapper
        card.classList.add("task") //add class to the card.

        //The the task is high priority add a separate class for styling purpose
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

        // const taskStatus = document.createElement("p")
        // taskStatus.textContent = task.status;

        // const taskPriority = document.createElement("p");
        // taskPriority.textContent = task.priority;

        const taskNotes = document.createElement("p");
        taskNotes.textContent = task.notes ?? null;

        const taskDesc = document.createElement("p");
        taskDesc.textContent = task.description ?? null;


        card.append(
            taskTitle,
            taskState,
            taskNotes,
            taskDesc,

        );

        app?.append(card);

    });
}


//MDN:s version of showing a table using built in functions.
function showTable(taskList: Task[]): void{

    function addCell(row: HTMLTableRowElement, text: Task[keyof Task]) {
    
    //LAbel 1 -> lAbel 2 etc -1 to move to the right in each cell
    const cell = row.insertCell(-1);

    cell.textContent = text == null ? "" : String(text);
    
    //Don't use createTextNode, is bad.
    // if(!text){
    //     cell.appendChild(document.createTextNode(""));
    // }
    // else{
    //     cell.appendChild(document.createTextNode(text));
    // }

    }

    const table = document.createElement("table");
    const tHead = table.createTHead();

    let row = tHead.insertRow(-1);

    const labelList = ["Priority", "Task", "Status", "Notes", "Description"];

    labelList.forEach(label => {
        addCell(row,label)
    });

    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    taskList.forEach(task => {
        row = tbody.insertRow(-1);
        addCell(row, task.priority)
        addCell(row, task.name)
        addCell(row, task.status)
        addCell(row, task.notes)
        addCell(row, task.description)

    });

    document.body.append(table);

}

//Renders a table of the data, not relevant to assignment
function renderTable(): void {

  const table = document.createElement("table");
  table.classList.add("user-table");

  // Create thead
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const headers = ["ID", "Name", "Email", "Description", "Notes"];

  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.append(th);
  });

  thead.append(headerRow);
  table.append(thead);

  // Create tbody
  const tbody = document.createElement("tbody");

  taskList.forEach((user) => {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = String(user.name);

    const nameCell = document.createElement("td");
    nameCell.textContent = user.status;

    const emailCell = document.createElement("td");
    emailCell.textContent = user.priority;

    const noteCell = document.createElement("td");
    noteCell.textContent = user.description ?? null;

    const descCell = document.createElement("td");
    descCell.textContent = user.notes ?? null;


    row.append(idCell,nameCell,emailCell,noteCell,descCell);

    tbody.append(row);
  });

  table.append(tbody);

  app?.append(table)
}

function showSortedTable(taskList: Task[]){
    const sortedTable = sortByPriority(taskList);
    showTable(sortedTable);
}


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
    name: string;
    status: Status;
    priority: Priority;
    description?:string;
    notes?:string;


    markAsComplete(): void;
}

const taskList: Task[] = [];

function addTask(taskName:string, taskPriority: Priority, taskDesc?: string, taskNotes?:string): void{
    
    //Option 1
    const task: Task = {
        name: taskName,
        status: Status.Pending,
        priority: taskPriority,
        markAsComplete: function (): void {
            this.status = Status.Completed;
            console.log(`${this.name} marked as complete.`)
        }
    };

    if (taskDesc) {task.description = taskDesc}
    if (taskNotes) {task.notes = taskNotes}
    

    taskList.push(task);

    // //Option 2
    // TaskList.push({
    //     name: taskName,
    //     status: Status.Pending,
    //     priority: taskPriority,
    //     ...(taskDesc?{description: taskDesc} : {}),
    //     ...(taskNotes?{notes: taskNotes} : {})
    // })
};


function displayTask(task: Task): void{
    console.log([
            `Task: ${task.name}`,
            `Status: ${task.status}`,
            `Priority: ${task.priority}`,
            task.description && `Description: ${task.description}`,
            task.notes && `Notes: ${task.notes}`].
            filter(Boolean).join("\n"))
            console.log("-----------------------------")
}

function showTasks(tasks: Task[] = taskList): void{
    tasks.forEach(task => {
        displayTask(task)
    });
}

//Must Pass Enum Values
function filterTasks(filter: Status | Priority): void{
    
    console.log(`\n ***** ${filter} Tasks *****`)
    
    
    taskList.forEach(task => {
        if(task.priority === filter || task.status === filter){
            displayTask(task);
        }
    });
}

//Typeguard, is good apparently?
function isStatus(value: any): value is Status{
    return Object.values(Status).includes(value);
}

function completeTask(taskName:string): void{
    const task=taskList.find(t => t.name === taskName);

    if (!task) return;

    task.markAsComplete();
}

function startTask(taskName:string): void{
    const task=taskList.find(t => t.name === taskName);

    if (!task) return;

    task.status = Status.Started;
}

function updateTask(taskName:string, taskUpdate: Status | Priority): void{
    
    const task=taskList.find(t => t.name === taskName);

    if (!task) return;

    if(isStatus(taskUpdate)){
        task.status = taskUpdate;
    }
    else{
        task.priority = taskUpdate;
    }

}

function showStatistics(){
    

    let completedTasks: number = 0;
    let pendingTasks: number = 0;
    let startedTasks: number = 0;

    taskList.forEach(task => {
        if(task.status === Status.Completed){
            completedTasks++;
        }
        if(task.status === Status.Pending){
            pendingTasks++;
        }
        if(task.status === Status.Started){
            startedTasks++;
        }
    });

}

function sortByPriority(taskList:Task[]): Task[]{
    
    const sortedTaskList = [...taskList].sort((a,b) => {
       return priorityWeight[b.priority] - priorityWeight[a.priority]
    } );

    showTasks(sortedTaskList);

    return sortedTaskList;
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

filterTasks(Status.Started);

sortByPriority(taskList);


//renderTasks();
//renderTable();
showTable(taskList);

showSortedTable(taskList);







