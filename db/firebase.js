import envVar from 'dotenv'
const env = envVar.config().parsed

// Se encarga de recibir los import y ejecutar las funciones CRUD
// de Firebase

export class firebaseCollection {
  constructor(name, app, firestore){
    this.collectionName = name
    this.firebaseConfig = {
      apiKey: env.APIKEY,
      authDomain: env.AUTHDOMAIN,
      projectId: env.PROJECTID,
      storageBucket: env.STORAGEBUCKET,
      messagingSenderId: env.MSGSENDERID,
      appId: env.APPID
    }
    this.app = app.initializeApp(this.firebaseConfig)
    this.db = firestore.getFirestore(this.app)
    this.collection = firestore.collection
    this.addDoc = firestore.addDoc
    this.getDocs = firestore.getDocs
  }
  async create(obj){
    try {
      const docRef = await this.addDoc(this.collection(this.db, this.collectionName), obj);
      console.log("Document written with ID: ", docRef.id);
      return {status: "Success"}
    } catch (e) {
      console.error("Error adding document: ", e);
      return {status: "Error"}
    }
  }
  async get(){
    const querySnapshot = await this.getDocs(this.collection(this.db, this.collectionName));
    const result = []
    querySnapshot.forEach((doc) => {
      result.push({id: doc.id, ...doc.data()})
    })
    return result
  }
}