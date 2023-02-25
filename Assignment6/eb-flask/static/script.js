import Geohash from '/latlon.js'

let searchBtn = document.getElementById("searchBtn");
let clearBtn = document.getElementById("clearBtn");

var checkbox = document.getElementById("autoLocate");
var location = document.getElementById("location");

var lat;
var lon;

const url = "http://eventssearch-env.eba-zsuwgjue.us-east-2.elasticbeanstalk.com/";

async function submitForm(){
    if(!checkbox.checked){
        const geo = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location.value + '&key=AIzaSyBA3i9a3LPKXS06qtgdPUxHnOFXDxA0Ssg';

        const request = await fetch(geo);
        const geoJson = request.json;
    
        lat = geoJson.results[0].geometry.location.lat;
        lon = geoJson.results[0].geometry.location.long;
    }

    const geohash = Geohash.encode(lat,lon);

    location.value = geohash;

    cat = document.getElementById('cat').value;
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

    const response = fetch(url + '?key=' + document.getElementById('key').value + '&dist=' + document.getElementById('dist').value + '&cat=' + cat + '&loc=' + geohash);

}

async function checkboxEvent(){
    if(checkbox.checked){
        const request = await fetch("https://ipinfo.io/json?token=d7637bfe3b1b96");
        const jsonResponse = await request.json();

        const loc = jsonResponse.loc;
        const [loclat, loclon] = loc.split(',');

        lat = loclat;
        lon = loclon;

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
    location.value = "";
    document.getElementById("autoLocate").checked = false;
    document.getElementById("key").value = "";
    document.getElementById("dist").value = "";
    document.getElementById("cat").innerHTML = '<option value="default">Default</option><option value="music">Music</option><option value="sports">Sports</option><option value="arts">Arts</option><option value="theatre">Theatre</option><option value="film">Film</option><option value="misc">Miscellaneous</option>';
}