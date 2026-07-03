# Travel Planner API

A RESTful Travel Planner API built with Node.js, Express, and JWT authentication. This application allows users to create and manage trips, destinations, and activities while providing secure authentication and role-based authorization.

## Live API Documentation

Swagger Documentation:

https://travel-planner-api-service.onrender.com/api-docs/#/

## Features

- User Registration and Login
- JWT Authentication
- Role-Based Access Control (User & Admin)
- Create, Read, Update, and Delete Trips
- Create, Read, Update, and Delete Destinations
- Create, Read, Update, and Delete Activities
- Input Validation and Error Handling
- Swagger API Documentation
- Protected Routes
- Admin Access Management

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Swagger/OpenAPI
- Render

## API Resources

### Authentication

| Method | Endpoint | Description |
|----------|------------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Trips

| Method | Endpoint |
|----------|------------|
| GET | `/trips` |
| POST | `/trips` |
| GET | `/trips/{id}` |
| PUT | `/trips/{id}` |
| DELETE | `/trips/{id}` |

### Destinations

| Method | Endpoint |
|----------|------------|
| GET | `/destinations` |
| POST | `/destinations` |
| GET | `/destinations/{id}` |
| PUT | `/destinations/{id}` |
| DELETE | `/destinations/{id}` |

### Activities

| Method | Endpoint |
|----------|------------|
| GET | `/activities` |
| POST | `/activities` |
| GET | `/activities/{id}` |
| PUT | `/activities/{id}` |
| DELETE | `/activities/{id}` |

## Authentication

Most endpoints require authentication using a JWT token.

### Steps

1. Register a new account or login.
2. Copy the JWT token returned from the login endpoint.
3. Click **Authorize** in Swagger.
4. Paste the token.
5. Access protected endpoints.

### Authorization Header

```http
Authorization: Bearer <your-jwt-token>
```

## Test Accounts

### Regular User

```json
{
  "email": "ruth@test.com",
  "password": "password123"
}
```

### Regular User 2

```json
{
  "email": "bob@test.com",
  "password": "password123"
}
```

### Admin User

```json
{
  "email": "admin@test.com",
  "password": "admin123"
}
```

## Example Requests

### Create a Trip

```json
{
  "title": "Europe Trip",
  "startDate": "2026-05-18T00:00:00.000Z",
  "endDate": "2026-06-01T00:00:00.000Z",
  "budget": 1500
}
```

### Create a Destination

```json
{
  "city": "Mallorca",
  "country": "Spain",
  "arrivalDate": "2026-05-22T00:00:00.000Z",
  "departureDate": "2026-05-25T00:00:00.000Z",
  "tripId": 1
}
```

### Create an Activity

```json
{
  "name": "Eiffel Tower Restaurant",
  "description": "Eat at the Eiffel Tower Restaurant",
  "date": "2026-05-19T00:00:00.000Z",
  "cost": 50,
  "destinationId": 1
}
```

## Error Handling

The API returns standard HTTP status codes:

| Status Code | Meaning |
|------------|----------|
| 200 | Success |
| 201 | Resource Created |
| 204 | Resource Deleted |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource Not Found |
| 409 | Conflict |

## Testing

The API can be tested directly through Swagger UI:

https://travel-planner-api-service.onrender.com/api-docs/#/

The documentation includes:
- Request examples
- Response schemas
- Authentication testing
- Endpoint validation
- Error response examples

## Deployment

The application is deployed on Render and can be accessed through the Swagger documentation link above.

## Author

**Ruth Teshome**

Built as a full-stack backend API project demonstrating authentication, authorization, RESTful design principles, database relationships, and API documentation using Swagger.
