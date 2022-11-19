import env from 'dotenv'
import { mongoCollection } from './db/mongodb.js'
const db = env.config().parsed.DB

// Crea y retorna la instancia de la colección e importa de forma dinámica
// dependiendo de la BDD seleccionada. Tambien pasa los imports
// a la clase de cada BDD para que pueda funcionar.


export default async function collectionFactory(name) {
  switch(db){
    case 'firebase':
      const {firebaseCollection} = await import("./db/firebase.js")
      const app = await import("firebase/app")
      const firestore = await import("firebase/firestore")
      return new firebaseCollection(name, app, firestore)
    case 'mongodb':
      const mongoose = await import('mongoose')
      const schema = new mongoose.Schema({},{strict:false})
      const model = new mongoose.model(name, schema)
      return new mongoCollection(mongoose, model)
    default:
      console.log('That DB doesnt exist. Check .env')
      break
  }
}