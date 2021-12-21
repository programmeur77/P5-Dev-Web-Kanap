items = document.getElementById('items');

window.addEventListener('load', function (event) {
  console.log(localStorage);
  getAllProducts('http://localhost:3000/api/products');
});

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
