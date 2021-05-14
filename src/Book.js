import React from "react";
import "./App.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { cartselectedlist, removecartselectedlist, totalPrize,bookcartdata } from "./Action";

function mapDispatchToProps(dispatch) {
  return {
    bookcartdata: book => dispatch(bookcartdata(book)),
    cartselectedlist: book => dispatch(cartselectedlist(book)),
    removecartselectedlist: book => dispatch(removecartselectedlist(book)),
    totalPrize: book => dispatch(totalPrize(book))
  };
}

function mapStateToProps(state) {
  console.log(state);
  return { cartselectedList: state.cartselectedList, totalAmount: state.prize,bookcartdataall:state.bookcartdata };
}

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      userListfilter: [],
      cartList: [],
      asc: false,
      prizeasc:false
    };
  }

  async componentDidMount() {
    var image = [];
    if(this.props.bookcartdataall.length == 0){


    await fetch(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json"
    )
      .then(res => res.json())
      .then(res => {
        this.setState({ userListfilter: res.slice(0, 3000) });
      });

    await fetch(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/bookimage816b123.json"
    )
      .then(res1 => res1.json())
      .then(res1 => {
        image = res1;
      });



    let members = this.state.userListfilter.map(member => {
      //let index = Math.floor(Math.random() * image.length);
      return {
        ...member,
        Image: image[Math.floor(Math.random() * image.length)].Image
      };
    });

    this.setState({ userList: members });
    
    this.props.bookcartdata({ members });
  }
  }

  searchbytitle = event => {
    const members = this.state.userList.filter(dat => {
      return dat.title.toString().includes(event.target.value);
    });

    //this.setState({ userListfilter: filterdat });
    this.props.bookcartdata({ members });
  };
  Addtocart = event => {
    const candidateinfo = JSON.parse(
      event.currentTarget.attributes["def2"].value
    );

    const cartListval = this.props.cartselectedList;

    if (cartListval.length > 0) {
      const Filtereddata = cartListval.filter(
        data => data.bookID == candidateinfo.bookID
      );
      if (Filtereddata.length > 0) {
        alert("Already added in Cart");
      } else {
        this.setState(
          {
            cartList: this.state.cartList.concat(candidateinfo)
          },
          function() {
            const booksselected = candidateinfo;
            this.props.cartselectedlist({ booksselected });
          }
        );
        alert("Added Successfully into Cart");
      }
    } else {
      this.setState(
        {
          cartList: this.state.cartList.concat(candidateinfo)
        },
        function() {
          const booksselected = candidateinfo;
          this.props.cartselectedlist({ booksselected });
        }
      );
      alert("Added Successfully into Cart");
    }
  };

  cartlist = () => {
    this.props.totalPrize(0);
    this.props.history.push("/cartlist");
  };

  sorting = event => {
    let members;
    if (this.state.asc == false) {
      
      members = this.props.bookcartdataall.sort(function(a, b) {
        if (Number(a.average_rating) < Number(b.average_rating)) return -1;
        if (Number(a.average_rating) > Number(b.average_rating)) return 1;
        return 0;
      });
      this.setState({ asc: true });
    } else {
      members = this.props.bookcartdataall.sort(function(a, b) {
        if (Number(a.average_rating) < Number(b.average_rating)) return 1;
        if (Number(a.average_rating) > Number(b.average_rating)) return -1;
        return 0;
      });
      this.setState({ asc: false });
    }

    
    this.props.bookcartdata({ members });
  };

  sortingprize = event => {
    let members;
    if (this.state.prizeasc == false) {
      
      members = this.props.bookcartdataall.sort(function(a, b) {
        if (Number(a.price) < Number(b.price)) return -1;
        if (Number(a.price) > Number(b.price)) return 1;
        return 0;
      });
      this.setState({ prizeasc: true });
    } else {
      members = this.props.bookcartdataall.sort(function(a, b) {
        if (Number(a.price) < Number(b.price)) return 1;
        if (Number(a.price) > Number(b.price)) return -1;
        return 0;
      });
      this.setState({ prizeasc: false });
    }

    
    this.props.bookcartdata({ members });
  };

  render() {
    

    return (
      <div className="container App">
        <div>
          <h4 style={{ "text-align": "center" }}>Book Details</h4>
          
          <span >
            <button className="btn btn-info" style={{ "float": "right" }} onClick={this.cartlist}>
              {" "}
              <b> Cart Items:</b> {this.props.cartselectedList.length}
            </button>
          </span>
        </div>
        <div className="col-lg-12" style={{ display: "flex" }}>
          <div class="col-lg-6">
          <input
            className="form-control "
            type="text"
            placeholder="Search with Title"
            onChange={e => this.searchbytitle(e)}
            aria-label="Search"
          />
          </div>{" "}
          &nbsp;&nbsp;
          <div class="col-lg-6">
          <span>
            {/* <input
              type="button"
              className="btn btn-success fa fa-filter"
              onClick={e => this.sorting(e)}
              value="Sort"
            /> */}
            <button className="btn btn-primary fa fa-filter" onClick={e => this.sorting(e)} style={{"fontSize":"24",height:"28"}}>Sort by Rating <i className=""></i></button>
            {" "}
          &nbsp;&nbsp;
            <button className="btn btn-primary fa fa-filter" onClick={e => this.sortingprize(e)} style={{"fontSize":"24",height:"28"}}>Sort by Prize<i className=""></i></button>

          </span>
          </div>
        </div>

        <div className="container">
          <div className="row">
            {this.props.bookcartdataall.map(x => (
              <div
                className="card   mt-3 ml-4"
                def={JSON.stringify(x)}
                style={{ align: "center" }}
              >
                <img
                  src={x.Image}
                  alt="Avatar"
                  style={{
                    align: "center",
                    borderColor: "black",
                    backgroundColor: "lightblue",
                    height:150
                  }}
                />

                <div className="container">
                  <p>
                    Price: <b>{x.price}</b>
                  </p>
                  <p>
                    Title: <b>{x.title}</b>
                  </p>
                  <p>
                    Author: <b>{x.authors}</b>
                  </p>
                  <p>
                    AverageRating: <b>{x.average_rating}</b>
                  </p>
                  <p>
                    RatingCount: <b>{x.ratings_count}</b>
                  </p>
                  <p>
                    ISBN: <b>{x.isbn}</b>
                  </p>
                  
    

                  <p style={{"verticalAlign": "bottom"}}>
                    <input
                      type="button"
                      className="btn btn-success "
                      def2={JSON.stringify(x)}
                      onClick={e => this.Addtocart(e)}
                      style={{"verticalAlign": "bottom"}}
                      value="Add to Cart"
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div class="text-center">
            <button
              type="button"
              onClick={this.cartlist}
              className="btn btn-info"
            >
              Cart List
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const Form = connect(
  mapStateToProps,
  mapDispatchToProps
)(Book);
export default withRouter(Form);
