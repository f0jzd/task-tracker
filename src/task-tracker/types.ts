
export enum Status{
    Pending = "Pending",
    Started = "Started",
    Completed = "Completed"
}

export enum Priority{
    High = "High",
    Medium = "Medium",
    Low = "Low"
}

export enum ShowAllBy{
    Low,
    Medium,
    High,
    Sorted
}

export const priorityWeight: Record<Priority, number> = {
    [Priority.Low]: 1,
    [Priority.Medium]: 2,
    [Priority.High]: 3
}

export interface Task {
    id:string;
    name: string;
    status: Status;
    priority: Priority;
    timeCreated: string;
    description?:string;
    notes?:string;
}

export interface TaskList{

    items: Task[],
    
    addTask(
        taskName:string, 
        taskPriority: Priority,
        taskDesc?: string, 
        taskNotes?:string): void;

    filterTasks(filter: Status | Priority): Task[];
    deleteTask(taskId:string): void;
    duplicateTask(taskName:string): boolean;
    
}


