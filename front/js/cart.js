const cartItems = document.querySelector('.cart #cart__items'),
  article = document.getElementsByTagName('article'),
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
