//TODO convert to class based implementation

const auth = "563492ad6f91700001000001be086f680b214c6dae09380447fd1de7";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;
const more = document.querySelector('.more');
let page = 1;
let fetchLink;
let currentSearch;

//event listeners
searchInput.addEventListener('input', updateInput);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
});

more.addEventListener('click', loadMore);

async function loadMore() {
    page++;
    if (currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&per_page=${page}`;
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchAPI(fetchLink);
    generatePics(data);
}



function updateInput(e) {
    // console.log(e.target.value);
    searchValue = e.target.value;
}

async function fetchAPI(url) {
    const dataFetch = await fetch(url, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });

    const data = await dataFetch.json();
    return data;
}

async function curatedPhotos() {
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchAPI(fetchLink);
    generatePics(data);
}

async function searchPhotos(query) {
    clear();
    // console.log(query);
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&per_page=1`;

    const data = await fetchAPI(fetchLink);
    // console.log(data);
    generatePics(data);
}
// search
curatedPhotos();
function generatePics(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `<div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.large}>Download</a>
    </div>
    <img src=${photo.src.large}></img>
        `;
        gallery.appendChild(galleryImg);
    });
}
function clear() {
    gallery.innerHTML = '';
    searchInput.value = '';
}