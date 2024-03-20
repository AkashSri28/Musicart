import React, { useState, useEffect } from 'react';
import '../styles/ProductListing.css'; // Import the CSS file
import axios from 'axios';


const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState([]);
  const [sortingCriteria, setSortingCriteria] = useState('');

  const [viewMode, setViewMode] = useState('grid');

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  useEffect(() => {
    // Fetch products from backend API when component mounts
    const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/products');
          if (response.status === 200) {
            console.log(response.data);
            setProducts(response.data);
          } else {
            console.error('Failed to fetch products');
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // Optionally, you can implement live search here
  };

  // Define functions to handle filter and sorting changes
  const handleFilterChange = (selectedFilters) => {
    setFilters(selectedFilters);
    // Apply filters to products list
  };

  const handleSortingChange = (criteria) => {
    setSortingCriteria(criteria);
    // Apply sorting criteria to products list
  };

  const handleAddToCart = (productId) => {
    // Implement functionality to add product to cart
    // You may use context, redux, or other state management approaches to manage cart state
  };

  return (
    <div className="product-listing">
      {/* Top bar */}
      <div className="top-bar">
        <div className="phone-number">Phone: 123-456-7890</div>
        <div className="promotion">Get 50% off | Shop now</div>
      </div>

      <div className="content-wrapper">
        {/* Horizontal bar */}
        <div className="horizontal-bar">
          {/* Left side */}
          <div className="left-side">
            <img src="logo.png" alt="Logo" className="logo" />
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link">Invoice</a>
          </div>
          {/* Right side */}
          <div className="right-side">
            <button className="view-cart-btn">View Cart</button>
            <img src="profile.jpg" alt="Profile" className="profile-image" />
          </div>
        </div>

        {/* Banner */}
        <div className="banner">
          <img src="banner.png" alt="Banner" className="banner-image" />
        </div>

        {/* Search bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder={"Search by Product Name"}
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        {/* Additional bar */}
        <div className="additional-bar">
          {/* View toggle buttons */}
          <div className="view-toggle-buttons">
          <button
            className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('grid')}
          >
            Grid View
          </button>
          <button
            className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => handleViewModeChange('list')}
          >
            List View
          </button>
          </div>

          {/* Filter dropdowns */}
          <div className="filter-dropdowns">
            <select className="filter-dropdown">
              <option value="">Headphone Type</option>
              {/* Add options dynamically */}
            </select>
            <select className="filter-dropdown">
              <option value="">Company</option>
              {/* Add options dynamically */}
            </select>
            <select className="filter-dropdown">
              <option value="">Color</option>
              {/* Add options dynamically */}
            </select>
            <select className="filter-dropdown">
              <option value="">Price</option>
              {/* Add options dynamically */}
            </select>
          </div>

          {/* Sort by dropdown */}
          <div className="sort-dropdowns">
            <select className="sort-dropdown">
              <option value="">Sort by</option>
              <option value="featured">Featured</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>


        {/* Product grid/list */}
        <div className={`product-${viewMode}`}>
          {/* For grid view */}
          {viewMode === 'grid' && (
            <div className="product-grid">
              {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.imageUrl} alt={product.productName} />
                <div className="product-details">
                  <h3>{product.productName}</h3>
                  <p>Price: ${product.price}</p>
                  <p>{product.color}</p>
                  <p>{product.productType}</p>
                  <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
                </div>
              </div>
            ))}
            </div>
          )}

          {/* For list view */}
          {viewMode === 'list' && (
            <div className="product-list">
              {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.imageUrl} alt={product.productName} />
                <div className="product-details">
                  <h3>{product.productName}</h3>
                  <p>Price: ${product.price}</p>
                  <p>{product.color}</p>
                  <p>{product.productType}</p>
                  <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
                </div>
              </div>
            ))}
            </div>
          )}
          
        </div>
      </div>
      
    </div>
  );
};

export default ProductListing;
