import { CARTSELECTEDLIST, REMOVECARTSELECTEDLIST, SETPRIZE,CHECKOUTSELECTEDLIST,BOOKCARTDATA } from "./Constant";

const initialState = {
  bookcartdata:[],
  cartselectedList: [],
  checkoutcartselectedList: [],
  prize: 0
};

function rootReducer(state = initialState, action) {
  //Adding cartlist
  if (action.type == CARTSELECTEDLIST) {
    
    return Object.assign({}, state, {
      cartselectedList: state.cartselectedList.concat(
        action.payload.booksselected
      )
    });
  }
  //Removecart list
  if (action.type == REMOVECARTSELECTEDLIST) {
    console.log(action.payload);
    const Filtereddata = state.cartselectedList.filter(
      data => data.bookID !== action.payload.booksselected.bookID
    );
   
    var amount = 0;
   

    return Object.assign({}, state, {
      cartselectedList: Filtereddata
    });
  }
  //Total amount
  if (action.type == SETPRIZE) {
    

    return Object.assign({}, state, {
      prize: action.payload.totalprice
    });
  }

  //selectedcheckoutlist
  if (action.type == CHECKOUTSELECTEDLIST) {
    
    return Object.assign({}, state, {
      checkoutcartselectedList: action.payload.booksselected
    });
  }
  
  if (action.type == BOOKCARTDATA) {
    
    return Object.assign({}, state, {
      bookcartdata: action.payload.members
      
    });
  }
  
   

  return state;
}

export default rootReducer;
