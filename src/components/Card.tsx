import React, { useContext } from 'react';
import { PageContext } from 'contexts/pageContext';
import { PageConfig } from 'constants/pages';
import { Product } from 'types';
import * as Types from 'constants/actionTypes';

//material ui
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    textAlign: 'center'
  },
  card: {
    minWidth: 250,
    margin: 20
  },
  media: {
    height: 280,
    width: 150,
    marginTop: 25
  },
  button: {
    width: '50%',
    margin: '0 auto 10px auto'
  }
});

interface Props {
  product: Product;
}

/**
 * Product card component
 * @param props includes product need to show in this card
 */
const ProductCard: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { cart } = useContext(PageContext);
  const { productName, productImage, price } = props.product;

  // Add product into card user action
  const handleOnClick = () => {
    const item = cart.state.items.find(p => p.productName === productName) || {
      ...props.product
    };
    item.number = (item.number || 0) + 1;
    cart.dispatch({
      type: Types.CART_UPDATE_ITEM,
      data: item
    });
  };

  return (
    <Grid item xs={12} sm={6} md={6} lg={4} className={classes.container}>
      <Card className={classes.card}>
        <img src={productImage} alt={productName} className={classes.media} />
        <CardContent>
          <Typography>{productName}</Typography>
          <Typography>$ {price}</Typography>
        </CardContent>
        <CardActions>
          <Button
            data-testid="card-add-button"
            className={classes.button}
            onClick={handleOnClick}
            size="small"
            color="primary"
            variant="outlined"
          >
            {PageConfig.cardAddBtn}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;
