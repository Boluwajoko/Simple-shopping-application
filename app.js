//to accept details.

var data = [];

var entry = document.getElementById("entry");
entry.addEventListener("click", acceptDetails);

function acceptDetails() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;

    
    //to alert if not all entries are inputed

    if (!name || !email || !address) {
        alert("Please fill all the boxes!");
        return;
    }

    const dataObj = {
        name: name,
        email: email,
        address: address
    }

    data.push(dataObj);

};

entry.onclick();


//getting items from cart to the table display (not working yet)
var entry = document.getElementById("entry1");
entry.document.addEventListener("click", displayCart);

var row = 1;

function displayCart () {
    var product = document.getElementById("cartmessage").value;
    var price = document.getElementById("cartmessage1").value;

    var display = document.getElementById("display");

    var newRow = display.insertRow(row);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    
}

//for the complete button

//for the previous button