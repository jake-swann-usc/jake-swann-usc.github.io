var form = document.getElementById("form");
var key = document.getElementById("key");
var dist = document.getElementById("dist");
var cat = document.getElementById("cat");
var location = document.getElementById("location");
let searchBtn = document.getElementById("searchBtn");
let clearBtn = document.getElementById("clearBtn");

function searchClick();
function clearClick();

form.addEventListener("submit",function(event){
    event.preventDefault();
})

function searchClick(){
    
}

function clearClick(){
    key.innerHTML = "";
    dist.innerHTML = "";
    cat.innerHTML = "Default";
    location.innerHTML = "";
}