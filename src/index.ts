import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import path from 'node:path';



mongoose.connect('mongodb://localhost:27017/waiterapp')
    .then(() => {
        const app = express();
        const PORT = process.env.PORT || 3000;

        app.use('/uploads', express.static(path.resolve(__dirname, '..', 'assets')));
        app.use(express.json());
        app.use('/api', router);

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port http://localhost:${PORT}`);
        });

    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

