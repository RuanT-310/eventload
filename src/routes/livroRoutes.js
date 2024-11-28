import { Router } from "express";
import { LivroController } from "../controller/livroController.js";

const livroRoute = Router()
livroRoute.get('/', LivroController.getAll)
livroRoute.put('/:id', LivroController.updated)
livroRoute.get('/:id', LivroController.get)
livroRoute.post('/', LivroController.create)
livroRoute.delete('/:id', LivroController.destroy)

export { livroRoute }