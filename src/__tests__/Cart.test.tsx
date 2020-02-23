import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import { PageContextProvider } from 'contexts/pageContext';
import Card from 'components/Card';
import { Product } from 'types';
import Cart from 'components/Cart';
import { PageConfig } from 'constants/pages';

jest.setTimeout(30000);

describe('Cart component', () => {
  test('loads empty cart component successfully', async () => {
    const { getByText } = render(
      <PageContextProvider>
        <Cart />
      </PageContextProvider>
    );
    await wait(() => {
      expect(getByText(PageConfig.cartTitle));
      expect(getByText(PageConfig.emptyCartText));
      expect(getByText('Clear').closest('button')).toHaveAttribute('disabled');
    });
  });

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
    const addProduct = getByTestId('card-add-button');
    fireEvent.click(addProduct);
    await wait(() => {
      expect(getByTestId('cart-item-productname'));
      expect(getByText('1'));
      expect(getByText('$ 100.00'));
      expect(getByText('Checkout'));
    });
  });

  test('should able to clear cart', async () => {
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
    const clearBtn = getByTestId('clear-cart');
    fireEvent.click(addProduct);
    fireEvent.click(clearBtn);
    await wait(() => {
      expect(getByText(PageConfig.cartTitle));
      expect(getByText(PageConfig.emptyCartText));
      expect(getByText('Clear').closest('button')).toHaveAttribute('disabled');
    });
  });
});
