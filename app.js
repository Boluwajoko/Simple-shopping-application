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
let cartItems = [];

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
    let formattedPricce = productPrice.replace('#','').replace(',','');
    let priceInNumber = parseFloat(formattedPricce);
    let productId = secondChild.children[2].getAttribute('data-id');

    const product = {
        'name': productName,
        'price': priceInNumber,
        'id': productId,
        'quantity' : 1

    }

    addProductToStorage(product);
    

    // console.log(cartItems);


    //adding data to table
    // dataEl(productName,productPrice)
     delItemFromCart();
    productCartCount.textContent = document.querySelectorAll(".table-data").length;
  });
  

});

function updateCart(){
    let cartItemsEl = document.getElementById("cartItems");
    console.log(cartItemsEl);
    cartItemsEl.innerHTML = "";
    cartItems.forEach(function(item){
        addItensToCart(item, cartItemsEl);
    });
}

function addProductToStorage(product){
    if(cartItems.length !== 0){

        let found = cartItems.some(item => item.id === product.productId);


        if(!found){
            cartItems.push(product);
        }else{
            cartItems.forEach(function(item){
                if(item.id === product.productId){
                    item.quantity += 1;
                }
        
            });
        }
        
    }else{
        cartItems.push(product);
    }
    
// let itemTOLS = JSON.stringify(cartItems);
// localStorage.setItem('shoppingCart',itemTOLS);
updateCart();
}

/* function that creates the DOM element for the product, price and quantity
in the cart table */
function addItensToCart(addedProduct, cartItemsEl) {
    // let newChild = "";
    // newChild = `<div class = "table-data" > <div class="data">
    // <p>${addedProduct.name}</p>
    // <p id="price">${addedProduct.price}</p>
    // <p>${addedProduct.quantity}</p>
    // <span data-id="${addedProduct.id}"></span>
    // </div>
    // <button class="btn-action" id="btn-delete">X</button> </div>`;
    // let tableResult = cartTable.children[cartTable.children.length - 2];
    // tableResult.insertAdjacentHTML('beforebegin', newChild);

    let trElement = `
    <tr>
    <td>${addedProduct.name}</td>
    <td>${addedProduct.price}</td>
    <td>${addedProduct.quantity}</td>
    <td><button class="btn-action" data-id="${addedProduct.id}" id="btn-delete">X</button></td>
    </tr>
    `;

    // let lastChild = cartItemsEl.lastElementChild();
    cartItemsEl.insertAdjacentHTML('beforeend', trElement);

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

// Product array
let products = [
    {
        name: 'elegant studded shoe',
        price: 10000,
        quantity: 0,
    },

    {
        name: 'beautiful sunglasses',
        price: 10000,
        quantity: 0,
    },
    
    {
        name: 'nike baseball cap',
        price: 10000,
        quantity: 0,
    }
]
