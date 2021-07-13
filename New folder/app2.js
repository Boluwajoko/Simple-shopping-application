// declare all variables
const btnContinue = document.getElementById("btn-continue");
const btnComplete = document.getElementById("btn-complete");
const btnBack = document.getElementById("btn-back");
const containers = document.getElementsByClassName("container");
const addToCart = document.querySelectorAll(".btn-center");
let cartTable = document.querySelector(".col");
const form = document.getElementById("login");

// this array stores user data
let userData = [];

// form field variable declaration
const inputName = document.getElementById("input-name");
const inputMail = document.getElementById("input-mail");
const inputAddr = document.getElementById("input-addr");

// function to raise the error.
function raiseError(inputField) {
    inputField.classList.add("input-error");
}

// function to write error mssg
function errorMssg(inputField, field) {
    const formContainer = inputField.parentElement;
    const mssg = formContainer.querySelector("big");
    mssg.textContent = `${field} can't be empty!`; 
    mssg.className = "error-mssg";
}

// function to raise the success.
function raiseSuccess(inputField) {
    const formContainer = inputField.parentElement;
    const mssg = formContainer.querySelector("big");
    mssg.textContent = "";     
    inputField.classList.add("input-success");
}

// The first btn; continue button listens for click event and tries to validate the form.
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let value = false;

    let nameValue = inputName.value.trim();
    let addrValue = inputAddr.value.trim();
    let mailValue = inputMail.value.trim();

    if(nameValue === ""){
        // insert error message
        errorMssg(inputName,"username");
        raiseError(inputName);
    }else {
        // show success
        raiseSuccess(inputName);
    }

    if(addrValue === ""){
        // insert error message
        errorMssg(inputAddr,"address");
        raiseError(inputAddr);
    }else {
        // show success
        raiseSuccess(inputAddr);
    }

    if(mailValue === ""){
        // insert error message
        errorMssg(inputMail, "email");
        raiseError(inputMail);
    }else {
        // show success
        raiseSuccess(inputMail);
    }

    // show the next page
    if(mailValue && nameValue && addrValue) {

        // changes to the product and cart page 
        containers[0].classList.add("container-hide");
        containers[1].classList.remove("container-hide");

        // pushing the name, mail and address values into userData array 
        userData.push(nameValue);
        userData.push(mailValue);
        userData.push(addrValue);

        // this sets the form back to null values
        inputName.value = "";
        inputAddr.value = "";
        inputMail.value = "";
         
    }
});
// End of the first button (continue button)

/*------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------*/

// Second page (cart section) 
// variable to hold the name and price of your target product
let productName = "";
let productPrice = "";
let productCartCount = document.getElementById("product-count");
let numberOfProduct = 0;
/* event listener that listens to `add to cart` click event and adds the
product to the cart table */

addToCart.forEach(element => { 
  element.addEventListener("click", function() {
    let secondChild = element.parentNode.children[1];
    productName = secondChild.children[0].textContent;
    productPrice = secondChild.children[1].textContent;

    //adding data to table
    dataEl(productName,productPrice)
    delItemFromCart();
    productCartCount.textContent = document.querySelectorAll(".table-data").length;
  })
});

/* function that creates the DOM element for the product, price and quantity
in the cart table */
function dataEl(name,price) {
    let newChild = "";
    newChild = `<div class = "table-data" > <div class="data">
    <p>${name}</p>
    <p id="price">${price}</p>
    <p>1</p>
    </div>
    <button class="btn-action" id="btn-delete">X</button> </div>`;
    let tableResult = cartTable.children[cartTable.children.length - 2];
    tableResult.insertAdjacentHTML('beforebegin', newChild);

}

// function to delete product from cart
function delItemFromCart(){
    const delBtn = document.querySelectorAll("#btn-delete");
    delBtn.forEach(element=>{
        element.addEventListener("click",function(){
            element.parentElement.remove();
            productCartCount.textContent = document.querySelectorAll(".table-data").length;
        })
    })  

}

// seecond button 
btnComplete.addEventListener("click", function(){
    // updates the success page
    document.getElementById("message").innerHTML = `<h1>thank you ${userData[0]} (${userData[1]}) !!!</h1>
    <p>order received and will be shipped to ${userData[2]}</p>`;
    document.querySelectorAll(".table-data").forEach(element=>{element.parentElement.removeChild(element)})
    productCartCount.textContent = document.querySelectorAll(".table-data").length;
    containers[1].classList.add("container-hide");
    containers[2].classList.remove("container-hide");
})


// Third or final button
btnBack.addEventListener("click", function(){
    containers[2].classList.add("container-hide");
    containers[0].classList.remove("container-hide");
    userData=[];
})




