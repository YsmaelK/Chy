import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Product = ({ product, onAddToCart, user }) => {
  return (
    <Card sx={{ maxWidth: 345, marginBottom: '20px' }}>
      <CardMedia component="img" height="140" image={product.photoUrl} alt={product.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ marginTop: 1 }}>
          Price: {product.price}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ marginTop: 1 }}>
          Created by: {user}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to cart" onClick={() => onAddToCart(product.id, 1)}>
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;