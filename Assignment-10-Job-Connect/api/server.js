const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const userRoutes = require('./routes/routes');

const app = express();
const PORT = 3010;

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/user', userRoutes);

mongoose
    .connect('mongodb+srv://vikasraomeneni:vikasmeneni@cluster0.8r7k6.mongodb.net/')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB:', err.message));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});