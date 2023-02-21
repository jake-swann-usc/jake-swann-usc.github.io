let searchBtn = document.getElementById("searchBtn");
let clearBtn = document.getElementById("clearBtn");

function validateForm(){

}

function checkboxEvent(){
    var checkbox = document.getElementById("autoLocate");
    var location = document.getElementById("location");

    if(checkbox.checked){
        location.disabled = true;
    } else {
        location.disabled = false;
    }
}

function resetForm(){
    var location = document.getElementById("location");
    location.disabled = false;
}