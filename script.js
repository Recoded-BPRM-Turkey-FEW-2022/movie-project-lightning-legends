"use strict";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");
const actorsRow = document.querySelector(".actorsRow");

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
  const url = constructUrl(`movie/now_playing`); //person/{person_id} //movie/now_playing
  const res = await fetch(url);
  return res.json(); // shows a listt of now playing movis
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  let divIndex = 0;
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.setAttribute("class", `${divIndex}`);
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
    onlyeOnce = true;
  });
};
document.addEventListener("DOMContentLoaded", autorun);
//mayce's code starts here
// Actors single page starts here
const actorDetails = async (actor) => {
  // console.log(actor.id) //shows me clicked on actor's id
  const actorRes = await fetchActor(actor.id);
  const creditsresult = await fetchCredits(actor.id);
  // console.log(actorRes) // shows me details about the actor
  renderActor(actorRes);
  render(creditsresult);
};
const fetchActor = async (personId) => {
  const url = constructUrl(`person/${personId}`);
  const res = await fetch(url);
  return res.json();
};
const fetchCredits = async (personId) => {
  const url = constructUrl(`person/${personId}/movie_credits`);
  const res = await fetch(url);
  return res.json();
};
const render = (creditsresult) => {
  let castArr = creditsresult["cast"];
  for (let i = 0; i < 7; i++) {
    movieCredits.innerHTML += `
      <div class="card h-100 p-1 " style="width: 10rem;height:10rem">
        <img src='${
          castArr[i].poster_path
            ? BACKDROP_BASE_URL + castArr[i].poster_path
            : images / No - image.png
        }' class="card-img-top" style="width: 10rem;height:10rem" alt="...">
        <p class="card-text text-dark d-flex justify-content-center p-0 m-0">${
          castArr[i]["original_title"]
        }</p>
      </div>
    `;
  }
};
const renderActor = (actor) => {
  CONTAINER.innerHTML = `
  <div class="row">
      <div class="col-4">
        <img src="${
          actor.profile_path
            ? BACKDROP_BASE_URL + actor.profile_path
            : "https://via.placeholder.com/350"
        }" alt="Card image cap" style="width:21rem;height:27rem">
      </div>
      <div class="col-8">
        <div class="row flex-column">
          <strong>
            <h2>${actor["name"]}</h2>
          </strong>
          <strong>
            <h5>Gender:</h5>
          </strong>
          <p>${actor["gender"] === 1 ? "Female" : "Man"}</p>
          <strong>
            <h5>Birthday:</h5>
          </strong>
          <p>${actor["birthday"]}</p>
          <h5>popularity</h5>
          <p>${actor["popularity"]}</p>
          <strong>
            <h5>Biography:</h5>
          </strong>
          <p>${actor["biography"]}</p>
        </div>
      </div>
    </div>
    <div class="row flex-column">
        <strong>
         <h5 class='pl-3'>Known for:</h5>
        </strong>
      <div class="row justify-content-center align-content-center" id='movieCredits'>
      </div>
    </div>
  `;
};
// Actors single page endss here
//mayce's code ends here
