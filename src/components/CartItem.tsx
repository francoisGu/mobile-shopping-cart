import React, { useContext } from 'react';
import { Product } from 'types';
import { PageContext } from 'contexts/pageContext';
import * as Types from 'constants/actionTypes';
//material ui
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddBoxOutlined from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxOutlined from '@material-ui/icons/IndeterminateCheckBox';

const useStyles = makeStyles({
  container: {
    margin: 25
  },
  previewImg: {
    width: 20,
    border: '1px solid #d5d5d5',
    padding: 10,
    borderRadius: 5
  },
  name: {
    marginTop: 10
  },
  price: {
    marginTop: 10,
    fontWeight: 'bold'
  },
  action: {
    textAlign: 'right'
  },
  divider: {
    margin: '0 20px'
  }
});

interface Props {
  item: Product;
}

const CartItem: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { cart } = useContext(PageContext);
  const { productName, number, price, productImage } = props.item;

  // add amount of that current product
  const onClickAdd = () => {
    cart.dispatch({
      type: Types.CART_UPDATE_ITEM,
      data: {
        ...props.item,
        number: (props.item.number || 0) + 1
      }
    });
  };

  // reduce the amount and remove the item when amount <= 0
  const onClickMinus = () => {
    const item = {
      ...props.item,
      number: (props.item.number || 0) - 1
    };

    const type =
      item.number <= 0 ? Types.CART_REMOVE_ITEM : Types.CART_UPDATE_ITEM;
    cart.dispatch({ type, data: item });
  };

  return (
    <div data-testid={`cart-item-${productName}`}>
      <Divider className={classes.divider} />
      <Grid container className={classes.container}>
        <Grid item xs={2}>
          <img
            src={productImage}
            alt={productName}
            className={classes.previewImg}
          />
        </Grid>
        <Grid item xs={4}>
          <div className={classes.name}>{productName}</div>
          <div className={classes.price}>$ {price}</div>
        </Grid>
        <Grid item xs={4} className={classes.action}>
          <IconButton
            onClick={onClickMinus}
            data-testid="cart-item-minus-button"
          >
            <IndeterminateCheckBoxOutlined />
          </IconButton>
          <label>{number}</label>
          <IconButton onClick={onClickAdd} data-testid="cart-item-add-button">
            <AddBoxOutlined />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default CartItem;
