import React from "react";
import "./App.css";


import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import { cartselectedlist, removecartselectedlist, totalPrize,checkoutselectedlist } from "./Action";

function mapDispatchToProps(dispatch) {
  return {
    cartselectedlist: book => dispatch(cartselectedlist(book)),
    removecartselectedlist: book => dispatch(removecartselectedlist(book)),
    totalPrize: book => dispatch(totalPrize(book))
  };
}

function mapStateToProps(state) {
  
  return { cartselectedList: state.cartselectedList, totalAmount: state.prize,checkoutcartselectedList:state.checkoutcartselectedList };
}


class Checkout extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      cartList: props.checkoutcartselectedList,
      selectedList: [],
      total: 0,
      firstName: '',
  lastName: '',
  email: '',
  purpose: '',
  cardnumber:'',
  cardexpiration:'',
  cardcvv:'',
  showstatus:false
      
    };
    
  }

  Back = () => {
    this.props.history.push("/");
  };

  Checkoutpayment=()=>{

    console.log(this.state.initialstate)
    const data={
      name:this.state.firstName+this.state.lastName,
    email:this.state.email,
    purpose:this.state.purpose,
    cardnumber:this.state.cardnumber,
    cardexpiration:this.state.cardexpiration,
    cardcvv:this.state.cardcvv,
    amount:this.props.totalAmount
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(data)
};
fetch('http://localhost:8080/PaymentRequest/Pay', requestOptions)
    .then(response => response.json())
    .then(response =>{
      console.log(response.success);
      if( response.success == "true"){
        
      
        const booksselected = this.props.checkoutcartselectedList;
        this.props.removecartselectedlist({ booksselected });
        alert("Payment done successfully");
        this.setState({showstatus:true});
        
      }
      else{
        alert("Payment not done successfully");
      }
     
    } 
      );

    


  }

  onChanges=(e) =>{
    if (e.target.id === 'firstName') {
        this.setState({ firstName: e.target.value });
       
    } else if (e.target.id === 'lastName') {
        this.setState({ lastName: e.target.value });
    } else if (e.target.id === 'email') {
        this.setState({ email: e.target.value });
    } else if (e.target.id === 'purpose') {
        this.setState({ purpose: e.target.value});
        console.log(e.target.value);
    }
    else if (e.target.id === 'cardnumber') {
      this.setState({ cardnumber: e.target.value});
      console.log(e.target.value);
  }
  else if (e.target.id === 'cardexpiration') {
    this.setState({ cardexpiration: e.target.value});
    console.log(e.target.value);
}
else if (e.target.id === 'cardcvv') {
  this.setState({ cardcvv: e.target.value});
  console.log(e.target.value);
}
}

  render() {
    
    return (
      <div className="container App">
        <h4 style={{ "text-align": "center", color: "red" }}>Payment Page</h4>
        {/* <h6 style={{ "text-align": "center" }}>
          Total Selected Items-{this.props.cartselectedList.length}
        </h6>
        <h6 style={{ "text-align": "center" }}>
          Total Amount-{this.props.totalAmount}
        </h6>

        <div className="container">
          <div className="row">
            <div className="clearfix" />{" "}
            <table id="example1" className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Image</th>
                  <th>TITLE</th>
                  <th>AUTHOR</th>
                  <th>PRICE</th>
                  <th>AVERAGE RATING</th>
                </tr>
              </thead>
              <tbody>
                {this.props.cartselectedList.map((x, i) => (
                  <tr key={i}>
                    <td>
                      <img src={x["Image"]} width="20" height="20" />
                    </td>

                    <td>{x.title}</td>
                    <td>{x.authors}</td>
                    <td>{x.price}</td>
                    <td>{x.average_rating}</td>
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
        */}

        <div className="container">
          <div className="row">
            <div className="col-md-6 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-6">
                <span className="text-muted">Your cart</span>
                <span className="badge badge-secondary badge-pill">
                  {this.props.checkoutcartselectedList.length}
                </span>
              </h4>
              <ul className="list-group mb-3 sticky-top">
                {this.props.checkoutcartselectedList.map(x => (
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h7 className="my-0" style={{ color: "blue" }}>
                        {x.title.split("(")[0]}
                      </h7>
                    </div>
                    <strong style={{ color: "red" }}>{x.price}</strong>
                  </li>
                ))}

                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (Rs)</span>
                  <strong style={{ color: "red" }}>
                    $ {this.props.totalAmount}
                  </strong>
                </li>
              </ul>
            </div>
            <div className="col-md-6 order-md-1">
              <h4 className="mb-3">Billing address</h4>
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>First name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder=""
                      required=""
                      onChange={e => this.onChanges(e)}
                    />
                    <div className="invalid-feedback">
                      {" "}
                      Valid first name is required.{" "}
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Last name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder=""
                      required=""
                      onChange={e => this.onChanges(e)}
                    />
                    <div className="invalid-feedback">
                      {" "}
                      Valid last name is required.{" "}
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label >
                    Email <span class="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    placeholder=""
                    onChange={e => this.onChanges(e)}
                  />
                 
                </div>
                <div className="mb-3">
                <label >
                    Purpose <span class="text-muted">(Mandatory)</span>
                  </label>
                  
                  <input
                    type="text"
                    class="form-control"
                    id="purpose"
                    onChange={e => this.onChanges(e)}
                  />
                 
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Card number</label>
                    <input
                      type="text"
                      class="form-control"
                      id="cardnumber"
                      placeholder=""
                      required=""
                      onChange={e => this.onChanges(e)}
                    />
                    <div class="invalid-feedback">
                      {" "}
                      Credit card number is required{" "}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 mb-3">
                    <label >Expiration</label>
                    <input
                      type="text"
                      class="form-control"
                      id="cardexpiration"
                      placeholder=""
                      required=""
                      onChange={e => this.onChanges(e)}
                    />
                    <div className="invalid-feedback">
                      {" "}
                      Expiration date required{" "}
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label>CVV</label>
                    <input
                      type="text"
                      class="form-control"
                      id="cardcvv"
                      placeholder=""
                      required=""
                      onChange={e => this.onChanges(e)}
                    />
                    <div className="invalid-feedback">
                      {" "}
                      Security code required{" "}
                    </div>
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
                    onClick={this.Checkoutpayment}
                    className="text-center btn btn-primary"
                  >
                    Click to payment
                  </button>
                </div>
                {this.state.showstatus == true && 
                 <div class="alert alert-primary text-center" role="alert" onClick={this.Back}>
                 Payment Done successfully
               </div>}
               
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Form = connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
export default withRouter(Form);
