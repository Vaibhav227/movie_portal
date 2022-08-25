const APIURL2 = "https://api.themoviedb.org/3/movie/popular?api_key=9e1802e98caefb7b46bf18a13292a750&language=en-US&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=9e1802e98caefb7b46bf18a13292a750&query=";
const APIURL1 = "https://api.themoviedb.org/3/movie/top_rated?api_key=9e1802e98caefb7b46bf18a13292a750&language=en-US&page=1";
const APIURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=9e1802e98caefb7b46bf18a13292a750&language=en-US&page=1";

const main = document.getElementById("content");
const topp = document.getElementById("toprated");
const popp = document.getElementById("popular");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(APIURL);
getTopMovies(APIURL1);
getPopMovies(APIURL2);
async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    showMovies(respData.results);
}
async function getTopMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    showMovies1(respData.results);
}
async function getPopMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    showMovies2(respData.results);
}

function showMovies(movies) {

    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
            vote_average
        )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);

    });
}
function showMovies1(movies) {


    topp.innerHTML = " ";
    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
            vote_average
        )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;


        topp.appendChild(movieEl);
    });
}
function showMovies2(movies) {


    popp.innerHTML = " ";
    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
            vote_average
        )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;


        popp.appendChild(movieEl);
    });
}
function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});