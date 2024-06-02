# Short.ly: URL Shortener Project

## Overview

This project is a URL shortener application that allows users to shorten long URLs with a custom keyword. It also provides user authentication and analytics features, including tracking the number of clicks on the shortened URLs. The project leverages modern web development technologies including React with TypeScript, Vite, React Hook Form, React Router DOM, Recoil for state management, Axios for HTTP requests, Express for the backend, Mongoose for database interactions, and JWT for authentication.

## Features

1. **User Authentication**:

   - **Sign Up**: Users can create an account by providing a username, email, and password.
   - **Login**: Existing users can log in using their email and password.

2. **URL Shortening**:

   - Users can input a long URL and a custom keyword to generate a shortened URL.
   - The shortened URL is stored in the database and is associated with the user's account.

3. **Analytics**:
   - The application tracks the number of clicks on each shortened URL.
   - Users can view the click statistics for their shortened URLs.

## Tech Stack

- **Frontend**:

  - **React**: A JavaScript library for building user interfaces.
  - **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
  - **Vite**: A fast development build tool for modern web projects.
  - **React Hook Form**: A library for managing form state and validation.
  - **React Router DOM**: A collection of navigational components for routing in React applications.
  - **Recoil**: A state management library for React.
  - **Axios**: A promise-based HTTP client for making requests to the backend.

- **Backend**:
  - **Express**: A minimal and flexible Node.js web application framework.
  - **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
  - **JWT (JSON Web Token)**: A compact, URL-safe means of representing claims to be transferred between two parties.

## Installation

### Prerequisites

- Node.js (v14.x or later)
- npm or yarn
- MongoDB

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/KushalGoyal09/short.ly.git
   cd short.ly/server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the `server` directory and add the following variables:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

### URL Redirect Server Setup

1. Clone the repository:

   ```bash
   cd ../server2
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the `server2` directory and add the following variables:

   ```env
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. Sign up for a new account or log in if you already have an account.
3. Enter a long URL and a custom keyword to generate a shortened URL.
4. Use the shortened URL to track clicks and view analytics on your dashboard.
