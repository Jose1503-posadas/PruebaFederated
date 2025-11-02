import express from "express";
import { auth } from "express-openid-connect";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Configuración de Auth0
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};

app.use(auth(config));

// Página de inicio
app.get("/", (req, res) => {
  res.send(`
    <h1>👋 Bienvenido a la demo Auth0</h1>
    ${req.oidc.isAuthenticated() ? `
      <p>Hola, ${req.oidc.user.name}</p>
      <p><a href="/logout">Cerrar sesión</a></p>
    ` : `
      <p><a href="/login">Iniciar sesión</a></p>
    `}
  `);
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Servidor en marcha en ${process.env.AUTH0_BASE_URL}`);
});
