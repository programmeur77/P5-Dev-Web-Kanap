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
 * @param { Array } storageContent
 * @returns { Number } index number if found or -1 if nothing found
 */
function findStorageContent(storageContent) {
  var index = storageContent.findIndex(
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
  let currentCart = getLocalStorage('totalCart');

  let currentQuantity = parseInt(currentCart[storageIndex].quantity);
  let quantityToAdd = parseInt(productQuantity.value);

  let newQuantity = currentQuantity + quantityToAdd;

  currentCart[storageIndex].quantity = newQuantity.toString();

  return currentCart;
}
