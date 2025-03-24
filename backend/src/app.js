const express = require('express');
const cors = require('cors');
const app = express();

// 👉 importar las rutas
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');

app.use(cors());
app.use(express.json());

// 👉 usar las rutas en /api/users
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('✅ API funcionando correctamente');
});

module.exports = app;