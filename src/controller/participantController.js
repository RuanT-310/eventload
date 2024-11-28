import { Event } from "../models/event.js";
import { Participant } from "../models/participant.js";


export class ParticipantController {
    static async getAll (req, res) {
        try {
            const participant = await Participant.find()
            res.status(200).json(participant)
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: 'Internal server error'})
        }
    }

    static async getEvents (req, res) {
        try {
            const { id } = req.params
            const events = await Event.find({ "participants._id": id })
            res.status(200).json(events)
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: 'Internal server error'})
        }
    }

    static async updated (req, res) {
        try {
            const { id } = req.params
            const  { nome, curso, instituicao, grupo } = req.body
            const updateParticipant = await Participant.findByIdAndUpdate(
                {_id: id}, 
                {nome, curso, instituicao, grupo},
                { new: true }
            )
            res.status(201).json({message: "book Success updated successfully", Participant: updateParticipant})
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: 'Internal server error'})
        }
        
    }

    static async get (req, res) {
        try { 
            const { id } = req.params
            if (!id) return res.status(400).json({message: 'Invalid data.'})
            const participant = await Participant.findById(id)
            console.log(participant)
            res.status(200).json(participant)
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: 'Internal server error'})
        }
    }
    static async create (req, res) {
        try {
            const { nome, curso, instituicao, grupo } = req.body
            const participant = await Participant.create({ nome, curso, instituicao, grupo  })
            console.log(participant)
            res.status(201).json({message: "Success", participant})
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: 'Internal server error'})
        }

    }
    static async destroy (req, res) {
        try {
            const { id } = req.params
            if (!id) return res.status(400).json({message: 'Invalid data.'})
            
            await Participant.findByIdAndDelete(id)
            await Event.updateMany(
                {"participants._id": id }, 
                { $pull: { participants: { _id: [id] }}}
            )
            return res.status(204).json({message: 'book deleted successfully'})
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: 'Internal server error'})
        }
        
    }

}