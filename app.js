// const btnContinue = document.getElementById("btn-continue");
const btnComplete = document.getElementById("btn-complete");
const btnBack = document.getElementById("btn-back");
const containers = document.getElementsByClassName("container");
const addToCart = document.getElementsByClassName("cart-item-btn");


//to accept details for the first slide
var data = [];

var form = document.getElementById("customerForm");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

btnContinue = document.getElementById("btn-continue").addEventListener("click", function () {
    acceptDetails();
    
    containers[0].classList.add("container-hide");
    containers[1].classList.remove("container-hide");

});

function acceptDetails() {
    var name = document.getElementById("input-name");
    var mail = document.getElementById("input-mail");
    var address = document.getElementById("input-address");   

    if (!name || !mail || !address) {
        alert("Please fill all the boxes!");
        return;
    }

    const dataObj = {
        name: name,
        mail: mail,
        address: address
    }

    data.push(dataObj);

    document.getElementById("input-name").textContent = "";
    document.getElementById("input-name").textContent = "";
    document.getElementById("input-name").textContent = "";
}


console.log(data);


//the second slide
btnComplete.addEventListener("click", function(){

    containers[1].classList.add("container-hide");
    containers[2].classList.remove("container-hide");

});

//the last slide
btnBack.addEventListener("click", function(){
  containers[2].classList.add("container-hide");
  containers[0].classList.remove("container-hide");
    
});
