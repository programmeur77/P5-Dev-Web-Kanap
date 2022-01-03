const params = new URLSearchParams(window.location.search),
  productId = params.get('id');

const imgPlace = document.querySelector('article .item__img'),
  productTitle = document.getElementById('title'),
  productPrice = document.getElementById('price'),
  productDescription = document.getElementById('description'),
  productColors = document.getElementById('colors'),
  productQuantity = document.getElementById('quantity'),
  submit = document.getElementById('addToCart');

let cart = {};

const cartContent = [];

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

  if (productColors.value !== '' && productQuantity.value > 0) {
    if (isSetStorage('totalCart')) {
      let currentStorage = getLocalStorage('totalCart');
      let index = findStorageContent(currentStorage);
      if (index === -1) {
        cartContent.push(cart);
        let newCart = currentStorage.concat(cartContent);
        setLocalStorage(newCart);
        location.reload(true);
      } else {
        let modifiedArray = modifyQuantity(index);
        setModifiedStorage('totalCart', modifiedArray);
        location.reload(true);
      }
    } else {
      cartContent.push(cart);
      setLocalStorage(cartContent);
      location.reload(true);
    }
  } else if (productColors.value === '') {
    document.getElementById('formErrorMsg').innerHTML =
      'Merci de sélectionner une couleur';
  } else if (productQuantity.value <= 0) {
    document.getElementById('formErrorMsg').innerHTML =
      'Merci de sélectionner une quantité';
  }
});
