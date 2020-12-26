import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDb from './config/db.js';

dotenv.config();

connectDb();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUser = await User.insertMany(Users);
        const adminUser = createdUser[0]._id;

        const sampleProduct = products.map(product => {
            return {
                ...product,
                user: adminUser
            }
        })

        await Product.insertMany(sampleProduct);

        console.log('Data success');
        process.exit();
    }catch(err){
        console.log(err)
        process.exit(1);

    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed');
        process.exit();
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}