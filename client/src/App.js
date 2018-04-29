import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import axios from "axios";
import ProductList from './ProductList';
import ContactUs from './ContactUs';
import Product from './Product';
import NoMatch from './NoMatch';

class App extends Component {

  constructor(props) {
  super(props);
  this.state = {
    catalog: '',
    apiUrl: 'http://localhost:5002/api/catalog'
    }
  }

  componentDidMount () {
    axios.get(this.state.apiUrl, {
      crossdomain: true
    })
    .then((response) => {
      var newCatalog = response.data
      this.setState({
        catalog: newCatalog
      })
      console.log(this.state.inventory)
    })
    .catch((error) => {
      alert("Encountered an error");
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
            <Route path="/product" component={Product} />
            <Route path="/contactUs" component={ContactUs} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </main>
      </div>
      </Router>
    );
  }
}

export default App;
