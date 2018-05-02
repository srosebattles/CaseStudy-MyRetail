import React from 'react';

function CartButton(props) {
  if (props.online){
 return (
    <button className="whiteText redBkg text18px smallLeftMargin">
      ADD TO CART
    </button>
       );
 }
   return null;
}

export default CartButton;
