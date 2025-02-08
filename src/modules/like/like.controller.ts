import type { Request, Response } from "express";
import decodeJwtToUserId from "../../utils/decodeJwt";
import type { IFindByPostId } from "./like.dto";
import type { ILikeController, ILikeService } from "./like.interface";

class LikeController implements ILikeController {
	private likeService: ILikeService;

	constructor(LikeService: ILikeService) {
		this.likeService = LikeService;
	}
	async findAllByPostId(req: Request, res: Response) {
		try {
			const postId = Number(req.params.id);
			const findByPostId: IFindByPostId = {
				id_post: postId,
			};

			const { status, message, data } =
				await this.likeService.findAllByPostId(findByPostId);
			return res.status(status).json({ message, data });
		} catch (error) {
			return res.status(500).json({ message: "Erro interno", error });
		}
	}

	async toggleLike(req: Request, res: Response) {
		try {
			const token = req.headers.authorization?.split(" ")[1] || "";
			const userId = decodeJwtToUserId(token);
			const postId = Number(req.params.id);
			const likeDTO = { id_user: userId, id_post: postId };

			const { status, message } = await this.likeService.toggleLike(likeDTO);

			return res.status(status).json({ message });
		} catch (error) {
			return res.status(500).json({ message: "Erro interno", error });
		}
	}

	async findOnly(req: Request, res: Response) {
		try {
			const id_post = Number(req.params.idPost);
			const id_user = Number(req.params.idUser);

			const likeDTO = { id_user, id_post };

			const { status, message, data } =
				await this.likeService.findOnly(likeDTO);
			return res.status(status).json({ message, data });
		} catch (error) {
			return res.status(500).json({ message: "Erro interno", error });
		}
	}
}

export { LikeController };
