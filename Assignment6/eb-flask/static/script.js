import Geohash from 'https://cdn.jsdelivr.net/npm/latlon-geohash@2.0.0';

let searchBtn = document.getElementById("searchBtn");
// searchBtn.addEventListener("click",submitForm,false);

const form = document.getElementById("form");
form.addEventListener("submit",submitForm,false);

let clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click",resetForm,false);

var checkbox = document.getElementById("autoLocate");
checkbox.addEventListener("click",checkboxEvent,false);

var sortOrder = 'date,asc';

var eventCell;
var genreCell;
var venueCell;

var venDetails = document.getElementById("showVenueDetails");
venDetails.addEventListener("click",showVenueDetails,false);

var location = document.getElementById("location");

var eventInfo;

var lat;
var lng;
var loc;

var allNames;

var data;

//const url = "http://eventssearch-env.eba-zsuwgjue.us-east-2.elasticbeanstalk.com/";
//const url = "http://127.0.0.1:5000/";
const url = "https://homework6-378218.ue.r.appspot.com/";


// function sortEvent(){
//     sortOrder = 'name,date,asc';
//     submitForm();
// }

function sortGenre(){
    sortOrder = 'relevance,desc';
    submitForm();
}

function sortVenue(){
    sortOrder = 'venueName,asc';
    submitForm();
}

function showEventDetails(event){
    document.getElementById("eventDetails").style.display = "block";
    document.getElementById("showVenueDetails").style.display = "block";
    document.getElementById("venueDetails").style.display = "none";

    const eventHTML = event.target.innerHTML;
    console.log(eventHTML);

    for(var i=0; i<data.events.length; i++){
        if(data.events[i].name == eventHTML){
            eventInfo = data.events[i];
            console.log(eventInfo);
        }
    }

    var eventName = '';
    if(eventInfo.hasOwnProperty('name')){
        eventName = eventInfo.name;
        document.getElementById("eventName").style.display = "block";
        document.getElementById("eventName").innerHTML = '<p>' + eventName + '</p>';
    }

    var eventDate = '';
    if(eventInfo.hasOwnProperty('dates')){
        eventDate = eventInfo.dates.start.localDate + ' ' + eventInfo.dates.start.localTime;
        document.getElementById("eventDate").style.display = "block";
        document.getElementById("eventDate").innerHTML = '<p class="eHead">Date</p><p class="eDetail">' + eventDate + '</p>';
    }

    var artist = '';
    try{if(eventInfo._embedded.attractions[0].hasOwnProperty('name')){
        artist = eventInfo._embedded.attractions[0].name;
        document.getElementById("eventArtist").style.display = "block";
        document.getElementById("eventArtist").innerHTML = '<p class="eHead">Artist/Team</p><p class="eDetail">' + artist + '</p>';}
    } catch(err){console.log('No artist found')}

    var venue = '';
    try{if(eventInfo._embedded.venues[0].hasOwnProperty('name')){
        venue = eventInfo._embedded.venues[0].name;
        document.getElementById("eventVenue").style.display = "block";
        document.getElementById("eventVenue").innerHTML = '<p class="eHead">Venue</p><p class="eDetail">' + venue + '</p>';}
    } catch(err){console.log('No venue found')}

    var genre = '';
    try{if(eventInfo.classifications[0].hasOwnProperty('segment')){
        genre = eventInfo.classifications[0].segment.name;
        document.getElementById("eventGenre").style.display = "block";
        document.getElementById("eventGenre").innerHTML = '<p class="eHead">Genres</p><p class="eDetail">' + genre + '</p>';}
    } catch(err){console.log('No genre found')}


    var subgenre = '';
    try{if(eventInfo.classifications[0].hasOwnProperty('genre')){
        subgenre = eventInfo.classifications[0].genre.name;
        document.getElementById("eventGenre").innerHTML = '<p class="eHead">Genres</p><p class="eDetail">' + genre + ' | ' + subgenre + '</p>';}
    } catch(err){console.log('No subgenre found')}

    var type = '';
    try{if(eventInfo.classifications[0].hasOwnProperty('subGenre')){
        type = eventInfo.classifications[0].subGenre.name;
        document.getElementById("eventGenre").innerHTML = '<p class="eHead">Genres</p><p class="eDetail">' + genre + ' | ' + subgenre + ' | ' + type + '</p>';}
    } catch(err){console.log('No type found')}

    var priceRange = '';
    try{if(eventInfo.priceRanges[0].hasOwnProperty('min') && eventInfo.priceRanges[0].hasOwnProperty('max')){
        priceRange = eventInfo.priceRanges[0].min + ' - ' + eventInfo.priceRanges[0].max + ' ' + eventInfo.priceRanges[0].currency;
        document.getElementById("eventPrice").style.display = "block";
        document.getElementById("eventPrice").innerHTML = '<p class="eHead">Price Range</p><p class="eDetail">' + priceRange + '</p>';}
    } catch(err){console.log('No price range found')
    }

    var status = '';
    try{if(eventInfo.dates.hasOwnProperty('status')){
        status = eventInfo.dates.status.code;
        document.getElementById("eventStatus").style.display = "block";
        document.getElementById("eventStatus").innerHTML = '<p class="eHead">Ticket Status</p>' + formatStatus(status);}
        if(formatStatus(status) == 'undefined'){document.getElementById("eventStatus").style.display = "none";}
    } catch(err){console.log('No status found')}

    var ticketLink;
    try{ticketLink = eventInfo.url;
    document.getElementById("eventLink").style.display = "block";
    document.getElementById("eventLink").innerHTML = '<p class="eHead">Buy Ticket At:</p><p><a class="ticketLink" href="' + ticketLink + '" target="_blank">Ticketmaster</a></p>';}
    catch(err){console.log('No ticket link found')}

    var seatMap = '';
    try{if(eventInfo.hasOwnProperty('seatmap')){
        seatMap = eventInfo.seatmap.staticUrl;
        document.getElementById("seatMap").style.display = "block";
        document.getElementById("seatMap").innerHTML = '<img src="' + seatMap + '" alt="Seat Map" width="100%" height="100%">';}
    } catch(err){console.log('No seat map found')}

}

function formatStatus(status){
    if(status == 'onsale'){
        return '<p class="onsale">On Sale</p>';
    } else if(status == 'offsale'){
        return '<p class="offsale">Off Sale</p>';
    } else if(status == 'rescheduled'){
        return '<p class="rescheduled">Rescheduled</p>';
    } else if(status == 'canceled'){
        return '<p class="canceled">Canceled</p>';
    } else if(status == 'postponed'){
        return '<p class="postponed">Postponed</p>';
    } else {
        return 'undefined';
    }
}
function showVenueDetails(){
    venDetails.style.display = "none";
    document.getElementById("venueDetails").style.display = "block";

    var venueName = '';
    if(eventInfo._embedded.venues[0].hasOwnProperty('name')){
        venueName = eventInfo._embedded.venues[0].name;
        document.getElementById("venueName").style.display = "block";
        document.getElementById("venueName").innerHTML = '<p>' + venueName + '</p>';
    }

    var venueAddress = '';
    if(eventInfo._embedded.venues[0].hasOwnProperty('address')){
        venueAddress = eventInfo._embedded.venues[0].address.line1;
        document.getElementById("venueAddress").style.display = "block";
        document.getElementById("venueAddress").innerHTML = '<p><strong>Address:</strong> ' + venueAddress + '</p>';
    }

    var venueCity = '';
    if(eventInfo._embedded.venues[0].hasOwnProperty('city')){
        venueCity = eventInfo._embedded.venues[0].city.name;
        document.getElementById("venueCity").style.display = "block";
        document.getElementById("venueCity").innerHTML = '<p>' + venueCity + ', ' + eventInfo._embedded.venues[0].state.stateCode + '</p>';
    }

    var postalCode = '';
    if(eventInfo._embedded.venues[0].hasOwnProperty('postalCode')){
        postalCode = eventInfo._embedded.venues[0].postalCode;
        document.getElementById("postalCode").style.display = "block";
        document.getElementById("postalCode").innerHTML = '<p>' + postalCode + '</p>';
    }

    var mapsLink = `https://www.google.com/maps/search/?api=1&query=${venueAddress}%20${venueCity}%20${postalCode}`;
    document.getElementById("mapsLink").style.display = "block";
    document.getElementById("mapsLink").innerHTML = '<p><a class="mapsLink" href="' + mapsLink + '" target="_blank">Open in Google Maps</a></p>';

    var moreEvents = '';
    if(eventInfo._embedded.venues[0].hasOwnProperty('url')){
        moreEvents = eventInfo._embedded.venues[0].url;
        document.getElementById("moreEvents").style.display = "block";
        document.getElementById("moreEvents").innerHTML = '<p><a class="moreEvents" href="' + moreEvents + '" target="_blank">More events at this venue</a></p>';
    }

}
async function submitForm(event){
    try{event.preventDefault();} catch(err){console.log('No event found')}
    clearEvents();
    document.getElementById("eventDetails").style.display = "none";
    document.getElementById("showVenueDetails").style.display = "none";
    document.getElementById("venueDetails").style.display = "none";
    var geohash;
    if(!checkbox.checked){
        const geo = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location.value + '&key=AIzaSyBA3i9a3LPKXS06qtgdPUxHnOFXDxA0Ssg';

        geohash = await fetch(geo);
        var geoData = await geohash.json();
        lat = geoData.results[0].geometry.location.lat;
        lng = geoData.results[0].geometry.location.lng;
                
        var geohashResponse = Geohash.encode(lat,lng,7);

        loc = geohashResponse;
    }

    loc = Geohash.encode(lat,lng,7);

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

    if(dist==''){
        dist = 10;
    }

    const request = await fetch(`${url}search?key=${key}&dist=${dist}&cat=${cat}&location=${loc}&sort=${sortOrder}`);
    const resp = await request.json();

    data = resp._embedded;

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
    eventInfo = '';
    allNames = '';
    data = '';
    document.getElementById("results").innerHTML = '<tr><th class="dateR" id="dateID">Date</th><th class="iconR" id="iconID">Icon</th><th class="eventR" id="eventID">Event</th><th class="genreR" id="genreID">Genre</th><th class="venueR" id="venueID">Venue</th></tr>';
    document.getElementById("resultsFound").style.display = "none";
    document.getElementById("noResults").style.display = "none";
    document.getElementById("venueDetails").style.display = "none";
    document.getElementById("eventDetails").style.display = "none";
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
        table.innerHTML += '<tr class="result"><td>' + data.events[i].dates.start.localDate + '<br>' + data.events[i].dates.start.localTime + '</td><td><img class="icon" src="' + data.events[i].images[0].url + '" alt="Event Image" aspect-ratio="' + data.events[i].images[0].ratio + '"></td><td class="allNames">' + data.events[i].name + '</td><td>' + data.events[i].classifications[0].segment.name + '</td><td>' + data.events[i]._embedded.venues[0].name + '</td></tr>';
        
    }

    allNames = document.getElementsByClassName("allNames");

    //console.log(allNames);

    for(var i = 0; i < allNames.length; i++){
        //console.log(allNames[i].innerHTML);
        allNames[i].addEventListener("click", showEventDetails);
    }

    eventCell = document.getElementById("eventID");
    genreCell = document.getElementById("genreID");
    venueCell = document.getElementById("venueID");

    eventCell.addEventListener("click", function(){
        console.log("Event cell clicked");
        if(sortOrder == 'name,date,asc'){
            sortOrder = 'name,date,desc';
        } else {
            sortOrder = 'name,date,asc';
        }
        submitForm();
    });

    genreCell.addEventListener("click", function(){
        console.log("Genre cell clicked");
        if(sortOrder == 'relevance,asc'){
            sortOrder = 'relevance,desc';
        } else {
            sortOrder = 'relevance,asc';
        }
        submitForm();
    });

    venueCell.addEventListener("click", function(){
        console.log("Venue cell clicked");
        if(sortOrder == 'venueName,asc'){
            sortOrder = 'venueName,desc';
        } else {
            sortOrder = 'venueName,asc';
        }
        submitForm();
    });
}

function clearEvents(){
    document.getElementById("results").innerHTML = '<tr><th class="dateR" id="dateID">Date</th><th class="iconR" id="iconID">Icon</th><th class="eventR" id="eventID">Event</th><th class="genreR" id="genreID">Genre</th><th class="venueR" id="venueID">Venue</th></tr>';
}