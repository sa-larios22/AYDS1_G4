# Auth

## POST Create User
```
localhost:3000/api/auth/register
```

#### Body
```json
{
    "name": "Rosemarie Wisozk",
    "lastname": "Shanahan",
    "username": "Keeley.Lindgren6",
    "email": "Richmond31@hotmail.com",
    "password": "4&D1_t3sT-P455w0rd",
    "role": "ADMIN"
}
```


## POST Login
```
localhost:3000/api/auth/login
```

#### Body
```json
{
    "email": "Eleanore35@yahoo.com",
    "password": "4&D1_t3sT-P455w0rd"
}
```

## GET Get User
```
localhost:3000/api/auth/user/${id}
```

## GET Get Users
```
localhost:3000/api/auth
```

#### Body
```json
{
    "limit": 5,
    "offset": 0
}
```

### GET Check Status
```
localhost:3000/api/auth/check-status
```
Authorization: Bearer Token

### PATCH Update User
```
localhost:3000/api/auth/${id}
```

#### Body
```json
{
    "name": "Kristy Labadie"
}
```

### PATCH Update Password
```
localhost:3000/api/auth/password/${id}
```

#### Body
```json
{
    "password": "4&D1_t3sT-P455w0rd"
}
```

### PATCH Delete User
```
localhost:3000/api/auth/delete/${id}
```