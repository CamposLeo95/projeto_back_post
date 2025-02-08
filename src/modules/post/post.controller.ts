import type { Request, Response } from "express";
import { deleteUsersFromGCS, uploadPostsToGCS } from "../../config/uploads";
import decodeJwtToUserId from "../../utils/decodeJwt";
import type { IPostController, IPostService } from "./post.interface";

interface AuthRequest extends Request {
	userId: string;
}

class PostController implements IPostController {
	private postService: IPostService;

	constructor(postService: IPostService) {
		this.postService = postService;
	}

	async create(req: Request, res: Response) {
		try {
			const dataPosts = req.body;
			const file = req.file;
			let imagePath = "";
			if (file) {
				imagePath = (await uploadPostsToGCS(file, "posts")) || "";
			}
			const userId = Number(
				decodeJwtToUserId(req.headers.authorization?.split(" ")[1] || "0"),
			);

			const createPostDTO = {
				...dataPosts,
				image_url: imagePath,
				id_user: userId,
			};

			const { status, message, data } =
				await this.postService.create(createPostDTO);

			if (status !== 201) {
				await deleteUsersFromGCS(imagePath);
				return res.status(status).json({ message });
			}

			return res.status(status).json({ message, data });
		} catch (error) {
			return res.status(500).json({ message: "error interno", error });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const dataPost = req.body;
			const idPost = Number(req.params.id);
			const userId = req.headers.userid;

			const updatePostDTO = {
				...dataPost,
				id: idPost,
				id_user: Number(userId),
			};

			const { status, message, data } =
				await this.postService.update(updatePostDTO);
			return res.status(status).json({ message, data });
		} catch (error) {
			return res.status(500).json({ message: "error interno", error });
		}
	}

	async findAll(_: Request, res: Response) {
		try {
			const { status, message, data } = await this.postService.findAll();

			return res.status(status).json({ message, data });
		} catch (error) {
			return res.status(500).json({ message: "error interno", error });
		}
	}

	async findById(req: Request, res: Response) {
		try {
			const id_post = Number(req.params.id);
			const findByIdPostDTO = {
				id: id_post,
			};
			const { status, message, data } =
				await this.postService.findById(findByIdPostDTO);

			return res.status(status).json({ message, data });
		} catch (error) {
			return res.status(500).json({ message: "error interno", error });
		}
	}

	async findAllByUserPost(req: Request, res: Response) {
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

			const { status, message, data } =
				await this.postService.findAllByUserPost(findAllByUserPostDTO);

			return res.status(status).json({ message, data });
		} catch (error) {
			return res.status(500).json({ message: "error interno", error });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const idPost = Number(req.params.id);

			const deletePostDTO = {
				id: idPost,
			};

			const { status, message, data } =
				await this.postService.delete(deletePostDTO);

			return res.status(status).json({ message, data });
		} catch (error) {
			return res.status(500).json({ message: "error interno" });
		}
	}
}

export { PostController };
