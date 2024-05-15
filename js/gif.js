

let APIKEY = "PMszhtvO0uSR15ZuGmqnemDDItzYKs3W";
let searchImg = "";
let score = 20;
 
if(0 <= score && score <=4){
  searchImg = "sad";
} else {
   if(5 <= score && score <=9){
   searchImg = "mediocre";
} else {
  if(10 <= score && score <= 14){
    searchImg = "alright"
  } else {
    if(15 <= score && score <= 18 ){
      searchImg = "happy"
    } else {
      if(19 <= score && score <= 20)
        searchImg ="excited"
    }
  }
}

}

  

document.addEventListener("DOMContentLoaded", init);
function init() {
  document.getElementById("btnSearch").addEventListener("click", ev => {
    ev.preventDefault(); 
    let apiUrl = `https://api.giphy.com/v1/gifs/search?q=${searchImg}&api_key=${APIKEY}&limit=1`;
    console.log(apiUrl);
    fetch(apiUrl)
       .then(response => response.json())
       .then(content => {
          //  data, pagination, meta
          console.log(content.data)
           let fig = document.createElement("figure");
           let img = document.createElement("img");
           let fc = document.createElement("figcaption");
           img.src = content.data[0].images.downsized.url
           console.log(img.src)
           fig.appendChild(img);
           fig.appendChild(fc);
           let out = document.querySelector(".out");
           console.log("fig", fig);
           out.appendChild(fig);
              
            })
            .catch(err => {
              console.error(err);
            });
        });
      }
      

