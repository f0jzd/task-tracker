console.log(`
--------------------------------------------------
------------------Quiz Show-----------------------
--------------------------------------------------
`);

const questions = ["question 1", "question 2", "question 3", "question 4", "question 5"];
const correctAnswer = ["banana", "apple", "orange", "blueberry", "hamburger"];
const contestantAnswers = ["banana", "pineapple", "orange", "blueberry", "hotdog"];

let score: number = 0;
const passingScore: number = 3;


for (let i = 0; i < questions.length; i++) {
    if(correctAnswer[i] === contestantAnswers[i]){
        console.log(`The contestants answer was: ${contestantAnswers[i]} and the correct answer was: ${correctAnswer[i]}, It was Correct!`)
        score++;
    }
    else{
        console.log(`The contestants answer was: ${contestantAnswers[i]} and the correct answer was: ${correctAnswer[i]}, It was Wrong!`)
    }
}

console.log(`Your final score was ${score} / ${questions.length}`)

if(score >= passingScore){
    console.log("You pass!")
}
else{
    console.log("You fail!")
}
