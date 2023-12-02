import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import Product from '../Product/Product';
import db from '../../Firebase';

const FilterResults = () => {
  const { filter } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const productsRef = db.collection('product');
        const snapshot = await productsRef
          .where('description', '==', filter.toLowerCase()) // Ensure consistency with the casing
          .get();
  
        console.log('Snapshot:', snapshot); // Log the snapshot to see what's returned
  
        const filteredProductsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log('Filtered Products:', filteredProductsData); // Log the filtered products
  
        setFilteredProducts(filteredProductsData);
      } catch (error) {
        console.error('Error fetching filtered products from Firestore: ', error);
      }
    };
  
    fetchFilteredProducts();
  }, [filter]);

  return (
    <div>
      <h2>Results for "{filter}"</h2>
      {filteredProducts.map((product) => (
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

export default FilterResults;
