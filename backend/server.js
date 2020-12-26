import connectDB from './config/db.js';
import dotenv from 'dotenv';
import express from 'express';
import productRoutes from './routes/productRoutes.js';

const app = express();

dotenv.config();

connectDB();

/**
 * Product Route.
 */
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Api is shit....')
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))