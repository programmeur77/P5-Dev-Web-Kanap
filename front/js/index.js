items = document.getElementById('items');

window.addEventListener('load', function () {
  getAllProducts('http://localhost:3000/api/products');
});
