const form = document.querySelector('.cart .cart__order__form'),
  firstName = document.getElementById('firstName'),
  lastName = document.getElementById('lastName'),
  address = document.getElementById('address'),
  city = document.getElementById('city'),
  email = document.getElementById('email'),
  submit = document.getElementById('order');

const firstNamePattern =
    /^[A-Z]{1}[a-z]+[îñôäëöü]{0,}[a-z]{0,}|[A-Z]{1}[a-z]+[\-]{1}[A-Z]{1}[a-z]+$/,
  lastNamePattern =
    /^[A-Z]{1}[a-z]+[îñôäëöü]{0,}|[A-Z]{1}[a-z]+[îñôäëöü]{0,}\s[A-Z]{1}[a-z]+ |[A-Z]{1}[a-z]+[\-][A-Z]{1}[a-z]+$/g,
  emailPattern = /^([\.\_a-zA-Z0-9]+)@([a-z]+)\.([a-z]){2,3}$/;

let errorMessage = '',
  isError = false;
let fieldNameValue = '';

form.addEventListener('focusout', function (event) {
  let target = event.target;
  if (event.target.getAttribute('id') == 'firstName') {
    if (!checkFieldValueFormat(target.value, firstNamePattern)) {
      isError = true;
      displayErrorMessage(event.target.getAttribute('id'), 'prénom');
    } else {
      isError = false;
      eraseErrorMessage(event.target.getAttribute('id'));
    }
  } else if (event.target.getAttribute('id') == 'lastName') {
    if (!checkFieldValueFormat(target.value, lastNamePattern)) {
      isError = true;
      displayErrorMessage(event.target.getAttribute('id'), 'nom de famille');
    } else {
      isError = false;
      eraseErrorMessage(event.target.getAttribute('id'));
    }
  } else if (event.target.getAttribute('id') == 'address') {
    if (target.value == '') {
      isError = true;
      displayErrorMessage(event.target.getAttribute('id'), 'adresse');
    } else {
      isError = false;
      eraseErrorMessage(event.target.getAttribute('id'));
    }
  } else if (event.target.getAttribute('id') == 'city') {
    if (target.value == '') {
      isError = true;
      displayErrorMessage(event.target.getAttribute('id'), 'ville');
    } else {
      isError = false;
      eraseErrorMessage(event.target.getAttribute('id'));
    }
  } else if (event.target.getAttribute('id') == 'email') {
    if (!checkFieldValueFormat(target.value, emailPattern)) {
      isError = true;
      displayErrorMessage(event.target.getAttribute('id'), 'email');
    } else {
      isError = false;
      eraseErrorMessage(event.target.getAttribute('id'));
    }
  }
});

submit.addEventListener('click', function () {
  if (
    firstName.value != '' ||
    lastName.value != '' ||
    address.value != '' ||
    city.value != '' ||
    (email.value != '' && isError == false)
  ) {
    console.log(firstName.value);
  } else {
    console.log('not ok');
  }
});

function checkFieldValueFormat(fieldValue, valuePattern) {
  var pattern = valuePattern;

  return fieldValue.match(pattern) ? true : false;
}

function displayErrorMessage(errorDiv, fieldNameValue) {
  fieldId = `${errorDiv}ErrorMsg`;
  document.getElementById(
    fieldId
  ).innerText = `Merci de renseigner votre ${fieldNameValue}`;
}

function eraseErrorMessage(errorDiv) {
  document.getElementById(`${errorDiv}ErrorMsg`).innerText = '';
}
