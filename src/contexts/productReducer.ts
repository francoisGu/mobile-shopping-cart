import * as ActionTypes from '../constants/actionTypes';
import { Dispatch, Products } from 'types';

export const initState = {
  items: []
} as Products;

export const reducer = (state = initState, action: Dispatch) => {
  switch (action.type) {
    // Get all products
    case ActionTypes.PRODUCT_GET_ALL_PRODUCTS: {
      return {
        items: action.data
      };
    }
    case ActionTypes.INITIATE_SETTING:
      return initState;
    default:
      return state;
  }
};
