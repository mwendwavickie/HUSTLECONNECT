# HUSTLE CONNECT 
Hustle Connect is a mobile application designed to connect local artisans, freelancers, and small business owners in Kenya with customers seeking their services. The app empowers users by giving them a digital platform to showcase their skills, attract clients, manage bookings, and grow their businesses.

Built with React Native (frontend) and Node.js/Express (backend), the app offers a seamless and intuitive interface that supports service listings, user profiles, booking, payments, reviews, and more.
## Project Overview
HustleConnect addresses the gap between skilled workers and potential clients in underserved markets. It facilitates:

  Increased visibility for artisans and freelancers.

  Easy service discovery for customers through categories, search, and filters.

  Digital empowerment for small business owners with profile and booking management.

  Secure payments and transparent user reviews.
## Key Features
User authentication (Signup/Login)

Customer and vendor profile management

Service listing with categories, descriptions, and images

Booking and scheduling functionality

Search and filtering of services

Reviews and ratings

Payment integration (M-Pesa or card)(planned)

Notifications and messaging (planned)

Admin dashboard (future enhancement)

## Prerequisites
Before installing the app, ensure you have the following installed:

### Development Environment
Node.js (v20 or later recommended)

npm or yarn

Expo CLI (npm install -g expo-cli)

Android Studio or Xcode (for emulator or device testing)

MongoDB (locally or hosted on MongoDB Atlas)

Postman (for API testing)

## Getting Started
### 1. Clone the repository
git clone https://github.com/mwendwavickie/hustleconnect.git

cd hustleconnect

### 2. Backend Set-up (Node.js)
cd hustleconnect-backend

npm install

Create an .env file

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

Start the backend Server

npm start


### 3. Frontend Set-up (React-Native + Expo)
cd hustleconnect-frontend

npm install

Start the development server:

npx expo start

Use the Expo Go app on your mobile device to scan the QR code or launch in an emulator.

## Usage and Functionality
### User roles
Customers: Browse services, book artisans, leave reviews.

Vendors: Create profiles, list services, manage bookings.

## Contributing
We welcome contributions! If you'd like to improve the app:

Fork the repository

Create a new branch (git checkout -b feature/your-feature)

Commit your changes (git commit -m 'Add some feature')

Push to the branch (git push origin feature/your-feature)

Open a Pull Request

## License 
This project is licensed under the MIT License. 






