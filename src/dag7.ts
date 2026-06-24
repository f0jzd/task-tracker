// console.log(document)

const title = document.querySelector("#title") as HTMLHeadingElement;

title.textContent = "Mina Tasks";


const app = document.querySelector("#app");//fånga upp elementet som har id:et app


//const div = document.createElement("div"); //Finns bara i minnet atm, inte en del av DOM -> någon stans att lägga in den i DOM trädet


//div.textContent = "<h1>hello</h1>."; // textcontent lägger bara till vanlig text
//div.innerHTML = "<h1>hello</h1>" // innerHtml lägger till HTML element

//app?.append(div) //lääger på en sak i taget, noder

//CreateElement ->  textContent -> Append i DOM trädet

///////////////////////////

// const tasks = [
//     "Träna",
//     "Handla",
//     "Plugga"
// ];

// tasks.forEach(task => {
//     const div = document.createElement("div");
//     div.textContent = task;
//     app?.append(div);
// });


//////////////////////
//Render//

type Task = {
    name: string,
    status: "pending" | "completed",
    priority: "low" | "medium" | "high"
}

const tasks: Task[] = [
    {
    name: "Träna",
    status: "pending",
    priority:"high"
    },
    {
    name: "Handla",
    status: "completed",
    priority:"low"
    }
]


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
        
        const title = document.createElement("h3");
        title.textContent = task.name;

        const status = document.createElement("p");
        status.textContent = `Status: ${task.status}`;

        const priority = document.createElement("p");
        priority.textContent  = `${task.priority}`;

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
        completeBtn.classList.add("btn");

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("btn");
        removeBtn.textContent = "Remove";

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



