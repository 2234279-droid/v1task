import {Schema, model, models} from 'mongoose';

const taskSchema = new Schema({ // Poder definir que parametros queremos guardar
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        unique: true,
        maxlength: [30, 'Title must be less than 30 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [100, 'Description must be less than 100 characters']
    }
}, {
    timestamps: true // Nos crea dos campos mas, createdAt y updatedAt fecha de creacion y actializacion
    //versionKey: false // Nos quita el campo __v que nos crea mongoose por defecto
})

export default models.Task || model('Task', taskSchema)//Exportarlo como modelo y no crear mas de uno