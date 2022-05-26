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
  const movieCrd = await fetchMoviesCridit(movie.id);
  const movietrailer =await  movieTrailer(movie.id);
  const d=await dd();
  gId=movie.id
  onlyeOnce=false;
  const key =movietrailer.results[0].key;
  renderMovie(movieRes,movieCrd.cast,key);
  actorName(movieCrd.cast);
  renderMovies(d);
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
    let divIndex=0;
    const re =document.querySelector('.re');
    movies.map((movie) => {
        const movieDiv = document.createElement("div");
        
        movieDiv.setAttribute('class',`he `)
      //  movieDiv.addEventListener("mouseover",  ()=>{
      //   hoverDetailes(movie,movieDiv) ;
      //  });
      //  movieDiv.addEventListener("mouseout", ()=>{
      //    hoverDetailes1(movie,movieDiv)
        
      //  });
        divIndex++;
        movieDiv.innerHTML = `
          <div class="card ">
            <div class="front">
          <img class="smallPosterimg1 " style="border-radius: 25px;" src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
            movie.title
          } poster">
            <div class="smallPoster" >
            <span > <img class="smallPosterimg" src="${BACKDROP_BASE_URL + movie.poster_path}" alt="${
              movie.title
            } poster"></span> <span class="h3P"><h3>${movie.title}</h3>
    
            </span> 
            <svg  xmlns="http://www.w3.org/2000/svg" class="h-1 w-0 svg2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
         </svg>
            </div>
            <div class="movieDetiles ">
              <div>Release Date<br>${movie.release_date}</div>
              <div>Rating <br>${movie.vote_average}</div>
              <div>Lang<br>${movie.original_language}</div>
              <div>Vote Count<br>${movie.vote_count}</div>
            </div>
          </div>
          <div class="back" style="background-image: url(${BACKDROP_BASE_URL + movie.poster_path})" >
            <p  calss="overview" >${movie.overview}</p>
          </div>
          </div>
          `;

              movieDiv.addEventListener("click", () => {          
          movieDetails(movie);
        });         
          if(movies.length===5){
            re.append(movieDiv) 
          }
          else{
            CONTAINER.appendChild(movieDiv)
            onlyeOnce=true
          }
      });    
    
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie,cridit,key) => {
  CONTAINER.innerHTML = `
            <div id="movie-backdrop" class="coverBg col"style="background-image: url(${BACKDROP_BASE_URL + movie.backdrop_path})" >        
            <div class="row grBackGround" >
              <div class="col-3 posterCard">
                <a class="trilerTag"  target="_blank" href="https://www.youtube.com/watch?v=${key}">
                <svg class="svg1" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <img  class="poster " src="${BACKDROP_BASE_URL + movie.poster_path}" >
                </a>            
              </div> 
              <div class="col-7 movieInfo">
                <h2 id="movie-title"> <span class="rating">
                <b>${movie.vote_average}</b>
                </span> ${movie.title}</h2>
                <hr>  
                <div class="txtInfo">
                  <p id="movie-release-date"><b>Release Date: </b> ${
                    movie.release_date
                  } </p>
                  <span id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</span>
                  <hr>
                  <h3>Overview:</h3>
                  <p id="movie-overview">${movie.overview}</p>
                  </div>
                  <ul id="actors" class="list-unstyled">Actors:</ul>  
                <div>
                    <div id="carousel">
                      <figure id="spinner">
                        <img src="${BACKDROP_BASE_URL + cridit[0].profile_path}" >
                        <img src="${BACKDROP_BASE_URL + cridit[1].profile_path}" >
                        <img src="${BACKDROP_BASE_URL + cridit[2].profile_path}" >
                        <img src="${BACKDROP_BASE_URL + cridit[3].profile_path}" >
                        <img src="${BACKDROP_BASE_URL + cridit[4].profile_path}" >
                        <img src="${BACKDROP_BASE_URL + cridit[5].profile_path}" >
                        <img src="${BACKDROP_BASE_URL + cridit[6].profile_path}" >
                        <img src="${BACKDROP_BASE_URL + cridit[7].profile_path}" >
                      </figure>

                      <span class="ActorName" >${cridit[0].original_name} </span> 
                    </div>
                  <span style="float:left" class="ss-icon" onclick="galleryspin('-')">&lt;</span>
                  <span style="float:right" class="ss-icon" onclick="galleryspin('')">&gt;</span> 
                </div>
               </div>
               <div class="re"></div>

              </div>

            </div>     
            </div>
    `;
    
};

// movies section Codes
const ddlists=document.querySelectorAll('.dropdown-item')
ddlists.forEach(element=>{
  addEventClick(element)
})

let gId=28;
// adding click event to the list's tags 
function addEventClick(element){
  element.addEventListener('click',async ()=>{
    const res= await getMoviesGeners();
// getting the Id genre of the pressed tag     
    res.forEach( async(elementGenre)=>{
     if(elementGenre.name===element.innerHTML){
        const results=await fetchMoviesSimilar(elementGenre.id,'similar') 
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
const fetchMoviesSimilar = async (genreId,typeId) => {
  const url = constructUrl(`movie/${genreId}/${typeId}`);
  const res = await fetch(url);
  return res.json();
};

//==================
const fetchMoviesSimilarNewPAge = async (genreId,pageNumber) => {
 
  const url = constructUrlNewPage(`movie/${genreId}/similar`,pageNumber);
  const res = await fetch(url);
  return res.json();
};

const constructUrlNewPage = (path,pageNumber) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI")}&page=${pageNumber}
  )}`;
};

let x=1;
let onlyeOnce=true
// event when reaching the bootom
document.addEventListener('scroll', () => { 
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight-1 && onlyeOnce) {
    x++;
    // console.log(fetchMoviesSimilarNewPAge(gId,2)) 
    (async ()=>{
      const v=await fetchMoviesSimilarNewPAge(gId,x)
      renderMovies(v.results)
      console.log('hello1')
    })();
  }
   
});

async function dd(){
      const v=await fetchMoviesSimilarNewPAge(gId,x)
      v.results.slice(0,5);
      return v.results.slice(0,5);
};

let type='upcoming';
//===============topRated Moview Part==================
const topRated=document.querySelector('.topRated')
topRated.addEventListener('click',e=>{    
  type='top_rated'
  Moviefilter(type)
})

const Upcoming=document.querySelector('.upcoming')
Upcoming.addEventListener('click',e=>{    
  type='upcoming'
  Moviefilter(type)
})

const popular=document.querySelector('.popular')
popular.addEventListener('click',e=>{    
  console.log('hello')
  type='popular';
  Moviefilter(type)
})

const fetchMoviesfilter = async (type) => {
  const url = constructUrl(`movie/${type}`);
  const res = await fetch(url);
    return  res.json();
};

const movieTrailer =async (id)=>{
  const url= constructUrl(`movie/${id}/videos`)
  const res = await fetch(url);
  return res.json();
}


const recom=document.querySelector('.recommendations')
recom.addEventListener('click',async e=>{    
  gId=28;
  const results=await fetchMoviesSimilar(gId,'recommendations') 
  CONTAINER.innerHTML=" ";     
  renderMovies(results.results)
  console.log(results.results)
})

const fetchMoviesCridit = async (Id) => {
  const url = constructUrl(`movie/${Id}/credits`);
  const res = await fetch(url);
  return res.json();
};

let nameAr=[];
 async function actorName(cast){
  for(let i=0;i<8;i++){
    nameAr[i]= cast[i].original_name;
  }
}


let angle = 0;
let index=0;
function galleryspin(sign) { 
  const actorN=document.querySelector('.ActorName');
  actorN.innerHTML=nameAr[index];
  index++;
  if(index>=7){
    index=0;
  }
  const spinner = document.querySelector("#spinner");
if (!sign) { angle = angle+45 ; } else { angle = angle - 45;}
spinner.setAttribute("style","-webkit-transform: rotateY("+ angle +"deg); -moz-transform: rotateY("+ 0 +"deg); transform: rotateY("+ angle +"deg);");
}


// const page0=document.querySelector('.page0')
//  function hoverDetailes(movie,div){
//   const hoverInfo=document.createElement('div')
//     hoverInfo.setAttribute('class','hoverInfo');  
    
//     hoverInfo.innerHTML=`
//         <div class="movieOverview">
//           <p>${movie.overview}</p>
//         </div>
//         <div class="movieGenre">
//         </div>
//     `
//   setTimeout(async ()=>{
//     div.setAttribute('Id','blurDiv')
//     div.appendChild(hoverInfo)
//   },100)
  
 
  
  // console.log("enter")
//}
// async function hoverDetailes1(movie,div){
//     const hoverInfo=document.querySelector('.hoverInfo')
//   setTimeout(async ()=>{
//     div.removeAttribute('Id')
//     hoverInfo.innerHTML=" ";
//     hoverInfo.remove();
    
//   },100)
//   hoverInfo.remove();


  // console.log("leave")
//}



//================================================

const Moviefilter = async (type) => {
  const movie = await fetchMoviesfilter(type);
  CONTAINER.innerHTML="";
  gId=movie.results[0].id;
  console.log(movie.results)
  renderMovies(movie.results);
};

//mayce's code starts here
// Actros list page starts here
const actorsBtn = document.getElementById("actors");
const fetchActors = async () => {
  const url = constructUrl("person/popular"); //person/{person_id} //movie/now_playing
  const res = await fetch(url);
  return res.json(); // shows a lsit of popular people
};
const actorCardsDiv = document.createElement("div");
actorCardsDiv.classList.add("row");
actorCardsDiv.classList.add("justify-content-center");
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
  actorCardsDiv.innerHTML += `
    <div class="row d-flex flex-wrap justify-content-center">
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
};
const fetchActor = async (personId) => {
  const url = constructUrl(`person/${personId}`);
  const res = await fetch(url);
  return res.json();
};
const renderActor = (actor) => {
  let alsoKnownAsArr = [];
  for (let item in actor["also_known_as"]) {
    alsoKnownAsArr.push(item);
  }
  console.log(alsoKnownAsArr);
  let slicedKnownforArr = alsoKnownAsArr.slice(0, 5) + "...";
  CONTAINER.innerHTML = `
  <div class="row">
      <div class="col-md-4">
        <img class="card-img-top" src="${
          actor.profile_path
            ? BACKDROP_BASE_URL + actor.profile_path
            : "https://via.placeholder.com/350"
        }" alt="Card image cap">
      </div>
      <div class="col-md-8">
      <h2 id="title">${actor.name}</h2>
        <section class="full_wrapper">
          <h3 dir="auto">Biography</h3>
          <div dir="auto" class="biography true">
              <div class="content fade_text">
                <div class="text initial">
                  <p>${actor.biography}</p>
                </div>
          </div>
        </section>
        <section class="full_wrapper">
          <div id='known_for'>
          <h3 dir="auto">known_for</h3>
            <div id='known_for_scroller' class='scroller_wrap'>
            ${slicedKnownforArr}
            </div>
          </div>
        </section>
        <section class="full_wrapper">
          <div id='personalInfo'>
           <h4 dir="auto">Personal Information:</h4>
            </div>
          </div>
        </section>
        <section class="full_wrapper">
          <p><strong>Gender</strong><br> ${
            actor["gender"] ? "Female" : "Man"
          }</p>
          <p><strong>Known Credits</strong><br> ${actor["birthday"]}</p>  
          <p><strong>popularity</strong><br> ${actor["popularity"]}</p>        
        </section>`;
};
// Actors single page endss here
// About us page starts here
const aboutUsBtn = document.getElementById("aboutUs");
const openAboutUsPage = () => {
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
