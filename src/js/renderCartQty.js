const renderCartQty = async () => {
   const cartQty = JSON.parse(localStorage.getItem('cartQty'));
   if (cartQty === null) return;

   const cartIcon = document.querySelector('.icon-cart');
   const cartQtyElement = cartIcon.querySelector('span');

   if (cartQtyElement) {
      cartQtyElement.textContent = cartQty;
   } else {
      cartIcon.insertAdjacentHTML('afterbegin', `<span>${cartQty}</span>`);
   }
}

export default renderCartQty;