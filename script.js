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


// https://api.themoviedb.org/3/movie/752623/credits/?api_key=542003918769df50083a13c415bbc602%20%20||%20
// https://api.themoviedb.org/3/movie/28/credits?api_key=542003918769df50083a13c415bbc602&language=en-US















document.addEventListener("DOMContentLoaded", autorun);






































// https://api.themoviedb.org/3/movie/{movie_id}?api_key=542003918769df50083a13c415bbc602&language=en-US
// https://api.themoviedb.org/3/genre/movie/list?api_key=542003918769df50083a13c415bbc602&language=en-US
// https://api.themoviedb.org/3/movie/now_playing?api_key=542003918769df50083a13c415bbc602
// https://api.themoviedb.org/4/list/{list_id}?page=1&api_key=542003918769df50083a13c415bbc602
