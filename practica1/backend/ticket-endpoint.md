# Auth

## POST Create Ticker from Personal

```bash
localhost:3000/api/ticker/create
```

### Body

```json
{
    "type": "ECONOMY",
    "price": 50.00,
    "totalSeats": 100,
    "flightId": 1,
    "userId": 2,
}
```

## POST shop from User

```bash
localhost:3000/api/auth/login
```

### Body

```json
{
    "userId": 3,
    "orderDetails": [
        {
            "quantity": 2,
            "price": 50.00,
            "ticketId": 1
        },
        {
            "quantity": 1,
            "price": 75.00,
            "ticketId": 2
        }
    ]
}
```

## Get tickets from PERSONAL/ADMIN

```bash
localhost:3000/api/ticket
```

### Body

```json
{
    "limit": 5,
    "offset": 0
}
```


## Get ticket from PERSONAL/ADMIN

```bash
localhost:3000/api/ticket/${id}
```

### PATCH Update ticket

```bash
localhost:3000/api/ticket/${id}
```

### Body

```json
{
}
```

### PATCH Delete ticket

```bash
localhost:3000/api/ticket/delete/${id}
```
