import { PrismaClient } from "@prisma/client"

class LikeService {

    private prisma = new PrismaClient()

async toggleLike(userId: number, postId: number) {
    try {
        const isLiked = await this.prisma.like.findFirst({
            where :{
                userId,
                postId
            }
        })
        if(isLiked){
            await this.prisma.like.delete({
                where: {
                    id: isLiked.id
                }
            })
            return {status: 200, message: "Descurtido com sucesso"}
        }

        await this.prisma.like.create({
            data: {
                userId,
                postId
            }
        })

        return {status: 200, message: "Curtido com sucesso"}

        
    } catch (error) {
        throw new Error(`Erro ao curtir post ${error}`)
    }
}
}
export { LikeService }