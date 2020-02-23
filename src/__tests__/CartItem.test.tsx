import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import { PageContextProvider } from 'contexts/pageContext';
import Card from 'components/Card';
import Cart from 'components/Cart';
import { Product } from 'types';
import { PageConfig } from 'constants/pages';

jest.setTimeout(30000);

describe('Cart component', () => {
  test('should able to add more product into the cart', async () => {
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
    const cardAddProduct = getByTestId('card-add-button');

    fireEvent.click(cardAddProduct);
    await wait(() => {
      const itemAddProduct = getByTestId('cart-item-add-button');
      fireEvent.click(itemAddProduct);
      expect(getByTestId('cart-item-productname'));
      expect(getByText('2'));
      expect(getByText('$ 200.00'));
      expect(getByText('Checkout'));
    });
  });

  describe('Cart component', () => {
    test('should able to deduction product from the cart', async () => {
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
      const cardAddProduct = getByTestId('card-add-button');
      fireEvent.click(cardAddProduct);
      await wait(() => {
        const itemAddProduct = getByTestId('cart-item-add-button');
        const itemReduceProduct = getByTestId('cart-item-minus-button');
        fireEvent.click(itemAddProduct);
        fireEvent.click(itemReduceProduct);
        expect(getByTestId('cart-item-productname'));
        expect(getByText('$ 100.00'));
        expect(getByText('Checkout'));
      });
    });
  });


  describe('Cart component', () => {
    test('should able to remove product from the cart', async () => {
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
      const cardAddProduct = getByTestId('card-add-button');
      fireEvent.click(cardAddProduct);
      await wait(() => {
        const itemReduceProduct = getByTestId('cart-item-minus-button');
        fireEvent.click(itemReduceProduct);
        expect(getByText(PageConfig.cartTitle));
        expect(getByText(PageConfig.emptyCartText));
      });
    });
  });
});
