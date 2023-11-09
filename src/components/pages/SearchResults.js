import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const SearchResults = ({ products }) => {
  return (
    <div>
      <h2>Search Results</h2>
      {products.map((product) => (
        <Card key={product.id} style={{ marginBottom: '20px' }}>
          <CardMedia
            component="img"
            height="140"
            image={product.photoUrl}
            alt={product.name}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: {product.price}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SearchResults;


