# FreshMart

FreshMart is a MERN stack grocery delivery web application. Users can browse
products, add items to a cart, register, login, and place authenticated orders.

## Features

- React storefront with responsive product cards
- Cart summary and item totals
- JWT authentication with bcrypt password hashing
- Express REST APIs for users, products, and orders
- MongoDB/Mongoose support
- Demo product fallback when MongoDB is not configured

## Tech Stack

- Frontend: React, React Router, Axios
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Auth: JWT and bcryptjs

## Setup

Install backend dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

Create a `.env` file from `.env.example`:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=change_this_secret
```

Run backend:

```bash
npm run dev
```

Run frontend in another terminal:

```bash
cd frontend
npm start
```

The Vite development server proxies API calls to `http://localhost:5000`.

## Security

- Set a strong `JWT_SECRET`; authentication is disabled when it is missing.
- Keep `.env` files out of Git.
- Run `npm audit` in both the root and `frontend/` before releases.
