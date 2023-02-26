import Geohash from 'https://cdn.jsdelivr.net/npm/latlon-geohash@2.0.0';

let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click",submitForm,false);

let clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click",resetForm,false);

var checkbox = document.getElementById("autoLocate");
checkbox.addEventListener("click",checkboxEvent,false);

var location = document.getElementById("location");

var lat;
var lng;
var loc;

// const url = "http://eventssearch-env.eba-zsuwgjue.us-east-2.elasticbeanstalk.com/";
const url = "http://127.0.0.1:5000/";

async function submitForm(){
    if(!checkbox.checked){
        const geo = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location.value + '&key=AIzaSyBA3i9a3LPKXS06qtgdPUxHnOFXDxA0Ssg';

        fetch(geo)
            .then(response => response.json())
            .then(data => {
                lat = data.results[0].geometry.location.lat;
                lng = data.results[0].geometry.location.lng;

                console.log('Latitude: ${lat}, Longitude: ${lng}');
            })
            .catch(error => console.error(error));
    }

    const geohash = Geohash.encode(lat,lng,7);

    loc = geohash;

    var cat = document.getElementById('cat').value;
    if(cat=='Music'){
        cat = 'KZFzniwnSyZfZ7v7nJ';
    } else if(cat=='Sports'){
        cat = 'KZFzniwnSyZfZ7v7nE';
    } else if(cat=='Arts' || cat=='Theatre'){
        cat = 'KZFzniwnSyZfZ7v7na';
    } else if(cat=='Film'){
        cat = 'KZFzniwnSyZfZ7v7nn';
    } else if(cat=='Miscellaneous'){
        cat = 'KZFzniwnSyZfZ7v7n1';
    } else {
        cat = '';
    }

    var key = document.getElementById('key').value;
    var dist = document.getElementById('dist').value;

    const request = await fetch(`${url}search?key=${key}&dist=${dist}&cat=${cat}&location=${loc}`);
    const resp = await request.json();

    const data = resp._embedded;

    try {
        if(data.events.length > 0){
            showResults(data);
        }
    } catch (TypeError) {
        showNoResults();
    }

}

async function checkboxEvent(){
    if(checkbox.checked){
        const request = await fetch("https://ipinfo.io/json?token=d7637bfe3b1b96");
        const jsonResponse = await request.json();

        const loc = jsonResponse.loc;
        const [loclat, loclon] = loc.split(',');

        lat = loclat;
        lng = loclon;

        console.log(lat);
        console.log(lng);

        location.disabled = true;
        location.value = "";
        location.required = false;
        location.style.display = "none";
    } else {
        location.disabled = false;
        location.required = true;
        location.style.display = "block";
        location.value = "";
    }
}

function resetForm(){
    var location = document.getElementById("location");
    location.disabled = false;
    location.required = true;
    location.style.display = "block";
    location.value = "";
    document.getElementById("resultsFound").style.display = "none";
    document.getElementById("noResults").style.display = "none";
    document.getElementById("autoLocate").checked = false;
    document.getElementById("key").value = "";
    document.getElementById("dist").value = "";
    document.getElementById("cat").innerHTML = '<option value="default">Default</option><option value="music">Music</option><option value="sports">Sports</option><option value="arts">Arts</option><option value="theatre">Theatre</option><option value="film">Film</option><option value="misc">Miscellaneous</option>';
}

function showNoResults(){
    document.getElementById("noResults").style.display = "block";
    document.getElementById("resultsFound").style.display = "none";
}

function showResults(data){
    console.log(data.events);

    document.getElementById("resultsFound").style.display = "block";
    document.getElementById("noResults").style.display = "none";

    if(data.events.length > 20){
        createTable(data, 20);
    } else {
        createTable(data, data.events.length);
    }
}

function createTable(data, length){
    var table = document.getElementById("results");

    for(var i = 0; i < length; i++){
        table.innerHTML += '<tr class="result"><td>' + data.events[i].dates.start.localDate + '</td><td><img class="icon" src="' + data.events[i].images[0].url + '" alt="Event Image" aspect-ratio=" ' + data.events[i].images[0].ratio + '"></td><td>' + data.events[i].name + '</td><td>' + data.events[i].classifications[0].segment.name + '</td><td>' + data.events[i]._embedded.venues[0].name + '</td></tr>';
        
    }
}