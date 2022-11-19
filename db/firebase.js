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
    this.firestore = firestore
  }
  async add(obj){ //create
    try {
      obj.timestamp = new Date(Date.now()).toLocaleString()
      const docRef = await this.firestore.addDoc(this.firestore.collection(this.db, this.collectionName), obj);
      console.log("Document written with ID: ", docRef.id);
      return {status: "Success"}
    } catch (e) {
      console.error("Error adding document: ", e);
      return {status: "Error"}
    }
  }
  // Read
  async getAll(){ 
    try {
      const querySnapshot = await this.firestore.getDocs(this.firestore.collection(this.db, this.collectionName));
      const result = []
      querySnapshot.forEach((doc) => {
        result.push({id: doc.id, ...doc.data()})
      })
      return result
    } catch (error) {
      console.log(error)
      return {status: "Error"}
    }
  }
  async get(id){
    try {
      const docRef = this.firestore.doc(this.db, this.collectionName, id);
      const docSnap = await this.firestore.getDoc(docRef);
      return { id:docSnap.id, ...docSnap.data() }
    } catch (error) {
      console.log(error)
      return {status: "Error"}
    }
  }
  async update(id, prop, val){
    try {
      const docRef = this.firestore.doc(this.db, this.collectionName, id);
      const changes = {}
      changes[prop] = val
      this.firestore.setDoc(docRef, changes, { merge: true });
      return {status: "Success"}
    } catch (error) {
      console.log(error)
      return {status: "Error"}
    }
  }
  async delete(id){
    try {
      await this.firestore.deleteDoc(this.firestore.doc(this.db, this.collectionName, id))
      return {status: "Success"}
    } catch (error) {
      console.log(error)
      return {status: "Error"}
    }
  }
}