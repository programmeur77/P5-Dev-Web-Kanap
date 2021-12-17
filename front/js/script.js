items = document.getElementById('items');

window.addEventListener('load', function(event) {
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
        })
}

/**
 * Loops on the object to get all data and display them 
 * @param { Object } objectToDisplay
 */
function displayContent(objectToDisplay) {

    for (let product of objectToDisplay) {
        items.innerHTML = `<a href="./product.html?id=${product._id}">
                                      <article>
                                          <img src="${product.imageUrl}" alt="${product.altTxt}" />
                                          <h3 class="productName">${product.name}</h3>
                                          <p class="productDescription">${product.description}</p>
                                      </article>
                                  </a>`
    }
}
