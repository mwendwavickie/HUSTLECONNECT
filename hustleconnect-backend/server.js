import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoutes.js';
import serviceRoute from './routes/serviceRoutes.js';
import bookingRoute from './routes/bookingRoute.js';

//load enviroment variables
dotenv.config();

//Intialize express
const app = express();

//Middlewares
app.use(express.json());// parse json data
app.use(cors());//Enable cors for cross origin requests

app.use('/api/auth', authRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/services', serviceRoute);
app.use('/api/bookings', bookingRoute);

//Routes
app.get('/', (req,res) => {
    res.send("API is running...");
});

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Connect to database
connectDB();