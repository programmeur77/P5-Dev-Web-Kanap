const cartItems = document.querySelector('.cart #cart__items'),
  article = document.getElementsByTagName('article'),
  quantity = document.getElementsByClassName('itemQuantity');

const cartContent = getLocalStorage('totalCart');

let array = [],
  dataArray = [],
  dataSetArray = [];

window.addEventListener('load', function () {
  let data;
  cartContent.map((element) => {
    data = getProductsToBuy(element.id);
    console.log(data);
  });
});

function getProductsToBuy(elementId) {
  fetch(`http://localhost:3000/api/products/${elementId}`)
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      return jsonData;
    });
}

// function getProducts(arrayToGet) {
//   arrayToGet.map((element) => {
//     fetch(`http://localhost:3000/api/products/${element.id}`)
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         displayContent(data, element);
//         convertCollectionToArray(article);
//         getDataset(array);
//         addListenerOnCollection(quantity, 'change');
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   });
// }

function convertCollectionToArray(htmlCollection) {
  array = Array.from(htmlCollection);
}

function getDataset(array) {
  array.map((element) => {
    dataSetArray.push(element.dataset);
  });
}

function addListenerOnCollection(collection, eventToListenTo) {
  for (let index of collection) {
    collection.item(index).addEventListener(eventToListenTo, function () {
      let newCartQuantityArray = updateCartQuantity(cartContent, dataSetArray);
      localStorage.removeItem('totalCart');
      //TODO Remplace former Array with the quantity modified one
    });
  }
}

function updateCartQuantity(storageContentArray, productDatasetArray) {
  let newCart = {};
  let newCartQuantityArray = [];
  let currentQuantity = parseInt(getQuantity());
  for (product of storageContentArray) {
    for (element of productDatasetArray) {
      if (
        product.id === element.id &&
        product.color === element.color &&
        product.quantity != currentQuantity
      ) {
        newCart = {
          id: product.id,
          color: product.color,
          quantity: currentQuantity
        };
      } else {
        newCart = {
          id: product.id,
          color: product.color,
          quantity: product.quantity
        };
      }
    }
  }
  newCartQuantityArray.push(newCart);
  return newCartQuantityArray;
}

function getQuantity() {
  let newQuantity;
  for (index in quantity) {
    newQuantity = quantity.item(index).value;
  }
  return newQuantity;
}
