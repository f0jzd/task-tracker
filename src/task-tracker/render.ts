import type { Task } from "./types.js";
import { Status, ShowAllBy, Priority } from "./types.js";
import { changeState, getList, getListDisplay, getPlaceholderList, setListDisplay, } from "./state.js";
import { generate10tasks, handleSubmit, inputValidation, filterTasks, sortByPriority } from "./utils.js";
import { loadTasks } from "./storage.js";


const app = document.querySelector("#app");
const defaultValue = Priority.Medium;

export const form = document.querySelector("#task-form") as HTMLFormElement;
export const errorMessage = document.querySelector("#error-message",) as HTMLParagraphElement;
export const taskInput = document.querySelector("#task-input",) as HTMLInputElement;
export const priorityInput = document.querySelector("#priority-input",) as HTMLSelectElement;


export function renderTasks(): void {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => renderTasks(), { once: true });
    return;
  }

  if (!app) return;

  app.innerHTML = "";

  

  //Get tasks from local storage
  getList().items = loadTasks();

  //Reset input for the input element
  taskInput.value = "";

  const header = createHeader();

  //Append the divs
  app.append(
    form,
    ...(header ? [header] : []),
    createToolbar(),
    renderTaskList(showFilteredTasks()),
  );
}

//Creates the title for the site, can add more elements if needed.
function createHeader(): HTMLHeadingElement | null {
  const title = document.querySelector("#title") as HTMLHeadingElement | null;
  if (!title) return null;

  title.textContent = "My Tasks";
  return title;
}

//Creat the toolbar with all the display list options.
function createToolbar(): HTMLElement {
  //Making the actual buttons and setting text
  const wrapper = document.createElement("div");

  const totalTasks = document.createElement("h2");
  totalTasks.textContent = `Total Tasks: ${getList().items.length}`;

  const sortBtn = document.createElement("button") as HTMLButtonElement;
  sortBtn.textContent = "Sort by Priority";

  const lowBtn = document.createElement("button");
  lowBtn.textContent = "Show Low Priority";

  const mediumBtn = document.createElement("button");
  mediumBtn.textContent = "Show Medium Priority";

  const highBtn = document.createElement("button");
  highBtn.textContent = "Show High Priority";

  const defaultBtn = document.createElement("button");
  defaultBtn.textContent = "Show Default Layout";

  const clearBtn = document.createElement("button");
  clearBtn.textContent = "Clear List";

  const generateBtn = document.createElement("button");
  generateBtn.textContent = "Generate 10 tasks";

  //Generate all the listeners for the buttons

  sortBtn.addEventListener("click", () => {
    setListDisplay(ShowAllBy.Sorted);
    renderTasks();
  });

  lowBtn.addEventListener("click", () => {
    setListDisplay(ShowAllBy.Low);
    renderTasks();
  });

  mediumBtn.addEventListener("click", () => {
    setListDisplay(ShowAllBy.Medium);
    renderTasks();
  });

  highBtn.addEventListener("click", () => {
    setListDisplay(ShowAllBy.High);
    renderTasks();
  });

  defaultBtn.addEventListener("click", () => {
    setListDisplay(undefined);
    renderTasks();
  });

  clearBtn.addEventListener("click", () => {
    localStorage.clear();
    renderTasks();
  });

  generateBtn.addEventListener("click", () => {
    generate10tasks();
    renderTasks();
  });

  wrapper.append(
    totalTasks,
    sortBtn,
    lowBtn,
    mediumBtn,
    highBtn,
    defaultBtn,
    clearBtn,
    generateBtn,
  );

  return wrapper;
}

//Show the list depending on the choice, gets list and returns it changed, only changes placeholder list, default return the default list.
function showFilteredTasks(): Task[] {
  switch (getListDisplay()) {
    case ShowAllBy.Low:
      getPlaceholderList().items = filterTasks(Priority.Low, getList());
      return filterTasks(Priority.Low, getList());
    case ShowAllBy.Medium:
      getPlaceholderList().items = filterTasks(Priority.Medium, getList());
      return filterTasks(Priority.Medium, getList());
    case ShowAllBy.High:
      getPlaceholderList().items = filterTasks(Priority.High, getList());
      return filterTasks(Priority.High, getList());
    case ShowAllBy.Sorted:
      getPlaceholderList().items = sortByPriority(getList().items);
      return sortByPriority(getList().items);
    default:
      return getList().items;
  }
}

//Old renderTasks(), is now less cluttered
function renderTaskList(tasks: Task[]): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.classList.add("card-wrapper");

  if (tasks.length == 0) {
    const noTasks = document.createElement("h2");
    noTasks.textContent = "There are no current tasks.";
    wrapper.append(noTasks);
    return wrapper;
  }

  //For each task, append it to the wrapper. and then return it once all tasks are added to the div.
  tasks.forEach((task) => {
    wrapper.append(CreateTaskCard(task));
  });

  return wrapper;
}
//Creates cards based on the information in the tasks
function CreateTaskCard(task: Task): HTMLDivElement {
  const card = document.createElement("div");
  card.classList.add("task");

  if (task.priority === Priority.High) {
    card.classList.add("high-prio");
  } else if (task.priority === Priority.Medium) {
    card.classList.add("medium-prio");
  } else {
    card.classList.add("low-prio");
  }

  if (task.status === Status.Completed) {
    card.classList.add("completed");
  }

  const title = document.createElement("h3");
  title.textContent = task.name;

  const statusText = document.createElement("p");
  statusText.textContent = `Status: ${task.status} | Priority: ${task.priority}`;

  const createdText = document.createElement("p");
  createdText.textContent = task.timeCreated;

  const notesText = document.createElement("p");
  notesText.textContent = task.notes ?? "";

  const descriptionText = document.createElement("p");
  descriptionText.textContent = task.description ?? "";

  const stateButton = document.createElement("button");
  stateButton.classList.add("btn");

  //Text content first checks if tasks tatus is pending, if true sets it to start.
  // if false it checks is it started, if its started, it sets to complete or if its not started and and its not pending= its complete and sets it to undo
  stateButton.textContent =
    task.status === Status.Pending
      ? "Start"
      : task.status === Status.Started
        ? "Complete"
        : "Undo";
  stateButton.addEventListener("click", () => {
    if (task.status === Status.Pending) {
      changeState(task, Status.Started);
    } else if (task.status === Status.Started) {
      changeState(task, Status.Completed);
    } else {
      changeState(task, Status.Started);
    }
    renderTasks();
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("btn");

  deleteButton.addEventListener("click", () => {
    getList().deleteTask(task.id);
    renderTasks();
  });

  const cardBtns = document.createElement("div");
  cardBtns.classList.add("card-buttons");
  cardBtns.append(stateButton, deleteButton);

  card.append(title, statusText, createdText, notesText, descriptionText, cardBtns);
  return card;
}

// export const addTaskBtn = document.querySelector("#add-task") as HTMLButtonElement;
export const taskDesc = document.querySelector(
  "#task-desc",
) as HTMLTextAreaElement;
export const taskNotes = document.querySelector(
  "#task-notes",
) as HTMLTextAreaElement;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  handleSubmit(event, errorMessage);
  renderTasks();
});

taskInput.addEventListener("input", () => {
  errorMessage.textContent = inputValidation(taskInput.value);
  taskInput.setCustomValidity(inputValidation(taskInput.value));

  taskInput.classList.remove("invalid-input");

  taskInput.reportValidity();

  if (errorMessage.textContent !== "") {
    taskInput.classList.add("invalid-input");
    return;
  }
});
