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
    let formattedPrice = productPrice.replace('#','').replace(',','');
    let priceInNumber = parseFloat(formattedPrice);
    let productId = secondChild.children[2].getAttribute('data-id');

    const product = {
        'name': productName,
        'price': priceInNumber,
        'id': productId,
        'quantity' : 1

    }

    addProductToStorage(product);
    updateCart();
    updateSubTotal();

    

    // console.log(cartItems);


    //adding data to table
    // dataEl(productName,productPrice)
    //  delItemFromCart();
     addEventListenerToDeleteBtn();
    productCartCount.textContent = document.querySelectorAll(".table-data").length;
  });
  

});

 

function updateCart(){
    let cartItemsEl = document.getElementById("cartItems");
    console.log(cartItemsEl);
    cartItemsEl.innerHTML = "";
    console.log(cartItemsEl);
    console.log(cartItems);

    cartItems.forEach(function(item){
        addItemsToCart(item, cartItemsEl);
    });

}

function addProductToStorage(product){
    if(cartItems.length !== 0){

        console.log(cartItems);
        console.log(product);
        let found = cartItems.some(item => item.id === product.id);

        console.log(found);

        if(!found){
            cartItems.push(product);
        }else{
            cartItems.forEach(function(item){
                if(item.id === product.id){
                    item.quantity += product.quantity;
                    item.price += product.price;
                }
        
            });
        }
        
    }else{
        cartItems.push(product);
    }
    
// let itemTOLS = JSON.stringify(cartItems);
// localStorage.setItem('shoppingCart',itemTOLS);
// document.getElementById("cartItems").innerHTML = "";
}

/* function that creates the DOM element for the product, price and quantity
in the cart table */
function addItemsToCart(addedProduct, cartItemsEl) {

    let trElement = `
    <tr>
    <td>${addedProduct.name}</td>
    <td>${addedProduct.price}</td>
    <td>${addedProduct.quantity}</td>
    <td><button class="btn-action" data-id="${addedProduct.id}">X</button></td>
    </tr>
    `;

    // let lastChild = cartItemsEl.lastElementChild();
    cartItemsEl.insertAdjacentHTML('beforeend', trElement);

}

// function to delete product from cart
function addEventListenerToDeleteBtn(){
    console.log('i ran');
   const delBtns = document.getElementsByClassName("btn-action");
   console.log(delBtns);
    
   for(let i = 0; i < delBtns.length; i++){
    console.log('event added');
    delBtns[i].addEventListener("click",function(){
        console.log('clicked');
        // element.parentElement.parentElement.remove();

        var productId = delBtns[i].getAttribute("data-id");
        cartItems.forEach((item,index) =>{
            if(item.id === productId){
                cartItems.splice(index,1);
            }
        });
        updateCart();
        updateSubTotal();
        addEventListenerToDeleteBtn();

        
    })
   }
    
}

updateSubTotal();

//to update subTotal of the prices of items in the cart
function updateSubTotal() {

let subTotal = 0;
cartItems.forEach(function(item){
    subTotal = subTotal + item.price;
    console.log(subTotal);
});
  document.getElementById("val").innerHTML = "Total = N" + subTotal.toFixed(2);
}


// seecond button 
btnComplete.addEventListener("click", function(){
    // defining subTotal so it can be used as a placeholder
     let subTotal = 0;
        cartItems.forEach(function(item){
        subTotal = subTotal + item.price;
    });

    // updates success

    document.getElementById("message").innerHTML = `<h1>thank you ${userData[0]} (${userData[1]}) !!!</h1>
    <p>order received and will be shipped to ${userData[2]}</p>
    <p>Total amount spent on order is: ${subTotal} </p>`;
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
