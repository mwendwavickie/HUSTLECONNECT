import mongoose from 'mongoose';
const BookingSchema = new mongoose.Schema({
    service : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required : true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'completed', 'canceled'],
        default: 'pending'
    }
},
{
    timestamps: true
});

export default mongoose.model('Booking', BookingSchema);