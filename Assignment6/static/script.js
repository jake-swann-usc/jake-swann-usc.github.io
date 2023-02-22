let searchBtn = document.getElementById("searchBtn");
let clearBtn = document.getElementById("clearBtn");

function validateForm(){

}

function checkboxEvent(){
    var checkbox = document.getElementById("autoLocate");
    var location = document.getElementById("location");

    if(checkbox.checked){
        location.disabled = true;
        location.value = "";
        location.required = false;
    } else {
        location.disabled = false;
        location.required = true;
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