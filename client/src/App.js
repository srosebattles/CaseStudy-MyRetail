import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import ProductList from './ProductList';
import Welcome from './Welcome';
import NoMatch from './NoMatch';
import Product from './Product';
import axios from "axios";

class App extends Component {

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
              <Link to={'/welcome'}>Welcome</Link>
            </li>
          </ul>
        </header>
        <main className="App-body" role="main">
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/productList" render={props => <ProductList catalog={this.state.catalog} {...props} />} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/product/:productId" render={props => <Product item={this.state.catalog.find(p => p.itemId === props.match.params.productId)} {...props} />}/>
            <Route path="*" component={NoMatch} />
          </Switch>
        </main>
      </div>
      </Router>
    );
  }
}

export default App;
