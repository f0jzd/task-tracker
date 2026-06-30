// localStorage.setItem( //spara i local storage (key,value)
//     "name",
//     "John"
// );

// localStorage.setItem(
//     "city",
//     "Malmö"
// )

// const name = localStorage.getItem("name");//hämta via key
// console.log(name);

// const city = localStorage.getItem("city");//hämta via key
// console.log(city);

// const age = localStorage.getItem("age");
// console.log(age);

// localStorage.removeItem("city")//remove via key

// localStorage.clear()//tömmer hela localStorage

////////////////////////////////////////////

const tasks = [
    "Träna",
    "Handla"
];

localStorage.setItem(
    "tasks",
    String(tasks)
)

//Objekt -> JSON -> text

const runner = {
    name: "Bill",
    pace: "5:10"
}

//console.log(JSON.stringify(runner));

//json är bara ren text


const json = JSON.stringify(runner);
localStorage.setItem(
    "runner",
    json
);

const runner2 = localStorage.getItem("runner");
console.log(runner2);

const objekt = JSON.parse(runner2!);

console.log(objekt)