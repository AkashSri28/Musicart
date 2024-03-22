const express = require('express');
const router = express.Router();
const { addToCart } = require('../controllers/cartController');

// POST route to add a product to the cart
router.post('/add', addToCart);



module.exports = router;