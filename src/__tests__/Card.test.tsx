import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import { PageContextProvider } from 'contexts/pageContext';
import Card from 'components/Card';
import Cart from 'components/Cart';
import { Product } from 'types';

jest.setTimeout(30000);

describe('Card component', () => {
  test('loads cart component successfully', async () => {
    const product = {
      isPublished: true,
      productName: 'product name',
      productImage: 'productImage',
      price: 100
    } as Product;
    const { getByText, getByRole } = render(
      <PageContextProvider>
        <Card product={product} />
      </PageContextProvider>
    );
    await wait(() => {
      expect(getByText('product name'));
      expect(getByText('$ 100'));
      expect(getByText('Add'));
      expect(getByRole('img'));
      expect(getByRole('button'));
    });
  });

  test('should able to add product into the cart', async () => {
    const product = {
      isPublished: true,
      productName: 'productname',
      productImage: 'productImage',
      price: 100
    } as Product;
    const { getByTestId, getByText } = render(
      <PageContextProvider>
        <Card product={product} />
        <Cart />
      </PageContextProvider>
    );
    const addProduct = getByTestId('card-add-button');
    fireEvent.click(addProduct);
    fireEvent.click(addProduct);
    await wait(() => {
      expect(getByTestId('cart-item-productname'));
      expect(getByText('2'));
    });
  });
});
