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
    myData.map(({Title,Year,Poster})=>{
        return `<div class="movie-card">
         <img src="${Poster}">
         <h4>${Title}</h4>
         <p>${Year}</p>
         </div>`;
    
    }).join("");
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



