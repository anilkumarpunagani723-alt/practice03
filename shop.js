(function () {
  "use strict";
  const {products,card}=window.AutoGear;
  const categoryNode=document.getElementById("category-filters"),brandNode=document.getElementById("brand-filters");
  const categories=[...new Set(products.map(item=>item.category))].sort(),brands=[...new Set(products.map(item=>item.brand))].sort();
  categoryNode.innerHTML=categories.map(value=>`<label><input type="checkbox" name="category" value="${value}"> ${value}</label>`).join("");
  brandNode.innerHTML=brands.map(value=>`<label><input type="checkbox" name="brand" value="${value}"> ${value}</label>`).join("");
  const params=new URLSearchParams(location.search);
  const initialCategory=params.get("category"),initialBrand=params.get("brand");
  if(initialCategory){const option=[...categoryNode.querySelectorAll("input")].find(input=>input.value.toLowerCase()===initialCategory.toLowerCase());if(option)option.checked=true;}
  if(initialBrand){const option=[...brandNode.querySelectorAll("input")].find(input=>input.value.toLowerCase()===initialBrand.toLowerCase());if(option)option.checked=true;}
  const search=document.getElementById("global-search"); if(search&&params.get("q"))search.value=params.get("q");
  const range=document.getElementById("price-range"),priceLabel=document.getElementById("price-label"),sort=document.getElementById("sort-products"),grid=document.getElementById("product-list");
  let limit=8,view="grid";
  function render(){const categoriesSelected=[...categoryNode.querySelectorAll("input:checked")].map(input=>input.value);const brandsSelected=[...brandNode.querySelectorAll("input:checked")].map(input=>input.value);const query=(search?.value||"").trim().toLowerCase();let matches=products.filter(item=>(!categoriesSelected.length||categoriesSelected.includes(item.category))&&(!brandsSelected.length||brandsSelected.includes(item.brand))&&item.price<=Number(range.value)&&(!query||`${item.name} ${item.category} ${item.brand}`.toLowerCase().includes(query)));if(sort.value==="price-low")matches.sort((a,b)=>a.price-b.price);if(sort.value==="price-high")matches.sort((a,b)=>b.price-a.price);if(sort.value==="name")matches.sort((a,b)=>a.name.localeCompare(b.name));if(sort.value==="popular")matches.sort((a,b)=>b.popularity-a.popularity);document.getElementById("product-count").textContent=`Showing ${Math.min(limit,matches.length)} of ${matches.length} products`;grid.classList.toggle("list-view",view==="list");grid.innerHTML=matches.slice(0,limit).map(card).join("");document.getElementById("empty-products").hidden=matches.length>0;document.getElementById("load-more").style.display=matches.length>limit?"block":"none";priceLabel.textContent=window.AutoGear.money(Number(range.value));}
  document.querySelectorAll(".filters input[type=checkbox]").forEach(input=>input.addEventListener("change",()=>{limit=8;render();}));
  range.addEventListener("input",()=>{limit=8;render();});sort.addEventListener("change",render);if(search)search.addEventListener("input",()=>{limit=8;render();});
  document.getElementById("load-more").addEventListener("click",()=>{limit+=8;render();});
  document.querySelectorAll(".view-toggle").forEach(button=>button.addEventListener("click",()=>{view=button.dataset.view;document.querySelectorAll(".view-toggle").forEach(item=>item.classList.toggle("active",item===button));render();}));
  document.getElementById("clear-filters").addEventListener("click",()=>{document.querySelectorAll(".filters input[type=checkbox]").forEach(input=>input.checked=false);range.value=range.max;if(search)search.value="";sort.value="popular";limit=8;render();});
  render();
})();
