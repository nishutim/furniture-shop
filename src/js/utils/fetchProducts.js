const fetchProducts = async () => {
   const res = await fetch('./src/json/products.json');
   if (res.ok) {
      const data = await res.json();
      return data;
   } else {
      return Promise.reject(res);
   }
}

export default fetchProducts;