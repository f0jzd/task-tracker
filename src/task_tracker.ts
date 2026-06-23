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


interface Task {
    name: string;
    status: Status;
    priority: Priority;
    description?:string;
    notes?:string;


    markAsComplete(): void;
}

const TaskList: Task[] = [];

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
    

    TaskList.push(task);

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

function showTasks(): void{
    TaskList.forEach(task => {
        displayTask(task)
    });
}

//Must Pass Enum Values
function filterTasks(filter: Status | Priority): void{
    
    console.log(`\n ***** ${filter} Tasks *****`)
    
    
    TaskList.forEach(task => {
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
    const task=TaskList.find(t => t.name === taskName);

    if (!task) return;

    task.markAsComplete();
}

function updateTask(taskName:string, taskUpdate: Status | Priority): void{
    
    const task=TaskList.find(t => t.name === taskName);

    if (!task) return;

    if(isStatus(taskUpdate)){
        task.status = taskUpdate;
    }
    else{
        task.priority = taskUpdate;
    }

}

addTask("Optimize database query performance",Priority.Low,);
addTask("Fix login authentication bug",Priority.Low,);
addTask("Design landing page layout",Priority.Low,);
addTask("Refactor API error handling",Priority.Low,);
addTask("Write unit tests for user service",Priority.Low,);
addTask("Set up CI/CD pipeline",Priority.Low,);
addTask("Improve mobile responsiveness",Priority.Low,);
addTask("Add input validation to forms",Priority.Low,);
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



filterTasks(Status.Started);
completeTask("Implement dark mode toggle");
filterTasks(Status.Completed);






