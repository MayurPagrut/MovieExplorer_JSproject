const apikey="";
let pageNum = 1;
let totalResults = 0;
let currentTitle = "";
let category = "all";

async function getPage(pageNum)
{
   // const title = document.querySelector("#movieInput").value;
    const response= await fetch(`https://www.omdbapi.com/?apikey=${apikey}&s=${currentTitle}&page=${pageNum}`);
    const data=await response.json();
    console.log(data.Search);
    //const {totalResults}=data;
      totalResults = Number(data.totalResults);
    const totalMovies= document.querySelector("#totalMovies").textContent=totalResults;

    let myData=data.Search;
    if(category!=="all")
    {
        myData=myData.filter(
            myData=>myData.Type ===category
        );
    }

    const container = document.querySelector("#movieContainer");
    container.innerHTML=
    myData.map(({Title,Year,Poster,imdbID})=>{
        return `<div class="movie-card">
         <img src="${Poster}">
         <h4>${Title}</h4>
         <p>${Year}</p>
         <button onclick="viewMovie('${imdbID}')">
        View Details
    </button>
         </div>`;
    
    }).join("");
}
async function viewMovie(imdbID)
{
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apikey}&i=${imdbID}`
    );

    const movie = await response.json();
    document.querySelector("#movieDetails").innerHTML = `
    <h2>${movie.Title}</h2>
    <img src="${movie.Poster}">

    <p><strong>Year:</strong> ${movie.Year}</p>
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p><strong>Runtime:</strong> ${movie.Runtime}</p>
    <p><strong>Director:</strong> ${movie.Director}</p>
    <p><strong>Actors:</strong> ${movie.Actors}</p>
    <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
    <p><strong>Plot:</strong> ${movie.Plot}</p>
`;

    console.log(movie);
    document.querySelector("#movieModal").style.display =
"block";
document.querySelector("#closeModal")
.addEventListener("click",()=>{
    document.querySelector("#movieModal").style.display =
    "none";
});
}

const button= document.querySelector("#searchBtn");
button.addEventListener("click",async ()=>{
    currentTitle=document.querySelector("#movieInput").value;
    pageNum = 1;
        getPage(pageNum);
});
document.querySelector("#categorySelect")
         .addEventListener("change", () => {
       category =
         document.querySelector("#categorySelect").value;
     getPage(pageNum);
    });  


  document.querySelector("#nextBtn").addEventListener("click",()=>{
         if(pageNum < Math.ceil(totalResults / 10)) {
        pageNum++;
        getPage(pageNum);
    }
    });
    document.querySelector("#prevBtn").addEventListener("click",()=>{
        if(pageNum>1){pageNum--;getPage(pageNum);}    
    });



