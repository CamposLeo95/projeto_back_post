import type { Request, Response } from "express";
import { CommentService } from "../services/CommentService";

interface AuthRequest extends Request {
	userId: string ;
	postId: string;
}

class CommentController {
	private commentService = new CommentService();

	async create(req: Request, res: Response) {
		try {
			const content = req.body;
			const userId = req.headers.userid;
			const postId = req.params.idPost;


			if (!userId) {
				return res.status(404).json({ message: "Usuario não encontrado" });
			}

			if (!postId) {
				return res.status(404).json({ message: "Post não encontrado" });
			}

			const result = await this.commentService.create(content, Number(userId), Number(postId));

			if (!result.comment) {
				return res.status(result.status).json(result.message);
			}

			return res
				.status(result.status)
				.json({ message: result.message, post: result.comment });
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async update(req: Request, res: Response) {
		const content = req.body;
		const idComment = req.params.id;
		const { userId } = req as AuthRequest;

		const { status, message, comment } = await this.commentService.update(
			idComment,
			content,
			Number(userId),
		);

		if (!comment) {
			return res.status(400).json({ message: "Erro ao editar comentario" });
		}

		return res.status(status).json(message);
	}

async listCommentsByIdPost(req: Request, res: Response) {

		try {
			const result = await this.commentService.listCommentsByPostId(req.params.idPost);

			return res.status(200).json(result);
		} catch (error) {
			return res.status(500).json({ message: "error interno" });
		}
	}


	async delete(req: Request, res: Response) {
		const idComment = Number(req.params.id);
		try {
			const result = await this.commentService.delete(idComment);

			return res.status(result.status).json(result.message);
		} catch (error) {
			return res.status(500).json({ message: "error interno" });
		}
	}
}

export { CommentController };
