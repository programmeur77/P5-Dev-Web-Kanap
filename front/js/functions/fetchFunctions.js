/**
 * Contacts the API to get all information about all products sold
 * @param { String } url
 */

function getAllProducts(url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((object) => {
      displayContent(object);
    })
    .catch((error) => {
      console.error(error);
    });
}

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
 * Called during an array mappin and fetch each product present in the localStorage Array
 * @param { Array } element contains each entry of the array
 */
function getTotalCart(element) {
  fetch(`http://localhost:3000/api/products/${element.id}`)
    .then((response) => response.json())
    .then((data) => {
      displayContent(data, element);
    });
}

/**
 * Post request of the cart content after the user filled the form
 * @param { Array.<Object> } contentToPost contains the content to post in database
 */
function validateOrder(contentToPost) {
  var json = JSON.stringify(contentToPost);
  console.log(json);
  fetch('http://localhost:3000/api/products/order', {
    method: 'post',
    body: json,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      window.location.href = `./../html/confirmation.html?orderId=${jsonData.orderId}`;
    })
    .catch(function (error) {
      console.error(error);
    });
}
