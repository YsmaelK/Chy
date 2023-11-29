import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Product = ({ product, onAddToCart, user }) => {
  // Truncate the product name if it's over 8 letters
  const truncatedName = product.name.length > 8 ? `${product.name.slice(0, 8)}...` : product.name;
  const displayPrice = product.price === 0 || product.price === '' ? 'Free' : `$${product.price}.00`;

  return (
    <Link to={`/product/${product.name}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ maxWidth: 345, marginBottom: '20px' }}>
        <CardMedia component="img" height="140" image={product.photoUrl} alt={product.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {truncatedName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ marginTop: 1 }}>
          {displayPrice}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ marginTop: 1 }}>
            Created by: {product.username}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to cart" onClick={() => onAddToCart(product.id, 1)}>
            <AddShoppingCartIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Link>
  );
};

export default Product;
