# Monefy API

Monefy is a RESTful API for a travel budgeting application. It allows users to manage trips, budgets, and wishlists.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installing

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/monefy.git
   ```
2. Install the dependencies:
   ```bash
   cd monefy
   npm install
   ```
3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm start
   ```

The server will be running on `http://localhost:3000`.

## API Documentation

All endpoints are prefixed with `/api`.

### Authentication

#### `POST /auth/signup`

Creates a new user.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "_id": "60c72b2f9b1d8c001f8e4c8d",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "token": "your_jwt_token"
}
```

#### `POST /auth/login`

Logs in a user.

**Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "_id": "60c72b2f9b1d8c001f8e4c8d",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "token": "your_jwt_token"
}
```

---

### Trips

All trip routes are protected and require a valid JWT in the `Authorization` header.

#### `POST /trips`

Creates a new trip.

**Request Body:**

```json
{
  "destination": "Paris, France",
  "startDate": "2024-08-15",
  "endDate": "2024-08-22",
  "currency": "EUR"
}
```

#### `GET /trips`

Returns all trips for the authenticated user.

#### `GET /trips/:id`

Returns a single trip by ID.

#### `PUT /trips/:id`

Updates a trip by ID.

#### `DELETE /trips/:id`

Deletes a trip by ID.

---

### Budget

All budget routes are nested under a trip and are protected.

#### `POST /trips/:tripId/budget`

Sets the total budget for a trip.

**Request Body:**

```json
{
  "totalBudget": 1500
}
```

#### `GET /trips/:tripId/budget`

Returns the budget for a trip, including all expenses.

#### `POST /trips/:tripId/budget/expenses`

Adds an expense to a trip's budget.

**Request Body:**

```json
{
  "category": "Food",
  "amount": 50,
  "description": "Dinner at a restaurant"
}
```

---

### Wishlist

All wishlist routes are nested under a trip and are protected.

#### `GET /trips/:tripId/wishlist`

Returns the wishlist for a trip.

#### `POST /trips/:tripId/wishlist`

Adds a new item to the wishlist.

**Request Body:**

```json
{
  "name": "Eiffel Tower ticket",
  "estimatedPrice": 30
}
```

#### `PUT /trips/:tripId/wishlist/items/:itemId`

Updates a wishlist item.

#### `DELETE /trips/:tripId/wishlist/items/:itemId`

Deletes a wishlist item.