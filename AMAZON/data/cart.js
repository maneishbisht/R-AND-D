export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart)
{
cart =[];
}


export function saveToStorage ()
{
  localStorage.setItem('cart',JSON.stringify(cart));
}


export function addToCart (productID,num)
{
  let matchingItem;
 
  cart.forEach((item)=>
    {
      if (productID == item.productId)
      {
        matchingItem = item;
      }
    });
      if (matchingItem)
      {
        let m = parseInt(matchingItem.quantity, 10);
        m = m+num;
        matchingItem.quantity=parseInt(m,10);
      }
      else 
      {
        cart.push(
          {
            productId : productID,
            quantity : parseInt(num,10),
            deliveryOptionId :'1'
          });
      }
      saveToStorage();
}

export function updateCartQuantity()
{
  let cartQuantity = 0;
  cart.forEach ((cartItem)=>{
    cartQuantity+=cartItem.quantity;
  });
  localStorage.setItem('cartquant',JSON.stringify(cartQuantity));
  return cartQuantity;
}

export function removeFromCart (productId)
{
    const newCart = [];
    cart.forEach((cartItem)=>
    {
        if (cartItem.productId!=productId)
        {
            newCart.push(cartItem);
        }
    });
cart=newCart;
saveToStorage();
updateCartQuantity();
}

// export function updateDeliveryOption (productId, deliveryOptionId)
// {
//   let matchingItem;
 
//   cart.forEach((item)=>
//     {
//       if (productId === item.productId)
//       {
//         matchingItem = item;
//       }
//     });

//     matchingItem.deliveryOptionId = deliveryOptionId;
//     saveToStorage();
// }