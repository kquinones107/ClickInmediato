const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.post('/', async (req, res) => {
  try {
    const { title, description, price, images, category, stock, seller } = req.body;
    const newProduct = new Product({ 
        title, 
        description, 
        price, 
        images, 
        category, 
        stock, 
        seller 
    });
    
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);

  } catch (err) {
    res.status(500).json({ message: 'Error al crear producto', error: err });
  }
}); 

router.get('/', async (req, res) => {
    try {
      const products = await Product.find().populate('seller', 'username email');
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener productos', error: err });
    }
  });

module.exports = router;