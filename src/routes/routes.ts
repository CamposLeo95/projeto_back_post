import { Router } from "express";
import multer from "multer";

import { CommentModule } from "../modules/comment";
import { LikeModule } from "../modules/like/index";
import { LoginModule } from "../modules/login";
import { PostModule } from "../modules/post";

import { userController } from "../modules/user";
import { UsersRoutes } from "./users/user.routes";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const routes = Router();

const usersRoutes = new UsersRoutes(userController);

routes.use(usersRoutes.getRoutes());

routes.post("/login", LoginModule.login.bind(LoginModule));

routes.get(
	"/posts",
	LoginModule.verifyToken.bind(LoginModule),
	PostModule.findAll.bind(PostModule),
);
routes.get(
	"/posts/me",
	LoginModule.verifyToken.bind(LoginModule),
	PostModule.findAllByUserPost.bind(PostModule),
);
routes.get(
	"/posts/user/:userId",
	LoginModule.verifyToken.bind(LoginModule),
	PostModule.findAllByUserPost.bind(PostModule),
);
routes.get(
	"/posts/:id",
	LoginModule.verifyToken.bind(LoginModule),
	PostModule.findById.bind(PostModule),
);
routes.post(
	"/posts",
	upload.single("image"),
	LoginModule.verifyToken.bind(LoginModule),
	PostModule.create.bind(PostModule),
);
routes.put(
	"/posts/:id",
	LoginModule.verifyToken.bind(LoginModule),
	PostModule.update.bind(PostModule),
);
routes.delete(
	"/posts/:id",
	LoginModule.verifyToken.bind(LoginModule),
	PostModule.delete.bind(PostModule),
);

routes.get(
	"/posts/:idPost/comments",
	LoginModule.verifyToken.bind(LoginModule),
	CommentModule.findByPostId.bind(CommentModule),
);
routes.post(
	"/posts/:idPost/comments",
	LoginModule.verifyToken.bind(LoginModule),
	CommentModule.create.bind(CommentModule),
);
routes.put(
	"/posts/:idPost/comments/:id",
	LoginModule.verifyToken.bind(LoginModule),
	CommentModule.update.bind(CommentModule),
);
routes.delete(
	"/comments/:id",
	LoginModule.verifyToken.bind(LoginModule),
	CommentModule.delete.bind(CommentModule),
);

routes.post("/like/posts/:id", LikeModule.toggleLike.bind(LikeModule));
routes.get("/like/posts/:id", LikeModule.findAllByPostId.bind(LikeModule));
routes.get(
	"/like/posts/:idPost/user/:idUser",
	LikeModule.findOnly.bind(LikeModule),
);

export { routes };
