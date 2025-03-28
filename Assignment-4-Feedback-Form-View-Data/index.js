var formElement = document.getElementById('basic-form');
var submitButton = document.getElementById('submit-btn');
formElement.addEventListener("submit", submitted)

document.getElementById('reset-btn').addEventListener('click', function (e) {
    formElement.reset();
    disableSubmitButton();
});

var isValidField = false;
var isValidFirstName = false;
var isValidLastName = false;
var isValidEmail = false;
var isValidPhone = false;
var isValidStreetAddress1 = false;
var isValidCity = false;
var isValidState = false;
var isValidZipcode = false;

var isCheckBoxesChecked = false;

var regexForPhone = /\d{3}-?\d{3}-?\d{4}$/;
var regexForZipcode = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
var regexForEmail = /^[_.A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@northeastern.edu/;
var regExPhone = /\d{3}-?\d{3}-?\d{4}$/;
var regexForAllFields = /^[a-zA-Z]+$/;
var regexForAddress = /^[a-zA-Z0-9\s]+$/;
var regexForAlphanumeric = /^[a-zA-Z0-9]+$/;

var firstName = document.getElementById("firstName");
firstName.addEventListener("input", validateTheFields);

var lastName = document.getElementById("lastName");
lastName.addEventListener("input", validateTheFields);


var streetAddress1 = document.getElementById("streetAddress1");
streetAddress1.addEventListener("input", validateTheFields);

var city = document.getElementById("city");
city.addEventListener("input", validateTheFields);

var comments = document.getElementById('comments');
comments.addEventListener('input', validateTheFields);

var state = document.getElementById("state");
state.addEventListener("input", validateTheFields);

var emailId = document.getElementById("emailId");
emailId.addEventListener("input", validateTheFields);

var phoneNumber = document.getElementById("phoneNumber");
phoneNumber.addEventListener("input", validateTheFields);

var phoneNumberByQuery = document.querySelector('#phoneNumber');
phoneNumberByQuery.addEventListener('keyup', addHyphenForPhone);

var zipcode = document.getElementById("zipcode");
zipcode.addEventListener("input", validateTheFields);

var randomTextBox = document.getElementById('randomTextBox');
randomTextBox.addEventListener('input', validateTheFields);

function toggleSubmitButton() {
    if (isValidFirstName && isValidLastName && isValidEmail && isValidPhone && isValidStreetAddress1 &&
        isValidCity && isValidState && isValidZipcode && isValidField) {
        submitButton.disabled = false; 
    } else {
        submitButton.disabled = true; 
    }
}

function disableSubmitButton() {
    submitButton.disabled = true;
}

disableSubmitButton(); 



var dropDownById = document.getElementById('drink');
var radioBoxOne = document.querySelectorAll('#radio-one');
var drink = "";

var error_radiobox = document.getElementById('error_radiobox');
var counterOfDropDown = 0;
dropDownById.addEventListener('change', function (e) {
    var valueOfTheOption = dropDownById.value;
    counterOfDropDown++;
    (counterOfDropDown > 0 && counterOfRadioButton == 0) ? error_radiobox.style.display = "block" : error_radiobox.style.display = "none";
    switch (valueOfTheOption) {
        case "none":
            radioBoxOne[0].nextSibling.data = "";
            radioBoxOne[0].style.display = "none";
            error_radiobox.style.display = "none";
            console.log("None");
            break;

        case "Cappuccino":
            radioBoxOne[0].nextSibling.data = "Cappuccino Large(1$ Extra)";
            radioBoxOne[0].style.display = "inline";
            drink = "Cappuccino";
            console.log("Cappuccino");
            break;

        case "Macchiato":
            radioBoxOne[0].nextSibling.data = "Macchiato Large(1$ Extra)";
            radioBoxOne[0].style.display = "inline";
            drink = "Macchiato";
            conditonCheck == 0 ? conditonCheck = 1 : conditonCheck = 0;
            console.log("Macchiato");
            break;

        case "Ristretto":
            radioBoxOne[0].nextSibling.data = "Ristretto Large(1$ Extra)";
            radioBoxOne[0].style.display = "inline";
            drink = "Ristretto";
            conditonCheck == 0 ? conditonCheck = 1 : conditonCheck = 0;
            console.log("Ristretto");
            break;

        case "Americano":
            radioBoxOne[0].nextSibling.data = "Americano Large(1$ Extra)";
            radioBoxOne[0].style.display = "inline";
            drink = "Americano";
            console.log("Americano");
            break;

        case "mocha":
            radioBoxOne[0].nextSibling.data = "Mocha Large(1$ Extra)";
            radioBoxOne[0].style.display = "inline";
            drink = "mocha";
            console.log("mocha");
            break;
    }
});


var valueOfRadioBox = "";
var counterOfRadioButton = 0;
function showRadioBox(radioBoxId) {
    counterOfRadioButton = 1;
    var counter = 0;
    valueOfRadioBox = radioBoxId.checked ? radioBoxId.nextSibling.data : "";
    var id2 = document.getElementById('text-box');
    console.log(radioBoxId)
    radioBoxId.checked ? counter++ : counter--;
    radioBoxId.checked ? error_radiobox.style.display = "none" : error_radiobox.style.display = "block";
    id2.style.display = counter > 0 ? "block" : "none";
    window.localStorage.setItem("professor", valueOfRadioBox);
}



var socialMediaCounter = 0;
var idOfErrorMessage = document.getElementById('socialMedia');

idOfErrorMessage.style.display = "block";
function socialCheckBoxes(socialMediaId) {
    var idOfErrorMessage = document.getElementById('socialMedia');
    socialMediaId.checked ? socialMediaCounter++ : socialMediaCounter--;
    idOfErrorMessage.style.display = socialMediaCounter > 0 ? "none" : "block";
}



function addHyphenForPhone(evt) {
    if (evt.key != 'Backspace' && (phoneNumberByQuery.value.length === 3 || phoneNumberByQuery.value.length === 7)) {
        phoneNumberByQuery.value += '-';
    }
}

function validateTheFields(e) {
    var valueTargetted = e.target.value;
    var type = this.id;
    var em = "error_" + type

    switch (type) {
        case "comments":
            if (!valueTargetted.trim().match(regexForAddress) || valueTargetted.trim().length < 5 || valueTargetted.trim().length > 100) {
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                isValidField = false;
            }
            else {
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                isValidField = true;
            }
            break;

        case "zipcode":
            if (!valueTargetted.trim().match(regexForZipcode)) {
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                isValidZipcode = false;
            }
            else {
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                isValidZipcode = true;
            }
            break;

        case "phoneNumber":
            if (!valueTargetted.trim().match(regexForPhone)) {
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                isValidPhone = false;
            }
            else {
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                isValidPhone = true;
            }
            break;

        case "emailId":
            if (!valueTargetted.trim().match(regexForEmail)) {
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                isValidEmail = false;
            }
            else {
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                isValidEmail = true;
            }
            break;

        case "firstName":
            if (!valueTargetted.trim().match(regexForAlphanumeric) || valueTargetted.trim().length < 2 || valueTargetted.trim().length > 50) {
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                isValidFirstName = false;
            }
            else {
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                isValidFirstName = true;
            }
            break;

        case "lastName":
            if (!valueTargetted.trim().match(regexForAlphanumeric) || valueTargetted.trim().length < 2 || valueTargetted.trim().length > 50) {
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                isValidLastName = false;
            }
            else {
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                isValidLastName = true;
            }
            break;

        case "streetAddress1":
            if (!valueTargetted.trim().match(regexForAddress) || valueTargetted.trim().length < 5 || valueTargetted.trim().length > 100) {
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                isValidStreetAddress1 = false;
            }
            else {
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                isValidStreetAddress1 = true;
            }
            break;

        case "city":
            if (!valueTargetted.trim().match(regexForAlphanumeric)|| valueTargetted.trim().length < 2 || valueTargetted.trim().length > 50) {
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                isValidCity = false;
            }
            else {
                console.log(em)
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                isValidCity = true;
            }
            break;

        case "state":
            if (!valueTargetted.trim().match(regexForAllFields)|| valueTargetted.trim().length !== 2) {
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                isValidState = false;
            }
            else {
                console.log(em)
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                isValidState = true;
            }
            break;

    }
    toggleSubmitButton();
}
function toCheck(eventID) {
    window.localStorage.setItem("title", eventID.value)
}
var formQuery = document.querySelectorAll('#basic-form');
console.log(formQuery)
function submitted(e) {
    e.preventDefault();
    if (isValidFirstName && isValidLastName && isValidEmail && isValidCity & isValidPhone
        && isValidState && isValidZipcode && isValidStreetAddress1 && isValidField) {
        alert("Form Submitted Successfully");
        window.localStorage.setItem("firstName", firstName.value);
        window.localStorage.setItem("lastName", lastName.value);
        window.localStorage.setItem("emailId", emailId.value);
        window.localStorage.setItem("phoneNumber", phoneNumber.value);
        window.localStorage.setItem("streetAddress1", streetAddress1.value);
        window.localStorage.setItem("streetAddress2", streetAddress2.value);
        window.localStorage.setItem("city", city.value);
        window.localStorage.setItem("state", state.value);
        window.localStorage.setItem("zipcode", zipcode.value);
        window.localStorage.setItem("randomTextBox", randomTextBox.value)
        window.localStorage.setItem("comments", comments.value);
        window.localStorage.setItem("drink", drink);
        populateSocialMedia();
        formElement.reset();
        window.location.href = "table.html";
    }
    else {
        alert("Can you please fill all the fields?");
        validateTheFieldsOnSubmission();
    }
}

function validateTheFieldsOnSubmission() {
    !isValidFirstName ? document.getElementById('error_firstName').style.display = "block" : "";
    !isValidLastName ? document.getElementById('error_lastName').style.display = "block" : "";
    !isValidEmail ? document.getElementById('error_emailId').style.display = "block" : "";
    !isValidPhone ? document.getElementById('error_phoneNumber').style.display = "block" : "";
    !isValidCity ? document.getElementById('error_city').style.display = "block" : "";
    !isValidState ? document.getElementById('error_state').style.display = "block" : "";
    !isValidZipcode ? document.getElementById('error_zipcode').style.display = "block" : "";
    !isValidStreetAddress1 ? document.getElementById('error_streetaddress1').style.display = "block" : "";

}



function populateSocialMedia() {
    var socialString = "";
    const checkboxesArray = document.querySelectorAll('input[type="checkbox"]');
    for (let itr = 0; itr < checkboxesArray.length; itr++) {
        checkboxesArray[itr].checked ? socialString += checkboxesArray[itr].value + " " : "";
    }
    window.localStorage.setItem("socialmedia", socialString);
}