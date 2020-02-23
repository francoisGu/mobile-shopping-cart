import * as Products from 'contexts/productReducer';
import * as Cart from 'contexts/cartReducer';
import { Dispatch } from 'types';
import * as ActionTypes from '../constants/actionTypes';

describe('product reducer function test', () => {
  test('should able to init product reducer state', () => {
    const action = {
      type: ActionTypes.INITIATE_SETTING,
    } as Dispatch;
    const state = Products.reducer({} as any, action);
    expect(state).toEqual(Products.initState);
  });

  test('should able to return default products state', () => {
    const action = {
      type: 'Test Type',
    } as Dispatch;
    const state = Products.reducer(undefined, action);
    expect(state).toEqual(Products.initState);
  });

  test('should able to return default cart state', () => {
    const action = {
      type: 'Test Type',
    } as Dispatch;
    const state = Cart.reducer(undefined, action);
    expect(state).toEqual(Cart.initState);
  });
});
