# API Reference — IMS Backend

**Base URL:** `http://localhost:3000`

## Conventions

### Authentication
| Type | Required For | Scheme |
|------|-------------|--------|
| **Public** | Health check, auth endpoints (register, login, refresh, forgot/reset password), public ticket creation | — |
| **JWT Bearer** | All other endpoints | `Authorization: Bearer <accessToken>` |

### Roles (RBAC)
| Role | Access |
|------|--------|
| `super-user` | All endpoints including user management |
| `admin` | All endpoints except user management |
| `technician` | Tickets (list, get, take, close, mark pending), Tech Dashboard |
| `user` | Public ticket creation only |

### Pagination
Every list endpoint returns a paginated response shape:
```json
{
  "data": [ ... ],
  "meta": {
    "total": 0,
    "page": 1,
    "limit": 10,
    "totalPages": 0
  }
}
```

### Global Query Parameters (list endpoints)
| Param | Type | Description |
|-------|------|-------------|
| `search` | `string?` | Full-text search |
| `page` | `number?` | Page number (default: 1) |
| `limit` | `number?` | Items per page (default: 10) |
| `includeDeleted` | `boolean?` | Include soft-deleted records |

### Soft Delete
All collections have `deletedAt: Date (nullable)`. Deletes set `deletedAt = new Date()`. Queries filter `deletedAt IS NULL` by default.

---

## Health

### `GET /`
Public health check.

**Response:**
```json
{ "status": "ok" }
```

---

## Auth

Tag: `auth` — Base path: `/auth`

### `POST /auth/register`
Public. Create a new account.

**Body:**
```json
{
  "email": "string (email)",
  "password": "string (min 8 chars)"
}
```

### `POST /auth/login`
Public. Authenticate and receive tokens.

**Body:**
```json
{
  "email": "string (email)",
  "password": "string (min 8 chars)"
}
```

### `POST /auth/refresh`
Public. Obtain a new access token from a refresh token.

**Body:**
```json
{
  "refreshToken": "string"
}
```

### `POST /auth/forgot-password`
Public. Request a password reset email.

**Body:**
```json
{
  "email": "string (email)"
}
```

### `POST /auth/reset-password`
Public. Reset password with token received via email.

**Body:**
```json
{
  "token": "string",
  "newPassword": "string (min 8 chars)"
}
```

### `GET /auth/profile`
🔒 Auth required. Get current user profile.

### `PATCH /auth/profile`
🔒 Auth required. Update current user profile.

**Body** (all optional):
```json
{
  "name": "string",
  "surnames": "string",
  "birthday": "string (ISO date)",
  "gender": "string",
  "profileImage": "string",
  "phone": "string"
}
```

### `PATCH /auth/change-password`
🔒 Auth required. Change current user password.

**Body:**
```json
{
  "currentPassword": "string",
  "newPassword": "string (min 8 chars)"
}
```

### `POST /auth/logout`
🔒 Auth required. Invalidate current refresh tokens.

---

## Users (admin)

Tag: `users` — Base path: `/users`
🔐 Requires role: `super-user`

### `GET /users`
List all users (paginated).

### `POST /users`
Create a new user.

**Body:**
```json
{
  "email": "string (email)",
  "password": "string (min 8 chars)",
  "role": "super-user | admin | technician | user"
}
```

### `GET /users/:id`
Get user by ID.

### `PATCH /users/:id/email`
Update user email.

**Body:**
```json
{
  "email": "string (email)"
}
```

### `PATCH /users/:id/password`
Update user password.

**Body:**
```json
{
  "password": "string (min 8 chars)"
}
```

### `PATCH /users/:id/status`
Update user status. The current (logged-in) user cannot ban themselves.

**Body:**
```json
{
  "status": "active | banned"
}
```

---

## Clients

Tag: `clients` — Base path: `/clients`
🔐 Requires role: `super-user` or `admin`

### `GET /clients`
List clients (paginated).

### `POST /clients`
Create a client.

**Body:**
```json
{
  "name": "string",
  "code": "string",
  "contactEmail": "string (optional)",
  "contactPhone": "string (optional)",
  "address": "string (optional)",
  "notes": "string (optional)",
  "status": "active | inactive (optional)"
}
```

### `GET /clients/:id`
Get client by ID.

### `PATCH /clients/:id`
Update client.

**Body:** Same as create, all optional.

### `DELETE /clients/:id`
Soft-delete client.

---

### Areas (nested under clients)

### `GET /clients/:clientId/areas`
List areas for a client (paginated).

### `POST /clients/:clientId/areas`
Create an area under a client.

**Body:**
```json
{
  "name": "string",
  "code": "string",
  "notes": "string (optional)"
}
```

### `GET /clients/:clientId/areas/:id`
Get area by ID.

### `PATCH /clients/:clientId/areas/:id`
Update area.

**Body:** Same as create, all optional.

### `DELETE /clients/:clientId/areas/:id`
Soft-delete area.

---

## Tickets

Tag: `tickets` — Base path: `/tickets`

### `POST /tickets/public`
Public. Create a ticket without authentication (user-facing).

**Body:**
```json
{
  "inventoryCode": "string",
  "reporterName": "string",
  "reporterContact": "string",
  "problemType": "string",
  "problemDescription": "string",
  "images": ["string (URL)"]  (optional)
}
```

### `POST /tickets`
🔒 Auth required. Create a ticket as an authenticated user.

**Body:**
```json
{
  "productId": "string",
  "problemType": "string",
  "problemDescription": "string",
  "images": ["string (URL)"]  (optional)
}
```

### `GET /tickets`
🔐 Requires role: `admin`, `super-user`, or `technician`. List tickets (paginated).

**Query params (in addition to standard pagination):**
| Param | Type | Description |
|-------|------|-------------|
| `status` | `string?` | Filter by status |
| `technician` | `string?` | Filter by technician ID |
| `dateFrom` | `string?` | Start date (ISO) |
| `dateTo` | `string?` | End date (ISO) |

### `GET /tickets/report`
🔐 Requires role: `admin` or `super-user`. Generate ticket report with same filters.

### `GET /tickets/:id`
🔐 Requires role: `admin`, `super-user`, or `technician`. Get ticket details.

### `PATCH /tickets/:id/take`
🔐 Requires role: `technician`. Assign ticket to self.

### `PATCH /tickets/:id/close`
🔐 Requires role: `technician`. Close a ticket.

**Body:**
```json
{
  "failureCause": "string",
  "negligence": boolean (optional),
  "replacedParts": ["string"] (optional),
  "evidenceImage": "string (URL)" (optional)
}
```

### `PATCH /tickets/:id/pending`
🔐 Requires role: `technician`. Mark ticket as pending (needs parts/approval).

### `PATCH /tickets/:id/cancel`
🔐 Requires role: `admin` or `super-user`. Cancel a ticket.

---

## Ticket Problem Types

Tag: `ticket-problem-types` — Base path: `/ticket-problem-types`
🔒 Auth required.

### `GET /ticket-problem-types`
List problem types. Optionally filter by product type.

**Query params:**
| Param | Type | Description |
|-------|------|-------------|
| `productTypeId` | `string?` | Filter by product type |

### `POST /ticket-problem-types`
Create a problem type.

**Body:**
```json
{
  "productTypeId": "string",
  "name": "string",
  "description": "string (optional)"
}
```

### `PATCH /ticket-problem-types/:id`
Update a problem type.

**Body:**
```json
{
  "name": "string (optional)",
  "description": "string (optional)"
}
```

### `DELETE /ticket-problem-types/:id`
Delete a problem type.

---

## Files

Tag: `files` — Base path: `/files`
🔒 Auth required.

### `POST /files/upload`
Upload a file. Uses `multipart/form-data`.

**Body:** Form-data with field `file` (type: file).

**Response:**
```json
{
  "data": { "url": "string", "publicId": "string", ... },
  "message": "Archivo subido exitosamente"
}
```

---

## Dashboard

Tag: `dashboard` — Base path: `/dashboard`
🔐 Requires role: `super-user` or `admin`

### `GET /dashboard/metrics`
🔐 Requires role: `super-user` or `admin`. Get admin dashboard metrics (counts, stats).

### `GET /dashboard/tech-metrics`
🔐 Requires role: `technician`. Get technician dashboard metrics (ticket counts by status, recent tickets).

**Response:**
```json
{
  "data": {
    "abierto": 0,
    "enProceso": 0,
    "pendiente": 0,
    "cerrado": 0,
    "total": 0,
    "assignedTickets": [
      {
        "_id": "string",
        "folio": "string",
        "status": "string",
        "problemType": "string",
        "createdAt": "string",
        "product": { "inventoryCode": "string" } | null
      }
    ]
  },
  "message": "Operación exitosa"
}
```

---

## Brands

Tag: `brands` — Base path: `/brands`
🔒 Auth required.

### `GET /brands`
List brands (paginated).

### `POST /brands`
Create a brand.

**Body:**
```json
{
  "name": "string",
  "code": "string"
}
```

### `GET /brands/:id`
Get brand by ID.

### `PATCH /brands/:id`
Update brand.

**Body:**
```json
{
  "name": "string (optional)",
  "code": "string (optional)"
}
```

### `DELETE /brands/:id`
Soft-delete brand.

---

## Models

Tag: `models` — Base path: `/models`
🔒 Auth required.

### `GET /models`
List models (paginated).

**Additional query params:**
| Param | Type | Description |
|-------|------|-------------|
| `brandId` | `string?` | Filter by brand |

### `POST /models`
Create a model.

**Body:**
```json
{
  "brandId": "string",
  "name": "string",
  "code": "string"
}
```

### `GET /models/:id`
Get model by ID.

### `PATCH /models/:id`
Update model.

**Body:**
```json
{
  "brandId": "string (optional)",
  "name": "string (optional)",
  "code": "string (optional)"
}
```

### `DELETE /models/:id`
Soft-delete model.

---

## Attributes

Tag: `attributes` — Base path: `/attributes`
🔒 Auth required.

### `GET /attributes`
List attributes (paginated).

### `POST /attributes`
Create an attribute.

**Body:**
```json
{
  "name": "string",
  "code": "string",
  "valueType": "string | number | boolean | date | enum | json | ip | mac"
}
```

### `GET /attributes/:id`
Get attribute by ID.

### `PATCH /attributes/:id`
Update attribute.

**Body:**
```json
{
  "name": "string (optional)",
  "code": "string (optional)",
  "valueType": "string | number | ... (optional)"
}
```

### `DELETE /attributes/:id`
Soft-delete attribute.

---

### Attribute Options (nested under attributes)

### `GET /attributes/:attributeId/options`
List options for an ENUM attribute.

### `POST /attributes/:attributeId/options`
Create an option.

**Body:**
```json
{
  "label": "string",
  "value": "string"
}
```

### `PATCH /attributes/:attributeId/options/:id`
Update an option.

**Body:**
```json
{
  "label": "string (optional)",
  "value": "string (optional)"
}
```

### `DELETE /attributes/:attributeId/options/:id`
Delete an option.

---

## Product Types

Tag: `product-types` — Base path: `/product-types`
🔒 Auth required.

### `GET /product-types`
List product types (paginated).

### `POST /product-types`
Create a product type.

**Body:**
```json
{
  "name": "string",
  "code": "string"
}
```

### `GET /product-types/:id`
Get product type by ID.

### `PATCH /product-types/:id`
Update product type.

**Body:**
```json
{
  "name": "string (optional)",
  "code": "string (optional)"
}
```

### `DELETE /product-types/:id`
Soft-delete product type.

---

## Products

Tag: `products` — Base path: `/products`
🔒 Auth required.

### `GET /products`
List products (paginated).

**Additional query params:**
| Param | Type | Description |
|-------|------|-------------|
| `status` | `string?` | Filter by status |
| `productTypeId` | `string?` | Filter by product type |
| `modelId` | `string?` | Filter by model |

### `POST /products`
Create a product.

**Body:**
```json
{
  "inventoryCode": "string",
  "serialNumber": "string (optional)",
  "productTypeId": "string",
  "modelId": "string",
  "purchaseDate": "string (ISO date, optional)",
  "status": "active | in_repair | retired | lost | disposed (optional)",
  "assignedTo": "string (optional)",
  "notes": "string (optional)"
}
```

### `GET /products/lookup/:inventoryCode`
Lookup a product by its inventory code (public-ish lookup).

### `GET /products/:id`
Get product by ID.

### `PATCH /products/:id`
Update product.

**Body:** Same as create, all optional.

### `DELETE /products/:id`
Soft-delete product.

### `POST /products/:id/parts`
Assign a part to a product.

**Body:**
```json
{
  "partId": "string",
  "folio": "string (optional)",
  "status": "assigned | in_stock | consumed | lost | damaged | retired (optional)",
  "notes": "string (optional)"
}
```

### `PATCH /products/:id/attributes`
Update a dynamic attribute value on a product.

**Body:**
```json
{
  "attributeId": "string",
  "valueString": "string (optional)",
  "valueNumber": "number (optional)",
  "valueBoolean": "boolean (optional)",
  "valueDate": "string (ISO, optional)",
  "valueJson": "any (optional)",
  "valueEnum": "string (optional)"
}
```

Only the field matching the attribute's `valueType` should be populated.

---

## Parts

Tag: `parts` — Base path: `/parts`
🔒 Auth required.

### `GET /parts`
List parts (paginated).

**Additional query params:**
| Param | Type | Description |
|-------|------|-------------|
| `partType` | `string?` | Filter by type |

### `POST /parts`
Create a part.

**Body:**
```json
{
  "name": "string",
  "code": "string",
  "partType": "accessory | spare_part | consumable"
}
```

### `GET /parts/:id`
Get part by ID.

### `PATCH /parts/:id`
Update part.

**Body:**
```json
{
  "name": "string (optional)",
  "code": "string (optional)",
  "partType": "accessory | spare_part | consumable (optional)"
}
```

### `DELETE /parts/:id`
Soft-delete part.

---

## Summary

| Module | Endpoints | Auth |
|--------|-----------|------|
| Health | 1 | Public |
| Auth | 8 | 5 public, 3 JWT |
| Users | 6 | super-user |
| Clients | 10 | super-user/admin |
| Tickets | 8 | varies |
| Ticket Problem Types | 4 | JWT |
| Files | 1 | JWT |
| Dashboard | 2 | super-user/admin + technician |
| Brands | 5 | JWT |
| Models | 5 | JWT |
| Attributes | 8 | JWT |
| Product Types | 5 | JWT |
| Products | 9 | JWT |
| Parts | 5 | JWT |
| **Total** | **76** | |
