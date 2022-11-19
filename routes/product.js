import express from "express"
import collectionFactory from "../collectionFactory.js"
export const productRoutes = express.Router()
export const productCollection = await collectionFactory('products')

// Se encarga de establecer las rutas, acciones y respuestas
// según cada solicitud

const admin = true
// Middleware a nivel de ruta
const verificarRol = (req, res, next) => {
    if (admin) { 
        console.log('Acceso otorgado')
        next()
    } else {
        console.log('Acceso denegado')
        res.send('No tiene permisos para acceder a esta ruta')
    }
}

productRoutes.get("/", async (req, res) => {
  const data = await productCollection.getAll()
  res.send(data)
})
productRoutes.get("/:id", async (req, res) => {
  const data = await productCollection.get(req.params.id)
  res.send(data)
})

productRoutes.post("/", verificarRol, async (req, res) => {
  // Validacion de datos
  res.send(await productCollection.add(req.body))
})

productRoutes.put("/:id", verificarRol, async (req, res) => {
  res.send(await productCollection.update(req.params.id, req.body.prop, req.body.val))
})

productRoutes.delete("/:id", verificarRol, async (req, res) => {
  res.send(await productCollection.delete(req.params.id))
})