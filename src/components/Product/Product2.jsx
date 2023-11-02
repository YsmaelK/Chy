import React from 'react';
import Typography from '@mui/material/Typography';
import Product from './Product';

const Product2 = ({ products, onAddToCart }) => {
  const sportsProducts = products ? products.filter((product) =>
    product.description.toLowerCase().includes('sports')
  ) : [];

  return (
    <div style={styles.container}>
      <Typography variant="h4" style={styles.title}>
        Sports
      </Typography>
      <div style={styles.row}>
        {sportsProducts.map((product) => (
          <div key={product.id} style={styles.card}>
            <Product product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 1200,
    margin: '0 auto',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'auto',
    maxWidth: '150%',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  card: {
    flex: '0 0 150px',
    margin: '0 10px',
  },
  title: {
    textAlign: 'left',
    marginBottom: '20px',
  },
};

export default Product2;
