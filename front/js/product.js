// ------ VARIABLES ------
const params = new URLSearchParams(window.location.search),
  productId = params.get('id');

const imgPlace = document.querySelector('article .item__img'),
  productTitle = document.getElementById('title'),
  productPrice = document.getElementById('price'),
  productDescription = document.getElementById('description'),
  productColors = document.getElementById('colors'),
  productQuantity = document.getElementById('quantity'),
  submit = document.getElementById('addToCart');

let cart = {
  id: this.id,
  color: this.color,
  quantity: this.quantity
};

const cartContent = [];

//------ EVENTS ------

window.addEventListener('load', function () {
  fetchProduct(productId);
});

submit.addEventListener('click', function () {
  cart = {
    id: productId,
    color: productColors.value,
    quantity: productQuantity.value
  };

  if (isSetStorage('totalCart')) {
    var storageIndex = findStorageContent();
    console.log(storageIndex);
    if (storageIndex == -1) {
      cartContent.push(cart);
      setLocalStorage(cartContent);
    } else {
      var newQuantityArray = modifyQuantity(storageIndex);
      cartContent[storageIndex] = newQuantityArray;
      console.log(cartContent);
      setLocalStorage(cartContent);
    }
  } else {
    cartContent.push(cart);
    setLocalStorage(cartContent);
  }
});

//------ FUNCTIONS ------

//--- DISPLAY FUNCTIONS ---
/**
 * Fetch info about a specific product accrording to product ID
 * @param { String } productId
 */

function fetchProduct(productId) {
  fetch(`http://localhost:3000/api/products/${productId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayData(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

/**
 * Display color data in a HTML option list by looping on an array
 * @param { Array } colorArray
 */

function colorOptions(optionArray) {
  for (let color of optionArray) {
    productColors.insertAdjacentHTML(
      'beforeend',
      `<option value="${color}">${color}</option>`
    );
  }
}

/**
 * Displays data in the form
 * @param { Object } data
 */
function displayData(data) {
  document.title = `${data.name}`;
  imgPlace.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}" />`;
  productTitle.innerHTML = `${data.name}`;
  productPrice.innerHTML = `${data.price}`;
  productDescription.innerHTML = data.description;
  colorOptions(data.colors);
}

// --- LOCALSTORAGE FUNCTIONS ---

/**
 * Stores data in local memory
 * @param { Array } dataToStore
 */
function setLocalStorage(dataToStore) {
  localStorage.setItem('totalCart', JSON.stringify(dataToStore));
}

/**
 * Get a localStorage item and turns it into an JSON/Object format
 * @param { String } dataToGet
 * @param { Array } [content]
 * @returns content in JSON/Object format
 */
function getLocalStorage(dataToGet) {
  return JSON.parse(localStorage.getItem(dataToGet));
}

/**
 * Checks if a local storage exists for specified LocalStorage key
 * @param { String } key
 * @returns { Boolean }
 */
function isSetStorage(key) {
  if (localStorage.getItem(key)) {
    return true;
  } else {
    return false;
  }
}

/**
 * Check if there's already an article with the same id AND color in localStorage items
 * @returns { Number } index number if found or -1 if nothing found
 */
function findStorageContent() {
  var cart = getLocalStorage('totalCart');
  var index = cart.findIndex(
    (elements) =>
      elements.id == productId && elements.color == productColors.value
  );
  return index;
}

/**
 * Convert quantity strings to numbers and update it in the correct array entry
 * @param { Number } storageIndex index of the quantity entry that must be updated
 * @returns
 */
function modifyQuantity(storageIndex) {
  let cart = getLocalStorage('totalCart');

  let currentQuantity = parseInt(cart[storageIndex].quantity);
  let quantityToAdd = parseInt(productQuantity.value);

  cart[storageIndex].quantity = currentQuantity + quantityToAdd;

  return cart;
}
