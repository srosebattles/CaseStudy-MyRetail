import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';

//TODO: Manage loading/paging for our 20,000 products
class ProductList extends Component {

  render () {
    return (
    <div>
      {this.props.catalog.map(function(product){
      return <span><Link to={`/product/${product.itemId}`}>{product.itemId}</Link></span>;
    })}
    </div>
  )
  }
}

export default ProductList;
