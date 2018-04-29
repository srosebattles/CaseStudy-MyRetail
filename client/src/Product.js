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
     console.log(this.props)
   }

 render(){
   return (
     <div>
       <h2>Product Page</h2>
     </div>
   )
 }
 }

export default Product;
