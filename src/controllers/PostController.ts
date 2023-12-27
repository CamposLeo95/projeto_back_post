import { Request, Response } from "express"
import { PostService } from "../services/PostService"

interface AuthRequest extends Request{
    userId?: any 
}

class PostController {

    private postService = new PostService()

    async create (req: AuthRequest, res: Response) {
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
            res.status(500).json(error)
        }
    }
    
    async list (req: Request, res: Response){
        try {
            const result = await this.postService.list()
    
            return res.status(result.status).json(result.posts)
            
        } catch (error) {
            
        }
    }
}

export { PostController }