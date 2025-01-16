import { PrismaClient } from "@prisma/client";

class CommentService {
	private prisma = new PrismaClient();

	async create(content: string, userId: number, postId: number) {
		try {
			if (!content) {
				return { status: 400, message: "Titulo ou conteudo pendente!" };
			}
			const user = await this.prisma.user.findUnique({ where: { id: userId } });
			const post = await this.prisma.post.findUnique({ where: { id: postId } });

			console.log("service", content);

			if (!user) {
				return { status: 404, message: "Usuario não cadastrado" };
			}

			if (!post) {
				return { status: 404, message: "Post não cadastrado" };
			}

			const comment = await this.prisma.comment.create({
				data: {
					content,
					userId,
					postId,
				},
			});

			console.log("service", comment);

			if (!comment) {
				return { status: 400, message: "Erro ao criar Comentario" };
			}

			return { status: 201, message: "Comentario criado com sucesso", comment };
		} catch (error) {
			throw new Error(`Erro ao criar Comentario ${error}`);
		}
	}

	async update(content: string, userId: number, idComment: number) {
		try {
			if (!content) {
				return { status: 403, message: "Insira ao menos um campo" };
			}

			const findComment = await this.prisma.comment.findFirst({
				where: {
					id: idComment,
					userId: userId,
				},
			});

			if (!findComment) {
				return { status: 404, message: "Comentario não encontrado" };
			}

			const comment = await this.prisma.comment.update({
				where: {
					id: idComment,
					userId,
				},
				data: {
					content,
				},
			});

			return {
				status: 200,
				message: "Comentario atualizado com sucesso",
				comment,
			};
		} catch (error) {
			throw new Error(`Erro ao atualizar post ${error}`);
		}
	}

	async listCommentsByPostId(postId: string) {
		const comments = await this.prisma.comment.findMany({
			where: {
				postId: Number(postId),
			},
		});

		if (!comments) {
			return { status: 404, message: "nenhum comentario encontrado" };
		}

		return { status: 201, comments };
	}

	async delete(id: number) {
		try {
			const findComment = await this.prisma.comment.findUnique({
				where: {
					id: id,
				},
			});

			if (!findComment) {
				return { status: 404, message: "usuario não encontrado" };
			}

			await this.prisma.post.delete({
				where: {
					id: id,
				},
			});

			return { status: 203, message: "Comentario deletado" };
		} catch (error) {
			throw new Error("Erro ao apagar Comentario");
		}
	}
}

export { CommentService };
