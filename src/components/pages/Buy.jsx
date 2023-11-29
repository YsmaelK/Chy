import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Product from '../Product/Product';
import db from '../../Firebase';
import './Buy.css';
import FilterMenu from './FilterMenu'; // Import the FilterMenu component

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    minHeight: '100vh', // Set to minHeight to ensure the container takes at least the full height of the viewport
    margin: 0,
    background: '#f0f0f0',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align products to the start
    marginBottom: '20px',
    overflowX: 'auto',
    width: '100%',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box', // Include padding and border in the total width and height
    paddingLeft: '0', // No padding on the left
    // Add media query for smaller screens
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  card: {
    flex: '0 0 150px',
    margin: '0 10px',
    minWidth: '150px',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'background-color 0.3s',
    // Add media query for smaller screens
    '@media (max-width: 600px)': {
      width: '80%', // Adjust the width for smaller screens
      maxWidth: '300px', // Add a maximum width for better readability
    },
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
  const [filter, setFilter] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = db.collection('product');
        const snapshot = await productsRef.get();
        const productsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
        setSportsProducts(productsData.filter((product) => product.description.toLowerCase().includes('sport')));
        setEventProducts(productsData.filter((product) => product.description.toLowerCase().includes('event')));
      } catch (error) {
        console.error('Error fetching products from Firestore: ', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (filter) {
      setFilteredProducts(products.filter((product) => product.description.toLowerCase().includes(filter)));
    } else {
      setFilteredProducts(products);
    }
  }, [filter, products]);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <div style={styles.container}>
      <FilterMenu onFilterChange={handleFilterChange} />
      <Typography variant="h4" style={styles.title}>
        Concert
      </Typography>
      <div style={{ ...styles.row, overflowX: 'auto' }}>
        {products
          .filter(
            (product) => !product.description.toLowerCase().includes('sport') && !product.description.toLowerCase().includes('event')
          )
          .map((product) => (
            <div key={product.id} style={{ ...styles.card, transition: 'background-color 0.3s' }}>
              <Product product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
      </div>
      <Typography variant="h4" style={styles.title}>
        Sports
      </Typography>
      <div style={{ ...styles.row, overflowX: 'auto' }}>
        {sportsProducts.map((product) => (
          <div key={product.id} style={styles.card}>
            <Product product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
      <Typography variant="h4" style={styles.title}>
        Events
      </Typography>
      <div style={{ ...styles.row, overflowX: 'auto' }}>
        {eventProducts.map((product) => (
          <div key={product.id} style={styles.card}>
            <Product product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buy;
