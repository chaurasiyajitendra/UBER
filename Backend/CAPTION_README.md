## Endpoint: POST /captain/register

### HTTP Method
`POST`

### Description
This endpoint is used to register a new captain. It validates the input data, hashes the password, and creates a new captain in the database. Upon successful registration, it returns a token and the captain details.

### Request Body
The request body should be a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min 3 characters, required)",
    "lastname": "string (min 3 characters, optional)"
  },
  "email": "string (valid email format, required)",
  "password": "string (min 6 characters, required)",
  "vehicle": {
    "color": "string (min 3 characters, required)",
    "plate": "string (min 10 characters, required)",
    "capcity": "integer (min 1, required)",
    "vehicleType": "string (one of ['car', 'motorcycle', 'auto'], required)"
  }
}
```

### Validation Rules
- `fullname.firstname`: Must be at least 3 characters long and is required.
- `fullname.lastname`: Must be at least 3 characters long and is optional.
- `email`: Must be a valid email address and is required.
- `password`: Must be at least 6 characters long and is required.
- `vehicle.color`: Must be at least 3 characters long and is required.
- `vehicle.plate`: Must be at least 10 characters long and is required.
- `vehicle.capcity`: Must be an integer with a minimum value of 1 and is required.
- `vehicle.vehicleType`: Must be one of `['car', 'motorcycle', 'auto']` and is required.

### Response

#### Success Response
- **Status Code**: `201 Created`
- **Body**:

```json
{
  "token": "string",
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capcity": "integer",
      "vehicleType": "string"
    }
  }
}
```

#### Error Response
- **Status Code**: `400 Bad Request`
- **Body**:

```json
{
  "error": [
    {
      "msg": "string",
      "param": "string",
      "location": "string"
    }
  ]
}
```

- **Status Code**: `401 Unauthorized`
- **Body**:

```json
{
  "message": "Caption already exist"
}
```

### Example Request

```bash
POST /captain/register HTTP/1.1
Content-Type: application/json

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "AB12345678",
    "capcity": 4,
    "vehicleType": "car"
  }
}
```

### Example Success Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "6449f0f2e4b0c8a1b2c3d4e5",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "AB12345678",
      "capcity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Example Error Response

```json
{
  "error": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}

{
  "message": "Caption already exist"
}
```