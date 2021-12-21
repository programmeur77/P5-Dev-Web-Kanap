window.addEventListener('load', function () {
  getProductIds();
});

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
  console.log(localStorage);
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

function getProductIds() {
  let cart = getLocalStorage('totalCart');
  console.log(cart);
}
