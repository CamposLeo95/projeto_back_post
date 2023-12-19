import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/bcryptPassword";

type DataUsersProps = {
    name: string
    email: string
    senha: string
}

export class UsersServices{

    private prisma = new PrismaClient()

    async list () {
        try {
            const users = await this.prisma.user.findMany()

            return {status: 200, users }   
        } catch (error) {
            throw error
        }
    }

    async create(dataUsers: DataUsersProps){ 
        try { 
            const {name, email, senha} = dataUsers

            if (!name || !email || !senha) {
                return {status: 400, message: `preencha todos os campos`}
            } 
            
            const existingUser = await this.prisma.user.findUnique({
                where:{
                    email: email,
                }
            })

            if (existingUser) {
                return { status: 400, message: `usuario ${email}, já cadastrado`}
            } 

            const passwordHash = await hashPassword(senha)

            const user = await this.prisma.user.create({
                data:{
                    name,
                    email,
                    senha: passwordHash
                }
            })

            return {status: 201, message: `usuario ${user.email}, cadastrado com sucesso`}  
                       
        }  catch (error:any) {   
            throw error
        }
    }

    async update(idUser: number, {name, email, senha}: DataUsersProps){
        let passwordHash
        try {
            if(!name && !email && !senha){
                return {status: 400, message: `Informe ao menos algum dado para atualizar`}
            }

            const userFind = await this.prisma.user.findUnique({
                where: {
                    id: idUser
                }
            })

            if(!userFind){
                return {status: 404, message: `Usuario não encontrado`}
            }

            if(senha){
                passwordHash = await hashPassword(senha)
            }

            const userUpdate = await this.prisma.user.update({
                where: {
                    id: idUser
                },
                data: {
                    name,
                    email,
                    senha: passwordHash
                }
            })

            return {status: 203, message: `usuario atualizado com sucesso`, userUpdate}
        } catch (error) {
            throw error
        }
    }

    async delete(idUser: number){
        try {
            const userFind = await this.prisma.user.findUnique({
                where: {
                    id: idUser
                }
            })

            if(!userFind){
                return {status: 404, message: `Usuario não encontrado`}
            }

            await this.prisma.user.delete({
                where: {
                    id: idUser
                }
            })

            return {status: 203, message: `Usuario deletado com sucesso`}
            
        } catch (error) {
            throw error
        }
    }
}