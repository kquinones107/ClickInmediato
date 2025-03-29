const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const verifyToken = require('../middleware/auth');

router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, price, images, category, stock, seller } = req.body;
    
    const newProduct = new Product({ 
        title, 
        description, 
        price, 
        images, 
        category, 
        stock, 
        seller: req.user.id
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

router.get('/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate('seller', 'username email');
      if (!product) 
        return res.status(404).json({ message: 'Producto no encontrado' });
      res.status(product);
    } catch (err) {
      res.status(500).json({ message: 'Producto no encontrado', error: err });
    }
  });

router.put('/:id', verifyToken, async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) 
        return res.status(404).json({ message: 'Producto no encontrado' });

      if (product.seller.toString() !== req.user.id) {
        return res.status(403).json({ message: 'No autorizado para modificar este producto' });
      }

      const updatedProduct = await Product.findByIdAndUpdate(req
        .params.id, req.body, { new: true });
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json({ message: 'Error al actualizar producto', error: err });
    }
  }
);

router.delete('/:id', verifyToken, async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) 
        return res.status(404).json({ message: 'Producto no encontrado' });

      if (product.seller.toString() !== req.user.id) {
        return res.status(403).json({ message: 'No autorizado para eliminar este producto' });
      }

      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Producto eliminado' });
    } catch (err) {
      res.status(500).json({ message: 'Error al eliminar producto', error: err });
    }
  }
);

module.exports = router;