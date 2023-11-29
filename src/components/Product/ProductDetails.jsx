import React from 'react';
import { useParams } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './ProductDetails.css'; // Import the CSS file for styling
import LinkIcon from '@mui/icons-material/Link';

const ProductDetails = ({ products, onAddToCart }) => {
  const { name } = useParams();

  console.log('Products Data:', products); // Log the products data to the console

  console.log('Parameter Name:', name); // Log the parameter name to the console

  // Find the product with the matching name
  const product = products.find((product) => product.name === name);

  const handleAddToCart = () => {
    // Add your logic here for adding the product to the cart
    console.log('Product added to cart:', product.name);
  };

  if (!product) {
    console.log('Product not found');
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details-container">
      <h2>{product.name}</h2>
      <img className="product-image" src={product.photoUrl} alt={product.name} />
      <p className="date-container">
        <EventIcon /> {product.date} at {product.time}
      </p>
      {/* Calendar icon next to date and time */}
      <p className="location-container">
        <LocationOnIcon /> {product.loc}
      </p>
      {/* Location symbol next to product.loc */}
      {product.info && (
          <>
          <p className="info-container-title"><strong>About this event:</strong></p> 
          <p className="info-container">{product.info}</p>
        </>
      )}
      {product.social && (
        <p className="social-media-container">
          <LinkIcon /> Contact Me: <a href={product.social} target="_blank" rel="noopener noreferrer">{product.social}</a>
        </p>
      )}
      {/* <button aria-label="add to cart" onClick={() => onAddToCart(product.id, 1)}>
        <AddShoppingCartIcon /> Add to Cart - ${product.price}
      </button> */}
      {/* Add more details as needed */}
    </div>
  );
};

export default ProductDetails;