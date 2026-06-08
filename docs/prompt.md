# Prompt: Generar Backend API — IMS (Inventory & Management System)

## Rol

Eres un **senior backend engineer especializado en NestJS**. Debes generar completo el backend de IMS, una API REST que será consumida exclusivamente por un dashboard web (Next.js) y una app mobile (React Native). No existe UI que renderizar — solo JSON.

Trabajas dentro de un monorepo en `app/backend/`. El proyecto se llama `ims-backend`.

## Stack obligatorio

| Categoría | Tecnología |
|-----------|-----------|
| Framework | NestJS (TypeScript, solo `@nestjs/core`) |
| Package manager | **yarn** |
| Base de datos | MongoDB |
| ODM | Mongoose (`@nestjs/mongoose`, `mongoose`) |
| Autenticación | JWT (`@nestjs/jwt`, `@nestjs/passport`, `passport`, `passport-jwt`) |
| Validaciones | **class-validator** + **class-transformer** (usar `ValidationPipe` global) |
| Archivos | `@nestjs/platform-express` (Multer) + Cloudinary (`cloudinary`, `multer-storage-cloudinary`) |
| Documentación API | `@nestjs/swagger` + `swagger-ui-express` |
| Rate limiting | `@nestjs/throttler` |
| Tests | Jest + Supertest (e2e) |
| Encriptación | `bcrypt` |
| UUID | `uuid` |

## Versiones requeridas

- Node.js **20 LTS**
- NestJS **10.x**
- TypeScript **5.x**
- Modo de módulos: **CommonJS** (no ESM)

## Setup del proyecto

```bash
# 1. Parado en /app/backend
yarn global add @nestjs/cli
nest new ims-backend --package-manager yarn --skip-git --strict
# Responder que sí a todas las preguntas por defecto

# 2. Entrar al proyecto y agregar dependencias
cd ims-backend
yarn add @nestjs/mongoose mongoose
yarn add @nestjs/jwt @nestjs/passport passport passport-jwt
yarn add @nestjs/swagger swagger-ui-express
yarn add @nestjs/throttler
yarn add class-validator class-transformer
yarn add bcrypt
yarn add uuid
yarn add @nestjs/config
yarn add cloudinary multer-storage-cloudinary
yarn add -D @types/bcrypt @types/passport-jwt @types/multer @types/uuid
yarn add -D @nestjs/testing supertest
```

> **IMPORTANTE:** El proyecto NestJS se crea dentro de `app/backend/ims-backend/`. Todo el código fuente va dentro de esa carpeta.

## Variables de entorno

Crear archivo `.env` en la raíz del proyecto Nest (`app/backend/ims-backend/.env`):

```env
# Server
PORT=3000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/ims

# JWT
JWT_ACCESS_SECRET=supersecret_access_key_change_in_production
JWT_REFRESH_SECRET=supersecret_refresh_key_change_in_production
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Throttler
THROTTLE_TTL=60
THROTTLE_LIMIT=10

# CORS
CORS_ORIGIN=http://localhost:3001,http://localhost:3002

# Swagger
SWAGGER_USER=admin
SWAGGER_PASSWORD=admin123

# Seed (usuarios iniciales)
SEED_SUPER_EMAIL=super@ims.local
SEED_SUPER_PASSWORD=ChangeMe123!
SEED_ADMIN_EMAIL=admin@ims.local
SEED_ADMIN_PASSWORD=ChangeMe123!
SEED_TECH_EMAIL=tech@ims.local
SEED_TECH_PASSWORD=ChangeMe123!
SEED_USER_EMAIL=user@ims.local
SEED_USER_PASSWORD=ChangeMe123!
```

Usar `@nestjs/config` con `ConfigModule.forRoot({ isGlobal: true })` en `AppModule`.

## Estructura de carpetas

```
src/
├── common/
│   ├── decorators/
│   │   ├── public.decorator.ts          # SkipAuth
│   │   ├── current-user.decorator.ts    # Extrae usuario del request
│   │   └── roles.decorator.ts           # @Roles('super-user', 'admin')
│   ├── filters/
│   │   └── http-exception.filter.ts     # Formato de error unificado
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── roles.guard.ts
│   ├── interceptors/
│   │   ├── transform.interceptor.ts     # Envuelve { data, message }
│   │   └── soft-delete.interceptor.ts   # Filtra deletedAt por defecto
│   ├── interfaces/
│   │   └── pagination.interface.ts      # PaginationMeta, PaginatedResult<T>
│   ├── pipes/
│   │   └── parse-object-id.pipe.ts
│   └── schemas/
│       └── base.schema.ts               # createdAt, updatedAt, deletedAt
├── config/
│   └── swagger.config.ts
├── modules/
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── schemas/
│   │   │   ├── user.schema.ts
│   │   │   ├── person.schema.ts
│   │   │   └── refresh-token.schema.ts
│   │   ├── dto/
│   │   │   ├── register.dto.ts
│   │   │   ├── login.dto.ts
│   │   │   ├── forgot-password.dto.ts
│   │   │   ├── reset-password.dto.ts
│   │   │   ├── update-profile.dto.ts
│   │   │   └── change-password.dto.ts
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts
│   │   └── interfaces/
│   │       └── jwt-payload.interface.ts
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── dto/
│   │       ├── create-user.dto.ts
│   │       ├── update-email.dto.ts
│   │       ├── update-password.dto.ts
│   │       └── update-status.dto.ts
│   ├── clients/
│   │   ├── clients.module.ts
│   │   ├── clients.controller.ts
│   │   ├── clients.service.ts
│   │   ├── schemas/
│   │   │   ├── client.schema.ts
│   │   │   └── area.schema.ts
│   │   └── dto/
│   │       ├── create-client.dto.ts
│   │       ├── update-client.dto.ts
│   │       ├── create-area.dto.ts
│   │       └── update-area.dto.ts
│   ├── inventory/
│   │   ├── inventory.module.ts
│   │   ├── controllers/
│   │   │   ├── brands.controller.ts
│   │   │   ├── models.controller.ts
│   │   │   ├── product-types.controller.ts
│   │   │   ├── products.controller.ts
│   │   │   ├── attributes.controller.ts
│   │   │   ├── attribute-options.controller.ts
│   │   │   └── parts.controller.ts
│   │   ├── services/
│   │   │   ├── brands.service.ts
│   │   │   ├── models.service.ts
│   │   │   ├── product-types.service.ts
│   │   │   ├── products.service.ts
│   │   │   ├── attributes.service.ts
│   │   │   ├── attribute-options.service.ts
│   │   │   └── parts.service.ts
│   │   ├── schemas/
│   │   │   ├── brand.schema.ts
│   │   │   ├── model.schema.ts
│   │   │   ├── product-type.schema.ts
│   │   │   ├── product.schema.ts
│   │   │   ├── attribute.schema.ts
│   │   │   ├── attribute-option.schema.ts
│   │   │   ├── product-type-attribute.schema.ts
│   │   │   ├── product-attribute-value.schema.ts
│   │   │   ├── part.schema.ts
│   │   │   └── product-part.schema.ts
│   │   └── dto/
│   │       ├── create-brand.dto.ts
│   │       ├── update-brand.dto.ts
│   │       ├── create-model.dto.ts
│   │       ├── update-model.dto.ts
│   │       ├── create-product-type.dto.ts
│   │       ├── update-product-type.dto.ts
│   │       ├── create-product.dto.ts
│   │       ├── update-product.dto.ts
│   │       ├── create-attribute.dto.ts
│   │       ├── update-attribute.dto.ts
│   │       ├── create-attribute-option.dto.ts
│   │       ├── create-part.dto.ts
│   │       ├── update-part.dto.ts
│   │       ├── assign-part.dto.ts
│   │       └── update-attribute-value.dto.ts
│   └── tickets/
│       ├── tickets.module.ts
│       ├── tickets.controller.ts
│       ├── tickets.service.ts
│       ├── schemas/
│       │   ├── ticket.schema.ts
│       │   └── ticket-problem-type.schema.ts
│       └── dto/
│           ├── create-public-ticket.dto.ts
│           ├── create-ticket.dto.ts
│           ├── close-ticket.dto.ts
│           └── ticket-query.dto.ts
├── app.module.ts
├── app.controller.ts          # Solo health check (GET /)
└── main.ts
```

## Convenciones globales de código

### Base Schema (soft delete)

Todas las entidades **deben extender** un schema base o repetir estos campos:

```typescript
// common/schemas/base.schema.ts
import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ timestamps: true }) // genera createdAt y updatedAt automáticamente
export class BaseSchema {
  @Prop({ type: Date, default: null })
  deletedAt: Date | null;
}
```

> `timestamps: true` en `@Schema()` genera `createdAt` y `updatedAt` automáticamente. No los declares manualmente.

### Soft delete query helper

Crear un helper reutilizable que todos los servicios usen:

```typescript
// Ejemplo en common/helpers/soft-delete.helper.ts
export function softDeleteQuery(includeDeleted = false) {
  return includeDeleted ? {} : { deletedAt: null };
}

export function softDeleteCondition(includeDeleted = false) {
  return includeDeleted ? {} : { $or: [{ deletedAt: { $eq: null } }, { deletedAt: { $exists: false } }] };
}
```

### Paginación

Todos los endpoints de listado reciben query params:

```
GET /resource?search=termino&page=1&limit=20&includeDeleted=false
```

Respuesta siempre:

```typescript
interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}
```

La paginación debe implementarse con:
- `page` default = 1
- `limit` default = 20, max = 100
- `search` para búsqueda textual (como especifique cada módulo)
- `includeDeleted` default = false

### Formato de respuestas

**Éxito** (usa un Interceptor global):

```json
{
  "data": { ... },
  "message": "Recurso creado exitosamente"
}
```

Para arrays paginados:

```json
{
  "data": [ ... ],
  "meta": { "total": 100, "page": 1, "limit": 20, "totalPages": 5 },
  "message": "Listado obtenido exitosamente"
}
```

**Error** (usa un ExceptionFilter global):

```json
{
  "statusCode": 400,
  "message": "El email ya está registrado",
  "error": "Bad Request"
}
```

### ID normalization

MongoDB usa `_id` como ObjectId. En las respuestas JSON, NestJS + Mongoose lo serializa automáticamente a string. No hacer transformaciones manuales.

Usar un `ParseObjectIdPipe` para validar params `:id` y convertirlos a ObjectId.

## Modulos

---

### 1. AuthModule

**Schemas:**

#### User

| Campo | Tipo Mongoose | class-validator | Descripción |
|-------|--------------|-----------------|-------------|
| `email` | `{ type: String, required: true, unique: true, lowercase: true, trim: true }` | `@IsEmail()` | Email del usuario |
| `password` | `{ type: String, required: true }` | `@IsString() @MinLength(8)` | Contraseña hasheada con bcrypt |
| `role` | `{ type: String, enum: ['super-user', 'admin', 'technician', 'user'], default: 'user' }` | `@IsEnum()` | Rol del usuario |
| `status` | `{ type: String, enum: ['active', 'banned'], default: 'active' }` | — | Estado de la cuenta |
| `deletedAt` | `{ type: Date, default: null }` | — | Soft delete |

Timestamps automáticos con `{ timestamps: true }`.

> **IMPORTANTE:** El password se hashea en un **hook pre('save')** de Mongoose con bcrypt salt rounds = 12. No hacerlo en el servicio. El hook solo debe hashear si `this.isModified('password')`.

#### Person

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `userId` | `{ type: SchemaTypes.ObjectId, ref: 'User', required: true, unique: true }` | Relación 1:1 con User |
| `name` | `String` | Nombre(s) |
| `surnames` | `String` | Apellidos |
| `birthday` | `Date` | Fecha de nacimiento |
| `gender` | `String` | Género |
| `profileImage` | `String` | URL de Cloudinary |
| `phone` | `String` | Teléfono |

#### RefreshToken

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `userId` | `{ type: SchemaTypes.ObjectId, ref: 'User', required: true }` | Usuario dueño |
| `token` | `{ type: String, required: true, unique: true }` | El refresh token (JWT) |
| `expiresAt` | `{ type: Date, required: true }` | Fecha de expiración |
| `isRevoked` | `{ type: Boolean, default: false }` | Si fue revocado manualmente |

Indexar `{ token: 1 }` y `{ userId: 1 }`. Crear TTL index en `expiresAt` para que MongoDB elimine automáticamente los expirados.

**Endpoints:**

| Funcionalidad | Método | Ruta | Auth | Decoradores |
|---------------|--------|------|------|-------------|
| Crear cuenta | POST | `/auth/register` | No | `@Public()` |
| Login | POST | `/auth/login` | No | `@Public()` |
| Refresh token | POST | `/auth/refresh` | No | `@Public()` |
| Recuperar contraseña | POST | `/auth/forgot-password` | No | `@Public()` |
| Resetear contraseña | POST | `/auth/reset-password` | No | `@Public()` |
| Obtener perfil | GET | `/auth/profile` | Sí | — |
| Actualizar perfil | PATCH | `/auth/profile` | Sí | — |
| Cambiar contraseña | PATCH | `/auth/change-password` | Sí | — |
| Cerrar sesión (revocar refresh) | POST | `/auth/logout` | Sí | — |

**Reglas de negocio:**

1. **Registro:** Recibe `email` + `password`. Hashear con bcrypt. Crear User y Person vacío (solo con `userId`). Retornar `{ accessToken, refreshToken, user }`.
2. **Login:** Validar email+password. Generar access token (15min) y refresh token (7d). Guardar refresh token en colección `RefreshToken`. Retornar ambos tokens + datos del usuario (sin password).
3. **Refresh:** Recibir refresh token del body. Validar que exista en BD, no esté revocado, no haya expirado. Generar nuevo par access+refresh. Revocar el refresh anterior.
4. **Logout:** Revocar el refresh token del usuario.
5. **Perfil:** GET retorna User + Person combinados (populate). PATCH actualiza solo campos de Person.
6. **Cambio de contraseña:** Recibir `currentPassword` + `newPassword`. Validar currentPassword contra hash. Actualizar.

**Auth flow con Guards:**

- Registrar `JwtAuthGuard` como guard global en `AppModule`:

```typescript
// app.module.ts
providers: [
  { provide: APP_GUARD, useClass: JwtAuthGuard },
  { provide: APP_FILTER, useClass: HttpExceptionFilter },
  { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
]
```

- Los endpoints públicos se marcan con `@Public()` decorator que setea metadata `isPublic: true`.
- `JwtAuthGuard` verifica la metadata: si `isPublic`, permite el paso sin validar token.
- `RolesGuard` complementa: si el endpoint tiene `@Roles('admin')`, verifica que `user.role` coincida.
- El `JwtStrategy` extrae `{ sub, email, role }` del payload y lo guarda en `req.user`.

---

### 2. UsersModule

Solo accesible por **super-user**. CRUD de usuarios del sistema.

**Endpoints:**

| Funcionalidad | Método | Ruta | Roles |
|---------------|--------|------|-------|
| Listar usuarios | GET | `/users?search=&page=&limit=&includeDeleted=` | super-user |
| Crear usuario | POST | `/users` | super-user |
| Obtener usuario | GET | `/users/:id` | super-user |
| Actualizar email | PATCH | `/users/:id/email` | super-user |
| Actualizar password | PATCH | `/users/:id/password` | super-user |
| Cambiar status (banned/active) | PATCH | `/users/:id/status` | super-user |

**Reglas:**

- Búsqueda por `name` de la persona asociada **O** `email` del user. Como name está en otra colección, se puede buscar directamente sobre `users.email` y hacer un lookup a `persons.name`. Alternativa más simple: buscar solo por `email` si la persona aún no tiene nombre.
  - **Decisión:** Buscar en `users.email` con regex case-insensitive. Si se necesita búsqueda por nombre, hacer un aggregate con `$lookup` a persons. Para el MVP, buscar solo por `email`.
- `POST /users` puede crear usuarios con **cualquier rol** (incluyendo super-user). Recibe `email`, `password`, `role`.
- No se puede banear al propio super-user logueado. Validar en el servicio que `req.user.id !== userId`.
- `PATCH /users/:id/status` solo acepta `active` o `banned`.

---

### 3. ClientsModule

Accesible por **super-user** y **admin**. CRUD de clientes (empresas) y sus áreas.

**Schemas:**

#### Client

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `name` | `String` | Nombre de la empresa |
| `code` | `{ type: String, unique: true, uppercase: true }` | Código interno (normalizado a mayúsculas) |
| `contactEmail` | `String` | Email de contacto |
| `contactPhone` | `String` | Teléfono |
| `address` | `String` | Dirección |
| `notes` | `String` | Notas |
| `status` | `{ type: String, enum: ['active', 'inactive'], default: 'active' }` | Estado |

#### Area

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `clientId` | `{ type: SchemaTypes.ObjectId, ref: 'Client', required: true }` | Cliente al que pertenece |
| `name` | `String` | Nombre del área |
| `code` | `String` | Código interno |
| `notes` | `String` | Notas |

Unique compuesto: `(clientId, code)`. Crear un **compound index** en Mongoose:

```typescript
@Schema()
export class Area extends BaseSchema {
  // ...
}

export const AreaSchema = SchemaFactory.createForClass(Area);
AreaSchema.index({ clientId: 1, code: 1 }, { unique: true });
```

**Endpoints Client:**

| Método | Ruta |
|--------|------|
| GET | `/clients?search=&page=&limit=` |
| POST | `/clients` |
| GET | `/clients/:id` |
| PATCH | `/clients/:id` |
| DELETE | `/clients/:id` (soft delete) |

**Endpoints Area (anidados bajo client):**

| Método | Ruta |
|--------|------|
| GET | `/clients/:clientId/areas?search=&page=&limit=` |
| POST | `/clients/:clientId/areas` |
| GET | `/clients/:clientId/areas/:id` |
| PATCH | `/clients/:clientId/areas/:id` |
| DELETE | `/clients/:clientId/areas/:id` (soft delete) |

---

### 4. InventoryModule

Módulo central. Gestiona marcas, modelos, tipos de producto, productos, atributos dinámicos, partes y consumibles.

**Schemas:**

#### Brand

| Campo | Tipo |
|-------|------|
| `name` | `String` |
| `code` | `{ type: String, unique: true, uppercase: true }` |

#### Model

| Campo | Tipo |
|-------|------|
| `brandId` | `{ type: SchemaTypes.ObjectId, ref: 'Brand', required: true }` |
| `name` | `String` |
| `code` | `String` |

Compound index: `(brandId, code)` unique.

#### ProductType

| Campo | Tipo |
|-------|------|
| `name` | `String` |
| `code` | `{ type: String, unique: true, uppercase: true }` |

#### Product

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `inventoryCode` | `{ type: String, unique: true }` | Código de inventario / folio |
| `serialNumber` | `{ type: String, unique: true, sparse: true, default: null }` | Número de serie (sparse index para permitir múltiples nulls) |
| `productTypeId` | `{ type: SchemaTypes.ObjectId, ref: 'ProductType', required: true }` | Tipo de producto |
| `modelId` | `{ type: SchemaTypes.ObjectId, ref: 'Model', required: true }` | Modelo |
| `purchaseDate` | `{ type: Date, default: null }` | Fecha de compra |
| `status` | `{ type: String, enum: ['active', 'in_repair', 'retired', 'lost', 'disposed'], default: 'active' }` | Estado |
| `assignedTo` | `{ type: SchemaTypes.ObjectId, ref: 'Area', default: null }` | Área asignada (null = almacén) |
| `notes` | `String` | Notas |

#### Attribute

| Campo | Tipo |
|-------|------|
| `name` | `String` |
| `code` | `{ type: String, unique: true, uppercase: true }` |
| `valueType` | `{ type: String, enum: ['string', 'number', 'boolean', 'date', 'enum', 'json', 'ip', 'mac'] }` |

#### AttributeOption (solo para valueType = enum)

| Campo | Tipo |
|-------|------|
| `attributeId` | `{ type: SchemaTypes.ObjectId, ref: 'Attribute', required: true }` |
| `label` | `String` |
| `value` | `String` |

Compound index: `(attributeId, value)` unique.

#### ProductTypeAttribute (relación muchos-a-muchos entre ProductType y Attribute)

| Campo | Tipo |
|-------|------|
| `productTypeId` | `{ type: SchemaTypes.ObjectId, ref: 'ProductType', required: true }` |
| `attributeId` | `{ type: SchemaTypes.ObjectId, ref: 'Attribute', required: true }` |
| `required` | `{ type: Boolean, default: false }` |

Compound index: `(productTypeId, attributeId)` unique.

#### ProductAttributeValue

| Campo | Tipo |
|-------|------|
| `productId` | `{ type: SchemaTypes.ObjectId, ref: 'Product', required: true }` |
| `attributeId` | `{ type: SchemaTypes.ObjectId, ref: 'Attribute', required: true }` |
| `valueString` | `{ type: String, default: null }` |
| `valueNumber` | `{ type: Number, default: null }` |
| `valueBoolean` | `{ type: Boolean, default: null }` |
| `valueDate` | `{ type: Date, default: null }` |
| `valueJson` | `{ type: SchemaTypes.Mixed, default: null }` |
| `valueEnum` | `{ type: String, default: null }` |

Compound index: `(productId, attributeId)` unique.

> **Regla de negocio en el servicio:** Según `attribute.valueType`, solo se debe poblar el campo correspondiente y los demás deben ser null. Validar en el servicio antes de guardar.

#### Part

| Campo | Tipo |
|-------|------|
| `name` | `String` |
| `code` | `{ type: String, unique: true }` |
| `partType` | `{ type: String, enum: ['accessory', 'spare_part', 'consumable'] }` |

#### ProductPart

| Campo | Tipo |
|-------|------|
| `productId` | `{ type: SchemaTypes.ObjectId, ref: 'Product', required: true }` |
| `partId` | `{ type: SchemaTypes.ObjectId, ref: 'Part', required: true }` |
| `folio` | `{ type: String, default: null }` | NO es unique |
| `status` | `{ type: String, enum: ['assigned', 'in_stock', 'consumed', 'lost', 'damaged', 'retired'], default: 'assigned' }` |
| `assignedAt` | `{ type: Date, default: Date.now }` |
| `notes` | `String` |

**Endpoints:**

#### Brands

| Método | Ruta |
|--------|------|
| GET | `/brands?search=&page=&limit=&includeDeleted=` |
| POST | `/brands` |
| GET | `/brands/:id` |
| PATCH | `/brands/:id` |
| DELETE | `/brands/:id` |

#### Models

| Método | Ruta |
|--------|------|
| GET | `/models?search=&page=&limit=&includeDeleted=&brandId=` |
| POST | `/models` |
| GET | `/models/:id` |
| PATCH | `/models/:id` |
| DELETE | `/models/:id` |

Filtrar por `brandId` opcional.

#### ProductTypes

| Método | Ruta |
|--------|------|
| GET | `/product-types?search=&page=&limit=&includeDeleted=` |
| POST | `/product-types` |
| GET | `/product-types/:id` |
| PATCH | `/product-types/:id` |
| DELETE | `/product-types/:id` |

#### Products

| Método | Ruta |
|--------|------|
| GET | `/products?search=&page=&limit=&includeDeleted=&status=&productTypeId=&modelId=` |
| POST | `/products` |
| GET | `/products/:id` |
| PATCH | `/products/:id` |
| DELETE | `/products/:id` |
| GET | `/products/lookup/:inventoryCode` | Búsqueda por folio (para tickets públicos) |
| POST | `/products/:id/parts` | Asignar parte a producto |
| PATCH | `/products/:id/attributes` | Actualizar valor de atributo |

Filtros: `search` busca en `inventoryCode` y `serialNumber`. Filtros adicionales: `status`, `productTypeId`, `modelId`.

**GET /products/:id** debe retornar el producto con:
- `model` populado (con `brand` populado dentro)
- `productType` populado
- `assignedTo` populado (el área, con `client` populado dentro)
- `attributes` (array de ProductAttributeValue con Attribute populado)
- `parts` (array de ProductPart con Part populado)

#### Attributes

| Método | Ruta |
|--------|------|
| GET | `/attributes?search=&page=&limit=&includeDeleted=` |
| POST | `/attributes` |
| GET | `/attributes/:id` |
| PATCH | `/attributes/:id` |
| DELETE | `/attributes/:id` |

#### Attribute Options (anidados bajo attribute)

| Método | Ruta |
|--------|------|
| GET | `/attributes/:attributeId/options?page=&limit=` |
| POST | `/attributes/:attributeId/options` |
| PATCH | `/attributes/:attributeId/options/:id` |
| DELETE | `/attributes/:attributeId/options/:id` |

#### Parts

| Método | Ruta |
|--------|------|
| GET | `/parts?search=&page=&limit=&includeDeleted=&partType=` |
| POST | `/parts` |
| GET | `/parts/:id` |
| PATCH | `/parts/:id` |
| DELETE | `/parts/:id` |

Filtro opcional: `partType`.

**Reglas de negocio del inventario:**

1. **Atributos válidos por tipo de producto:** Al crear/editar un `ProductAttributeValue`, validar que el `attributeId` esté permitido para el `productTypeId` del producto (vía `ProductTypeAttribute`).
2. **Atributos requeridos:** Para un producto, todos los `ProductTypeAttribute.required = true` deben tener un `ProductAttributeValue` asociado con valor no-null en el campo correspondiente.
3. **Tipado fuerte:**
   - `valueType = 'number'` → solo valueNumber, rechazar si null o si otros campos tienen valor.
   - `valueType = 'enum'` → solo valueEnum, validar que exista en `AttributeOption` para ese attributeId.
   - `valueType = 'ip'` → valueString, validar formato IP (IPv4: `/^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/`).
   - `valueType = 'mac'` → valueString, validar formato MAC (`/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/`).
   - `valueType = 'json'` → valueJson.
   - `valueType = 'string'`, `'date'`, `'boolean'` → valueString, valueDate, valueBoolean respectivamente.
4. **Soft delete:** No permitir asignar atributos/partes a productos soft-deleted. No permitir asignar productos soft-deleted a tickets.

---

### 5. TicketsModule

**Schemas:**

#### Ticket

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `folio` | `{ type: String, unique: true }` | Auto-generado (TKT-0001, TKT-0002…) |
| `productId` | `{ type: SchemaTypes.ObjectId, ref: 'Product', required: true }` | Producto reportado |
| `reportedBy` | `{ type: SchemaTypes.ObjectId, ref: 'User', default: null }` | Usuario (null si público) |
| `reporterName` | `{ type: String, default: null }` | Nombre (ruta pública) |
| `reporterContact` | `{ type: String, default: null }` | Email/tel (ruta pública) |
| `problemType` | `{ type: String, required: true }` | Tipo de problema |
| `problemDescription` | `{ type: String, required: true }` | Descripción |
| `images` | `{ type: [String], default: [] }` | URLs de Cloudinary |
| `status` | `{ type: String, enum: ['abierto', 'en_proceso', 'cerrado', 'pendiente', 'cancelado'], default: 'abierto' }` | Estado |
| `assignedTo` | `{ type: SchemaTypes.ObjectId, ref: 'User', default: null }` | Técnico asignado |
| `assignedAt` | `{ type: Date, default: null }` | Cuándo se asignó |
| `closedAt` | `{ type: Date, default: null }` | Cuándo se cerró |
| `resolution` | `{ type: ResolutionSchema, default: null }` | Subdocumento embebido |

#### Resolution (subdocumento embebido)

| Campo | Tipo |
|-------|------|
| `failureCause` | `String` |
| `negligence` | `{ type: Boolean, default: false }` |
| `replacedParts` | `{ type: [String], default: [] }` |
| `evidenceImage` | `String` (URL) |
| `resolvedAt` | `{ type: Date, default: Date.now }` |

Definir como **subdocumento** embebido dentro de Ticket:

```typescript
@Schema({ _id: false })
export class Resolution {
  @Prop({ required: true })
  failureCause: string;

  @Prop({ default: false })
  negligence: boolean;

  @Prop({ type: [String], default: [] })
  replacedParts: string[];

  @Prop()
  evidenceImage: string;

  @Prop({ default: Date.now })
  resolvedAt: Date;
}
```

#### TicketProblemType

| Campo | Tipo |
|-------|------|
| `productTypeId` | `{ type: SchemaTypes.ObjectId, ref: 'ProductType', required: true }` |
| `name` | `String` | Nombre del problema (ej. "No enciende", "Pantalla rota") |
| `description` | `String` | Descripción opcional |

**Endpoints:**

| Funcionalidad | Método | Ruta | Auth | Roles |
|---------------|--------|------|------|-------|
| Crear ticket (público) | POST | `/tickets/public` | No | — |
| Crear ticket (autenticado) | POST | `/tickets` | Sí | any |
| Listar tickets | GET | `/tickets?status=&technician=&dateFrom=&dateTo=&page=&limit=` | Sí | admin, super-user, technician |
| Obtener ticket | GET | `/tickets/:id` | Sí | admin, super-user, technician |
| Tomar ticket (→ en_proceso) | PATCH | `/tickets/:id/take` | Sí | technician |
| Cerrar ticket | PATCH | `/tickets/:id/close` | Sí | technician |
| Marcar pendiente | PATCH | `/tickets/:id/pending` | Sí | technician |
| Cancelar ticket | PATCH | `/tickets/:id/cancel` | Sí | admin, super-user |
| Descargar reporte | GET | `/tickets/report?status=&technician=&dateFrom=&dateTo=` | Sí | admin, super-user |

**Problemas comunes (CRUD):**

| Método | Ruta |
|--------|------|
| GET | `/ticket-problem-types?productTypeId=` |
| POST | `/ticket-problem-types` |
| PATCH | `/ticket-problem-types/:id` |
| DELETE | `/ticket-problem-types/:id` |

**Reglas de negocio:**

1. **Folio auto-generado:** Usar un contador en una colección `counters` o contar documentos existentes para generar el siguiente folio. Formato: `TKT-` + padding a 4 dígitos (TKT-0001, TKT-0002...).

```typescript
// Ejemplo de generación de folio en TicketsService
async generateFolio(): Promise<string> {
  const lastTicket = await this.ticketModel
    .findOne({}, { folio: 1 })
    .sort({ _id: -1 })
    .lean();
  
  const lastNumber = lastTicket
    ? parseInt(lastTicket.folio.replace('TKT-', ''), 10)
    : 0;
  
  return `TKT-${String(lastNumber + 1).padStart(4, '0')}`;
}
```

2. **Creación pública:** Recibe `inventoryCode` (no el ID del producto — buscarlo por `inventoryCode`), `reporterName`, `reporterContact`, `problemType`, `problemDescription`, `images[]`. Autenticación no requerida.
3. **Toma de ticket:** Solo un técnico puede tomarlo. Si `assignedTo` ya tiene valor, rechazar con 409 Conflict. Setear `status = 'en_proceso'`, `assignedTo = req.user.id`, `assignedAt = new Date()`.
4. **Cierre:** Solo el técnico asignado puede cerrar. Recibe `resolution` (failureCause, negligence, replacedParts, evidenceImage). Setear `status = 'cerrado'`, `closedAt = new Date()`.
5. **Pendiente:** Solo el técnico asignado. Setear `status = 'pendiente'`. Si después quiere cerrarlo, puede llamar a `/close`.
6. **Cancelación:** Solo admin o super-user. Setear `status = 'cancelado'`. No permitir cambios posteriores en tickets cancelados (rechazar todas las mutaciones con 400).
7. **Validaciones de transición de estado:**
   - `abierto` → `en_proceso` (take) ✓
   - `abierto` → `cancelado` ✓ (solo admin/super)
   - `en_proceso` → `cerrado` ✓ (solo técnico asignado)
   - `en_proceso` → `pendiente` ✓
   - `en_proceso` → `cancelado` ✓
   - `pendiente` → `en_proceso` ✓ (retomar)
   - `pendiente` → `cerrado` ✓
   - `cerrado` → ❌ (terminal)
   - `cancelado` → ❌ (terminal)

   Implementar un **mapa de transiciones válidas** en el servicio.

8. **Reportes:** El endpoint `GET /tickets/report` filtra por query params y retorta un JSON con los datos (para ser consumido por el frontend que genera el PDF/CSV). Esto es un endpoint que devuelve datos planos — no generar PDF en el backend a menos que se decida después. Opcionalmente, se puede generar CSV con `json2csv`.

---

### 5.1 DashboardModule (endpoint requerido por dashboard/mobile)

Agregar un endpoint adicional:

```
GET /dashboard/metrics  (auth required, roles: super-user, admin)
```

Debe retornar las métricas descritas en el prompt del dashboard (totales, status breakdown, tickets recientes, tickets por mes).

### 6. FilesModule (Upload)

Módulo separado para manejo de archivos.

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/files/upload` | Sí | Sube archivo a Cloudinary, retorna URL |

```typescript
// files.module.ts configura MulterModule.register y CloudinaryStorage
import { CloudinaryStorage } from 'multer-storage-cloudinary';
```

El controlador recibe un archivo con `@UseInterceptors(FileInterceptor('file'))`, lo sube a Cloudinary y retorna:

```json
{
  "data": {
    "url": "https://res.cloudinary.com/...",
    "publicId": "abc123",
    "originalName": "foto.jpg",
    "size": 123456
  },
  "message": "Archivo subido exitosamente"
}
```

Usar el SDK de Cloudinary `v2.uploader.upload_stream()` o `multer-storage-cloudinary` según prefieras.

---

### 7. Swagger

Configurar en `main.ts` con autenticación básica:

```typescript
// main.ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true,
  });
  
  // Swagger con autenticación básica
  app.use(['/api/docs'], basicAuth({
    challenge: true,
    users: {
      [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
    },
  }));
  
  const config = new DocumentBuilder()
    .setTitle('IMS Backend API')
    .setDescription('Inventory & Management System - Backend API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  // Global pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
```

> **IMPORTANTE:** El Swagger debe estar en producción con autenticación básica. En desarrollo se puede omitir el basicAuth.

### Guards globales y decoradores

```typescript
// common/guards/jwt-auth.guard.ts
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    return super.canActivate(context);
  }
}
```

```typescript
// common/decorators/public.decorator.ts
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```

```typescript
// common/decorators/roles.decorator.ts
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
```

```typescript
// common/guards/roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}
```

### Interceptor de transformación de respuestas

```typescript
// common/interceptors/transform.interceptor.ts
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        // Si la response ya tiene { data, meta, message }, pasarla
        if (data && data.data !== undefined && data.meta !== undefined) {
          return data;
        }
        // Si es un array sin meta, envolver en { data, message }
        if (Array.isArray(data)) {
          return { data, message: 'Listado obtenido exitosamente' };
        }
        // Si es un objeto con message propio, respetarlo
        if (data && data.message) {
          return data;
        }
        // Objeto simple
        return { data, message: 'Operación exitosa' };
      }),
    );
  }
}
```

### Exception filter

```typescript
// common/filters/http-exception.filter.ts
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    let status = 500;
    let message = 'Error interno del servidor';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exResponse = exception.getResponse();
      if (typeof exResponse === 'string') {
        message = exResponse;
      } else {
        const exObj = exResponse as any;
        message = Array.isArray(exObj.message) ? exObj.message.join(', ') : exObj.message;
        error = exObj.error || exception.name;
      }
    } else if (exception instanceof MongoError) {
      if (exception.code === 11000) {
        status = 409;
        message = 'El recurso ya existe (duplicado)';
        error = 'Conflict';
      }
    }

    response.status(status).json({ statusCode: status, message, error });
  }
}
```

---

### AppModule final

```typescript
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ThrottlerModule.forRoot([{
      ttl: Number(process.env.THROTTLE_TTL),
      limit: Number(process.env.THROTTLE_LIMIT),
    }]),
    AuthModule,
    UsersModule,
    ClientsModule,
    InventoryModule,
    TicketsModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
  ],
})
export class AppModule {}
```

---

## Tests

### Unit tests

Cada servicio debe tener su test unitario. Testear:

- Métodos CRUD básicos (usar mock de modelo Mongoose con `jest.fn()`)
- Reglas de negocio (validaciones de atributos, transiciones de estado de tickets)
- Casos de error (recurso no encontrado, duplicado, forbidden)

```typescript
// Ejemplo: brands.service.spec.ts
describe('BrandsService', () => {
  let service: BrandsService;
  let model: Model<Brand>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        { provide: getModelToken(Brand.name), useValue: mockModel },
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
  });

  it('should create a brand', async () => {
    // ...
  });
});
```

### E2E tests (Supertest)

Testear los flujos completos:

- Registro → Login → Obtener perfil → Actualizar perfil → Logout → Refresh
- CRUD de brands con autenticación de super-user
- Crear ticket público (sin auth)
- Flujo completo de ticket: crear → tomar → cerrar
- Soft delete: crear → eliminar → listar (no aparece) → listar con includeDeleted (aparece)
- Validaciones de atributos: crear producto con atributo inválido → 400

```typescript
// Ejemplo: app.e2e-spec.ts estructura base
describe('IMS Backend (e2e)', () => {
  let app: INestApplication;
  
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    
    app = moduleFixture.createNestApplication();
    // aplicar mismos pipes, filters, interceptors que en main.ts
    await app.init();
  });
  
  afterAll(async () => {
    await app.close();
  });
  
  describe('Auth', () => {
    it('POST /auth/register', () => { /* ... */ });
    it('POST /auth/login', () => { /* ... */ });
    it('GET /auth/profile', () => { /* ... */ });
  });
});
```

---

## Lista de verificación final

- [ ] Proyecto creado con `nest new ims-backend` en `app/backend/ims-backend/`
- [ ] Dependencias instaladas con yarn
- [ ] Variables de entorno en `.env`, cargadas con `@nestjs/config`
- [ ] CORS configurado
- [ ] Rate limiting configurado
- [ ] Global pipes, filters, interceptors registrados
- [ ] Swagger configurado y funcional en `/api/docs`
- [ ] Auth: login, register, refresh, forgot/reset password, profile, logout
- [ ] JWT guard global con decorador `@Public()`
- [ ] Roles guard con decorador `@Roles()`
- [ ] Users CRUD (solo super-user)
- [ ] Clients CRUD + Areas CRUD anidado
- [ ] Brands CRUD
- [ ] Models CRUD (con filtro por brandId)
- [ ] ProductTypes CRUD
- [ ] Products CRUD + lookup por inventoryCode + asignar partes + actualizar atributos
- [ ] Attributes CRUD + AttributeOptions CRUD anidado
- [ ] Parts CRUD
- [ ] ProductAttributeValues con validación de tipo fuerte
- [ ] ProductParts con asignación
- [ ] Tickets CRUD con flujo de estados
- [ ] TicketProblemTypes CRUD
- [ ] Files upload a Cloudinary
- [ ] Dashboard metrics endpoint (/dashboard/metrics)
- [ ] Soft delete en todas las colecciones
- [ ] Paginación en todos los listados
- [ ] Formato de respuesta unificado
- [ ] Unit tests para servicios clave
- [ ] E2e tests para flujos principales
- [ ] Seed inicial con datos mínimos por modelo
- [ ] Archivo de instrucciones de arranque generado

---

## Notas finales

1. **Nombres de colecciones en MongoDB:** Por defecto Mongoose pluraliza en lowercase el nombre del schema. User → `users`, Brand → `brands`, etc. Está bien, no forzar nombres personalizados.
2. **No crear seed data** en este prompt. Si se requiere, se hará en otro archivo después.
3. **No usar `@nestjs/mongoose` en versión 10+ si hay breaking changes.** Usar la versión más reciente estable.
4. **Mantener la estructura de módulos independiente.** Cada módulo debe funcionar sin depender de otros (excepto AuthModule que es global via guards).
5. **No exponer el password en respuestas.** Siempre hacer `select('-password')` en queries de User o eliminar el campo del objeto antes de retornar.
6. **El archivo `.env` no se sube a git.** Ya existe `.gitignore` en el proyecto Nest por defecto que excluye `.env`.

---

## Seed inicial obligatorio

Crear un script de seed ejecutable con `yarn seed` que inserte datos mínimos consistentes.

**Mínimo razonable (orientativo):**

- Users: 4 usuarios (super-user, admin, technician, user) usando variables de entorno `SEED_*`
- Clients: 3
- Areas: 2 por cliente
- Brands: 3
- Models: 2 por brand
- ProductTypes: 3
- Attributes: 5 (cubrir valueType string, number, boolean, date, enum)
- AttributeOptions: 3 por attribute enum
- ProductTypeAttribute: 2-3 por productType (incluye required=true)
- Products: 8-12 (con inventoryCode único, algunos con serialNumber)
- ProductAttributeValue: generar valores válidos según valueType
- Parts: 6 (mezcla accessory/spare_part/consumable)
- ProductParts: 1-2 por producto
- TicketProblemTypes: 2-3 por productType
- Tickets: 5 (con distintos estados y uno cerrado con resolution)

**Reglas del seed:**

- Respetar relaciones válidas (ProductType ↔ Attributes, Product ↔ Model/Brand, Product ↔ Area/Client).
- No usar datos random inestables; usar valores fijos reproducibles.
- Evitar violar índices únicos (code, inventoryCode, serialNumber, etc.).

---

## Instrucciones de arranque (archivo obligatorio)

Generar un archivo `START.md` en `app/backend/ims-backend/` con pasos claros para ejecutar el backend y el seed.

Contenido mínimo:

```md
# IMS Backend - Inicio rapido

## Requisitos
- Node.js 20 LTS
- MongoDB local o remoto

## Pasos
1) Instalar dependencias:
   yarn install

2) Levantar el backend:
   yarn start:dev

3) En otra terminal, ejecutar el seed:
   yarn seed
```
