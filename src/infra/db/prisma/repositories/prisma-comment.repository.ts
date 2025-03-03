import type { PrismaClient } from "@prisma/client";

import type {
	ICommentCreateInputDTO,
	ICommentDeleteInputDTO,
	ICommentFindByPostIdInputDTO,
	ICommentUpdateInputDTO,
} from "../../../../app/comment/dtos/comment.dto";
import type { CommentRepository } from "../../../../app/comment/repositories/comment.repository";
import { AppError } from "../../../../shared/exceptions/AppError";
import { PrismaCommentMapper } from "../mappers/prisma-comment.mapper";

export class PrismaCommentRepository implements CommentRepository {
	constructor(private client: PrismaClient) {}

	async create(dataDTO: ICommentCreateInputDTO) {
		try {
			const { id_post, id_user } = dataDTO;
			const post = await this.client.post.findUnique({
				where: {
					id: id_post,
				},
			});
			if (!post) throw new AppError("Nenhum post encontrado", 404);

			const user = await this.client.user.findUnique({
				where: { id: id_user },
			});

			if (!user) throw new AppError("Usuario nao encontrado", 404);

			await this.client.comment.create({ data: dataDTO });
		} catch (error) {
			if (!(error instanceof AppError)) {
				throw new AppError("Erro interno ao criar comentários", 500);
			}
			throw error;
		}
	}

	async update(dataDTO: ICommentUpdateInputDTO) {
		try {
			const { id_user } = dataDTO;

			const user = await this.client.user.findUnique({
				where: { id: id_user },
			});

			if (!user) throw new AppError("Usuario nao encontrado", 404);
			await this.client.comment.update({
				where: { id: dataDTO.id, id_user: dataDTO.id_user },
				data: {
					content: dataDTO.content,
				},
			});
		} catch (error) {
			if (!(error instanceof AppError)) {
				throw new AppError("Erro interno ao atualizar comentários", 500);
			}
			throw error;
		}
	}

	async delete(dataDTO: ICommentDeleteInputDTO) {
		try {
			await this.client.comment.delete({
				where: { id: dataDTO.id, id_user: dataDTO.id_user },
			});
		} catch (error) {
			if (!(error instanceof AppError)) {
				throw new AppError("Erro interno ao deletar comentários", 500);
			}
			throw error;
		}
	}

	async findCommentsByPostId(dataDTO: ICommentFindByPostIdInputDTO) {
		try {
			const { id_post } = dataDTO;

			const post = await this.client.post.findUnique({
				where: { id: id_post },
			});

			if (!post) throw new AppError("Nenhum post encontrado", 404);

			const comments = await this.client.comment.findMany({
				where: { id_post: dataDTO.id_post },
			});
			if (!comments.length) {
				throw new Error("Nenhum Comentario encontrado");
			}
			return comments.map(PrismaCommentMapper.toDomain);
		} catch (error) {
			if (!(error instanceof AppError)) {
				throw new AppError("Erro interno ao buscar comentários", 500);
			}
			throw error;
		}
	}
}
