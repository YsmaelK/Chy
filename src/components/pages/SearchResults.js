import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const SearchResults = ({ products }) => {
  if (products.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ErrorOutlineIcon style={{ marginRight: '0.5rem' }} />
        <div>Product not Found</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Search Results</h2>
      {products.map((product) => (
        <Link to={`/product/${product.name}`} style={{ textDecoration: 'none' }}>
          <Card style={{ width: '300px', marginBottom: '1rem' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.price}
              </Typography>
              {product.photoUrl && <img src={product.photoUrl} alt={product.name} style={{ marginTop: '0.5rem', width: '100%' }} />}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
