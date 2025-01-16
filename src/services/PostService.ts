import { PrismaClient } from "@prisma/client";
import { convertToPublicUrl } from "../utils/string";

type postsProps = {
	title: string;
	content: string;
};

class PostService {
	private prisma = new PrismaClient();

	async create(dataPost: postsProps, userId: number, imagePath: string) {
		try {
			const { content } = dataPost;

			console.log("service", imagePath);

			if (!content) {
				return { status: 400, message: "Insira um conteudo" };
			}

			const user = await this.prisma.user.findUnique({ where: { id: userId } });

			if (!user) {
				return { status: 404, message: "Usuario não cadastrado" };
			}


			const post = await this.prisma.post.create({
				data: {
					content,
					image: imagePath,
					userId: userId,
				},
			});

			if (!post) {
				return { status: 400, message: "Erro ao criar post" };
			}

			return { status: 201, message: "Post criado com sucesso", post };
		} catch (error) {
			throw new Error(`Erro ao criar post ${error}`);
		}
	}

	async update(idPost: number, dataPost: postsProps, userId: number) {
		try {
			const { content } = dataPost;

			if (!content) {
				return { status: 403, message: "Insira ao menos um campo" };
			}

			const findPost = await this.prisma.post.findUnique({
				where: {
					id: idPost,
					userId,
				},
			});

			if (!findPost) {
				return { status: 404, message: "post não encontrado" };
			}

			const post = await this.prisma.post.update({
				where: {
					id: idPost,
					userId,
				},
				data: {
					content,
				},
			});

			return { status: 200, message: "Post atualizado com sucesso", post };
		} catch (error) {
			throw new Error(`Erro ao atualizar post ${error}`);
		}
	}

	async list() {
		const posts = await this.prisma.post.findMany({
			include: { user: true, comments: true, likes: true },
			orderBy: {
				createdAt: "desc",
			},
		});

		if (!posts) {
			return { status: 404, message: "nenhum post encontrado" };
		}

		return { status: 201, posts };
	}

	async getPostById(id: number) {
		const post = await this.prisma.post.findUnique({
			where: {
				id: id,
			},
			include: { user: true, comments: true, likes: true },
		});

		if (!post) {
			return { status: 404, message: "post nao encontrado" };
		}

		return { status: 201, post };
	}

	async delete(id: number) {
		try {
			const findPost = await this.prisma.post.findUnique({
				where: {
					id: id,
				},
			});

			if (!findPost) {
				return { status: 404, message: "post não encontrado" };
			}

			await this.prisma.like.deleteMany({
				where: {
					postId: id,
				},
			});

			await this.prisma.comment.deleteMany({
				where: {
					postId: id,
				},
			});

			await this.prisma.post.delete({
				where: {
					id: findPost.id,
				},
			});

			return { status: 203, message: "Post deletado" };
		} catch (error) {
			return { status: 500, message: error };
		}
	}
}

export { PostService };
