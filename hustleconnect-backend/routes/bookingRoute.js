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

// @route   GET /api/bookings
// @desc    Get all bookings (Customer sees their bookings, Vendor sees their received bookings)
// @access  Private (Customer/Vendor)

router.get('/bookings', authmiddleware, async (req, res) => {
    try {
        let bookings;
        if (req.user.role === 'customer'){
            bookings = await Booking.find({ customer: req.user.id}) .populate('service', "title price").populate('vendor', 'name email');
        } else if (req.user.role === "vendor"){
            bookings =  await Booking.find({ vendor: req.user.id}).populate('service', "title price").populate('customer', 'name email');  
        } else {
            return res.status(403).json({ message: " Unauthorized access"});
        }
        res.status(200).json(bookings);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error"});
        }
    }
);

// @route   PUT /api/bookings/:id
// @desc    Update booking status (Vendor only)
// @access  Private (Vendor)
router.put('/bookings/:id', authMiddleware, async (req, res) => {
    if (!req.user.role === "vendor"){
        return res.status(403).json({ message: "Only vendors can update booking status"});
    }
    try{
        const { status } = req.body;
        const booking =  await Booking.findById(req.params.id);

        if (!booking){
            return res.status(404).json({ message: 'Booking not found'});
        }
        if (booking.vendor.toString() !== req.user.id){
            return res.status(403).json({ message: "Unauthorized "});
        }
        if (!["approved", "completed", "cancelled"].includes(status)){
            return res.status(400).json({ message: "Invalid status update."});
        }

        booking.status = status;
        await booking.save();
        res.json(booking);
        } catch (error) {
            res.status(500).json({ message: "Internal server errror"});
        console.error(error);
        }
    });


export default router;