import {products} from '../data/products.js';
import {formatCurrency} from './util/money.js';
import {addToCart,updateCartQuantity} from '../data/cart.js'
let st='';


let myCartQuantity = parseInt(localStorage.getItem('cartquant'));
if (!myCartQuantity)
{ 
  myCartQuantity = 0;
}

document.querySelector('.js-cart-quantity').innerHTML = myCartQuantity;
products.forEach((product) =>
{
    st += `
    <div class="product-container" id = "${product.id}container">
              <div class="product-image-container">
                <img class="product-image"
                  src="${product.image}">
              </div>
    
              <div class="product-name limit-text-to-2-lines">
               ${product.name}
              </div>
    
              <div class="product-rating-container">
                <img class="product-rating-stars"
                  src="images/ratings/rating-${(product.rating.stars)*10}.png">
                <div class="product-rating-count link-primary">
                  ${product.rating.count}
                </div>
              </div>
    
              <div class="product-price">
              $${formatCurrency(product.priceCents)}
              </div>
    
              <div class="product-quantity-container">
                <select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>seven</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </select>
              </div>
    
              <div class="product-spacer"></div>
    
              <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
              </div>
    
              <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = ${product.id}>
                Add to Cart
              </button>
            </div>`
});


let t = document.querySelector('.products-grid');
t.innerHTML+= st;

document.querySelectorAll('.js-add-to-cart').forEach((button)=>
{
    button.addEventListener('click',()=>
    {
      let productID = button.dataset.productId;
      let st = productID +'container';
      let prodnum = document.getElementById(st);
      let prodnum2=prodnum.querySelector(".product-quantity-container");
      let prodnum3 = prodnum2.querySelector('select');
      let num = parseInt(prodnum3.options[prodnum3.selectedIndex].value,10);
      addToCart(productID,num);
      myCartQuantity = updateCartQuantity();
      document.querySelector('.js-cart-quantity').innerHTML = myCartQuantity;
    });
});