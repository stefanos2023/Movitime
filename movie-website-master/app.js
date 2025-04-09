const movies = [
  {
      title: "img/f-t-1.png",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto illo dolordeserunt nam assumenda ipsa eligendi dolore, ipsum id fugiat quo enim impedit, laboriosam omnis minima voluptatibus incidunt. Accusamus, provident.",
      img: "img/f-1.jpg"
  },
  {
      title: "img/f-t-2.png",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto illo dolo deserunt nam assumenda ipsa eligendi dolore, ipsum id fugiat quo enim impedit, laboriosam  voluptatibus incidunt. Accusamus, provident.",
      img: "img/f-2.jpg"
  }
];

const API_KEY=`09d4d155f252fcf9cec509ee46d291f2`
const main_grid=document.querySelector('.TOP10 .movie-list')
const image_path=`https://image.tmdb.org/t/p/w1280`

function add_to_click_effect_to_card(cards){
  cards.forEach(card =>{
    card.addEventListener('click',()=>show_pop(card))
  })
}


let currentIndex = 0;

  async function updateFeaturedMovie() {
  const featuredBg = document.getElementById("featuredBg");
  const featuredTitle = document.getElementById("featuredTitle");
  const featuredDesc = document.getElementById("featuredDesc");

  featuredBg.style.background =   `linear-gradient(to bottom, rgba(0,0,0,0), #151515), url(${movies[currentIndex].img})`;;
  featuredTitle.src = movies[currentIndex].title;
  featuredDesc.textContent = movies[currentIndex].desc;

  currentIndex = (currentIndex + 1) % movies.length;
}

setInterval(updateFeaturedMovie, 3000); 
updateFeaturedMovie(); 

// 🛠 Προσθήκη event listeners ΣΩΣΤΑ
function addArrowListeners() {
  const arrows = document.querySelectorAll(".arrow");
  const movieLists = document.querySelectorAll(".movie-list");

  arrows.forEach((arrow, i) => {
    const itemNumber = movieLists[i].querySelectorAll("img").length;
    let clickCounter = 0;

    arrow.addEventListener("click", () => {
      const ratio = Math.floor(window.innerWidth / 270);
      clickCounter++;
      if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
        movieLists[i].style.transform = `translateX(${
          movieLists[i].computedStyleMap().get("transform")[0].x.value - 500
        }px)`;
      } else {
        movieLists[i].style.transform = "translateX(0)";
        clickCounter = 0;
      }
    });

  });
}



//Tοπ 10

async function get_top_10_movies() {
  const resp = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`);
  const respData = await resp.json();

  const top10 = respData.results.slice(0, 10); // Παίρνει μόνο τις πρώτες 10 ταινίες

  main_grid.innerHTML = top10.map((e, index) => {
      return `
          <p class="movie-rank">${index + 1}</p>
          <div class="movie-list-item" data-id="${e.id}">
              <img class="movie-list-item-img" src="https://image.tmdb.org/t/p/w500/${e.poster_path}" alt="${e.title}">
              <span class="movie-list-item-title">${e.title}</span>
              <p class="movie-list-item-desc">${e.overview.substring(0, 100)}...</p>
              <button class="movie-list-item-button">Watch</button>
          </div>
      `;
  }).join(""); 
    const cards=document.querySelectorAll('.movie-list-item')
    add_to_click_effect_to_card(cards)



  addArrowListeners();
}

get_top_10_movies();

async function getUpcomingMovies() {
  const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-GR&page=1`);
  const data = await response.json();
  return data.results; // Επιστρέφει τη λίστα με τις ταινίες
}

async function showUpcomingMovies() {
  const movies = await getUpcomingMovies();
  const new_releases=document.querySelector('.movie-list')

  new_releases.innerHTML = movies.map(movie => `<div class="movie-list-item" data-id="${movie.id}">
                            <img class="movie-list-item-img" src="${ image_path+movie.poster_path}" alt="">
                            <span class="movie-list-item-title">${movie.title}</span>
                            <p class="movie-list-item-desc">${movie.overview.substring(0, 100)}...</p>
                            <button class="movie-list-item-button">Watch</button>
                        </div>
      
  `).join("");
    const cards=document.querySelectorAll('.movie-list-item')
    add_to_click_effect_to_card(cards)

  addArrowListeners();
}

showUpcomingMovies();

async function getMovies() {
  const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-GR&page=2`);
  const data = await response.json();
  return data.results; 
}

 async function showMovies(){
  const movies=await getMovies();
  const Omovies=document.getElementById('OMOVIES')
  Omovies.innerHTML=movies.map(movie=>`<div class="movie-list-item" data-id="${movie.id} data-type="μοωιε"">
                            <img class="movie-list-item-img" src="${image_path + movie.poster_path}" alt="">
                            <span class="movie-list-item-title">${movie.title}</span>
                            <p class="movie-list-item-desc">${movie.overview.substring(0, 100)}...</p>
                            <button class="movie-list-item-button">Watch</button>
                        </div>`).join(' ')
                        const cards=document.querySelectorAll('.movie-list-item')
                        add_to_click_effect_to_card(cards)

    addArrowListeners()
 }

 showMovies();

 async function getTVShows() {
  const response = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-GR&page=2`);
  const data = await response.json();
  return data.results; // Επιστρέφει ΜΟΝΟ σειρές
}

 async function showSeries () {
  const series=await getTVShows();
  const Oseries=document.getElementById('OSERIES/TV');
  Oseries.innerHTML=series.map(series=>`<div class="movie-list-item" data-id="${series.id} data-type="tv"">
                            <img class="movie-list-item-img" src="${ image_path+series.poster_path}" alt="">
                            <span class="movie-list-item-title">${series.name}</span>
                            <p class="movie-list-item-desc">${series.overview.substring(0, 100)}...</p>
                            <button class="movie-list-item-button">Watch</button></div>
    `).join('')
     const cards=document.querySelectorAll('.movie-list-item')
     add_to_click_effect_to_card(cards)


  addArrowListeners()
}
showSeries();


//Search value


const input=document.querySelector('.search-container input')
const btn=document.querySelector('.search-container button')
const pop_main_grid= document.querySelector('.popmovie')


async function get_movie_by_search(search_termp){
  const resp= await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search_termp}`)
  const resDta=await resp.json()
  return resDta.results
}

btn.addEventListener('click',add_search_to_pop)

async function add_search_to_pop() {
  document.getElementById('searchPopup').style.display = 'block';
  document.body.style.overflow = 'hidden';
  const pdata=await get_movie_by_search(input.value)
  console.log(pdata);
  pop_main_grid.innerHTML=pdata.map(pop=>{
    return`<div class="movie-list-item" data-id="${pop.id}">
                            <img class="movie-list-item-img" src="${ image_path + pop.poster_path }" alt="">
                            <span class="movie-list-item-title">${pop.title}</span>
                            <p class="movie-list-item-desc">${pop.overview.substring(0, 100)}..</p>
                            <button class="movie-list-item-button">Watch</button>
                        </div>`
  }).join('')

  const cards=document.querySelectorAll('.movie-list-item')
  add_to_click_effect_to_card(cards) 

}

function closePopup() {
  document.getElementById('searchPopup').style.display = 'none';
  document.body.style.overflow = ''; // Κλείνει το popup
}

async function get_movie_by_id(id){
  const resp= await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
  const resDta=await resp.json()
  return resDta
}
async function get_movie_trailer(id){
  const resp= await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
  const resDta=await resp.json()
  return resDta.results[0].key
}

const pop_conatiner=document.querySelector('.pop-container')







 async function show_pop(card){
  pop_conatiner.classList.add('show-pop')
  const movie_id=card.getAttribute('data-id')
  const movie=await get_movie_by_id(movie_id)
  console.log(movie)
  const movie_trailer= await get_movie_trailer(movie_id)
  pop_conatiner.style.background=`linear-gradient(rgba(0,0,0,.8),rgba(0,0,0,1)) ,url(${image_path+movie.poster_path})`
  pop_conatiner.innerHTML=`<span class="x">&#10006</span>
        <div class="content">
            <div class="left">
                <div class="poster-img">
                    <img src="${image_path+movie.poster_path}" alt="">
                </div>
                <div class="single-info">
                    <span>Add to favorites: </span>
                    <span class="heart-icon">&#9829</span>
                </div>
            </div>
            <div class="right">
                <h1>${movie.title}</h1>
                <h3>${movie.tagline}</h3>
                 <div class="single-info-container">
                    <div class="single-info">
                        <span>Language: </span>
                        <span>${movie.spoken_languages[0].name}</span>
                    </div>
                    <div class="single-info">
                        <span>lenght: </span>
                        <span>${movie.runtime}minutes</span>
                    </div>
                    <div class="single-info">
                        <span>Rate: </span>
                        <span>${movie.vote_average}</span>
                    </div>
                    <div class="single-info">
                        <span>Budget: </span>
                        <span>${movie.budget}</span>
                    </div>
                    <div class="single-info">
                        <span>Release Date: </span>
                        <span>${movie.release_date}</span>
                    </div>
                 </div>
                 <div class="genres">
                    <h2>Genres</h2>
                    <ul>
                      ${movie.genres.map(e=>`<li>${e.name}</li>`).join(' ')}
                    </ul>
                 </div>
                 <div class="overview">
                    <h2>overview</h2>
                    <p>${movie.overview}</p>
                 </div>
                 <div class="trailer">
                    <h2>trailer</h2>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${movie_trailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                 </div>
            </div>
        </div>`
        const x_icon = document.querySelector('.x');
       
        x_icon.addEventListener('click',()=> pop_conatiner.classList.remove('show-pop') )
}




