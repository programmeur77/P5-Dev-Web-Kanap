/**
 * Loops on the object to get all data and display them on index page
 * @param { Object } objectToDisplay
 */
function displayContent(objectToDisplay) {
  for (let product of objectToDisplay) {
    items.insertAdjacentHTML(
      'beforeend',
      `<a href="./product.html?id=${product._id}">
              <article>
                  <img src="${product.imageUrl}" alt="${product.altTxt}" />
                  <h3 class="productName">${product.name}</h3>
                  <p class="productDescription">${product.description}</p>
              </article>
          </a>`
    );
  }
}

/**
 * Display color data in a HTML option list by looping on an array on prudct page
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
 * Displays data in the form on product page
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
