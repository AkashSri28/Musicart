const Cart = require('../models/CartModel');
const mongoose = require('mongoose');

const addToCart = async (req, res) => {
    try {
      // Extract product ID and user ID from the request body
      const { productId, userId } = req.body;
      console.log(productId)
  
      // Check if the product is already in the user's cart
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        // If the user doesn't have a cart yet, create a new one
        cart = new Cart({ user: userId, products: [{ product: new mongoose.Types.ObjectId(productId), quantity: 1 }] });
      } else {
        // If the user already has a cart, check if the product is already in the cart
        const productIndex = cart.products.findIndex(product => product.product.equals(new mongoose.Types.ObjectId(productId)));
  
        if (productIndex !== -1) {
          // If the product is already in the cart, update the quantity or any other relevant details
          // For simplicity, let's assume we're just updating the quantity
          console.log(productIndex)
          cart.products[productIndex].quantity++;
        } else {
          // If the product is not yet in the cart, add it
          cart.products.push({ product: new mongoose.Types.ObjectId(productId), quantity: 1 } );
        }
      }
  
      // Save the updated cart to the database
      await cart.save();
  
      // Send a success response
      res.status(200).json({ success: true, message: 'Product added to cart successfully' });
    } catch (error) {
      // If an error occurs, send an error response
      console.error('Error adding product to cart:', error);
      res.status(500).json({ success: false, message: 'Failed to add product to cart' });
    }
  };

  
  module.exports = {addToCart};