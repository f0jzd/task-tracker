import type { Task, TaskList } from "./types.js";
import {Priority, Status, priorityWeight} from "./types.js";
import { getList } from "./state.js";
// import { errorMessage, priorityInput } from "./render.js";

// export const priorities = Object.values(Priority);
// priorities.forEach(value => {
//     const option = document.createElement("option");
//     option.value = value;
//     option.textContent = value;
//     priorityInput.appendChild(option);

// });
export function populatePriorityOptions(select: HTMLSelectElement): void {
  Object.values(Priority).forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

export function filterTasks(filter: Status | Priority, taskList: TaskList): Task[]{
    
    const filteredList = taskList.items.filter(task => task.priority === filter || task.status === filter);
    return filteredList;
};

//Typeguard, is good apparently?
export function isStatus(value: any): value is Status{
    return Object.values(Status).includes(value);
}
//More Typeguarding
export function isPriority(value: any): value is Priority{
    return Object.values(Priority).includes(value);
}

export function sortByPriority(taskList:Task[]): Task[]{
    const sortedTaskList = [...taskList].sort((a,b) => {
       return priorityWeight[b.priority] - priorityWeight[a.priority];
    });
    return sortedTaskList;
}

export function getDateTime(): string{

    const time = new Date();
    
    // let dateTime = {
    //     date: time.getDate(),
    //     month: time.getMonth()+1,
    //     year: time.getFullYear(),
    //     currentTime: (`${time.getHours()}:${time.getMinutes()}`)
    // };

    // const {date,month,year,currentTime} = dateTime;

    let clocktime = (`${time.getHours()}:${time.getMinutes()}`)
    let currentTime = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} ${clocktime}`
    return currentTime;
}

export function inputValidation(taskName: string): string{

    if(/[^a-zA-Z0-9\s]/.test(taskName)){
        return "Contains Invalid characters";
    }

    if(/^\s+$/.test(taskName)){
        return "Invalid input";
    }
    
    if(taskName === ""){
        return "Required Input";
    }

    if(taskName.length < 3){
        return "Too short";
    }
    if(taskName.length > 40){
        return "Too Long";
    }

    return "";
}


export function handleSubmit(event: SubmitEvent, errorMessage: HTMLParagraphElement): void{

    const formElement = event.target as HTMLFormElement;
    const data = new FormData(formElement);
    
    const taskName = (data.get("task-input") ?? "").toString().trim();
    // const taskDesc = (data.get("task-desc") ?? "").toString().trim();
    // const taskNotes = (data.get("task-notes") ?? "").toString().trim();
    const taskDesc = "";
    const taskNotes = "";
    const taskCreated = (data.get("date-created") ?? "").toString();

    //const taskName = taskInput.value.trim();
    
    errorMessage.textContent = inputValidation(taskName);

    if(errorMessage.textContent !== "") return;

    //const priority = priorityInput.value as Priority;
    const priority = data.get("priority-input") as Priority;
    console.log(priority);
    
    // if(taskList.duplicateTask(taskName)){
    //     errorMessage.textContent = "Duplicate Found"
    //     return;
    // }
    
    if(getList().duplicateTask(taskName)){
        errorMessage.textContent = "Duplicate Found"
        return;
    }

    getList().addTask(
        taskName,
        priority,
        taskDesc, 
        taskNotes
    )
    
}


export function generate10tasks(): void{
    getList().addTask("Optimize database query performance",Priority.Low,);
    getList().addTask("Fix login authentication bug",Priority.High,);
    getList().addTask("Design landing page layout",Priority.Medium,);
    getList().addTask("Refactor API error handling",Priority.Low,);
    getList().addTask("Write unit tests for user service",Priority.High,);
    getList().addTask("Set up CI/CD pipeline",Priority.Low,);
    getList().addTask("Improve mobile responsiveness",Priority.Medium,);
    getList().addTask("Add input validation to forms",Priority.Medium,);
    getList().addTask("Update user profile page UI",Priority.Low,);

    getList().addTask("Implement dark mode toggle",Priority.High, "Ben cant see, needs dark mode toggle", "Johns idea");
    getList().addTask("test",Priority.Low);
}

