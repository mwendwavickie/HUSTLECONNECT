import React, {useState, createContext} from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [bookings, setBookings] = useState([]);

    const addBooking = (booking) => {
        setBookings((prev) => [...prev, booking]);
    };
    const removeBooking = (bookingId) => {
        setBookings((prevBookings) => prevBookings.filter(booking => booking.id !== bookingId));
    };
    return(
        <BookingContext.Provider value={{bookings, addBooking, removeBooking}}>
            {children}
        </BookingContext.Provider>
    );
};
