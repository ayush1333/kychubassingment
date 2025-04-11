// backend/routes/customers.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/customers.json');

// GET all customers
router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  res.json(data);
});

// PUT to update a customer's status
router.put('/:customerId/status', (req, res) => {
  const { customerId } = req.params;
  const { status } = req.body;

  let data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  data = data.map(customer =>
    customer.customerId === customerId
      ? { ...customer, status }
      : customer
  );

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.json({ message: 'Status updated', customerId, status });
});

module.exports = router;
