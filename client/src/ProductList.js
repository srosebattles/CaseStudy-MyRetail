import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';

//TODO: Manage loading/paging for our 20,000 products
//TODO: Implement card layout for products
class ProductList extends Component {

  render () {
    return (
    <div>
      {this.props.catalog.map(function(product){
      return <span key={product.itemId}>
      <Link  to={`/product/${product.itemId}`}>
      <div className="ItemLinkContainer">
        <div>
          <img className="carouselImage" src={product.Images[0].PrimaryImage[0].image} alt={product.title} />
        </div>
        <div>
          {product.title}
        </div>
      </div>
      </Link>
      </span>;
    })}
    </div>
  )
  }
}

export default ProductList;
