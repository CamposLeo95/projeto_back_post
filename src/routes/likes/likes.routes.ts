import { Router } from "express";
import type { LikeController } from "../../app/like/controller/like.controller";
import type { AuthMiddleware } from "../../middlewares/auth/auth-jwt.middleware";

export class LikeRoutes {
	private routes: Router;
	constructor(
		private likeController: LikeController,
		private authMiddleware: AuthMiddleware,
	) {
		this.routes = Router();
		this.setupRoutes();
	}

	private setupRoutes() {
		this.routes.post(
			"/like/posts/:id",
			this.authMiddleware.authJwt.bind(this.authMiddleware),
			this.likeController.toggleLike.bind(this.likeController),
		);
		this.routes.get(
			"/like/posts/:id",
			this.authMiddleware.authJwt.bind(this.authMiddleware),
			this.likeController.findAllByPostId.bind(this.likeController),
		);
		this.routes.get(
			"/like/posts/:idPost/user/:idUser",
			this.authMiddleware.authJwt.bind(this.authMiddleware),
			this.likeController.findOnly.bind(this.likeController),
		);
	}

	public getRoutes() {
		return this.routes;
	}
}
