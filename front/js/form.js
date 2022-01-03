const form = document.querySelector('.cart .cart__order__form'),
  firstName = document.getElementById('firstName'),
  lastName = document.getElementById('lastName'),
  address = document.getElementById('address'),
  city = document.getElementById('city'),
  email = document.getElementById('email'),
  submit = document.getElementById('order');

let errorMessage = '',
  isError = true;

const firstNamePattern =
    /^[A-Z]{1}[a-z]+[îñôäëöü]{0,}[a-z]{0,}|[A-Z]{1}[a-z]+[\-]{1}[A-Z]{1}[a-z]+$/,
  lastNamePattern =
    /^[A-Z]{1}[a-z]+[îñôäëöü]{0,}|[A-Z]{1}[a-z]+[îñôäëöü]{0,}\s[A-Z]{1}[a-z]+ |[A-Z]{1}[a-z]+[\-][A-Z]{1}[a-z]+$/g,
  addressPattern = /[0-9]{0,3}\s?[A-Za-zîñôäëöüÂÊÎÔÛÉÈÀÄËÏÖÜ]+/g,
  cityPattern = /([A-Za-zîñôäëöüÂÊÎÔÛÉÈÀÄËÏÖÜ\-]{2,})+/g,
  emailPattern = /^([\.\_a-zA-Z0-9]+)@([a-z]+)\.([a-z]){2,3}$/;

form.addEventListener('focusout', function (event) {
  let target = event.target;
  var patternName = `${event.target.getAttribute('id')}Pattern`;
  eval('var patternObj=' + patternName);

  runEvent(target.getAttribute('id'), target.value, patternObj);
});

submit.addEventListener('click', function (event) {
  event.preventDefault();
  if (
    !isError &&
    firstName.value !== '' &&
    lastName.value !== '' &&
    address.value !== '' &&
    city.value !== '' &&
    email.value !== ''
  ) {
    if (isSetStorage('totalCart')) {
      let contact = {
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value
        }
      };
      var cart = getIdArray(cartContent);
      let cartProduct = {
        products: cart
      };
      var mergeObject = Object.assign(cartProduct, contact);
      validateOrder(mergeObject);
    } else {
      document.getElementById('formErrorMsg').innerHTML =
        'Votre panier est actuellement vide';
    }
    console.log(true);
  } else {
    document.getElementById('formErrorMsg').innerHTML =
      'Merci de renseigner tous les champs';
  }
});

/**
 * Checks format of input value, set isError variable and displays a message according to the error made by the user
 * @param {Object} idValue Value of id attribute of the targeted element
 * @param {String} fieldValue contains the value entered in the input
 * @param {Object} fieldPattern regex to check the input value format
 */
function runEvent(idValue, fieldValue, fieldPattern) {
  if (!checkFieldValueFormat(fieldValue, fieldPattern)) {
    isError = true;
    displayErrorMessage(idValue, isError);
  } else {
    isError = false;
    displayErrorMessage(idValue, isError);
  }
}

/**
 * Checks with Regex if the input value matched expected pattern
 * @param {String} fieldValue input value entered by the user
 * @param {Object} valuePattern pattern model of each input expected format for value
 * @returns true if input value matches pattern, false if applicable
 */
function checkFieldValueFormat(fieldValue, valuePattern) {
  var pattern = valuePattern;

  return fieldValue.match(pattern) ? true : false;
}

/**
 * Creates an array containing IDs of products in storage
 * @param {Array} array Array containing the IDs to extract
 * @returns new Array containing IDs
 */
function getIdArray(array) {
  let newArray = [];
  for (index in array) {
    newArray.push(array[index].id);
  }

  return newArray;
}
