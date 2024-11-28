import mongoose from "mongoose";
import { Event } from "../models/event.js";
import { Participant } from "../models/participant.js";

/* id: { type: Types.ObjectId }, 
    titulo: { type: String },
    descricao: { type: String },
    data: { type: Date },
    local: { type: String }, */
export class EventController {
    static async getAll (req, res) {
        const event = await Event.find()
        res.status(200).json(event)
    }

    static async updated (req, res) {
        try {
            const { id } = req.params
            const  { titulo, descricao, data, local } = req.body
            const updateEvent = await Event.findByIdAndUpdate(
                {_id: id},
                { titulo, descricao, data: data ? new Date(data) : data, local},
                {new: true}
            )
            res.status(201).json({message: "book Success updated successfully", Event: updateEvent})
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: 'Internal server error'})
        }
        
    }

    static async get (req, res) {
        try {
            const { id } = req.params
            if (!id) return res.status(400).json({message: 'Invalid data.'})
            const event = await Event.findById(id)
            if (!Event) return res.status(404).json({message: "Event not found"})
            res.status(200).json(event)
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: 'Internal server error'})
        }
    }
    static async create (req, res) {
        try  {
            const { titulo, descricao, data, local } = req.body
            const event = await Event.create({ titulo, descricao, data:new Date(data), local })
            console.log(event)
            res.status(201).json({message: "Success", event})
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: 'Internal server error'})
        }
    }

    static async addParticipant (req, res) {

        try {
            const { participantIds, eventId } = req.body
            if (!participantIds || !Array.isArray(participantIds)) return res.status(400).json({message: 'Invalid data.'})
            const participants = await Participant.find({
                '_id': { $in: participantIds.map(id => new mongoose.Types.ObjectId(id)) }})
            //console.log(participants, "-<")
            const events = await Event.findByIdAndUpdate(
                {_id: eventId},
                { $push: { participants: { $each: participants }}},
                { new: true } )
                res.status(201).json({message: "Success", events})
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: 'Internal server error'})
        }
        

    }
    static async removeParticipant (req, res) {
        try {
            const { participantIds, eventId } = req.body
            if (!participantIds || !Array.isArray(participantIds)) return res.status(400).json({message: 'Invalid data.'})
            const participants = await Participant.find({
                '_id': { $in: participantIds.map(id => new mongoose.Types.ObjectId(id)) }})
            //console.log(participants, "-<")
            const events = await Event.findByIdAndUpdate(
                {_id: eventId},
                { $pull: { participants: { _id: participants }}},
                { new: true } )
            console.log(events)
            res.status(201).json({message: "participants removed", events})
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: 'Internal server error'})
        }
    }

    static async destroy (req, res) {
        try {
            const { id } = req.params
            if (!id) return res.status(400).json({message: 'Invalid data.'})
            await Event.findByIdAndDelete(id)
            res.status(204).json({message: 'book deleted successfully'})
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: 'Internal server error'})
        }
        
    }

}