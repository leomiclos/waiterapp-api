import express from 'express';
import mongoose, { mongo } from 'mongoose';


const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/waiterapp')
    .then(() => {
        const app = express();

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port http://localhost:${PORT}`);
        });

    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

