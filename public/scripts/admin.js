var serverURL = "http://localhost:8080/API/";
var messageList = [];

//an object constructor
function Item(code, desc, price, image, category, stock, deliveryDays) {
    this.code = code;
    this.description = desc;
    this.price = price;
    this.image = image;
    this.category = category;
    this.stock = stock;
    this.deliveryDays = deliveryDays;
    this.user = "Lois";
}

function clearForm() {
    $("#txtCode").val("");
    $("#txtDescription").val("");
    $("#txtPrice").val("");
    $("#txtImage").val("");
    $("#txtCategory").val("");
    $("#txtStock").val("");
    $("#txtDeliveryDays").val("");
}

function saveItem() {
    //get the values
    var code = $("#txtCode").val();
    var desc = $("#txtDescription").val();
    var price = $("#txtPrice").val();
    var image = $("#txtImage").val();
    var category = $("#txtCategory").val();
    var stock = $("#txtStock").val();
    var delivery = $("#txtDeliveryDays").val();

    //create an object
    //this is one object with 7 attributes

    var theItem = new Item(code, desc, price, image, category, stock, delivery);
    console.log(theItem);

    var jsonString = JSON.stringify(theItem);
    console.log(jsonString);

    //send the object to the server
    $.ajax({
        url: serverURL + "items",
        type: "POST",
        data: jsonString,
        contentType: "application/json",
        success: function (response) {

            console.log("Yay, it works!", response);

            //clear the items
            clearForm();

            //show notification
            $("#alertSuccess").removeClass("hidden");
            //setTimeout fn and miliseconds
            setTimeout(function () {
                $("#alertSuccess").addClass("hidden");
            }, 3000);
        },
        error: function (errorDetails) {
            console.log("Error:", errorDetails);
        }
    });
}

//AJAX - Async Javascript And XML communication PS - JSON is now XML
//pay for the order
function testAjax() {
    $.ajax({
        url: serverURL + "test",
        type: 'GET',
        success: function (res) {
            console.log("Payment finished");
            console.log("Server says", res);

            console.log("Done thank you for the payment");
        },

        error: function (err) {
            console.log("Payment error");
            console.log("Error occured", err);

            console.log("Done thank you for the payment");
        }

    });
    //never run the code here until the success and error have completed
    //console.log("Done thank you for the payment");
    //console.log("NOT FINISHED YET");
}

function retrieveMessage() {
    //get message to the server
    $.ajax({
        url: serverURL + "message",
        type: "GET",
        //data: jsonString,
        //contentType: "application/json",
        success: function (response) {
            console.log("Yay, it works!", response);
            for (var i = 0; i < response.length; i++) {
                var messageList = response[i];
                message.push(messageList);
            }
            //for all the items to show
            //items = response;

            displayMessage();

        },
        error: function (errorDetails) {
            console.log("Error:", errorDetails);
        }
    });


}
function displayMessage() {
    //travel the array
    for (var i = 0; i < message.length; i++) {
        //get the item
        var messageList = message[i];
        //draw the item on the DOM (html)
        drawMessage(messageList);
    }
    //console.log(message);


}

function drawMessage(messageList) {
    //create the syntax

    var sntx =
        `<div class='message'>

<label class='name'>${messageList.name}</label>
<label class='message'>${messageList.message}</label>


</div>`;


    //get the element from the screen
    var container = $("#msgSaved");

    //append the syntax to the element
    container.append(sntx);

}

function init() {
    console.log("This is the Admin Page!!");

    //used to retrieve the initial data
    retrieveMessage();
    //hook events
    $("#btnSave").click(saveItem);
}

window.onload = init;