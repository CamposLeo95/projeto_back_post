import { PrismaClient } from "@prisma/client"

type postsProps = {
    title: string
    content: string
}

class PostService {

    private prisma = new PrismaClient()

    async create (dataPost: postsProps, idUser: number) {
        try {
            const { title, content } = dataPost

            if(!title && !content){
                return {status: 400, message: "Titulo ou conteudo pendente!"}
            }

            const user = await this.prisma.user.findUnique({where:{id: idUser}})

            if(!user){
                return {status: 404, message: "Usuario não cadastrado"}
            }

            const post = await this.prisma.post.create({
                data: {
                    title,
                    content,
                    userId: idUser
                }
            })
            
            if(!post){
                return {status: 400, message: "Erro ao criar post"}
            }

            return {status: 201, message: "Post criado com sucesso", post}

        } catch (error) {
            throw error
        }
        
    }

    async list (){
        const posts = await this.prisma.post.findMany({ include:{ user: true } })

        if(!posts){
            return {status:404, message: "nenhum post encontrado"}
        }

        return {status: 201, posts}
    }
}

export { PostService }