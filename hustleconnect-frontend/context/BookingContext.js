import React, { useState, createContext } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [bookings, setBookings] = useState([]);

    // Add new booking with default status 'pending'
    const addBooking = (booking) => {
        const newBooking = { ...booking, status: 'pending' };
        setBookings((prev) => [...prev, newBooking]);
    };

    // Cancel booking (remove from list)
    const cancelBooking = (bookingId) => {
        setBookings((prevBookings) =>
            prevBookings.filter((booking) => booking._id !== bookingId)
        );
    };

    // Mark booking as completed
    const completeBooking = (bookingId) => {
        setBookings((prevBookings) =>
            prevBookings.map((booking) =>
                booking._id === bookingId ? { ...booking, status: 'completed' } : booking
            )
        );
    };

    return (
        <BookingContext.Provider
            value={{
                bookings,
                addBooking,
                cancelBooking,
                completeBooking
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};
