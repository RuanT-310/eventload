import { Router } from "express";
import { ParticipantController } from "../controller/participantController.js";

const participantRoute = Router()
participantRoute.get('/', ParticipantController.getAll)
participantRoute.get('/event/:id', ParticipantController.getEvents)
participantRoute.put('/:id', ParticipantController.updated)
participantRoute.get('/:id', ParticipantController.get)
participantRoute.post('/', ParticipantController.create)
participantRoute.delete('/:id', ParticipantController.destroy)

export { participantRoute }