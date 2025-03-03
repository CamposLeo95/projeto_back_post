import type { NextFunction, Request, Response } from "express";
import { jwtDecode } from "jwt-decode";
import type { CreateCommentUseCase } from "../../../domain/useCases/comment/create-comment.usecase";
import type { DeleteCommentUseCase } from "../../../domain/useCases/comment/delete-comment.usecase";
import type { FindCommentByPostIdUseCase } from "../../../domain/useCases/comment/find-comment-by-id.usecase";
import type { UpdateCommentUseCase } from "../../../domain/useCases/comment/update-comment.usecase";
import { AppError } from "../../../shared/exceptions/AppError";
import decodeJwtToUserId from "../../../shared/utils/decodeJwt";
import type {
	ICommentCreateInputDTO,
	ICommentDeleteInputDTO,
	ICommentFindByPostIdInputDTO,
	ICommentUpdateInputDTO,
} from "../dtos/comment.dto";

class CommentController {
	constructor(
		private createCommentUseCase: CreateCommentUseCase,
		private updateCommentUseCase: UpdateCommentUseCase,
		private findCommentsByPostIdUseCase: FindCommentByPostIdUseCase,
		private deleteComment: DeleteCommentUseCase,
	) {}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const { content } = req.body;
			const token = req.headers.authorization?.split(" ")[1];
			const postId = req.params.idPost;
			const userId = jwtDecode<{ userId: number }>(token || "")?.userId;

			const createCommentDTO: ICommentCreateInputDTO = {
				id_post: Number(postId),
				id_user: Number(userId),
				content,
			};

			await this.createCommentUseCase.execute(createCommentDTO);
			return res
				.status(201)
				.json({ message: "Comentario criado com sucesso!" });
		} catch (error: unknown) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const content = req.body;
			const idComment = req.params.id;
			const userId = Number(
				decodeJwtToUserId(req.headers.authorization?.split(" ")[1] || "0"),
			);

			const updateCommentDTO: ICommentUpdateInputDTO = {
				id: Number(idComment),
				content: content.content,
				id_user: Number(userId),
			};
			await this.updateCommentUseCase.execute(updateCommentDTO);

			return res
				.status(200)
				.json({ message: "Comentario Atualizado com sucesso" });
		} catch (error: unknown) {
			next(error);
		}
	}

	async findCommentsByPostId(req: Request, res: Response, next: NextFunction) {
		try {
			const { idPost } = req.params;

			const findByPostIdDTO: ICommentFindByPostIdInputDTO = {
				id_post: Number(idPost),
			};

			const comments =
				await this.findCommentsByPostIdUseCase.execute(findByPostIdDTO);

			return res.status(200).json(comments);
		} catch (error: unknown) {
			next(error);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id);
			const userId = Number(
				decodeJwtToUserId(req.headers.authorization?.split(" ")[1] || "0"),
			);

			const commentDeleteDTO: ICommentDeleteInputDTO = {
				id,
				id_user: userId,
			};
			await this.deleteComment.execute(commentDeleteDTO);
			return res
				.status(200)
				.json({ message: "Comentario deletado com sucesso!" });
		} catch (error) {
			next(error);
		}
	}
}

export { CommentController };
