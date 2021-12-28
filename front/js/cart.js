const cartItems = document.getElementById('cart__items'),
  quantity = document.getElementsByClassName('itemQuantity'),
  totalQuantity = document.getElementById('totalQuantity'),
  totalPrice = document.getElementById('totalPrice');

const cartContent = getLocalStorage('totalCart');

window.addEventListener('load', function () {
  if (isSetStorage('totalCart')) {
    cartContent.map((element) => {
      getTotalCart(element);
    });
    displayQuantity(cartContent, totalQuantity);
    displayPrice(cartContent, totalPrice);
  } else {
    cartItems.innerHTML = '<p>Votre panier est actuellement vide</p>';
    document.querySelector(
      '#cartAndFormContainer .cart .cart__price'
    ).style.display = 'none';
  }
});

cartItems.addEventListener('change', function (event) {
  let target = event.target;
  let quantity = target.value;
  let datasetItem = target.closest('article');
  let storageIndex = findStorageContent(
    cartContent,
    datasetItem.dataset.id,
    datasetItem.dataset.color
  );
  let newQuantityStorage = storageSetTotalQuantity(
    cartContent,
    storageIndex,
    quantity
  );
  setModifiedStorage('totalCart', newQuantityStorage);
  location.reload();
});

cartItems.addEventListener('click', function (event) {
  if (event.target.getAttribute('class') === 'deleteItem') {
    let dataset = event.target.closest('article').dataset;
    let index = findStorageContent(cartContent, dataset.id, dataset.color);
    let removedProductArray = removeProduct(cartContent, index);
    setModifiedStorage('totalCart', removedProductArray);
    location.reload();
  }
});

/**
 * Displays elements on cart page
 * @param { Object } cart Contains fetched elements according to id stored in localStorage
 * @param { Object } storageElement Contains id, color, price and quantity of storaged products
 */
function displayContent(cart, storageElement) {
  cartItems.insertAdjacentHTML(
    'beforeend',
    `<article class="cart__item" data-id="${storageElement.id}" data-color="${storageElement.color}">
      <div class="cart__item__img">
        <img src="${cart.imageUrl}" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${cart.name}</h2>
          <p>${storageElement.color}</p>
          <p>${cart.price}€</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" id="quantity" min="1" max="100" value="${storageElement.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`
  );
}

/**
 * Calculates the total quantity of products in array according to the quantity of each product
 * @param { Array } content Array that we want to get the quantity of
 * @returns The total quantity of mapped element
 */
function getTotalQuantity(content) {
  let totalQuantity = 0;
  content.map((element) => {
    let currentQuantity = parseInt(element.quantity);
    totalQuantity += currentQuantity;
  });

  return totalQuantity;
}

/**
 * Calculates the total price of products into localStorage according to the quantity of each product
 * @param { Array<Object> } localStorageContent localSotrage content Array
 * @returns { Number } total price
 */
function getTotalPrice(localStorageContent) {
  let totalPrice = 0;
  localStorageContent.forEach((element) => {
    let priceNumber = parseInt(element.price);
    let quantityNumber = parseInt(element.quantity);
    totalPrice += priceNumber * quantityNumber;
  });
  return totalPrice;
}
