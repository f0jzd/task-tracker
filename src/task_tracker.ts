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
    console.log(`Total Tasks: ${taskList.length}`)

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

    console.log(`There are ${pendingTasks} that are pending`)
    console.log(`There are ${startedTasks} that are started`)
    console.log(`There are ${completedTasks} that are completed`)

}

function sortByPriority(){
    
    const sortedTaskList = [...taskList].sort((a,b) => {
       return priorityWeight[b.priority] - priorityWeight[a.priority]
    } );

    showTasks(sortedTaskList);
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

sortByPriority();








