import * as ActionTypes from '../constants/actionTypes';
import { Dispatch, Cart, Product } from 'types';
import { get } from 'utils/extension';

export const initState = {
  items: []
} as Cart;

export const reducer = (state = initState, action: Dispatch) => {
  switch (action.type) {
    // Add a new item or update existing products
    case ActionTypes.CART_UPDATE_ITEM: {
      const items = [...state.items];
      const newItem = action.data as Product;
      const item = items.find(i => i.productName === newItem.productName);

      if (!!item) {
        item.number = newItem.number;
      } else {
        items.push(newItem);
      }

      return { items };
    }
    // Remove a item
    case ActionTypes.CART_REMOVE_ITEM:
      return {
        items: state.items.filter(
          i => i.productName !== get(action, 'data.productName', '')
        )
      };
    //init
    case ActionTypes.INITIATE_SETTING:
      return initState;
    default:
      return state;
  }
};
