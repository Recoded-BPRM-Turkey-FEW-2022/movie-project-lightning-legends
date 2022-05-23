'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};


// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  renderMovie(movieRes);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
    return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
    let divIndex=0;
    movies.map((movie) => {
      const movieDiv = document.createElement("div");
      movieDiv.setAttribute('class',`${divIndex}`)
      divIndex++;
      movieDiv.innerHTML = `
          <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
        movie.title
      } poster">
          <h3>${movie.title}</h3>`;
      movieDiv.addEventListener("click", () => {
        movieDetails(movie);
      });
      CONTAINER.appendChild(movieDiv);
      onlyeOnce=true;
    });   
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie) => {
  CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${
               BACKDROP_BASE_URL + movie.backdrop_path
             }>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${
              movie.release_date
            }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled"></ul>
    </div>`;
};

// movies section Codes
const ddlists=document.querySelectorAll('.dropdown-item')
ddlists.forEach(element=>{
  addEventClick(element)
})

let gId=''
// adding click event to the list's tags 
function addEventClick(element){
  element.addEventListener('click',async ()=>{
    const res= await getMoviesGeners();
// getting the Id genre of the pressed tag     
    res.forEach( async(elementGenre)=>{
     if(elementGenre.name===element.innerHTML){
        const results=await fetchMoviesSimilar(elementGenre.id) 
        CONTAINER.innerHTML=" ";     
        renderMovies(results.results)
               gId=elementGenre.id;
        console.log(gId)
        console.log(results.results)
     } 
    })
  })
}

// ==============================
// This function is to fetch Genres
const fetchMoviesGenre = async () => {
  const urlMoviesList=constructUrl(`genre/movie/list`);
  const resMoviesList= await fetch(urlMoviesList);
  return resMoviesList.json();
};

// this function get movies depend on the genere
const getMoviesGeners=async()=>{
  const res=await fetchMoviesGenre()
    return res.genres;
}

// This function is to fetch simirlar Movie depend on the Id
const fetchMoviesSimilar = async (genreId) => {
  const url = constructUrl(`movie/${genreId}/similar`);
  const res = await fetch(url);
  return res.json();
};

//==================
const fetchMoviesSimilarNewPAge = async (genreId,pageNumber) => {
  const url = constructUrlNewPage(`movie/${genreId}/similar`,pageNumber);
  console.log(url)
  const res = await fetch(url);
  return res.json();
};

const constructUrlNewPage = (path,pageNumber) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI")}&page=${pageNumber}
  )}`;
};

let x=1;
let onlyeOnce=true;
// event when reaching the bootom
document.addEventListener('scroll', () => { 
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight-1 && onlyeOnce) {
    x++;
    onlyeOnce=false;
    // console.log(fetchMoviesSimilarNewPAge(gId,2)) 
    (async ()=>{
      const v=await fetchMoviesSimilarNewPAge(gId,x)
      renderMovies(v.results)
    })()
  }
});




document.addEventListener("DOMContentLoaded", autorun);

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=542003918769df50083a13c415bbc602&language=en-US
// https://api.themoviedb.org/3/genre/movie/list?api_key=542003918769df50083a13c415bbc602&language=en-US
// https://api.themoviedb.org/3/movie/now_playing?api_key=542003918769df50083a13c415bbc602
// https://api.themoviedb.org/4/list/{list_id}?page=1&api_key=542003918769df50083a13c415bbc602

