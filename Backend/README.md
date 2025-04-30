# API Documentation

## Endpoint: POST /users/register

## http method 
post

### Description

This endpoint is used to register a new user. It validates the input data, hashes the password, and creates a new user in the database. Upon successful registration, it returns a token and the user details.

### Request Body

The request body should be a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min 3 characters, required)",
    "lastname": "string (min 3 characters, optional)"
  },
  "email": "string (valid email format, required)",
  "password": "string (min 6 characters, required)"
}
```

### Validation Rules

- `fullname.firstname`: Must be at least 3 characters long and is required.
- `fullname.lastname`: Must be at least 3 characters long and is optional.
- `email`: Must be a valid email address and is required.
- `password`: Must be at least 6 characters long and is required.

### Response

#### Success Response

- **Status Code**: `201 Created`
- **Body**:

```json
{
  "tokan": "string",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
  }
}
```

#### Error Response

- **Status Code**: `400 Bad Request`
- **Body**:

```json
{
  "erros": [
    {
      "msg": "string",
      "param": "string",
      "location": "string"
    }
  ]
}
```

### Example Request

```bash
POST /users/register HTTP/1.1
Content-Type: application/json

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Example Success Response

```json
{
  "tokan": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "6449f0f2e4b0c8a1b2c3d4e5",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Example Error Response

```json
{
  "erros": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```
## Endpoint: POST /users/login

### http METHOD

`Post`

### Description
This endpoint is used to authenticate a user. It validates the input data, checks the credentials, and returns a token along with the user details upon successful login.

### Request Body
The request body should be a JSON object with the following structure:

```json
{
  "email": "string (valid email format, required)",
  "password": "string (min 6 characters, required)"
}
```

### Validation Rules
- `email`: Must be a valid email address and is required.
- `password`: Must be at least 6 characters long and is required.

### Response
#### Success Response
- **Status Code**: `201 Created`
- **Body**:

```json
{
  "token": "string",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
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
  "message": "Invalid Email Password"
}
```
## Endpoint: GET /users/profile

### Description
Retrieve the profile of the currently authenticated user. Requires authentication.

### Request Headers
- `Authorization`: Bearer token (required)

### Response

#### Success Response
- **Status Code**: `200 OK`
- **Body**:

```json
{
  "_id": "string",
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string"
}
```

#### Error Response
- **Status Code**: `401 Unauthorized`
- **Body**:

```json
{
  "message": "Authentication required"
}
```

### Example Request

```bash
GET /users/profile HTTP/1.1
Authorization: Bearer <token>
```

### Example Success Response

```json
{
  "_id": "6449f0f2e4b0c8a1b2c3d4e5",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

---

## Endpoint: GET /users/logout

### Description
Log out the currently authenticated user. Clears the authentication token and blacklists it.

### Request Headers
- `Authorization`: Bearer token (optional, if not using cookies)

### Response

#### Success Response
- **Status Code**: `200 OK`
- **Body**:

```json
{
  "message": "Logged out"
}
```

#### Error Response
- **Status Code**: `401 Unauthorized`
- **Body**:

```json
{
  "message": "Authentication required"
}
```

### Example Request

```bash
GET /users/logout HTTP/1.1
Authorization: Bearer <token>
```

### Example Success Response

```json
{
  "message": "Logged out"
}
```
