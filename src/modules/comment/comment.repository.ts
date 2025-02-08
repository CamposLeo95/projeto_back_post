import { PrismaClient } from "@prisma/client";
import type {
	ICommentCreateDTO,
	ICommentDeleteDTO,
	ICommentFindByPostIdDTO,
	ICommentUpdateDTO,
} from "./comment.dto";
import type { ICommentRepository } from "./comment.interface";

export class CommentRepository implements ICommentRepository {
	private prisma = new PrismaClient();

	async create(commentCreateDTO: ICommentCreateDTO) {
		try {
			return await this.prisma.comment.create({ data: commentCreateDTO });
		} catch (error) {
			return null;
		}
	}

	async update(commentUpdateDTO: ICommentUpdateDTO) {
		try {
			const { id, content } = commentUpdateDTO;
			return await this.prisma.comment.update({
				where: { id },
				data: { content },
			});
		} catch (error) {
			return null;
		}
	}

	async delete(commentDeleteDTO: ICommentDeleteDTO) {
		try {
			const { id } = commentDeleteDTO;
			await this.prisma.comment.delete({ where: { id } });
		} catch (error) {
			return;
		}
	}

	async findByPostId(commentByPostIdDTO: ICommentFindByPostIdDTO) {
		try {
			const { id_post } = commentByPostIdDTO;
			return await this.prisma.comment.findMany({
				where: {
					id_post,
				},
			});
		} catch (error) {
			return null;
		}
	}
}
