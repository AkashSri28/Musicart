import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductListing.css'; // Import the CSS file
import axios from 'axios';
import TopBar from './TopBar';
import { useAuth } from '../context/authContext';
import { useCart } from '../context/cartContext';


const ProductListing = () => {
  // const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState([]);
  const [sortingCriteria, setSortingCriteria] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedType, setSelectedType] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  const navigate = useNavigate();
  const {isLoggedIn} = useAuth();
  const { cartItems, addToCart } = useCart(); 

  const [viewMode, setViewMode] = useState('grid');

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleDetailsClick = (product) => {
    // Navigate to the description page for the selected product
    navigate(`/product/${product._id}`);
  };

  useEffect(() => {
    // Fetch products from backend API when component mounts
    const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/products');
          if (response.status === 200) {
            // setProducts(response.data);
            setFilteredProducts(response.data);
          } else {
            console.error('Failed to fetch products');
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
  }, []);

  useEffect(() => {
    // Fetch filtered products from the backend whenever the selected filters change
    const fetchFilteredProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products/filter', {
          params: {
            type: selectedType,
            company: selectedCompany,
            color: selectedColor,
            priceRange: selectedPriceRange
          }
        });
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching filtered products:', error);
      }
    };

    fetchFilteredProducts();
  }, [selectedType, selectedCompany, selectedColor, selectedPriceRange]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };

  const handleSearchChange = async (event) => {
    const searchTerm = event.target.value;
    setSearchQuery(event.target.value);
    
    //Search request to backend
    try {
      const response = await axios.get(`http://localhost:4000/api/products/search?query=${searchTerm}`);
      if (response.status === 200) {
        setFilteredProducts(response.data);
      } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error searching products:', error);
    }
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

  const handleViewCart = () =>{
    navigate('/cart');
  }

  // Options for filter dropdowns
  const headphoneTypes = ['Type A', 'Type B', 'Type C'];
  const companies = ['Company A', 'Company B', 'Company C'];
  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Purple', 'Orange', 'Brown', 'Gray', 'Pink', 'Cyan', 'Magenta'];
  const priceRanges = ['Under $20', '$20 - $30', '$30 - $40', '$40 - $50', 'Over $50'];

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
            {isLoggedIn && (
              <>
                <button className="view-cart-btn" onClick={handleViewCart}>View Cart {cartItems.length} </button>
                <img src="profile.jpg" alt="Profile" className="profile-image" />
              </>
            )}
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
            <select className="filter-dropdown" onChange={handleTypeChange}>

              <option value="">Headphone Type</option>
              {headphoneTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}

            </select>
            <select className="filter-dropdown" onChange={handleCompanyChange}>
              <option value="">Company</option>
              {companies.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
            <select className="filter-dropdown" onChange={handleColorChange}>
              <option value="">Color</option>
              {colors.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
            <select className="filter-dropdown" onChange={handlePriceRangeChange}>
              <option value="">Price</option>
              {priceRanges.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
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
              {filteredProducts.map((product) => (
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
              {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.imageUrl} alt={product.productName} />
                <div className="product-details">
                  <h3>{product.productName}</h3>
                  <p>Price: ${product.price}</p>
                  <p>{product.color}</p>
                  <p>{product.productType}</p>
                  <button onClick={() => handleDetailsClick(product)}>Details</button>
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
