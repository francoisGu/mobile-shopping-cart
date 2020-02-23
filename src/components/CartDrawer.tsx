import React, { useState, useContext } from 'react';
import { PageContext } from 'contexts/pageContext';
import Cart from 'components/Cart';

//material ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles({
  cartBtn: {
    position: 'fixed',
    bottom: 20,
    right: 10
  },
  paper: {
    height: '80%'
  }
});

const CartDrawer: React.FC = () => {
  const [showCart, setShowCart] = useState(false);
  const classes = useStyles();
  const { cart } = useContext(PageContext);
  const totalNumber = cart.state.items.reduce(
    (sum, i) => sum + (i.number || 0),
    0
  );

  const toggleDrawer = (open: boolean) => () => {
    setShowCart(open);
  };

  return (
    <>
      {showCart ? (
        <Drawer
          anchor="bottom"
          open={showCart}
          onClose={toggleDrawer(false)}
          classes={{ paper: classes.paper }}
        >
          <Cart />
        </Drawer>
      ) : (
        <Button
          onClick={toggleDrawer(true)}
          variant="contained"
          color="primary"
          className={classes.cartBtn}
        >
          <ShoppingCart />
          {`items: ${totalNumber}`}
        </Button>
      )}
    </>
  );
};

export default CartDrawer;
