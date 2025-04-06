import type { NextFunction, Request, Response } from "express";

import type { FindAllLikesByPostIdUseCase } from "../../../domain/useCases/like/find-all-likes-by-post-id.usecase";
import type { FindOnlyLikeUseCase } from "../../../domain/useCases/like/find-only-like.usecase";
import type { ToggleLikeUseCase } from "../../../domain/useCases/like/toggle-like.usecase";
import decodeJwtToUserId from "../../../shared/utils/decodeJwt";
import type { ILikeInputDTO, ILikesInputByPost } from "../dtos/like.dto";

class LikeController {
	constructor(
		private toggleLikeUseCase: ToggleLikeUseCase,
		private findAllLikesByPost: FindAllLikesByPostIdUseCase,
		private findOnlyLike: FindOnlyLikeUseCase,
	) {}
	async findAllByPostId(req: Request, res: Response, next: NextFunction) {
		try {
			const id_post = Number(req.params.id);
			const findByPostId: ILikesInputByPost = {
				id_post,
			};

			const likes = await this.findAllLikesByPost.execute(findByPostId);
			return res.status(200).json(likes);
		} catch (error: unknown) {
			next(error);
		}
	}

	async toggleLike(req: Request, res: Response, next: NextFunction) {
		try {
			const token = req.headers.authorization?.split(" ")[1] || "";
			const userId = decodeJwtToUserId(token);
			const postId = Number(req.params.id);
			const likeInputDTO: ILikeInputDTO = { id_user: userId, id_post: postId };

			await this.toggleLikeUseCase.execute(likeInputDTO);

			return res.status(200).json({ message: "Like alterado com sucesso" });
		} catch (error: unknown) {
			next(error);
		}
	}

	async findOnly(req: Request, res: Response, next: NextFunction) {
		try {
			const id_post = Number(req.params.idPost);
			const id_user = Number(req.params.idUser);

			const likeDTO = { id_user, id_post };

			const response = await this.findOnlyLike.execute(likeDTO);

			return res.status(200).json({ data: response });
		} catch (error: unknown) {
			next(error);
		}
	}
}

export { LikeController };
