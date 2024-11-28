import { Schema, Types, model } from "mongoose";

const schema = new Schema({ 
    id: { type: Types.ObjectId }, 
    titulo: { type: String, required: true },
    editora: { type: String },
    preco: { type: Number },
    paginas: { type: Number }
}, { versionKey: false });

export const Livro = model('Livro', schema);