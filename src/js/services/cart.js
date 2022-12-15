class Cart {
   static _saveCart = (data) => {
      localStorage.setItem('cartProducts', JSON.stringify(data));
   }
   static _saveCartQty = (data) => {
      localStorage.setItem('cartQty', JSON.stringify(data));
   }

   static _getCartProducts = () => JSON.parse(localStorage.getItem('cartProducts'));
   static _getCartQty = () => JSON.parse(localStorage.getItem('cartQty'));

   static addProduct = (product) => {
      let cartProducts = this._getCartProducts();
      let cartQty = this._getCartQty();

      const id = product.dataset.pid;
      const imgPath = product.querySelector('.product-card__image img').src.split('/');
      const img = imgPath[imgPath.length - 1];
      const title = product.querySelector('.product-card__title').innerHTML;

      if (!cartProducts && !cartQty) {
         const cartProduct = {
            id,
            img,
            title,
            qty: 1
         }
         cartProducts = [cartProduct];
         cartQty = 1;
      } else {
         const productInCart = cartProducts.find(el => el.id === id);
         if (productInCart) {
            cartProducts = cartProducts.map(el => {
               return el.id === id
                  ? { ...el, qty: el.qty + 1 }
                  : el
            });
         } else {
            cartProducts = [...cartProducts, {
               id,
               img,
               title,
               qty: 1
            }];
         }

         cartQty += 1;
      }

      this._saveCart(cartProducts);
      this._saveCartQty(cartQty);
   }

   static removeProduct = (id) => {
      let cartProducts = this._getCartProducts();
      let cartQty = this._getCartQty();
      let cartProduct = cartProducts.find(el => el.id === id);

      if (cartProduct.qty > 1) {
         cartProducts = cartProducts.map(el => {
            return el.id === id
               ? { ...el, qty: el.qty - 1 }
               : el
         });
      } else {
         cartProducts = cartProducts.filter(el => el.id !== id);
      }

      cartQty -= 1;

      this._saveCart(cartProducts);
      this._saveCartQty(cartQty);
   }
}

export default Cart;