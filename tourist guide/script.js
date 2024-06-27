
let aqiValue = document.querySelector("b");
let searchbar = document.querySelector("input");
let searchButton = document.querySelector(".btn");
let aqiblock = document.querySelector(".aqi")
let aqinum = document.querySelector("b")
let aqiindicator = document.querySelector("p")
let form = document.querySelector("form")
let container = document.querySelector(".container")
let city;
let recentSearches = [];
searchbar.value = ""
searchbar.addEventListener("change",(event)=>{
  searchbar.value = event.target.value;
  recentSearches.push(event.target.value);
})

searchButton.addEventListener("click",()=>{
     city = searchbar.value;
     console.log(city)
      aqiData(city)
     placeid(city)
})

//  air quality index-------//
const aqiData = async(city)=>{
  try {
    let url = `https://api.api-ninjas.com/v1/airquality?city=${city}&X-Api-Key=CD21HqBmCNHWmXt2p9SQRQ==P6RvSH2lXO45t9tv` 
 
    const response = await fetch(url)
    const data = await response.json()
   console.log(data.overall_aqi)
   aqinum.innerHTML = `${city}-${data.overall_aqi}`
   if(data.overall_aqi>=0 && data.overall_aqi <=50){
     aqiindicator.innerHTML = `Good`
     aqinum.style.color = "green"
   }
   else if(data.overall_aqi>50 && data.overall_aqi <=100){
     aqiindicator.innerHTML = `Moderate`
     aqinum.style.color = "yellow"
   }
   else if(data.overall_aqi>100 && data.overall_aqi <=150){
     aqiindicator.innerHTML = `Unhealthy for sensitive groups`
     aqinum.style.color = "orange"
   }
   else if(data.overall_aqi>150 && data.overall_aqi <=200){
     aqiindicator.innerHTML = `Unhealthy`
     aqinum.style.color = "red"
   }
   else if(data.overall_aqi>200 && data.overall_aqi <=300){
     aqiindicator.innerHTML = `Very Unhealthy`
     aqinum.style.color = "purple"
   }
   else{
     aqiindicator.innerHTML = `Hazardous`
     aqinum.style.color = "brown"
   }
  } catch (error) {
    console.log(error)
  }
}

// places api to convert place into its place id:
const placeid = async(city)=>{
  try {
    let url = `https://api.geoapify.com/v1/geocode/search?text=${city}&format=json&apiKey=c9ec2e5c68414b1c92a2c4ce829a7fe0`
    let response = await fetch(url)
    let data = await response.json()
  
    console.log(data.results[0].
      place_id)
  let placeid = data.results[0].place_id
  
  touristApi(placeid);
  } catch (error) {
    console.log(error)
  }
} 

// get tourist destinations
let touristPlaces = [];
let touristApi = async(placeid)=>{
    let url = `https://api.geoapify.com/v2/places?categories=tourism&filter=place:${placeid}&limit=30&apiKey=c9ec2e5c68414b1c92a2c4ce829a7fe0`;

    let response = await fetch(url)
    let data = await response.json();

    touristPlaces = data.features
    touristcards(touristPlaces)
  }

async function touristcards(touristPlaces){
   try{
     container.innerHTML = ``;
     if(container.innerHTML === ``){
       container.innerHTML = "Search the location .."
     }
  touristPlaces.map(async(places)=>{
       let images = await touristImages(places.properties.name);
       const card = document.createElement("div")
       card.className = "card"
       card.style.width = "18 rem"
     card.innerHTML = ` <img src= "${images}" alt="${places.properties.name}" class = "card-image">
             <div class="card-body">
               <h5 class="card-title">${places.properties.name }</h5>
               <p class="card-text">${places.properties.
                 address_line1
                 }</p>
                 <p class="card-text">${places.properties.
                 address_line2
                 }</p>
             </div>
             <div class="card-body">
               <a href="https://www.google.com/maps/" class="card-link">Book Hotels</a>
               <a href="https://www.olacabs.com/" class="card-link">Book Cab</a>
               </div>`
      //  console.log(places)
       container.appendChild(card);
     });
   }catch(err){
       console.log("error has occoured");
   }
  }

 async function touristImages(name){
  const apiKey = 'cEGwtZkiM8VxPvtpLKCJSDnmHSCIuLd8s3febrnDk72WntJsxJot16bP';
  let   query = `${name}`;
  const perPage = 1;
  const apiUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}`; 

const response = await fetch(apiUrl, {
  method: 'GET',
  headers: {
    Authorization: apiKey
  }
})
  const data = await response.json()
  let photo = data.photos[0];
  let imagesrc =  photo.src.original;
  console.log(imagesrc)
  return imagesrc;
}

