import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function testAuth0() {
  try {
    const response = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
        grant_type: "client_credentials",
      },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("✅ Conexión exitosa. Token recibido:");
    console.log(response.data);
  } catch (error) {
    console.error("❌ Error al autenticar con Auth0:");
    console.error(error.response?.data || error.message);
  }
}

testAuth0();
