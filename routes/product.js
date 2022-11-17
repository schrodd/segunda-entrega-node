import express from "express"
import collectionFactory from "../collectionFactory.js"
export const productRoutes = express.Router()
const collection = await collectionFactory('products')

// Se encarga de establecer las rutas, acciones y respuestas
// según cada solicitud

productRoutes.get("/", async (req, res) => {
  const data = await collection.getAll()
  res.send(data)
})

productRoutes.post("/", async (req, res) => {
  // Validacion de datos
  res.send(await collection.add(req.body))
})

productRoutes.put("/", async (req, res) => {
  res.send(await collection.update("OabKplfMwSUGlxKEqnNK", "edad", 5))
})