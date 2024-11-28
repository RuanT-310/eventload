import { Schema, Types, model } from "mongoose";
import { ParticipantSchema } from "./participant.js";

const schema = new Schema({ 
    id: { type: Types.ObjectId }, 
    titulo: { type: String },
    descricao: { type: String },
    data: { type: Date },
    local: { type: String },
    participants: [ParticipantSchema]
}, { versionKey: false });

export const Event = model('Event', schema);
