const Product = require('../models/ProductModel');

// Controller function to fetch all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProductById = async (req, res)=>{
    try {
        const productId = req.params.id;
        console.log(productId)
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { getAllProducts, getProductById };
