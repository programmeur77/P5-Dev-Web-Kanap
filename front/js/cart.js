const cartItems = document.querySelector('.cart #cart__items'),
  quantity = document.getElementsByClassName('itemQuantity');

const cartContent = getLocalStorage('totalCart');

window.addEventListener('load', function () {
  cartContent.map((element) => {
    fetch(`http://localhost:3000/api/products/${element.id}`)
      .then((response) => response.json())
      .then((data) => {
        displayContent(data, element);
      });
  });
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

// window.addEventListener('load', async function () {
//   let data;
//   await Promise.all(
//     cartContent.map(async (element) => {
//       data = await getProductsToBuy(element.id);
//       console.log(data);
//     })
//   );
// });

// async function getProductsToBuy(elementId) {
//   const response = await fetch(
//     `http://localhost:3000/api/products/${elementId}`
//   );
//   const json = await response.json();
//   const jsonData = json;
//   return jsonData;
// }

/**
 * Displays elements on cart page
 * @param { Object } cart Contains fetched elements according to id stored in localStorage
 * @param { Object } storageElement Contains id, color and quantity of storaged products
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
