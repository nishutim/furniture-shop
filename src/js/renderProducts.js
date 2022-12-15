const renderProducts = (products) => {
   const productsList = document.querySelector('.products__list');

   products.forEach(product => {
      const productLabelItems = product.labels.reduce((items, label) => {
         const template = label.new
            ? `<li class="product-card__label product-card__label">${label.new}</li>`
            : `<li class="product-card__label product-card__label_red">${label.discount}</li>`
         return items += template;
      }, ``);
      const productLabels = `
         <ul class="product-card__labels">
            ${productLabelItems}
         </ul>
      `;
      const productImage = `
         <a class="product-card__image _ibg">
            <img src="./src/assets/img/jpg/products-image-${product.img}" alt="${product.name}">
         </a>
      `;
      const productOldPrice = product.prices.old ? `<p class="product-card__price_old">Rp ${product.prices.old}</p>` : '';
      const productCardBody = `
         <div class="product-card__body">
            <h4 class="product-card__title">${product.name}</h4>
            <p class="product-card__description">${product.description}</p>
            <div class="product-card__prices">
               <p class="product-card__price">Rp ${product.prices.current}</p>
               ${productOldPrice}
            </div>
            <div class="product-card__actions product-card-actions">
               <div class="product-card-actions__body">
                  <button class="product-card-actions__btn btn btn_white add-to-cart-btn">Add to cart</button>
                  <a href="#" class="product-card-actions__link icon-share">Share</a>
                  <a href="#" class="product-card-actions__link icon-heart">Like</a>
               </div>
            </div>
         </div>
      `;
      const productCard = `
         <div class="product-card">
            ${productLabels}
            ${productImage}
            ${productCardBody}
         </div>`;
      const listItem = `
         <li data-pid="${product.id}" class="products__list-item">
            ${productCard}
         </li>`;

      productsList.insertAdjacentHTML('beforeend', listItem);
   });
}

export default renderProducts;