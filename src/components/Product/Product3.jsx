import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const styles = {
  card: {
    maxWidth: 200,
    margin: '0 auto', // Centers the card
    marginBottom: '20px', // Adds some bottom margin
  },
  eventCard: {
    backgroundColor: 'white', // Background color for sports card
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

const Product3 = ({ product, onAddToCart }) => {
  const isSmallScreen = window.matchMedia('(max-width: 600px)').matches; // Adjust the screen width as needed

  if (isSmallScreen) {
    return (
      <Card style={{ ...styles.card, ...styles.eventCard }}>
      <CardMedia style={styles.media} image={product.image.url} title={product.name} />
      <CardContent>
        <div style={styles.cardContent}>
          <Typography variant="body1" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1">{product.price.formatted_with_symbol}</Typography>
        </div>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
        />
      </CardContent>
      <CardActions disableSpacing style={styles.cardActions}>
        <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
          <ShoppingCartIcon />
        </IconButton>
      </CardActions>
      </Card>
    );
  }

  return (
    <Card style={styles.card}>
      <CardMedia style={styles.media} image={product.image.url} title={product.name} />
      <CardContent>
        <div style={styles.cardContent}>
          <Typography variant="body1" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1">{product.price.formatted_with_symbol}</Typography>
        </div>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
        />
      </CardContent>
      <CardActions disableSpacing style={styles.cardActions}>
        <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
          <ShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product3;