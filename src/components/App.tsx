import React from 'react';
import { PageContextProvider } from 'contexts/pageContext';
import Products from 'components/Products';
import Cart from 'components/Cart';
import CartDrawer from 'components/CartDrawer';

//material ui
import Grid from '@material-ui/core/Grid';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    position: 'relative'
  },
  cartBtn: {
    position: 'fixed',
    bottom: 20,
    right: 10
  }
});

const App: React.FC<any> = _ => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <PageContextProvider className={classes.container}>
      <Grid container>
        <Grid item xs={matches ? 8 : 12}>
          <Products />
        </Grid>
        {matches && (
          <Grid item xs={4}>
            <Cart />
          </Grid>
        )}
      </Grid>
      {!matches && <CartDrawer />}
    </PageContextProvider>
  );
};
export default App;
