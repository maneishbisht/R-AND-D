import{cart,removeFromCart,saveToStorage} from '../data/cart.js';/* updateDeliveryOption needs to be imported*/
import{products} from '../data/products.js';
import {formatCurrency} from './util/money.js';
import {deliveryOptions} from "../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; 

let cartSummaryHTML= '';
cart.forEach((cartItem)=> 
{
    const productID = cartItem.productId;
    let matchingProduct;
    products.forEach((product)=>
    {
      if (product.id==productID)
      {
        matchingProduct=product;
      }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;
    deliveryOptions.forEach((option)=>
    {
      if (option.id===deliveryOptionId)
      {
        deliveryOption = option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,`days`);
    const dateString = deliveryDate.format('dddd, MMMM, D');


cartSummaryHTML+=`<div class="cart-item-container js-cart-item-container-${matchingProduct.id}" data-prod-id ="${matchingProduct.id}" >
<div class="delivery-date">
Delivery Date : ${dateString}
</div>
    
<div class="cart-item-details-grid">
  <img class="product-image"
    src="${matchingProduct.image}">

  <div class="cart-item-details">
    <div class="product-name">
      ${matchingProduct.name}
    </div>
    <div class="product-price">
    ${formatCurrency(matchingProduct.priceCents)}
    </div>
    <div class="product-quantity">
      <span>
      ${matchingProduct.name}
        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
      </span>
      <span class="update-quantity-link link-primary">
        Update
      </span>
      <span class="delete-quantity-link link-primary js-delete-link" data-product-id = ${matchingProduct.id}>
        Delete
      </span>
    </div>
  </div>

  <div class="delivery-options">
    <div class="delivery-options-title">
      Choose a delivery option:
    </div>
  ${deliveryOptionsHTML(matchingProduct,cartItem)}
  </div>
</div>
</div>`; 
});


function deliveryOptionsHTML (matchingProduct,cartItem)
{
  let html = '';
  deliveryOptions.forEach((deliveryOption)=>
  {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,`days`);
    const dateString = deliveryDate.format('dddd, MMMM, D');
    let priceString;
    if (deliveryOption.priceCents===0)
    {
      priceString = "FREE";
    }
    else
    {
      priceString = formatCurrency(deliveryOption.priceCents);
    }
    const isChecked = deliveryOption.id===cartItem.deliveryOptionId;

 html +=
    `<div class="delivery-option" js-delivery-option data-product-id ="${matchingProduct.id}" data-delivery-option-id = "${deliveryOption.id}">
      <input type="radio" ${isChecked?'checked':''}
        class="delivery-option-input"
        name="${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">${dateString}</div>
        <div class="delivery-option-price">${priceString}</div>
      </div>      
    </div>`;
    
  });
  return html;
}




document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;




document.querySelectorAll('.js-delete-link').forEach ( (link)=>
{
link.addEventListener('click',()=>
{
  const productId = link.dataset.productId;
  removeFromCart(productId);
  let container = document.querySelector(`.js-cart-item-container-${productId}`);
  container.remove();
}); 
});



// document.querySelectorAll(".js-delivery-option").forEach((element)=>
// {
//   element.addEventListener('click',()=>
//   {
//     let productId = element.dataset.productId;
//     let deliveryOptionId = element.dataset.deliveryOptionId;
//     updateDeliveryOption(productId, deliveryOptionId);

//   });
// });


cart.forEach((cartitem) => {
  let m = cartitem.deliveryOptionId;
  let n = deliveryOptions[m - 1].deliveryDays;
  let finaldate = dayjs().add(n, 'days');
  let lastdate = finaldate.format('dddd, MMMM, D');
  let st = `js-cart-item-container-` + cartitem.productId;
  let a = document.querySelector("."+st);

  // Check if element with the specified selector exists
  if (a) {
    let k = a.querySelector(".delivery-date");
    k.innerHTML = lastdate;
  } else 
  {
    console.error("Element with selector not found:", "." + st);
  }
});


let optarr = document.querySelectorAll('input[type="radio"]');

optarr.forEach((inp)=>
  {
  inp.addEventListener('change',myfunction);
  });


function myfunction(e)
{
  let pt= e.target.parentElement;
  console.log(pt);
  let did = pt.dataset.deliveryOptionId;
  console.log(did);
  let st = `js-cart-item-container-`+ e.target.name;
  for (let i = 0 ; i <=cart.length;i++)
  {
    if (cart[i].productId === e.target.name)
    {
      cart[i].deliveryOptionId = did;
      saveToStorage();
      break;
    }
  }
  let a = document.querySelector("."+st);
  a = a.querySelector(".delivery-date");
  console.log(did);
  let m = parseInt(deliveryOptions[did-1].deliveryDays);
  
  let deliveryDate = dayjs().add(m,'days');
  a.innerText = deliveryDate.format('dddd, MMMM, D');
}