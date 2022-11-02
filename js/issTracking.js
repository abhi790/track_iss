//creating the map
var map = L.map('mapid').setView([0, 0], 1);
//creating tile and providing the attribution to openstreetmap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
// //adding default marker on the map
// const marker = L.marker([0, 0]).addTo(map);

//adding custome icon instead of default marker
const issIcon = L.icon({
    iconUrl: 'iss200.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16], 
    
});
const sunIcon = L.icon({
    iconUrl: 'sun.svg.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16], 
    
});
const marker = L.marker([0, 0], {icon: issIcon}).addTo(map);
const sunMarker = L.marker([0,0],{icon:sunIcon}).addTo(map);

// //adding circle on the map
// var circle = L.circle([0, 0], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 600
// }).addTo(map);

const api_url = "https://api.wheretheiss.at/v1/satellites/25544";
let firstTime = true;
async function getData(){
    const data = await fetch(api_url).then(response => response.json());
    // const data = response.json();
    // console.log(data.longitute);
    // console.log(data.latitude);
  
    console.log(typeof(data));
    console.log(data);
    const {latitude,longitude,velocity,solar_lat,solar_lon} = data;

    marker.setLatLng([latitude,longitude]);
    sunMarker.setLatLng([solar_lat,solar_lon]);
    if(firstTime){
        map.setView([latitude,longitude], 3);
       firstTime = false;
    }
    else{
       map.setView([latitude,longitude]);
    }

    console.log(latitude);
    console.log(longitude);
    console.log(velocity);
    document.querySelector(".lat").innerHTML = latitude.toFixed(2);
    document.querySelector(".long").innerHTML = longitude.toFixed(2);
    document.querySelector(".velo").innerHTML = velocity.toFixed(2);

}

// console.log("before api call");
getData();
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
map.on('click', onMapClick);

setInterval(() => getData(), 1000);
