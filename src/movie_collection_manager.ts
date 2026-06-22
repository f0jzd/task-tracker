

type Movie = {
    title:string,
    releaseYear: number,
    seen:boolean,
    rating:number,
    genre:string
}

const movies: Movie [] = [
    {
       title: "The Matrix",
       releaseYear: 1999,
       seen: false,
       rating: 5, 
       genre:"Sci-Fi"
    },
    {
       title: "Inception",
       releaseYear: 2010,
       seen: true,
       rating: 7,
       genre:"Sci-Fi"
    },
    {
       title: "Dune",
       releaseYear: 2021,
       seen: false,
       rating: 8,
       genre:"Sci-Fi"
    },
    {
       title: "Pulp Fiction",
       releaseYear: 1994,
       seen: true,
       rating: 8.8,
       genre:"Thriller"
    },
    {
       title: "Interstellar",
       releaseYear: 2014,
       seen: false,
       rating: 8.7,
       genre:"Sci-Fi"
    },
    {
       title: "12 Angry men",
       releaseYear: 1957,
       seen: false,
       rating: 2,
       genre:"Thriller"
    }
]


function showAllMovies(): void{
    movies.forEach(movie => {
        console.log(`${movie.title} (${movie.releaseYear})`);
    });
}

function showNumberOfMovies(): void{
    console.log(`Total movies: ${movies.length}`)
}

function showSeenMovies(): void{
    movies.forEach(movie => {
        if(movie.seen)
            console.log(movie.title)
    });
}
function showUnseenMovies(): void{
    movies.forEach(movie => {
        if(!movie.seen)
            console.log(movie.title)
    });
}

function movieStatistics(): void{
    let watchedMovies= 0;
    let unwatchedMovies= 0;

    let percentageWatched = 0;

    movies.forEach(movie => {
        if(movie.seen)
            watchedMovies++;
        else
            unwatchedMovies++;
    });

    percentageWatched = Math.round((watchedMovies/movies.length) * 100);
    console.log(`Movies watched: ${watchedMovies} | Unwatched Movies: ${unwatchedMovies} | Percent watched: ${percentageWatched}%`)

}

function markAsWatched(movieTitle: String): void{
    movies.forEach(movie => {
        if(movieTitle === movie.title)
            movie.seen = true;
    });
}

function averageRating(): void{
    let averageRating = 0;

    movies.forEach(movie => {
        averageRating += movie.rating;
    });

    averageRating = averageRating / movies.length;

    averageRating.toFixed(2)

    console.log(`Average Movie Rating: ${averageRating.toFixed(2)}`)
}

function topRatedMovie(): void{


    let topRatedMovie = movies.reduce((topMovie,movie) => {
        return movie.rating > topMovie.rating? movie:  topMovie;
    })

    console.log(`The top rated movie is ${topRatedMovie.title} with a score of ${topRatedMovie.rating}`)
}

function bestMovies():void {

    const topMovies: Movie[] = movies.filter((movie => movie.rating >= 8))
    console.log(topMovies)

}

function watchProgress(){
    let watchedMovies= 0;
    let unwatchedMovies= 0;

    let percentageWatched = 0;

    movies.forEach(movie => {
        if(movie.seen)
            watchedMovies++;
        else
            unwatchedMovies++;
    });

    percentageWatched = Math.round((watchedMovies/movies.length) * 100);
    console.log(`Percent watched: ${percentageWatched}%`)
}

function showMoviesOfGenre(genre:string){

    movies.forEach(movie => {
        if(movie.genre === genre)
            console.log(movie)
    });

}



showAllMovies();
console.log("────────────────────");
showNumberOfMovies();
console.log("────────────────────");
showSeenMovies();
console.log("────────────────────");
showUnseenMovies();
console.log("────────────────────");
movieStatistics();
console.log("────────────────────");
markAsWatched("Dune");
movieStatistics();
console.log("────────────────────");
averageRating();
console.log("────────────────────");
topRatedMovie();
console.log("────────────────────");
bestMovies();
console.log("────────────────────");
watchProgress();
console.log("────────────────────");
showMoviesOfGenre("Sci-Fi");
console.log("────────────────────");
showMoviesOfGenre("Thriller");