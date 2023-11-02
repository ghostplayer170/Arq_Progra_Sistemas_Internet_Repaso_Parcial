//@ts-ignore

import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

/*
import addProducts from "./resolvers/addProducts.ts";
import getProducts from "./resolvers/getProducts.ts";
import deleteProducts from "./resolvers/deleteProducts.ts";
import addClient from "./resolvers/addClient.ts";
import deleteClient from "./resolvers/deleteClient.ts";
import getInvoice from "./resolvers/getInvoice.ts";
import addInvoice from "./resolvers/addInvoice.ts";
import getClient from "./resolvers/getClient.ts";
*/

// Importación de función 'load' de Deno para cargar variables de entorno.
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load(); // Cagar variables de entorno

//const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");
const PORT = env.PORT || Deno.env.get("PORT") || 3011;


// Comprobación de si se proporcionó una URL de MongoDB
if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

// Conexión a la base de datos MongoDB.
try{
  await mongoose.connect(MONGO_URL);
  console.info("Mongo Connected");
}catch(e){
  console.error(e);
}

// Creación de una instancia de Express.
const app = express();
app.use(express.json());

// Rutas y controladores.
/*
app
  .post("/products", addProducts)
  .get("/products", getProducts)
  .delete("/products/:id", deleteProducts)
  .post("/client", addClient)
  .get("/client", getClient)
  .delete("/client/:cif", deleteClient)
  .post("/invoice", addInvoice)
  .get("/invoice/:id", getInvoice);
*/

app.get("/",(req: Request, res: Response) => { res.status(200).send("API RICK Y MORTY"); })

  // Iniciar el servidor.
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});