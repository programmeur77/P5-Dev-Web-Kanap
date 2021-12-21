const cartItems = document.querySelector('.cart #cart__items'),
  article = document.querySelector('article');

const cartContent = getLocalStorage('totalCart');

window.addEventListener('load', function () {
  getProducts(cartContent);
});

function getProducts(products) {
  products.map(function (element) {
    fetch(`http://localhost:3000/api/products/${element.id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        displayContent(data, element);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
