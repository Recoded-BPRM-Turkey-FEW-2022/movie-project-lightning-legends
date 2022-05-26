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
const ddlists = document.querySelectorAll(".dropdown-item");
ddlists.forEach((element) => {
  addEventClick(element);
});

let gId = "";
// adding click event to the list's tags
function addEventClick(element) {
  element.addEventListener("click", async () => {
    const res = await getMoviesGeners();
    // getting the Id genre of the pressed tag
    res.forEach(async (elementGenre) => {
      if (elementGenre.name === element.innerHTML) {
        const results = await fetchMoviesSimilar(elementGenre.id);
        CONTAINER.innerHTML = " ";
        renderMovies(results.results);
        gId = elementGenre.id;
        console.log(gId);
        console.log(results.results);
      }
    });
  });
}

// ==============================
// This function is to fetch Genres
const fetchMoviesGenre = async () => {
  const urlMoviesList = constructUrl(`genre/movie/list`);
  const resMoviesList = await fetch(urlMoviesList);
  return resMoviesList.json();
};

// this function get movies depend on the genere
const getMoviesGeners = async () => {
  const res = await fetchMoviesGenre();
  return res.genres;
};

// This function is to fetch simirlar Movie depend on the Id
const fetchMoviesSimilar = async (genreId) => {
  const url = constructUrl(`movie/${genreId}/similar`);
  const res = await fetch(url);
  return res.json();
};

//==================
const fetchMoviesSimilarNewPAge = async (genreId, pageNumber) => {
  const url = constructUrlNewPage(`movie/${genreId}/similar`, pageNumber);
  const res = await fetch(url);
  return res.json();
};

const constructUrlNewPage = (path, pageNumber) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI"
  )}&page=${pageNumber}
  )}`;
};

let x = 1;
let onlyeOnce = true;
// event when reaching the bootom
document.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 1 &&
    onlyeOnce
  ) {
    x++;
    onlyeOnce = false;
    // console.log(fetchMoviesSimilarNewPAge(gId,2))
    (async () => {
      const v = await fetchMoviesSimilarNewPAge(gId, x);
      renderMovies(v.results);
    })();
  }
});
//mayce's code starts here
document.addEventListener("DOMContentLoaded", autorun);
// Actros list page starts here
const actorsBtn = document.getElementById("actors");
const fetchActors = async () => {
  const url = constructUrl("person/popular"); //person/{person_id} //movie/now_playing
  const res = await fetch(url);
  return res.json(); // shows a lsit of popular people
};
let actorsListContainer = document.createElement("div");
const renderingActors = (actor) => {
  let known_forArr = [];
  for (let item of actor["known_for"]) {
    if (item["name"]) {
      known_forArr.push(item["name"]);
    } else if (item["original_title"]) {
      known_forArr.push(item["original_title"]);
    }
  }
  let splitedArr = known_forArr.join(", ");
  let slicedKnownforArr = splitedArr.slice(0, 30) + "...";
  const actorCardsDiv = document.createElement("div");
  // actorCardsDiv.classList.add("row");
  actorCardsDiv.classList.add("mayce");
  actorCardsDiv.classList.add("justify-content-center");
  actorCardsDiv.innerHTML += `
      <div class="col">
        <div class="card shadow-lg d-flex align-items-center m-3" style="width: 15rem;">
          <img class="card-img-top" src="${
            actor.profile_path
              ? BACKDROP_BASE_URL + actor.profile_path
              : "https://via.placeholder.com/350"
          }" alt="Card image cap">
          <p class="text-dark mb-0 pl-2 ">
            <a><strong>${actor["name"]}</strong></a>
          </p>
          <p class="card-text pl-2 text-muted">${slicedKnownforArr}</p>
        </div>
      </div>`;
  actorCardsDiv.addEventListener("click", () => {
    actorDetails(actor);
  });
  CONTAINER.append(actorCardsDiv);
};
const addingActors = async () => {
  let fetchedActorObj = await fetchActors();
  let actorsList = fetchedActorObj.results;
  CONTAINER.innerHTML = "";
  for (let i = 0; i < actorsList.length; i++) {
    renderingActors(actorsList[i]);
  }
};
actorsBtn.addEventListener("click", addingActors);
//  Actros list page ends here
// ======================================================================================= /////////////////////
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
  CONTAINER.classList.add('d-flex')
  CONTAINER.classList.add('flex-column')
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
// About us page starts here
const aboutUsBtn = document.getElementById("aboutUs");
const openAboutUsPage = () => {
  CONTAINER.innerHTML = " ";
  CONTAINER.innerHTML = `
      <div class='container aboutUsContainer d-flex justify-content-center flex-column align-items-center'>
       <div> 
         <h2>hi there</h2>
       </div>
       <h1>Let's talk about OurMovies</h1>
       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
       <div classe='advantegesContainer container'> 
         <div class='row d-flex justify-content-center'>
           <h2>The TMDB Advantage</h2>
         </div>
         <div class='row'>
           <div>
             <div class='number'>1</div>
           </div>
           <div class='col'>
             <p class='advantegesp'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
           </div>
         </div>
         <div class='row'>
           <div>
             <div class='number'>2</div>
           </div>
           <div class='col'>
             <p class='advantegesp'>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
           </div>
         </div>
         <div class='row'>
           <div>
             <div class='number'>3</div>
           </div>
           <div class='col'>
             <p class='advantegesp'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
           </div>
         </div>
       </div>`;
};
aboutUsBtn.addEventListener("click", openAboutUsPage);
// About us page endss here
// Search box starts here
const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");

const searching = async (event) => {
  event.preventDefault();
  let searchBoxValue = searchBox.value;
  let fechedMoviesobj = await fetchMovies(); // this is like a main object it has keys and some of the keys has array.
  let moviesArr = fechedMoviesobj.results; // shows the result part of our main object and it is an array of objects each object has movie info
  for (let i = 0; i < moviesArr.length; i++) {
    if (
      searchBoxValue.toLowerCase() ==
      moviesArr[i]["original_title"].toLowerCase()
    ) {
      renderMovie(moviesArr[i]);
      movieDetails(moviesArr[i]);
      break;
    } else if (
      searchBoxValue.toLowerCase() !==
      moviesArr[i]["original_title"].toLowerCase()
    ) {
      CONTAINER.innerHTML = "we couldn find what you are looking for";
    }
  }
};
searchBtn.addEventListener("click", searching);
// Search box ends here
//HomePage starts here
const homePageBtn = document.getElementById("homePage");
const homePage = async () => {
  let moviesInfo = await fetchMovies();
  let moviesarray = moviesInfo.results;
  CONTAINER.innerHTML = " ";
  renderMovies(moviesarray);
};
homePageBtn.addEventListener("click", homePage);
//HomePage endss here
//mayce's code ends here
