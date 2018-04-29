import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import ProductList from './ProductList';
import ContactUs from './ContactUs';
import NoMatch from './NoMatch';
import Product from './Product';
import axios from "axios";

class App extends Component {

  constructor(props) {
  super(props);
  this.state = {
    catalog: [],
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

  render() {
    return (
      <Router>
      <div className="App">
        <header>
          <ul className="nav" role="navigation">
            <li className="navItem">
              <Link to={'/productList'}>Products</Link>
            </li>
            <li className="navItem">
              <Link to={'/contactUs'}>Contact Us</Link>
            </li>
          </ul>
        </header>
        <main className="App-body" role="main">
          <Switch>
            <Route path="/productList" component={ProductList} />
            <Route path="/contactUs" component={ContactUs} />
            <Route path="/product/:productId" render={props => <Product catalog={this.state.catalog} {...props} />}/>
            <Route path="*" component={NoMatch} />
          </Switch>
        </main>
      </div>
      </Router>
    );
  }
}

export default App;
