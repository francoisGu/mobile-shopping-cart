import React, { useContext } from 'react';
import { PageContext } from 'contexts/pageContext';
import { PageConfig } from 'constants/pages';
import CartItem from 'components/CartItem';
import * as Types from 'constants/actionTypes';
//material ui
import { useMediaQuery, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(matches => ({
  container: matches => ({
    marginTop: 20,
    position: 'relative',
    paddingBottom: 60,
    minHeight: matches ? 450 : undefined
  }),
  titileContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    padding: 20,
    fontSize: 16,
    fontWeight: 600,
    color: 'darkslategrey'
  },
  itemsContainer: {
    textAlign: 'center',
    margin: '100px 60px'
  },
  emptyIcon: {
    fontSize: 100,
    color: '#A7AFDD'
  },
  emptyTxt: {
    color: 'grey'
  },
  summaryContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    width: '100%'
  },
  totalNum: {
    margin: '10px 0 0 32px',
    fontWeight: 'bold',
    fontSize: 24
  },
  checkoutBtn: {
    marginRight: 25
  },
  resetBtn: {
    marginRight: 40,
    fontSize: 12
  }
}));

/**
 * Cart component
 */
const Cart: React.FC = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const classes = useStyles(matches);
  const { cart } = useContext(PageContext);
  const totalPrice = cart.state.items.reduce(
    (sum, i) => sum + (i.number || 0) * i.price,
    0
  );

  /**
   * User on click clear cart
   */
  const handleOnReset = () => {
    cart.dispatch({
      type: Types.INITIATE_SETTING
    });
  };

  // item added in the cart
  const cartItems = cart.state.items.map(i => (
    <CartItem item={i} key={`cart-item-${i.productName}`} />
  ));

  return (
    <Paper className={classes.container}>
      <div className={classes.titileContainer}>
        <div className={classes.title}>{PageConfig.cartTitle}</div>
        <Button
          color="secondary"
          className={classes.resetBtn}
          endIcon={<DeleteIcon />}
          disabled={!cart.state.items.length}
          onClick={handleOnReset}
          data-testid="clear-cart"
        >
          {PageConfig.cartClearBtn}
        </Button>
      </div>

      {cartItems.length ? (
        <div>
          <div>{cartItems}</div>
          <div className={classes.summaryContainer}>
            <div className={classes.totalNum}>$ {totalPrice.toFixed(2)}</div>
            <Button
              className={classes.checkoutBtn}
              variant="outlined"
              color="secondary"
            >
              {PageConfig.cartCheckoutBtn}
            </Button>
          </div>
        </div>
      ) : (
        <div className={classes.itemsContainer}>
          <ShoppingCart className={classes.emptyIcon} />
          <div className={classes.emptyTxt}>{PageConfig.emptyCartText}</div>
        </div>
      )}
    </Paper>
  );
};

export default Cart;
