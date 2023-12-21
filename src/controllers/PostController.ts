import { Request, Response } from "express"
import { PostService } from "../services/PostService"

interface AuthRequest extends Request{
    userId?: any 
}

class PostController {

    private postService = new PostService()

    async create (req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const dataPosts = req.body
            const {userId} = req.userId

            if(!userId) {
                return res.status(404).json({message: "Usuario não encontrado"})
            }
    
            const result = await this.postService.create(dataPosts, userId)
    
            if(!result.post){
               return res.status(result.status).json(result.message)
            }
    
            return res.status(result.status).json({message: result.message, post: result.post})
            
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async update(req: AuthRequest, res: Response){
        const dataPost = req.body
        const idPost = Number(req.params.id)
        const {userId} = req.userId 

        const {status, message, post} = await this.postService.update(idPost, dataPost, userId)

        if(!post){
            return res.status(400).json({message: "Erro ao editar post"})
        }

        return res.status(status).json(message)
    }
    
    async list (req: Request, res: Response): Promise<void>{
        const result = await this.postService.list()

        result && res.status(result.status).json(result.posts)
    }
}

export { PostController }