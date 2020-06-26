var serverURL = "http://localhost:8080/API/";


//an object constructor
function Message(name, message, ) {
this.name = name;
this.message = message;

this.user = "Lois";
}

function clearForm() {
$("#txtName").val("");
$("#txtMessage").val("");

}

function saveMessage() {
//get the values
var name = $("#txtName").val();
var message = $("#txtMessage").val();

//create an object
//this is one object with 7 attributes

var theMessage = new Message(name, message );
console.log(theMessage);

var jsonString = JSON.stringify(theMessage);
console.log(jsonString);

//send the object to the server
$.ajax({
url: serverURL + "message",
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
url: serverURL + "Message",
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

function init() {
console.log("This is the Contact Page!!");

//used to retrieve the initial data
//hook events
$("#btnSave").click(saveMessage);
}

window.onload = init;