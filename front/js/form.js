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
  addressPattern = /[0-9]{0,3}\s?[A-Za-zîñôäëöüÂÊÎÔÛÉÈÀÄËÏÖÜ]+/g,
  cityPattern = /([A-Za-zîñôäëöüÂÊÎÔÛÉÈÀÄËÏÖÜ\-]{2,})+/g,
  emailPattern = /^([\.\_a-zA-Z0-9]+)@([a-z]+)\.([a-z]){2,3}$/;

let errorMessage = '',
  isError = true;

form.addEventListener('focusout', function (event) {
  let target = event.target;
  var patternName = `${event.target.getAttribute('id')}Pattern`;
  eval('var patternObj=' + patternName);

  runEvent(target.getAttribute('id'), target.value, patternObj);
});

submit.addEventListener('click', function (event) {
  event.preventDefault();
  if (!isError && isSetStorage('totalCart')) {
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
    console.log('not ok');
  }
});

function runEvent(idValue, fieldValue, fieldPattern) {
  if (!checkFieldValueFormat(fieldValue, fieldPattern)) {
    isError = true;
    displayErrorMessage(idValue, isError);
  } else {
    isError = false;
    displayErrorMessage(idValue, isError);
  }
}

function checkFieldValueFormat(fieldValue, valuePattern) {
  var pattern = valuePattern;

  return fieldValue.match(pattern) ? true : false;
}

function displayErrorMessage(errorDiv, isError) {
  fieldId = `${errorDiv}ErrorMsg`;
  if (isError) {
    document.getElementById(fieldId).innerText = 'Merci de renseigner ce champ';
  } else {
    document.getElementById(`${errorDiv}ErrorMsg`).innerText = '';
  }
}

function transformToJson(elementToTransform) {
  return JSON.stringify(elementToTransform);
}



function getIdArray(array) {
  let newArray = [];
  for (index in array) {
    newArray.push(array[index].id);
  }

  return newArray;
}
