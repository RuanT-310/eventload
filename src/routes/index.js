import { livroRoute } from "./livroRoutes.js";
import express from "express";
import { participantRoute } from "./participantRoutes.js";
import { eventRoute } from "./eventRoutes.js";
/** 
 * @param { express } app
 * @returns { void }
*/
export function routes(app) {
    app.use(express.json());
    app.use('/livros', livroRoute)
    app.use('/event', eventRoute)
    app.use('/participant', participantRoute)
}