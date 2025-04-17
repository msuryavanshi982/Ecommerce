# Full-Stack E-Commerce Platform for Fans & ACs

## Overview
This project involves building a **scalable, responsive, and performant full-stack e-commerce platform** designed for selling fans and air conditioners with multiple color and size variants. The platform supports **Google sign-in** for user authentication, an **admin dashboard** to manage orders, and a **rider app** built as a **PWA (Progressive Web App)** to handle order deliveries.

## Tech Stack

The recommended tech stack for building this application includes:

- **Frontend**: React.js with TailwindCSS / Material UI for styling
- **Backend**: Node.js with Express
- **Database**: MongoDB / PostgreSQL
- **Authentication**: Firebase / Google OAuth
- **Admin Panel**: AdminBro / Custom React Dashboard
- **Rider App**: React PWA

## Features

### 1. **Frontend (Customer App)**
- **Product Listing Page**:
  - Displays a minimum of 5 products.
  - Each product has color and size variants for customization.
- **Product Detail Page**:
  - Dropdowns/selectors for size and color.
  - Add to cart functionality for selected products.
- **Cart Page**:
  - Displays selected products, sizes, colors, and total amount.
- **Checkout Page**:
  - Mock payment system to simulate the checkout experience (optional).
- **Google Login**:
  - Allows users with pre-approved emails to sign in using Google OAuth.

### 2. **Backend**
- **REST APIs or GraphQL** (Optional):
  - APIs for product listing and detail retrieval.
  - Order creation functionality.
  - Admin and rider-specific routes for backend management.
- **User Management**:
  - User sign-ins are validated using an "approved_emails" collection/table.
- **Order Management**:
  - Stores product details, size, color, and order status.
  
### 3. **Admin Panel**
- **Login as Admin**:
  - Role-based access for admin users.
- **Order Management**:
  - Admin can view all orders.
  - Admin can change order status from "Paid" to "Shipped."
- **Rider Assignment**:
  - Admin assigns riders to orders once the order status changes to "Shipped."
- **Rider Management**:
  - Admin can view and manage riders and their assigned orders.

### 4. **Rider PWA**
- **Google Sign-In**:
  - Riders sign in using Google OAuth.
- **Assigned Orders**:
  - Riders only view orders assigned to them.
- **Order Details**:
  - Riders can view customer information, product(s), address, and current status.
- **Order Status Updates**:
  - Riders can update order status from "Shipped" to "Delivered" or "Undelivered."
- **Responsive Design**:
  - Fully optimized for mobile devices to ensure a smooth rider experience.

## Setup

### Prerequisites

To run the application locally, you will need:

- Node.js (for backend development)
- React.js (for frontend development)
- MongoDB or PostgreSQL (for database)
- Firebase or Google OAuth (for user authentication)
  
### Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   ```

2. **Install dependencies**:
   - Navigate to the project directory and install the required dependencies for both the frontend and backend:
     ```bash
     cd frontend
     npm install
     cd ../backend
     npm install
     ```

3. **Run the backend**:
   - In the backend directory:
     ```bash
     npm start
     ```

4. **Run the frontend**:
   - In the frontend directory:
     ```bash
     npm start
     ```

5. **Access the Rider App (PWA)**:
   - Deploy the rider app as a Progressive Web App.
   - Access the app on your mobile browser to test the delivery system.

### Database Configuration

1. **MongoDB**:
   - If you are using MongoDB, ensure that the MongoDB URI is correctly set in the environment variables.

2. **PostgreSQL**:
   - If you're using PostgreSQL, set up the database and update the connection string in the `.env` file.

### Google OAuth Setup

- Set up **Google OAuth** to authenticate users. Use **Firebase** or directly integrate Google’s authentication system into your backend.

### Admin Dashboard

- You can either use **AdminBro** or a **custom React Dashboard** to manage the admin panel. Admin login is restricted to role-based access.

### Rider Application (PWA)

- The Rider PWA should be mobile-responsive, allowing riders to view and manage assigned orders efficiently on their mobile devices.
