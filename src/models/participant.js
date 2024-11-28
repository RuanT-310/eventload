import { Schema, Types, model } from "mongoose";

export const ParticipantSchema = new Schema({ 
    grupo: { type: String },
    nome: { type: String, required: true },
    instituicao: { type: String, required: true },
    curso: { type: String, required: true },
    id: { type: Types.ObjectId }, 
}, { versionKey: false });

export const Participant = model('Participant', ParticipantSchema);