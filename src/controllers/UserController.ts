import { Request, Response } from "express";
import { UsersServices } from "../services/UserService";

type userDataProps = {
    name:  string
    email: string
    senha: string
    admin?: boolean
}

export class UsersControllers {

    private userService = new UsersServices()

    async list(req: Request, res: Response){
        const users = await this.userService.list()
        try {     
            return res.status(users.status).json({users: users.users})
        } catch (error) {
            return res.status(500).json({error: error})
        }
    }

    async findUser(req: Request, res: Response){
        try {
            const idUser = Number(req.params.id)

            const result = await this.userService.findUser(idUser)

            if(!result){
                return res.status(400).json({message: "Nenhum resultado"})
            }

            return res.status(200).json(result)
        } catch (error) {
            throw error
        }
        
    }

    async create(req: Request, res: Response){
        try {
            const dataUsers:userDataProps = req.body
            const result = await this.userService.create(dataUsers)

            result && res.status(result.status).json({message: result.message})

        } catch (error:any) {

            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }

    async update(req: Request, res: Response){
        try {
            const idUser = Number(req.params.id)
            const dataUser = req.body
    
            const result = await this.userService.update(idUser, dataUser)

            return res.status(result.status).json({message: result.message, user: result.userUpdate})
            
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        }

        
    }

    async delete(req: Request, res: Response){
        try {
            const userId = Number(req.params.id)
            console.log(userId)

            const result = await this.userService.delete(userId)

            return res.status(result.status).json({message: result.message})

        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }


}