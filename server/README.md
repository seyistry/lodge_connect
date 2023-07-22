# Lodge Connect - Server
This is the server-side of the Lodge Connect application. It is responsible for handling API requests, managing data, and integrating with external services.

## Table of Contents
- Getting Started
	* Prerequisites
	* Installation
	* Environment Variables
- Usage
- API Endpoints
- Authentication
- Database
- Error Handling
- Testing
- Contributing
- License

## Getting Started
### Prerequisites
Before running the server, ensure you have the following software installed:
- Node.js
- npm
- MongoDB
### Installation
1. Clone this repository:
```
git clone <repository_url>
cd lodge_connect/server
```
2. Install dependencies:
`npm install`
### Environment Variables
`cp .env.example .env`

### Usage
To start the server, run the following command:
`npm start`

The server will run on port 4000 by default. You can access the API at `http://localhost:4000/lodge-connect`

### API Endpoints
Below are the available API endpoints:
- `POST /lodge-connect/user/register`: Register a new user
- `POST /lodge-connect/user/login`: User login
- `GET /lodge-connect/apartment`: Get all apartments with optional filters
- `GET /lodge-connect/apartment/:id`: Get a single apartment by ID
- `POST /lodge-connect/apartment`: Create a new apartment
- `PUT /lodge-connect/apartment/:id`: Update an apartment by ID
- `DELETE /lodge-connect/apartment/:id`: Delete an apartment by ID
- `POST /lodge-connect/favorite`: Add an apartment to favorites
- `DELETE /lodge-connect/favorite/:id`: Remove an apartment from favorites
- `POST /lodge-connect/apartment/:apartmentId/reviews`: Add a review for an apartment

For more detailed information on each endpoint, see the [API Documentation](https://documenter.getpostman.com/view/26618323/2s946bAuLs).

### Authentication
To access protected endpoints, include the JWT token in the request's `Authorization` header with the format: `Bearer <token>`. The token is obtained upon successful user login or registration.

### Database
This server uses MongoDB as the database. Make sure you have MongoDB installed and running on your machine or provide the connection URI in the .env file.

### Error Handling
Errors are handled consistently throughout the server using a custom error middleware. Error responses include the status code and a message indicating the reason for the error.

### Collaboration
- [Abiodun Shittu](https://github.com/Abiodun-Shittu)
- [Aniebiet Afia](https://github.com/AfiaAniebiet)
