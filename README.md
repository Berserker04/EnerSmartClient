# ENERSMARTCLIENT

Frontend del sistema experto de asesoría en ahorro energético en el hogar.

## 🔧 Requisitos

- Node.js 18 o superior
- npm o yarn

## 🚀 Instalación

1. Clona el repositorio:
   ```bash
   descargar y descomprimir el proyecto
   cd ENERSMARTCLIENT
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea el archivo `.env` a partir del ejemplo:
   ```bash
   cp .env.example .env
   ```

4. Cambia la URL base de la API en `src/config/api.ts` para desarrollo local:
   ```ts
   const API_BASE_URL = "http://127.0.0.1:8000/api";
   ```

## 📦 Scripts

- `npm run dev`: Inicia el servidor de desarrollo (http://localhost:5173).
- `npm run build`: Compila el proyecto para producción.
- `npm run preview`: Previsualiza la versión de producción localmente.
- `npm run lint`: Ejecuta el linter con configuración estricta.

## 👥 Desarrolladores

- Carlos Hernández
- Evelyn Montoya

## 🧠 Propósito

Este sistema experto brinda recomendaciones personalizadas para reducir el consumo energético en el hogar mediante un análisis basado en reglas y hábitos del usuario.