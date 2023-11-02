import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Product from '../Product/Product';
import db from '../../Firebase';

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

const Buy = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [sportsProducts, setSportsProducts] = useState([]);
  const [eventProducts, setEventProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = db.collection('product');
        const snapshot = await productsRef.get();
        const productsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
        setSportsProducts(productsData.filter(product => product.description.toLowerCase().includes('sport')));
        setEventProducts(productsData.filter(product => product.description.toLowerCase().includes('event')));
      } catch (error) {
        console.error('Error fetching products from Firestore: ', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={styles.container}>
      <Typography variant="h4" style={styles.title}>
        Concert
      </Typography>
      <div style={{ ...styles.row, overflowX: 'auto' }}>
        {products
          .filter(product => !product.description.toLowerCase().includes('sport') && !product.description.toLowerCase().includes('event'))
          .map(product => (
            <div key={product.id} style={styles.card}>
              <Product product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
      </div>

      <Typography variant="h4" style={styles.title}>
        Sports
      </Typography>
      <div style={{ ...styles.row, overflowX: 'auto' }}>
        {sportsProducts.map(product => (
          <div key={product.id} style={styles.card}>
            <Product product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>

      <Typography variant="h4" style={styles.title}>
        Events
      </Typography>
      <div style={{ ...styles.row, overflowX: 'auto' }}>
        {eventProducts.map(product => (
          <div key={product.id} style={styles.card}>
            <Product product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buy;
