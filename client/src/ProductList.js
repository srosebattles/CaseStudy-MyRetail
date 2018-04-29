import React, { Component } from 'react';
import { Switch, Link, Route } from "react-router-dom";
import axios from "axios";
import './App.css';
import Product from './Product';

//TODO: Manage loading/paging for our 20,000 products
class ProductList extends Component {

    constructor(props) {
    super(props);
    this.state = {
      catalog: [],
      //TODO: factor api base out for maintainability
      //API URL as state because in the future user search/navigation may change the endpoint we are hitting to get our items
      apiUrl: 'http://localhost:5002/api/catalog'
      }
    }

    componentDidMount () {
      axios.get(this.state.apiUrl, {
        crossdomain: true
      })
      .then((response) => {
        var newCatalog = response.data.CatalogEntryView
        this.setState({
          catalog: newCatalog
        })
        //console.log(this.state.catalog)
      })
      .catch((error) => {
        alert("Encountered an error while getting product catalog");
        console.log(error);
      });
    }

  render () {
    return (
    <div>
      {this.state.catalog.map(function(product){
      return <span><Link to='/product/1840'>{product.itemId}</Link></span>;
    })}
    </div>
  )
  }
}

export default ProductList;
