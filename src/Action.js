import { CARTSELECTEDLIST, REMOVECARTSELECTEDLIST,SETPRIZE ,CHECKOUTSELECTEDLIST,BOOKCARTDATA } from "./Constant";

export function cartselectedlist(payload) {
  return { type: CARTSELECTEDLIST, payload };
}

export function removecartselectedlist(payload) {
  return { type: REMOVECARTSELECTEDLIST, payload };
}
export function checkoutselectedlist(payload) {
  return { type: CHECKOUTSELECTEDLIST, payload };
}
export function bookcartdata(payload) {
  return { type: BOOKCARTDATA, payload };
}


export function totalPrize(payload) {
  return { type: SETPRIZE, payload };
}
