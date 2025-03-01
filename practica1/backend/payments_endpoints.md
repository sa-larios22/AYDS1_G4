# API Documentation: Payments

## Base URL
```
localhost:3000/api/payments
```

---

## Payments Endpoints

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET    | `/payments` | Get all payments |
| GET    | `/payments/:id` | Get a payment by ID |
| POST   | `/payments` | Create a new payment |
| PATCH  | `/payments/:id` | Update a payment |
| DELETE | `/payments/:id` | Delete a payment |

### POST: Create a Payment
```sh
curl -X POST http://localhost:3000/api/payments \
     -H "Content-Type: application/json" \
     -d '{ 
           "amount": 100.0, 
           "date": "2025-02-25T12:00:00.000Z", 
           "type": "CREDIT_CARD", 
           "orderId": 1 
         }'
```
Note: The `type` field must be one of: `CASH`, `CREDIT_CARD`, `DEBIT_CARD`.

**Response:**
```json
{
  "id": 1,
  "amount": 100.0,
  "date": "2025-02-25T12:00:00.000Z",
  "type": "CREDIT_CARD",
  "orderId": 1
}
```

---

### Example Request: Get All Payments
```sh
curl -X GET http://localhost:3000/payments
```

---

### Example Request: Get a Payment by ID
```sh
curl -X GET http://localhost:3000/payments/1
```

---

### Example Request: Update a Payment
```sh
curl -X PATCH http://localhost:3000/payments/1 \
     -H "Content-Type: application/json" \
     -d '{ "amount": 150.0 }'
```

---

### Example Request: Delete a Payment
```sh
curl -X DELETE http://localhost:3000/payments/1
```

---