import type { NextFunction, Request, Response } from "express";

import type { IReqUser } from "src/shared/types/request.type";
import type { CreatePostUseCase } from "../../../domain/useCases/post/create-post.usecase";
import type { DeletePostUseCase } from "../../../domain/useCases/post/delete-post.usecase";
import type { FindAllByUserPostUseCase } from "../../../domain/useCases/post/find-all-post-by-user.usecase";
import type { FindAllPostsUseCase } from "../../../domain/useCases/post/find-all-post.usecase";
import type { FindPostByID } from "../../../domain/useCases/post/find-post-by-id.usecase";
import type { UpdatePostUseCase } from "../../../domain/useCases/post/update-post.usecase";
import {
	deleteUsersFromGCS,
	uploadPostsToGCS,
} from "../../../infra/config/gcp/uploads";
import decodeJwtToUserId from "../../../shared/utils/decodeJwt";

export class PostController {
	constructor(
		private createPost: CreatePostUseCase,
		private deletePost: DeletePostUseCase,
		private findAllPostByUser: FindAllByUserPostUseCase,
		private findAllPost: FindAllPostsUseCase,
		private findPostById: FindPostByID,
		private updatePost: UpdatePostUseCase,
	) {}
	async create(req: Request, res: Response, next: NextFunction) {
		const file = req.file;
		let imagePath = "";
		console.log("file", file);
		if (file && file?.originalname !== "undefined") {
			imagePath = (await uploadPostsToGCS(file, "posts")) || "";
		}
		try {
			const dataPosts = req.body;
			const { userId } = req?.user as IReqUser;

			const createPostDTO = {
				...dataPosts,
				image_url: imagePath,
				id_user: userId,
			};

			await this.createPost.execute(createPostDTO);

			return res.status(201).json({ message: "post criado com sucesso" });
		} catch (error: unknown) {
			deleteUsersFromGCS(imagePath);
			next(error);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const idPost = Number(req.params.id);

			const deletePostDTO = {
				id: idPost,
			};

			await this.deletePost.execute(deletePostDTO);

			return res.status(204).json({ message: "post deletado com sucesso" });
		} catch (error: unknown) {
			next(error);
		}
	}

	async findAllByUser(req: Request, res: Response, next: NextFunction) {
		try {
			let userId = Number(req.params.userId);

			if (!req.params.userId) {
				userId = Number(
					decodeJwtToUserId(req.headers.authorization?.split(" ")[1] || "0"),
				);
			}
			const findAllByUserPostDTO = {
				id_user: userId,
			};
			const post = await this.findAllPostByUser.execute(findAllByUserPostDTO);
			return res.status(200).json({ data: post });
		} catch (error: unknown) {
			next(error);
		}
	}

	async findAll(_: Request, res: Response, next: NextFunction) {
		try {
			const posts = await this.findAllPost.execute();
			return res.status(200).json({ data: posts });
		} catch (error: unknown) {
			next(error);
		}
	}

	async findById(req: Request, res: Response, next: NextFunction) {
		try {
			const id_post = Number(req.params.id);
			const findByIdPostDTO = {
				id: id_post,
			};
			const post = await this.findPostById.execute(findByIdPostDTO);

			return res.status(200).json({ data: post });
		} catch (error: unknown) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const dataPost = req.body;
			const idPost = Number(req.params.id);
			const userId = req.headers.userid;

			const updatePostDTO = {
				...dataPost,
				id: idPost,
				id_user: Number(userId),
			};
			await this.updatePost.execute(updatePostDTO);
			return res.status(204).json({ message: "post atualizado com sucesso" });
		} catch (error: unknown) {
			next(error);
		}
	}
}
