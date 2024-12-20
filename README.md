# Uber  

This is the backend for the Uber Clone application. It provides APIs for user and captain registration, login, ride management, and more.

## Table of Contents

- [Project Description](#project-description)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Documentation](#api-documentation)
  - [User Endpoints](#user-endpoints)
  - [Captain Endpoints](#captain-endpoints)
  - [Map Endpoints](#map-endpoints)
  - [Ride Endpoints](#ride-endpoints)
- [License](#license)

## Project Description

The Uber Clone backend is built using Node.js, Express, and MongoDB. It provides RESTful APIs for user and captain registration, login, ride management, and more. The backend also uses Socket.IO for real-time communication between users and captains.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/BhautikVekariya21/uber.git
   cd uber-clone-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   MONGO_URI=your_mongo_uri
   JWT_SECRET=your_jwt_secret
   PORT=3001
   VITE_BASE_URL=http://localhost:3001/api
   ```

4. Start the server:

   ```bash
   npm start
   ```

   The server will start on [http://localhost:3001](http://localhost:3001).

## API Documentation

### User Endpoints

#### `/users/register`

- **Description:** Registers a new user by creating a user account with the provided information.
- **HTTP Method:** POST
- **Request Body:**
  ```json
  {
    "fullname": {
      "firstname": "string (required, min 3 characters)",
      "lastname": "string (optional, min 3 characters)"
    },
    "email": "string (required, valid email)",
    "password": "string (required, min 6 characters)"
  }
  ```
- **Example Response:**
  ```json
  {
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "token": "JWT Token"
    }
  }
  ```

#### `/users/login`

- **Description:** Authenticates a user using their email and password, returning a JWT token upon successful login.
- **HTTP Method:** POST
- **Request Body:**
  ```json
  {
    "email": "string (required, valid email)",
    "password": "string (required, min 6 characters)"
  }
  ```
- **Example Response:**
  ```json
  {
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "token": "JWT Token"
    }
  }
  ```

#### `/users/profile`

- **Description:** Retrieves the profile information of the currently authenticated user.
- **HTTP Method:** GET
- **Authentication:** Requires a valid JWT token in the Authorization header or cookie.
- **Example Response:**
  ```json
  {
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### `/users/logout`

- **Description:** Logs out the current user and blacklists the token provided in the cookie or headers.
- **HTTP Method:** GET
- **Authentication:** Requires a valid JWT token in the Authorization header or cookie.
- **Example Response:**
  ```json
  {
    "message": "Logout successfully."
  }
  ```

### Captain Endpoints

#### `/captains/register`

- **Description:** Registers a new captain by creating a captain account with the provided information.
- **HTTP Method:** POST
- **Request Body:**
  ```json
  {
    "fullname": {
      "firstname": "string (required, min 3 characters)",
      "lastname": "string (optional, min 3 characters)"
    },
    "email": "string (required, valid email)",
    "password": "string (required, min 6 characters)",
    "vehicle": {
      "color": "string (required, min 3 characters)",
      "plate": "string (required, min 3 characters)",
      "capacity": "number (required, min 1)",
      "vehicleType": "string (required, must be 'car', 'motorcycle', or 'auto')"
    }
  }
  ```
- **Example Response:**
  ```json
  {
    "captain": {
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "token": "JWT Token"
    }
  }
  ```

#### `/captains/login`

- **Description:** Authenticates a captain using their email and password, returning a JWT token upon successful login.
- **HTTP Method:** POST
- **Request Body:**
  ```json
  {
    "email": "string (required, valid email)",
    "password": "string (required, min 6 characters)"
  }
  ```
- **Example Response:**
  ```json
  {
    "captain": {
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "token": "JWT Token"
    }
  }
  ```

#### `/captains/vehicle`

- **Description:** Updates or retrieves the vehicle information for the authenticated captain.
- **HTTP Method:** GET/PUT
- **Authentication:** Requires a valid JWT token in the Authorization header or cookie.
- **Example Response:**
  ```json
  {
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
  ```

### Map Endpoints

#### `/maps/get-coordinates`

- **Description:** Retrieves the coordinates (latitude and longitude) for a given address.
- **HTTP Method:** GET
- **Request Parameters:**
  ```
  address (string, required): The address for which to retrieve coordinates.
  ```
- **Example Response:**
  ```json
  {
    "lat": 37.4224764,
    "lng": -122.0842499
  }
  ```

### Ride Endpoints

#### `/rides/request`

- **Description:** Allows a user to request a ride by providing pickup and drop-off locations.
- **HTTP Method:** POST
- **Request Body:**
  ```json
  {
    "pickup": {
      "lat": "number (required)",
      "lng": "number (required)"
    },
    "dropoff": {
      "lat": "number (required)",
      "lng": "number (required)"
    },
    "userId": "string (required)"
  }
  ```
- **Example Response:**
  ```json
  {
    "ride": {
      "id": "string",
      "pickup": {
        "lat": 37.4224764,
        "lng": -122.0842499
      },
      "dropoff": {
        "lat": 37.4234782,
        "lng": -122.0838499
      },
      "status": "pending"
    }
  }
  ```

#### `/rides/status`

- **Description:** Retrieves the current status of a ride by its ID.
- **HTTP Method:** GET
- **Request Parameters:**
  ```
  rideId (string, required): The ID of the ride to retrieve the status for.
  ```
- **Example Response:**
  ```json
  {
    "ride": {
      "id": "string",
      "status": "ongoing"
    }
  }
  ```

#### `/rides/complete`

- **Description:** Marks a ride as completed.
- **HTTP Method:** POST
- **Request Body:**
  ```json
  {
    "rideId": "string (required)",
    "captainId": "string (required)"
  }
  ```
- **Example Response:**
  ```json
  {
    "message": "Ride completed successfully."
  }
  ```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

