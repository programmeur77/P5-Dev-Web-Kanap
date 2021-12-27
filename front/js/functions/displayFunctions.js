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

function displayQuantity(storageArray, DOMNode) {
  let totalQuantity = getTotalQuantity(storageArray);
  DOMNode.innerText = totalQuantity;
}

function displayPrice(storageArray, DOMNode) {
  let total = getTotalPrice(storageArray);
  DOMNode.innerText = total;
}
