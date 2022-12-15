const renderCartProducts = async () => {
   const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
   if (!cartProducts) return;

   const cartList = document.querySelector('.cart-list');
   cartList.innerHTML = '';

   cartProducts.forEach(cartProduct => {
      const template = `
         <li data-cart-pid="${cartProduct.id}" class="cart-list__item">
            <a class="cart-list__image _ibg">
               <img src="./src/assets/img/jpg/${cartProduct.img}" alt="${cartProduct.title}" />
            </a>
            <div class="cart-list__body">
               <a class="cart-list__title">${cartProduct.title}</a>
               <div class="cart-list__qty">Quantity: <span>${cartProduct.qty}</span></div>
               <button class="cart-list__delete-btn delete-from-cart-btn">Delete</button>
            </div>
         </li>
      `;

      cartList.insertAdjacentHTML('beforeend', template);
   })

}

export default renderCartProducts;