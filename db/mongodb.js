import envVar from 'dotenv'
const env = envVar.config().parsed

// Se encarga de recibir los import y ejecutar las funciones CRUD
// de MongoDB

export class mongoCollection{
    constructor(mongoose, model){
        mongoose.connect(env.MONGOURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, e => {
            if (e) throw new Error (e)
            else console.log('Mongo connection success')
        })
        this.model = model
    }

    async get(id){
        try {
            const res = await this.model.findById(id, {__v:0})
            const copy = res._doc
            copy.id = id
            delete copy._id
            return copy
            // Es rarisimo esto que hice pero fue necesario para poder tener la prop id en vez de _id
        } catch (error) {
            console.log(error)
            return {status: "error"}
        }
    }

    async getAll(){
        try {
            const res = await this.model.find({}, {__v: false})
            return res
        } catch (error) {
            console.log(error)
            return {status: "error"}
        }
    }

    async add(obj){
        try {
            obj.timestamp = new Date(Date.now()).toLocaleString()
            const res = await this.model.create(obj)
            return res
        } catch (error) {
            console.log(error)
            return {status: "error"}
        }
    }

    async update(id, prop, val){ 
        try {
            const update = {[prop]: val}
            const res = await this.model.findByIdAndUpdate(id, update, {new: true})
            return res
        } catch (error) {
            console.log(error)
            return {status: "error"}   
        }
    }

    async delete(id){
        try {
            const res = await this.model.deleteOne({_id: id})
            return {status: "Success"}
        } catch (error) {
            console.log(error)
            return {status: "error"}
        }
    }
}