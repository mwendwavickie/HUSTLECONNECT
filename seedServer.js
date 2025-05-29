// seedServer.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 6000;

app.use(cors());
app.use(express.json());

// Sample categories
const categories = [
  { _id: '1', name: 'Plumbing' },
  { _id: '2', name: 'Beauty' },
  { _id: '3', name: 'Cleaning' },
  { _id: '4', name: 'Design' },
];

// Sample services
const services = [
  {
    _id: '1',
    title: 'Plumbing Services',
    description: 'Expert plumbing services for your home and office.',
    price: 2500,
    category: { name: 'Plumbing' },
    User: { name: 'John Doe' }
  },
  {
    _id: '2',
    title: 'Hair Styling',
    description: 'Trendy hairstyles by certified professionals.',
    price: 1500,
    category: { name: 'Beauty' },
    User: { name: 'Jane Wanjiku' }
  },
  {
    _id: '3',
    title: 'Home Cleaning',
    description: 'Affordable and efficient home cleaning services.',
    price: 3000,
    category: { name: 'Cleaning' },
    User: { name: 'Alice Kimani' }
  },
  {
    _id: '4',
    title: 'Graphic Design',
    description: 'Logo, poster, and flyer design services.',
    price: 5000,
    category: { name: 'Design' },
    User: { name: 'Mike Otieno' }
  }
];

// 🔹 GET all categories
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// 🔹 GET all services (with optional category filter)
app.get('/api/services', (req, res) => {
  const { category } = req.query;
  let result = services;

  if (category) {
    result = services.filter(service =>
      service.category.name.toLowerCase() === category.toLowerCase()
    );
  }

  res.json(result);
});

// Start server
app.listen(PORT, () => {
  console.log(`Seed server running at http://localhost:${PORT}`);
});
