import { Router } from "express";
import type { CommentController } from "../../app/comment/controller/comment.controller";
import type { AuthMiddleware } from "../../middlewares/auth/auth-jwt.middleware";

export class CommentsRoutes {
	private routes: Router;

	constructor(
		private commentsController: CommentController,
		private authMiddleare: AuthMiddleware,
	) {
		this.routes = Router();
		this.setupRoutes();
	}

	private setupRoutes() {
		this.routes.get(
			"/posts/:idPost/comments",
			this.authMiddleare.authJwt.bind(this.authMiddleare),
			this.commentsController.findCommentsByPostId.bind(
				this.commentsController,
			),
		);
		this.routes.post(
			"/posts/:idPost/comments",
			this.authMiddleare.authJwt.bind(this.authMiddleare),
			this.commentsController.create.bind(this.commentsController),
		);
		this.routes.put(
			"/posts/:idPost/comments/:id",
			this.authMiddleare.authJwt.bind(this.authMiddleare),
			this.commentsController.update.bind(this.commentsController),
		);
		this.routes.delete(
			"/comments/:id",
			this.authMiddleare.authJwt.bind(this.authMiddleare),
			this.commentsController.delete.bind(this.commentsController),
		);
	}

	public getRoutes() {
		return this.routes;
	}
}
