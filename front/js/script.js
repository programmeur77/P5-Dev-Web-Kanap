items = document.getElementById('items');

window.addEventListener('load', function(event) {
    getAllProducts('http://localhost:3000/api/products');
});

/**
 * Contacts the API to get all infprmation about all products sold
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
    objectToDisplay.forEach(value => {
        items.innerHTML = `<a href="./products.html?id=${value._id}">
                            <article>
                                <img src="${value.imageUrl}" alt="${value.altTxt}" />
                                <h3 class="productName">${value.name}</h3>
                                <p class="productDescription">${value.description}</p>
                            </article>
                        </a>`
    });
}
