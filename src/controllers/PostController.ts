import type { Request, Response } from "express";
import { jwtDecode } from "jwt-decode";
import { uploadToGCS } from "../config/uploads";
import { PostService } from "../services/PostService";

interface AuthRequest extends Request {
	userId: string;
}

class PostController {
	private postService = new PostService();

	async create(req: Request, res: Response) {
		try {
			const dataPosts = req.body;
			const token = req.headers.authorization?.split(" ")[1];
			const file = req.file;
			const imagePath = file ? await uploadToGCS(file, "pets") : "";

			const userId = jwtDecode<{ userId: number }>(token || "")?.userId;

			if (!userId) {
				return res.status(404).json({ message: "Usuario não encontrado" });
			}

			if (!dataPosts) {
				return res.status(404).json({ message: "Post não encontrado" });
			}

			const result = await this.postService.create(
				dataPosts,
				userId,
				imagePath || "",
			);

			if (!result.post) {
				return res.status(result.status).json(result.message);
			}

			return res
				.status(result.status)
				.json({ message: result.message, post: result.post });
		} catch (error) {
			return res.status(500).json(error);
		}
	}

	async update(req: Request, res: Response) {
		const dataPost = req.body;
		const idPost = Number(req.params.id);
		const userId = req.headers.userid;

		const { status, message, post } = await this.postService.update(
			idPost,
			dataPost,
			Number(userId),
		);

		if (!post) {
			return res.status(400).json({ message: "Erro ao editar post" });
		}

		return res.status(status).json(message);
	}

	async list(_: Request, res: Response) {
		try {
			const result = await this.postService.list();

			return res.status(result.status).json(result.posts);
		} catch (error) {
			return res.status(500).json({ message: "error interno" });
		}
	}

	async getPostById(req: Request, res: Response) {
		const idPost = Number(req.params.id);
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			return res.status(404).json({ message: "Usuario não encontrado" });
		}

		try {
			const result = await this.postService.getPostById(idPost);

			if (!result.post) {
				return res.status(result.status).json(result.message);
			}

			return res.status(result.status).json(result.post);
		} catch (error) {
			return res.status(500).json({ message: "error interno" });
		}
	}

	async delete(req: Request, res: Response) {
		const idPost = Number(req.params.id);

		try {
			const result = await this.postService.delete(idPost);
			return res.status(result.status).json(result.message);
		} catch (error) {
			return res.status(500).json({ message: "error interno" });
		}
	}
}

export { PostController };
