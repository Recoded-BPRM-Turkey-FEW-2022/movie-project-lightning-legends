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
  console.log(movie);
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
  console.log(movie);
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
// Actors single page starts here
const actorDetails = async (actor) => {
  const actorRes = await fetchActor(actor.id);
  renderActor(actorRes);
  // credits(actor.id);
};
function known_for(actor) {
  for (let i = 0; i < actor["known_for"].length; i++) {
    sliderContainer.innerHTML += `
    <div class="col p-0 m-0">
    <div class="row m-0 p-0 d-flex justify-content-center">
      <div class="card shadow-lg d-flex align-items-center m-3" style="width: 10rem;">
        <img class="card-img-top" src="${
          BACKDROP_BASE_URL + actor["known_for"][i].poster_path
        }" alt="Card image cap">
        <p class="text-dark mb-0">
         ${actor["known_for"][i]["name"]}
        </p>
      </div>
    </div>
  </div>`;
  }
}
// const credits = async (id) => {
//   console.log(id)
//   const url = constructUrl(`person/{id}/movie_credits`);
//   const res = await fetch(url);
//   console.log(res)
//   return res.json()
// }
const fetchActor = async (personId) => {
  const url = constructUrl(`person/${personId}`);
  const res = await fetch(url);
  return res.json();
};
const renderActor = (actor) => {
  credits(actor.id);
  CONTAINER.classList.add("pt-1");
  CONTAINER.innerHTML = `
  <div class="container pt-0 mt-0 d-flex flex-column">
  <div class="row">
    <div class="col-3 p-0" >
      <img style="width: 13rem;" src="${
        actor.profile_path
          ? BACKDROP_BASE_URL + actor.profile_path
          : "https://via.placeholder.com/350"
      }" alt="Card image cap">
    </div>
    <div class="col-9 p-0">
      <strong>
        <h1>${actor.name}</h1>
      </strong>
      <br>
      <strong>
        <h5>Biography</h5>
      </strong>
      <p>${actor.biography}</p>
    </div>
  </div>
  <div class="row">
    <div class="col-3 p-0">
      <strong>
        <h4>Personal Info</h4>
      </strong>
      <h5 class="actorH5">gender</h5>
      <p>${actor["gender"] === 1 ? "Female" : "Man"}</p>
      <h5>birthday</h5>
      <p>${actor["birthday"]}</p>
      <h5>popularity</h5>
      <p>${actor["popularity"]}</p>
    </div>
    <div class="col-9 d-flex justify-content-center" id='sliderContainer'>
    </div>
  </div>
</div>`;
};
// Actors single page endss here
// About us page starts here
const aboutUsBtn = document.getElementById("aboutUs");
const openAboutUsPage = () => {
  CONTAINER.innerHTML = " ";
  CONTAINER.classList.add('d-flex')
  CONTAINER.classList.add('flex-column')
  CONTAINER.classList.add('align-items-center')

  CONTAINER.innerHTML = `
  <div class='container aboutUsContainer d-flex justify-content-center flex-column align-items-center'>
    <div class='undrawContainer'>
      <h2 class="hithereh2">Hi there,</h2>
      <img class='undraw' src='./undraw.svg'>
    </div>
    <div>
      <h1>Let's talk about OurMovies</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
    <div classe='advantegesContainer container'>
      <div class='row d-flex justify-content-center pb-2 '>
        <h2>The TMDB Advantage</h2>
      </div>
      <div class='row'>
        <div class="col-1 pr-0 number">
          1
        </div>
        <div class='col-11 pl-0'>
          <p class='advantegesp'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
      <div class='row'>
        <div class="col-1 pr-0 number">
          2
        </div>
        <div class='col-11 pl-0'>
          <p class='advantegesp'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
      <div class='row'>
        <div class="col-1 pr-0 number">
          3
        </div>
        <div class='col-11 pl-0'>
          <p class='advantegesp'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
    </div>
`;
};
aboutUsBtn.addEventListener("click", openAboutUsPage);
// About us page endss here
// Search box starts here
const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");

const searchRes = async (value) => {
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
};

const searching = async (event) => {
  console.log(searchBox.value);
  event.preventDefault();
  const results = await searchRes(searchBox.value);
  renderMovies(results);
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
