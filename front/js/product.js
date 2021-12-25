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
  price: this.price,
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
    price: productPrice.textContent,
    quantity: productQuantity.value
  };
  if (isSetStorage('totalCart')) {
    let currentStorage = getLocalStorage('totalCart');
    let index = findStorageContent(currentStorage);
    if (index === -1) {
      cartContent.push(cart);
      let newCart = currentStorage.concat(cartContent);
      setLocalStorage(newCart);
    } else {
      console.log(index);
      let modifiedArray = storageSetTotalQuantity(
        currentStorage,
        index,
        productQuantity.value
      );
      setModifiedStorage('totalCart', modifiedArray);
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
