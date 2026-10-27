(function () {
  "use strict";
  const {products,read,card}=window.AutoGear,root=document.getElementById("wishlist-content");
  function render(){const saved=read("autogear-wishlist").filter(id=>products.some(product=>product.id===id));root.innerHTML=saved.length?`<div class="product-grid">${saved.map(id=>card(products.find(product=>product.id===id))).join("")}</div>`:`<div class="empty-state"><h2>Your wishlist is empty</h2><p>Save products you’d like to revisit.</p><a class="button button-red" href="shop.html">Browse accessories</a></div>`;}
  document.body.addEventListener("click",event=>{if(event.target.closest(".wish-button"))setTimeout(render,0);});render();
})();
