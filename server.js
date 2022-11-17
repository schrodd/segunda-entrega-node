import express from "express"
import { productRoutes } from "./routes/product.js"
import { cartRoutes } from "./routes/cart.js"
const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.listen(port, () => {
  console.log("Server is up!")
})