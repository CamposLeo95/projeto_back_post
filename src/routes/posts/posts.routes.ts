import { Router } from "express";
import multer from "multer";
import type { PostController } from "../../app/post/controller/post.controller";
import type { AuthMiddleware } from "../../middlewares/auth/auth-jwt.middleware";

export class PostsRoutes {
	private routes: Router;

	private storage = multer.memoryStorage();
	private upload = multer({ storage: this.storage });
	constructor(
		private postController: PostController,
		private authMiddleare: AuthMiddleware,
	) {
		this.routes = Router();
		this.setupRoutes();
	}

	private setupRoutes() {
		this.routes.get(
			"/posts",
			this.authMiddleare.authJwt.bind(this.authMiddleare),
			this.postController.findAll.bind(this.postController),
		);
		this.routes.get(
			"/posts/me",
			this.authMiddleare.authJwt.bind(this.authMiddleare),
			this.postController.findAllByUser.bind(this.postController),
		);
		this.routes.get(
			"/posts/user/:userId",
			this.authMiddleare.authJwt.bind(this.authMiddleare),
			this.postController.findAllByUser.bind(this.postController),
		);
		this.routes.get(
			"/posts/:id",
			this.authMiddleare.authJwt.bind(this.authMiddleare),
			this.postController.findById.bind(this.postController),
		);
		this.routes.post(
			"/posts",
			this.upload.single("image"),
			this.authMiddleare.authJwt.bind(this.authMiddleare),
			this.postController.create.bind(this.postController),
		);
		this.routes.put(
			"/posts/:id",
			this.authMiddleare.authJwt.bind(this.authMiddleare),
			this.postController.update.bind(this.postController),
		);
		this.routes.delete(
			"/posts/:id",
			this.authMiddleare.authJwt.bind(this.authMiddleare),
			this.postController.delete.bind(this.postController),
		);
	}

	public getRoutes() {
		return this.routes;
	}
}
