// backend/server.js
const express = require('express');
const cors = require('cors');
const customerRoutes = require('./routes/customers');
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '/data/customers.json');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/customers', customerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.post('/alerts', (req, res) => {
    const { customerId, name, riskScore } = req.body;
    console.log(`🚨 ALERT: High-risk customer detected - ${name} (${customerId}), Score: ${riskScore}`);
    res.status(200).json({ message: 'Alert received successfully' });
  });
  

  app.put("/api/updateCustomerStatus/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    // console.log(id + "  " + status)
   const  customers = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const customer = customers.find(c => c.customerId === id);
    if (!customer) return res.status(404).send({ message: "Customer not found" });
  
    customer.status = status;
    // console.log("status upadted successfully")
    // console.log(customer.status);
    res.send({ message: "Status updated successfully", customer });
  });
  