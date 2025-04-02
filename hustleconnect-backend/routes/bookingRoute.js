import express from 'express';
import Booking from '../models/Booking';
import Service from '../models/Service';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// @route   POST /api/bookings
// @desc    Create a new booking (Customer)
// @access  Private (Customer)

router.post('/book', authMiddleware, async (req, res) => {
    if (!req.user.role === 'customer'){
        return res.status(403).json({ message: "Only customers can book services"});
    }

    try{
        const {serviceId, date} = req.body;

        const booking = new booking({
            service: serviceId,
            customer: req.user.id,
            vendor: service.user,
            date,
            status: 'pending'
        });
        await booking.save();
        res.status(201).json({ message: "Booking created successfully"});
    } catch(error) {
        res.status(500).json({ message: "Internal server error"});
    }
});


export default router;