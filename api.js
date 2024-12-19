const express = require('express');
const app = express();

app.use(express.json());

const products = [];

// Retrieve all products
app.get('/products', (req, res) => {
    res.status(200).json(products);
});

// Adds a new product
app.post('/products', (req, res) => {
    const { id, name, price, category } = req.body;

    // Validate request body
    if (!id || !name || typeof price !== 'number' || !category) {
        return res.status(400).json({ error: 'Invalid product data. Ensure all fields are provided and correct.' });
    }

    // Check for duplicate ID
    const productExists = products.some(product => product.id === id);
    if (productExists) {
        return res.status(409).json({ error: 'A product with the given ID already exists.' });
    }

    // Add product to the array
    const newProduct = { id, name, price, category };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Delete a product by ID
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;

    // Find the index of the product
    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found.' });
    }

    // Remove the product from the array
    const deletedProduct = products.splice(productIndex, 1);
    res.status(200).json(deletedProduct);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
