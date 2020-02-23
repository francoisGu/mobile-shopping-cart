import React from 'react';
import { render, wait } from '@testing-library/react';
import Products from 'components/Products';
import { PageContextProvider } from 'contexts/pageContext';

jest.setTimeout(30000);
describe('Products component', () => {
  test('loads products component successfully', async () => {
    const { getAllByRole } = render(
      <PageContextProvider>
        <Products />
      </PageContextProvider>
    );
    await wait(() => {
      expect(getAllByRole('button').length).toEqual(5);
    });
  });
});
