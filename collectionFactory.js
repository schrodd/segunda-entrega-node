import env from 'dotenv'
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
    default:
      console.log('default')
      break
  }
}