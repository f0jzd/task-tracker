const runs = [8,12,6,20,10,11,12,23]
const weeklyGoal:number = 50;

showHeader();
showRuns();
calculateTotalDistance(runs);
console.log(checkGoal(weeklyGoal));

console.log(checkLongestRun(runs));
console.log(checkShortestRun(runs));

runType(runs);
averageDistance(runs);

trainingStatus(runs);

function calculateTotalDistance(runCollection: number[]){
    let totalLenght:number = 0;

    for (const run of runCollection) {
        totalLenght += run;
    }
    console.log(`Total Distance: ${totalLenght}`)
}

function checkGoal(dist: number){

    return dist >= weeklyGoal ? 'Goal Reached!' : 'Goal Not Reached';
}

function showHeader(): void{
    console.log("==========================")
    console.log("Marathon Training Analyzer")
    console.log("==========================")
}

function showRuns():void{

    for (let i = 0; i < runs.length; i++) {
        console.log(`Run ${i+1}: ${runs[i]} km`)
    }
    console.log(`Total runs: ${runs.length}`)

}

function checkLongestRun(runs:number[]){
    let longestRun:number = 0;

    runs.forEach(element => {
        if(element > longestRun)
        {
            longestRun = element;
        }
    });

    return longestRun;
}

function checkShortestRun(runs: number[]){

    if (!runs.length) return;


    return runs.reduce((shortestRun,current) => {
        return current < shortestRun ? current: shortestRun;
    })

    // for (let i = 1; i < runs.length; i++) {
    //     if(runs[i] < shortestRun){
    //         shortestRun = runs[i];
    //     }
    // }
    // return shortestRun;
}

function runType(runs:number[]): void{

    runs.forEach(distance => {
        if(distance < 10){
            console.log(`${distance} km: Easy run`)
        }

        else if(distance >= 10 && distance <= 15){
            console.log(`${distance} km: Medium run`)
        }

        else if(distance > 15){
            console.log(`${distance} km: Long run`)
        }

        else{
            console.log("Invalid run")
        }

    });
}

function averageDistance(runs: number[]): void{
    let totalDistance:number = 0;

    runs.forEach(run => {
        totalDistance += run;
    });

    if (totalDistance / runs.length > 10){
        console.log(`Average run: ${totalDistance / runs.length}, youre on track!`)
    }
    else{
        console.log(`Average run: ${totalDistance / runs.length}, needs improvement!`)
    }

}

function trainingStatus(runs: number[]){
    let shortRuns:number = 0;
    let longRuns:number = 0;
    
    runs.forEach(run => {
        run > 10 ? longRuns++ : shortRuns++;
    });

    shortRuns > longRuns ? console.log("Needs Improvement") : console.log("You are on track") 
}

