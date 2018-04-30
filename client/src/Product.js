import React, { Component } from 'react';
import './App.css';

class Product extends Component  {

   constructor(props) {
   super(props);
   this.state = {
     catalog: this.props.catalog
     }
   }

   componentDidMount() {
     console.log(this.props.item)
   }

 render(){
   return (
     <div>
        <div>
          <h2 className="grayText">{this.props.item.title}</h2>
          <img src={this.props.item.Images[0].PrimaryImage[0].image} alt={this.props.item.title} />
        </div>
        <div>
          <div>
          <span className="smallRightMargin">{this.props.item.Offers[0].OfferPrice[0].formattedPriceValue}</span><span className="grayText tinyText">{this.props.item.Offers[0].OfferPrice[0].priceQualifier}</span>
          </div>
          <hr />
          {this.props.item.Promotions.map(function(promotion){
              return <div className="redText">{promotion.Description[0].shortDescription}</div>;
            })}
          <hr />
        </div>
     </div>
   )
 }
 }

 function StoreButton(props) {
  return (
    <button >
      PICK UP IN STORE
    </button>
  );
}

function CartButton(props) {
  return (
    <button>
      ADD TO CART
    </button>
  );
}

export default Product;
