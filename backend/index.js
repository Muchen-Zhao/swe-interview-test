const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// CORS config - allow requests from React dev server
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'DELETE'],
}));

// Products array
let products = [
  { id: 1, name: 'Product 1', description: 'description 1', price: 100, imageUrl: '' },
  { id: 2, name: 'Product 2', description: 'description 2', price: 200, imageUrl: '' },
  { id: 3, name: 'Product 3', description: 'description 3', price: 300, imageUrl: '' },
  { id: 4, name: 'Product 4', description: 'description 4', price: 150, imageUrl: '' },
  { id: 5, name: 'Product 5', description: 'description 5', price: 500, imageUrl: '' },
  { id: 6, name: 'Product 6', description: 'description 6', price: 50,  imageUrl: '' },
];

// Generate a random image URL from picsum
const fetchImageUrl = () => {
  return `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
};

// GET /api/products - return all products with random images
app.get('/api/products', (req, res) => {
  const result = products.map(p => ({ ...p, imageUrl: fetchImageUrl() }));
  res.json(result);
});

// DELETE /api/products/:id - remove a product by id
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products = products.filter(p => p.id !== id);
  res.json({ message: 'Product deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
