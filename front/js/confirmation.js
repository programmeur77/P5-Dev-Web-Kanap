const params = new URLSearchParams(window.location.search),
  orderID = params.get('orderId');

document.getElementById('orderId').innerHTML = `<br />${orderID}`;

localStorage.removeItem('totalCart');
