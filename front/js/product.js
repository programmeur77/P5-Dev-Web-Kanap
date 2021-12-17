const params = new URLSearchParams(window.location.search),
      productId = params.get('id');

const imgPlace = document.querySelector('article .item__img'),
      productTitle = document.getElementById('title'),
      productPrice = document.getElementById('price'),
      productDescription = document.getElementById('description'),
      productColors = document.getElementById('colors');

window.addEventListener('load', function() {
    fetchProduct(productId);
})

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
            console.log(data);
            document.title = `${data.name}`;
            imgPlace.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}" />`;
            productTitle.innerHTML = `${data.name}`;
            productPrice.innerHTML = `${data.price}`;
            productDescription.innerHTML = data.description;
            colorOptions(data.colors);
        })
        .catch((error) => {
            console.error(error);
        })
}

/**
 * Display color data in a HTML option list by looping on an array
 * @param { Array } colorArray
 */

function colorOptions(optionArray) {
    for(let color of optionArray) {
        productColors.insertAdjacentHTML('beforeend', `<option value="${color}">${color}</option>`);
    }
}