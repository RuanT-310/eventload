import { Router } from "express";
import { EventController } from "../controller/eventController.js";

const eventRoute = Router()
eventRoute.get('/', EventController.getAll)
eventRoute.put('/participant', EventController.addParticipant)
eventRoute.put('/participant/remove', EventController.removeParticipant)
eventRoute.put('/:id', EventController.updated)
eventRoute.get('/:id', EventController.get)
eventRoute.post('/', EventController.create)
eventRoute.delete('/:id', EventController.destroy)

export { eventRoute }