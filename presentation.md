# Movie Project Presentations

This time, we will be a bit stricter about time (also there's no madlibs filling
out this time). Eight minutes per group.

## Part 1: Demo
Demo your project. Show us the pages. Maximum three minutes.

## Part 2: Explain some code.
Each person explain **one** piece of code. About 1.5 minutes per person.

## Part 3: Learning.
Approximately one minute per person.

* How was the experience of reading pre-existing code?
* What was the hardest thing for you in the project?


<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
       <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
            <li class="nav-item active">
              <a class="nav-link" id="homePage" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <!-- COLUMNS -->
              <div class="dropdown">
                <button class="btn  dropdown-toggle " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 
                  MOVIES
                </button>
                <div class="dropdown-menu dropdown-multicol2" aria-labelledby="dropdownMenuButton">
                  <div class="dropdown-col">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Adventure</a>
                    <a class="dropdown-item" href="#">Animation</a>
                    <a class="dropdown-item" href="#">History</a>
                    <a class="dropdown-item" href="#">Horror</a>
                    <a class="dropdown-item" href="#">TV Movie</a>
                  </div>
                  <div class="dropdown-col">
                    <a class="dropdown-item" href="#">Comedy</a>
                    <a class="dropdown-item" href="#">Crime</a>
                    <a class="dropdown-item" href="#">Documentary</a>
                    <a class="dropdown-item" href="#">Music</a>
                    <a class="dropdown-item" href="#">Mystery</a>
                    <a class="dropdown-item" href="#">Thriller</a>
                  </div>
                  <div class="dropdown-col">
                    <a class="dropdown-item" href="#">Drama</a>
                    <a class="dropdown-item" href="#">Family</a>
                    <a class="dropdown-item" href="#">Fantasy</a>
                    <a class="dropdown-item" href="#">Romance</a>
                    <a class="dropdown-item" href="#">Science Fiction</a>
                    <a class="dropdown-item" href="#">War</a>
                  </div>
                </div>
               </div>    
              <!-- COLUMNS END-->
           </li>
            <li class="nav-item ">
              <div class="ml-5 ">
                <i class="fa fa-film"></i><a class="nav-link topRated d-inline " href="#">Top Rated</a>
              </div>
              
            </li>
          </li>
          <li class="nav-item">
            <div class="ml-3 ">
              <i class="fa fa-ticket"></i>  <a class="nav-link upcoming d-inline " href="#">Upcoming</a>
            </div>
            
          </li>
        </li>
        <li class="nav-item">
          <div class="ml-3 ">
            <i class="fa fa-trophy mr-2"></i> <a class="nav-link popular d-inline " href="#">Popular</a>
          </div>
        </li>
        <li class="nav-item">
          <div class="ml-3 ">
            <i class="fa fa-comment"></i> <a class="nav-link recommendations d-inline " href="#">Recommendations</a> 
          </div>
        </li>
        <li class="nav-item">
          <div class="ml-3 ">
            <i class="fa fa-star"></i> <a class="nav-link recommendations d-inline " id="actors" href="#">Actors</a> 
          </div>
        </li>
        <li class="nav-item">
          <div class="ml-3 ">
            <svg xmlns="http://www.w3.org/2000/svg" class="abus" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg> <a class="nav-link recommendations d-inline  " id="aboutUs" href="#">About Us</a> 
          </div>
        </li>
        
        
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="searchBox">
            <button class="btn btn-outline-success my-2 my-sm-0" id="searchBtn">Search</button>
          </form>
        </div>
      </div>
      </nav>

