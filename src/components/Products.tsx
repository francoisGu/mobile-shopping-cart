import React, { useEffect, useContext } from 'react';
import { PageContext } from 'contexts/pageContext';
import * as Types from 'constants/actionTypes';
import getProducts from 'api/getProducts';
import ProductCard from './Card';

//material ui
import { Grid } from '@material-ui/core';

const Products: React.FC = () => {
  const { products } = useContext(PageContext);

  useEffect(() => {
    // assume get all products from api
    getProducts().then(items => {
      products.dispatch({
        type: Types.PRODUCT_GET_ALL_PRODUCTS,
        data: items
      });
    });
  }, []);

  const cards = products.state.items
    .filter(p => !!p.isPublished)
    .map(p => (
      <ProductCard
        product={p}
        key={`products-card-${p.productName}`}
        data-testid={`products-card-${p.productName}`}
      />
    ));

  return (
    <>
      <Grid container>{cards}</Grid>
    </>
  );
};

export default Products;
