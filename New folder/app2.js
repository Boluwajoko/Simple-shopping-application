// declare all variables
const btnContinue = document.getElementById("btn-continue");
const btnComplete = document.getElementById("btn-complete");
const btnBack = document.getElementById("btn-back");
const containers = document.getElementsByClassName("container");
const addToCart = document.getElementsByClassName("cart-item-btn");



btnContinue.addEventListener("click", function(){
    containers[0].classList.add("container-hide");
  containers[1].classList.remove("container-hide");
});

btnComplete.addEventListener("click", function(){
      containers[1].classList.add("container-hide");
  containers[2].classList.remove("container-hide");
    
});

btnBack.addEventListener("click", function(){
  containers[2].classList.add("container-hide");
  containers[0].classList.remove("container-hide");
    
});
