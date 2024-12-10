import type { Request, Response } from "express";
import { CommentService } from "../services/CommentService";
import { LikeService } from "../services/LikeService";

interface AuthRequest extends Request {
	userId: string ;
	postId: string;
}

class LikeController {
	private likeService = new LikeService();

	 toggleLike = async (req: Request, res: Response) => {
		const userId = req.headers.userid;
		const postId = req.params.idPost;

		console.log(userId, postId);

		if (!userId) {
			return res.status(404).json({ message: "Usuario não encontrado" });
		}

		if (!postId) {
			return res.status(404).json({ message: "Post não encontrado" });
		}

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const result: any = await this.likeService.toggleLike(Number(userId), Number(postId));

		if (!result) {
			return res.status(result.status).json(result.message);
		}

		return res.status(result.status).json(result.message);
	}
}

export { LikeController };
