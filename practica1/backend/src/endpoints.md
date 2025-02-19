# API Endpoints: Flights & Gates

## ✈️ Flights

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET    | `/flights` | Get all flights |
| GET    | `/flights/:id` | Get flight by ID |
| POST   | `/flights` | Create a new flight |
| PATCH  | `/flights/:id` | Update a flight |
| DELETE | `/flights/:id` | Delete a flight |
| PATCH  | `/flights/:flightId/assign-gate/:gateId` | Assign a gate to a flight |

### Example Request (Create a Flight)
```json
{
  "origin": "Los Angeles",
  "destination": "Tokyo",
  "departure": "2025-07-01T12:00:00.000Z",
  "arrival": "2025-07-01T20:00:00.000Z",
  "price": 700.00,
  "status": "SCHEDULED",
  "maxPassengers": 250,
  "soldTickets": 100
}
```

### Example Request (Assign a Gate to a Flight)
```sh
curl -X PATCH http://localhost:3000/flights/1/assign-gate/2
```
**Response:**
```json
{
  "id": 1,
  "origin": "Los Angeles",
  "destination": "Tokyo",
  "departure": "2025-07-01T12:00:00.000Z",
  "arrival": "2025-07-01T20:00:00.000Z",
  "price": 700.00,
  "status": "SCHEDULED",
  "maxPassengers": 250,
  "soldTickets": 100,
  "GateId": 2
}
```

---

## Gates

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET    | `/gates` | Get all gates |
| GET    | `/gates/:id` | Get gate by ID |
| POST   | `/gates` | Create a new gate |
| PATCH  | `/gates/:id` | Update a gate |
| DELETE | `/gates/:id` | Delete a gate |

### Example Request (Create a Gate)
```json
{
  "name": "Gate A1"
}
```