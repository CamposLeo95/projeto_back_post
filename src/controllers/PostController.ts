import type { Request, Response } from "express";
import { PostService } from "../services/PostService";

interface AuthRequest extends Request {
	userId: string ;
}

class PostController {
	private postService = new PostService();

	async create(req: Request, res: Response) {
		try {
			const dataPosts = req.body;
			const userId = req.headers.userid;
			const imagePath = req?.file?.path;

			if (!userId) {
				return res.status(404).json({ message: "Usuario não encontrado" });
			}

			if (!dataPosts) {
				return res.status(404).json({ message: "Post não encontrado" });
			}

			if (!imagePath) {
				return res.status(404).json({ message: "Imagem não encontrada" });
			}

		
			const result = await this.postService.create(dataPosts, Number(userId), imagePath);



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
