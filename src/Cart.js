import React from "react";
import "./App.css";

import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import { cartselectedlist, removecartselectedlist, totalPrize,checkoutselectedlist } from "./Action";

function mapDispatchToProps(dispatch) {
  return {
    cartselectedlist: book => dispatch(cartselectedlist(book)),
    removecartselectedlist: book => dispatch(removecartselectedlist(book)),
    checkoutselectedlist: book => dispatch(checkoutselectedlist(book)),
    totalPrize: book => dispatch(totalPrize(book))
  };
}

function mapStateToProps(state) {
  console.log("redux state");
  console.log(state);
  return { cartselectedList: state.cartselectedList, totalAmount: state.prize };
}

class Cart extends React.Component {
  constructor(props) {
    super(props);
    console.log("sdfsdfdfdssdfdddddddddddddddddddddddd");
    console.log(props);
    this.state = {
      cartList: props.cartselectedList,
      selectedList: [],
      total: 0
    };
  }

  Back = () => {
    
    this.props.history.push("/");
  };

  Checkout =()=>{

    const booksselected=this.state.selectedList;
    
    this.props.checkoutselectedlist({booksselected});
    
    this.props.history.push("/Checkout");

  }

  addPrice = () => {
    let totalprice = 0;

    this.state.selectedList.map(value => {
      totalprice = totalprice + value.price;
    });

    this.props.totalPrize({ totalprice });
    
  };
  removeItems = event => {
    const booksselected = JSON.parse(
      event.currentTarget.attributes["removeval"].value
    );
    this.props.removecartselectedlist({ booksselected });
    this.props.totalPrize(0);
    this.setState(
      {
        selectedList: []
      },
      function() {
        console.log("cleared");
      }
    );
    document
      .querySelectorAll("input[type=checkbox]")
      .forEach(el => (el.checked = false));
  };

  myClick = event => {
   
    
    console.log(this.state.selectedList);

    if (event.target.checked) {
      const value = event.currentTarget.attributes["def"].value;

      this.setState(
        prevState => ({
          selectedList: [...prevState.selectedList, JSON.parse(value)]
        }),
        function() {
          this.addPrice();
        }
      );
      
    } else {
      const value = JSON.parse(event.currentTarget.attributes["def"].value);

      this.setState(
        {
          selectedList: this.state.selectedList.filter(person => {
            return person.bookID !== value.bookID;
          })
        },
        function() {
          this.addPrice();
        }
      );

      
    }
  };

  render() {
    
    return (
      <div className="container App">
        <h4 style={{ "text-align": "center" }}>CartList Values</h4>

        <div className="container">
          <div className="row">
            <div className="clearfix" />{" "}
            <table id="example1" className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Select</th>
                  <th>Image</th>
                  <th>TITLE</th>
                  <th>AUTHOR</th>
                  <th>PRICE</th>
                  <th>AVERAGE RATING</th>
                  <th>REMOVE</th>
                </tr>
              </thead>
              <tbody>
                {this.props.cartselectedList.map((x, i) => (
                  <tr key={i}>
                    <td>
                      <input
                        type="checkbox"
                        def={JSON.stringify(x)}
                        onClick={e => this.myClick(e)}
                      />
                    </td>

                    <td>
                      <img src={x["Image"]} width="20" height="20" />
                    </td>

                    <td>{x.title}</td>
                    <td>{x.authors}</td>
                    <td>{x.price}</td>
                    <td>{x.average_rating}</td>
                    <td>
                      <input
                        type="button"
                        className="btn btn-danger"
                        value="Remove"
                        removeval={JSON.stringify(x)}
                        onClick={e => this.removeItems(e)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div />
            {this.props.cartselectedList.length == 0 && (
              <div style={{ "text-align": "center" }} className="container ">
                <h1>
                  {" "}
                  <b> No data found to display.</b>
                </h1>
              </div>
            )}
          </div>
        </div>
        <div className="text-center">
          <button
            type="button"
            onClick={this.Back}
            className="text-center btn btn-danger"
          >
            Back
          </button>{" "}
          &nbsp;&nbsp;
          <button
            type="button"
            onClick={this.Checkout}
            className="text-center btn btn-success"
          >
            Checkout
          </button>{" "}
          &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
          <b>Total Price</b>:
          <b style={{ color: "red" }}>{this.props.totalAmount}</b>
        </div>
      </div>
    );
  }
}

const Form = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
export default withRouter(Form);
