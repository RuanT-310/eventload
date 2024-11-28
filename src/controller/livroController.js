import { Livro } from "../models/livro.js";


export class LivroController {
    static async getAll (req, res) {
        const livros = await Livro.find()
        res.status(200).json(livros)
    }

    static async updated (req, res) {
        try {
            const { id } = req.params
            const  { titulo, editora, preco, paginas } = req.body
            const updateLivro = await Livro.findByIdAndUpdate({_id: id}, {titulo, editora, preco, paginas})
            res.status(201).json({message: "book Success updated successfully", livro: updateLivro})
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: 'Internal server error'})
        }
        
    }

    static async get (req, res) {
        const { id } = req.params
        if (!id) return res.status(400).json({message: 'Invalid data.'})
        const livro = await Livro.findById(id)
        if (!livro) return res.status(404).json({message: "livro not found"})
        res.status(200).json(livro)
    }
    static async create (req, res) {
        console.log("livro")
        const  { titulo, editora, preco, paginas } = req.body
        const livro = await Livro.create({ titulo, editora, preco, paginas })
        console.log(livro)
        res.status(201).json({message: "Success", livro})
    }
    static async destroy (req, res) {
        try {
            const { id } = req.params
            if (!id) return res.status(400).json({message: 'Invalid data.'})
            await Livro.findByIdAndDelete(id)
            res.status(204).json({message: 'book deleted successfully'})
        } catch (error) {
            console.error(error)
            return res.status(500).json({message: 'Internal server error'})
        }
        
    }

}