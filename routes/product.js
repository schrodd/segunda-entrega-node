import express from "express"
import collectionFactory from "../collectionFactory.js"
export const productRoutes = express.Router()
const collection = await collectionFactory('products')

// Se encarga de establecer las rutas, acciones y respuestas
// según cada solicitud

productRoutes.get("/", async (req, res) => {
  const data = await collection.get()
  res.send(data)
})

productRoutes.post("/", async (req, res) => {
  // Validacion de datos
  res.send(await collection.create(req.body))
})