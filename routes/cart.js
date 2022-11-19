import express from "express"
import collectionFactory from "../collectionFactory.js"
import { productCollection } from "./product.js"
export const cartRoutes = express.Router()
const cartCollection = await collectionFactory('carts')

cartRoutes.get("/", async (req, res) => {
  res.send(await cartCollection.getAll())
})
cartRoutes.get("/:id", async (req, res) => {
  res.send(await cartCollection.get(req.params.id))
})
cartRoutes.get("/:id/products", async (req, res) => {
  const prods = await productCollection.getAll()
  const cart = await cartCollection.get(req.params.id)
  const fullProd = []
  cart.products.forEach(e => {
    fullProd.push(prods.find(f => e == f.id))
  })
  res.send(fullProd)
})

cartRoutes.post("/", async (req, res) => {
  res.send(await cartCollection.add(req.body))
})

cartRoutes.put("/:id", async (req, res) => {
  res.send(await cartCollection.update(req.params.id, req.body.prop, req.body.val))
})

cartRoutes.delete("/:id", async (req, res) => {
  res.send(await cartCollection.delete(req.params.id))
})