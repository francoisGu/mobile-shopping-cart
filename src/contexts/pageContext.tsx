import React, { createContext } from 'react';
import { PageState } from '../types';
import * as cartReducer from './cartReducer';
import * as productReducer from './productReducer';

export const PageContext = createContext({} as PageState);

export const PageContextProvider = (props: any) => {
  const products = React.useReducer(productReducer.reducer, productReducer.initState);
  const cart = React.useReducer(cartReducer.reducer, cartReducer.initState);
  const state = {
    products: { state: products[0], dispatch: products[1] },
    cart: { state: cart[0], dispatch: cart[1] }
  } as PageState;
  return (
    <PageContext.Provider value={state}>{props.children}</PageContext.Provider>
  );
};
