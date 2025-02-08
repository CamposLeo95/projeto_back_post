import type { Request, Response } from "express";
import { jwtDecode } from "jwt-decode";
import decodeJwtToUserId from "../../utils/decodeJwt";
import type {
	ICommentCreateDTO,
	ICommentDeleteDTO,
	ICommentFindByPostIdDTO,
	ICommentUpdateDTO,
} from "./comment.dto";
import type { ICommentController } from "./comment.interface";
import type { CommentService } from "./comment.service";

class CommentController implements ICommentController {
	private commentService: CommentService;

	constructor(commentService: CommentService) {
		this.commentService = commentService;
	}

	async create(req: Request, res: Response) {
		try {
			const { content } = req.body;
			const token = req.headers.authorization?.split(" ")[1];
			const postId = req.params.idPost;
			const userId = jwtDecode<{ userId: number }>(token || "")?.userId;

			const createCommentDTO: ICommentCreateDTO = {
				id_post: Number(postId),
				id_user: Number(userId),
				content,
			};

			const { status, message, data } =
				await this.commentService.create(createCommentDTO);

			return res.status(status).json({ message, data });
		} catch (error) {
			return res.status(500).json({ message: "error interno", error });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const content = req.body;
			const idComment = req.params.id;
			const userId = Number(
				decodeJwtToUserId(req.headers.authorization?.split(" ")[1] || "0"),
			);

			const updateCommentDTO: ICommentUpdateDTO = {
				id: Number(idComment),
				content: content.content,
				id_user: Number(userId),
			};

			const { status, message, data } =
				await this.commentService.update(updateCommentDTO);

			return res.status(status).json({ message, data });
		} catch (error) {
			return res.status(500).json({ message: "error interno", error });
		}
	}

	async findByPostId(req: Request, res: Response) {
		try {
			const { idPost } = req.params;

			const findByPostIdDTO: ICommentFindByPostIdDTO = {
				id_post: Number(idPost),
			};

			const { status, message, data } =
				await this.commentService.findByPostId(findByPostIdDTO);

			return res.status(status).json({ message, data });
		} catch (error) {
			return res.status(500).json({ message: "error interno", error });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const idComment = req.params.id;

			const commentDeleteDTO: ICommentDeleteDTO = {
				id: Number(idComment),
			};

			const { status, message } =
				await this.commentService.delete(commentDeleteDTO);

			return res.status(status).json(message);
		} catch (error) {
			return res.status(500).json({ message: "error interno", error });
		}
	}
}

export { CommentController };
