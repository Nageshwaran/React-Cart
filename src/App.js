import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cart from "./Cart";
import Book from "./Book";
import Checkout from "./Checkout";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Book} />
            <Route exact path="/cartlist" component={Cart} />
            <Route exact path="/Checkout" component={Checkout} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
