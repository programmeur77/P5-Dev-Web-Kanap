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
 * @param { String } key name of localStorage item to get
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
function findStorageContent(storageContent, IdOfProduct, productColor) {
  if (IdOfProduct != null && productColor != null) {
    var index = storageContent.findIndex(
      (elements) => elements.id == IdOfProduct && elements.color == productColor
    );
  } else {
    var index = storageContent.findIndex(
      (elements) =>
        elements.id == productId && elements.color == productColors.value
    );
  }
  return index;
}

/**
 * Convert quantity strings to numbers and update it in the correct array entry
 * @param { Number } storageIndex index of the quantity entry that must be updated
 * @returns { Array }
 */
function modifyQuantity(storageIndex) {
  let currentCart = getLocalStorage('totalCart');

  let currentQuantity = parseInt(currentCart[storageIndex].quantity),
    quantityToAdd = parseInt(productQuantity.value);

  let newQuantity = currentQuantity + quantityToAdd;

  currentCart[storageIndex].quantity = newQuantity.toString();

  return currentCart;
}

/**
 * Converts quantity string to Number and put this new value in the local stoarage Array
 * @param { Array } storageContent Contains the current local storage content
 * @param { Number } storageIndex Index in the localStorage array of the entry to modify
 * @param { String } quantity Value of the new total quantity to set
 * @returns { Array }
 */
function storageSetTotalQuantity(storageContent, storageIndex, quantity) {
  let currentStorage = storageContent,
    totalQuantityToSet = parseInt(quantity);

  currentStorage[storageIndex].quantity = totalQuantityToSet.toString();

  return currentStorage;
}

/**
 * Removes actual localStorage and calls setLocalStorage function to set the new one
 * @param { String } storageName name of the localStorage to replace
 * @param { Array } arrayToReplaceBy Array containing the new products quantity that is going to replace the former one
 */
function setModifiedStorage(storageName, arrayToReplaceBy) {
  localStorage.removeItem(storageName);
  setLocalStorage(arrayToReplaceBy);
}

/**
 * Removes an entry from the array given in parameter
 * @param { Array.<Object> } storageContent Array containing locally storaged cart
 * @param { Number } storageContentIndex Index of the element to remove from the array
 * @returns Initial array without the entry deleted
 */
function removeProduct(storageContent, storageContentIndex) {
  storageContent.splice(storageContentIndex, 1);
  return storageContent;
}
