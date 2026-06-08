# IMS Backend — Inicio rápido

## Requisitos

- Node.js 20 LTS
- MongoDB (local, Docker o Atlas)
- Yarn

## Instalación

```bash
yarn install
```

## Configuración

Revisa `.env` y ajusta las variables necesarias:

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `MONGODB_URI` | Conexión a MongoDB | `mongodb://localhost:27017/ims` |
| `JWT_ACCESS_SECRET` | Secreto access token | — |
| `JWT_REFRESH_SECRET` | Secreto refresh token | — |
| `CLOUDINARY_*` | Credenciales Cloudinary (opcional para upload) | — |

## Inicio

```bash
# Desarrollo con hot-reload
yarn start:dev

# Producción
yarn build && yarn start:prod
```

El servidor arranca en `http://localhost:3000`.

## Seed (datos de prueba)

Ejecutar en otra terminal (con el servidor corriendo):

```bash
yarn seed
```

### Usuarios de prueba

| Email | Contraseña | Rol |
|---|---|---|
| `super@ims.local` | `ChangeMe123!` | `super-user` |
| `admin@ims.local` | `ChangeMe123!` | `admin` |
| `tech@ims.local` | `ChangeMe123!` | `technician` |
| `user@ims.local` | `ChangeMe123!` | `user` |

## Documentación Swagger

Una vez corriendo el servidor, abrir:

```
http://localhost:3000/api/docs
```

En producción (`NODE_ENV != development`) la documentación está protegida con autenticación básica:

| Campo | Valor |
|---|---|
| Usuario | `admin` (o `SWAGGER_USER` en `.env`) |
| Contraseña | `admin123` (o `SWAGGER_PASSWORD` en `.env`) |

### Flujo de autenticación en Swagger

1. Ve a `POST /auth/login` y usa las credenciales de un usuario de prueba.
2. Copia el `accessToken` de la respuesta.
3. Arriba a la derecha en Swagger, haz clic en **Authorize** y pega el token.
4. Ahora puedes probar los endpoints protegidos.

## Comandos disponibles

```bash
yarn build       # Compila TypeScript
yarn start:dev   # Desarrollo con hot-reload
yarn start:prod  # Producción
yarn seed        # Pobla la base de datos con datos de prueba
yarn test        # Tests unitarios
yarn test:e2e    # Tests end-to-end
```

## Endpoints principales

- `POST /auth/register` — Registro público de usuario
- `POST /auth/login` — Inicio de sesión
- `POST /auth/refresh` — Refrescar token
- `POST /auth/forgot-password` — Solicitar cambio de contraseña
- `POST /auth/reset-password` — Restablecer contraseña
- `GET /auth/profile` — Perfil del usuario autenticado
- `POST /auth/change-password` — Cambiar contraseña
- `POST /auth/logout` — Cerrar sesión
- `GET /users` — Listar usuarios (solo super-user)
- `GET /clients` — Listar clientes (super-user, admin)
- `GET /inventory/products` — Listar productos
- `GET /tickets` — Listar tickets
- `GET /dashboard/metrics` — Métricas del dashboard
- `POST /files/upload` — Subir archivo a Cloudinary
