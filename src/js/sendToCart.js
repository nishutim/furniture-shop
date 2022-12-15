import Cart from "./services/cart.js";
import renderCartQty from "./renderCartQty.js";
import renderCartProducts from "./renderCartProducts.js";

const sendToCart = (addToCartBtn) => {
   addToCartBtn.classList.add('_fly');

   const cartIcon = document.querySelector('.icon-cart');
   const product = addToCartBtn.closest('.products__list-item');
   const productImage = product.querySelector('.product-card__image');

   const flyingProductImage = productImage.cloneNode(true);

   const flyingProductImageWidth = productImage.offsetWidth;
   const flyingProductImageHeight = productImage.offsetHeight;
   const flyingProductImageTop = productImage.getBoundingClientRect().top;
   const flyingProductImageLeft = productImage.getBoundingClientRect().left;

   flyingProductImage.setAttribute('class', '_flyImage _ibg');

   flyingProductImage.style.cssText = `
      width: ${flyingProductImageWidth}px;
      height: ${flyingProductImageHeight}px;
      top: ${flyingProductImageTop}px;
      left: ${flyingProductImageLeft}px;
   `;

   document.body.append(flyingProductImage);

   const cartIconRightCoord = cartIcon.getBoundingClientRect().right;
   const cartIconTopCoord = cartIcon.getBoundingClientRect().top;

   flyingProductImage.style.cssText = `
      width: 0px;
      height: 0px;
      top: ${cartIconTopCoord}px;
      left: ${cartIconRightCoord}px;
      opacity: 0;
   `;

   flyingProductImage.addEventListener('transitionend', () => {
      if (addToCartBtn.classList.contains('_fly')) {
         flyingProductImage.remove();
         Cart.addProduct(product);
         renderCartQty();
         addToCartBtn.disabled = false;
         renderCartProducts();
         addToCartBtn.classList.remove('_fly');
      }
   });
}

export default sendToCart;