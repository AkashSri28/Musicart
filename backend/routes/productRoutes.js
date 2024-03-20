const express = require('express');
const router = express.Router();
const {getAllProducts} = require('../controllers/productController');

// Route to handle GET request for fetching all products
router.get('/', getAllProducts);

module.exports = router;
