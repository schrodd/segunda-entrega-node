import express from "express"
export const cartRoutes = express.Router()

cartRoutes.get("/", (req, res) => {
  res.send("que pasa bro")
})