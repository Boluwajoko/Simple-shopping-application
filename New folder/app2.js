// declare all variables
const btnContinue = document.getElementById("btn-continue");
const btnComplete = document.getElementById("btn-complete");
const btnBack = document.getElementById("btn-back");
const containers = document.getElementsByClassName("container");
const addToCart = document.querySelectorAll(".btn-center");
let cartTable = document.querySelector(".col");
const form = document.getElementById("login");


// 

let data = [];
const inputEl = document.getElementsByClassName("input-el");

let errorEl = document.createElement("p");
errorEl.classList.add("input-error")
errorEl.style.color = "red";

// this function creates error element at the input field where there is likely to be an error.
function insertErrorMessage(inputField) {
  inputField.style.border="1px solid red";
  inputField.placeholder = `${inputField.placeholder} can not be empty!`
  
}

function isEmpty(inputField) {
  inputField.value
}

function formValidation() {
  // check if the username field is empty
  if(inputEl[0].value === ""){
    insertErrorMessage(inputEl[0]);
    return false;
  }else if(inputEl[1].value === ""){
    insertErrorMessage(inputEl[1]);
    return false;
  }else if(inputEl[2].value === ""){
    insertErrorMessage(inputEl[2]);
    return false;
  }else{
    return true;
  }

}

form.addEventListener("submit", function(e){
  e.preventDefault();
  if(formValidation() === true){
    containers[0].classList.add("container-hide");
    containers[1].classList.remove("container-hide");
    
    data.push(inputEl[0].value);
    data.push(inputEl[1].value);
    data.push(inputEl[2].value);

    inputEl[0].value = "";
    inputEl[1].value = "";
    inputEl[2].value = "";
  }
  
});

btnComplete.addEventListener("click", function(){
  containers[1].classList.add("container-hide");
  containers[2].classList.remove("container-hide");

  document.getElementById("message").innerHTML = `<h1>thank you ${data[0]} (${data[1]}) !!!</h1>
  <p>order received and will be shipped to ${data[2]}</p>`;

  data = [];
});

btnBack.addEventListener("click", function(){
  containers[2].classList.add("container-hide");
  containers[0].classList.remove("container-hide");
});


function validate(form) {

}


let productName = "";
let productPrice = "";
addToCart.forEach(element => { 
  element.addEventListener("click", function() {
    let secondChild = element.parentNode.children[1];
    productName = secondChild.children[0].textContent;
    productPrice = secondChild.children[1].textContent;

    //adding data to table
    dataEl(productName,productPrice);
  })
});





// this function creates the data html element
function dataEl(name,price) {
  let newChild = "";
  newChild = `<div class = "table-data" > <div class="data">
  <p>${name}</p>
  <p>${price}</p>
  <p>1</p>
  </div>
  <button class="btn-action" id="btn-delete">X</button> </div>`;
  let tableResult = cartTable.children[cartTable.children.length - 2];
  tableResult.insertAdjacentHTML('beforebegin', newChild);

  
  // attach event to the delete button if it exists
  // if(btnDel = document.querySelectorAll("#btn-delete")) {
  //   btnDel.forEach(element => {
  //     element.addEventListener("click", function() {
  //       element.parentElement.remove();
  //     })
  //   })
  // }

  function deleteItem() {
    btnDel = document.querySelectorAll("#btn-delete");
    btnDel.forEach(element => {
      element.addEventListener("click", function() {
        element.parentElement.remove();
        cartItemCount--;
      })
    })
  } 
  let productItemNumber = document.getElementById("product-count");
  // item count function 
  if(document.querySelectorAll(".table-data")) {
    const item = document.querySelectorAll(".table-data");
    cartItemCount = item.length;
    
    productItemNumber.textContent = cartItemCount;
  }

  if(document.querySelectorAll(".table-data")) {
  }

}





