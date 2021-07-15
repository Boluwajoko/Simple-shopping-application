// declare all variables
const btnContinue = document.getElementById("btn-continue");
const btnComplete = document.getElementById("btn-complete");
const btnBack = document.getElementById("btn-back");
const containers = document.getElementsByClassName("container");
const addToCart = document.querySelectorAll(".btn-center");
let cartTable = document.querySelector(".col");
const form = document.getElementById("login");

// variable to hold the name and price of your target product
let productCartCount = document.getElementById("product-count");

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

/* event listener that listens to `add to cart` click event and adds the
product to the cart table */

// addToCart.forEach(element => { 
//   element.addEventListener("click", function() {
//     let secondChild = element.parentNode.children[1];
//     productName = secondChild.children[0].textContent;
//     productPrice = secondChild.children[1].textContent;

//     //adding data to table
//     dataEl(productName,productPrice)
//     delItemFromCart();
//     productCartCount.textContent = document.querySelectorAll(".table-data").length;
//   })
// });

for (let i =0; i<addToCart.length; i++) {
    addToCart[i].addEventListener("click", function(){
        delItemFromCart();
        itemNumber(products[i]);
        total(products[i]);
        dataEl();
        // updating it to the frontend
        document.getElementById("amount").textContent = localStorage.getItem("Amount");
    })
}

// function to count cart
function itemNumber(product) { 
    let numberOfProduct = localStorage.getItem("Product-Count");
    // converting numberOfProducts to number
    numberOfProduct = parseInt(numberOfProduct);

    if(numberOfProduct){
        localStorage.setItem("Product-Count", numberOfProduct + 1);
        productCartCount.textContent = numberOfProduct + 1;
    }else {
        localStorage.setItem("Product-Count", 1);
        productCartCount.textContent = 1;
    }

    itemInCart(product);
}

// function creates the product-qty localstorage
function itemInCart(product) {
    let productObj = localStorage.getItem("Product");
    productObj = JSON.parse(productObj);
    

    if(productObj) {
        if(productObj[product.name] === undefined){
            productObj = {
                ...productObj,
                [product.name]: product,
            }
        }
        productObj[product.name].quantity += 1;
    }else{
        product.quantity = 1;
        productObj = {
            [product.name]: product,
        };
    }
    
    localStorage.setItem("Product", JSON.stringify(productObj));
}


/* function that creates the DOM element for the product, price and quantity
in the cart table */
function dataEl() {
    let productNum = localStorage.getItem("Product");
    let amount = localStorage.getItem("amount");
    let dataContainer = document.querySelector(".table-data-container")

    productNum = JSON.parse(productNum);
    
    if(productNum && dataContainer) {
        dataContainer.innerHTML = "";
        Object.values(productNum).map(items => {
            dataContainer.innerHTML += `
            <div class= "data">
                <h2 class="product-name">${items.name}</h2>
                <h3 id="price">${items.price}</h3>
                <div id="quantity-container">
                    <button id="decrease">-</button>
                    <div>${items.quantity}</div>
                    <button id="increase">+</button>
                </div>
                <button class="btn-action" id="btn-delete">X</button>
            </div>
            `
        })
    }
}

// function to delete product from cart
function delItemFromCart(){
    const delBtn = document.querySelectorAll("#btn-delete");
    delBtn.forEach(element=>{
        element.addEventListener("click",function(){
            element.parentElement.remove();
            // productCartCoun.textContent = document.querySelectorAll(".table-data").length;
        })
    })  

}

// function to calculate the total
function total(product){
    let amount = localStorage.getItem("Amount");
    if(amount){
        amount = parseInt(amount);
        localStorage.setItem("Amount", amount + product.price);
    }else{
        localStorage.setItem("Amount", product.price);
    }

    
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
        price: 9450,
        quantity: 0,
    },

    {
        name: 'beautiful sunglasses',
        price: 5099,
        quantity: 0,
    },
    
    {
        name: 'nike baseball cap',
        price: 10000,
        quantity: 0,
    }
]


