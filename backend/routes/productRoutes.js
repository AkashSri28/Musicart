const express = require('express');
const router = express.Router();
const {getAllProducts, getProductById, searchProducts, filterProducts} = require('../controllers/productController');

// Route to handle GET request for fetching all products
router.get('/', getAllProducts);

// Route for product search
router.get('/search', searchProducts);

// Define route for product filtering
router.get('/filter', filterProducts);

// Route to get a single product by ID
router.get('/:id', getProductById);




module.exports = router;
