import { Router } from "express";
import { AuthModule } from "../app/auth";
import { CommentModule } from "../app/comment";
import { LikeModule } from "../app/like/index";

import { PostModule } from "../app/post";
import { UserModule } from "../app/user";

import { AuthMiddleware } from "../middlewares/auth/auth-jwt.middleware";
import { AuthRoutes } from "./auth/auth.routes";
import { CommentsRoutes } from "./comments/comments.routes";
import { LikeRoutes } from "./likes/likes.routes";
import { PostsRoutes } from "./posts/posts.routes";
import { UsersRoutes } from "./users/user.routes";

const routes = Router();
const Auth = new AuthMiddleware();

const usersRoutes = new UsersRoutes(UserModule);
const postRoutes = new PostsRoutes(PostModule, Auth);
const commentsRoutes = new CommentsRoutes(CommentModule, Auth);
const likesRoutes = new LikeRoutes(LikeModule, Auth);
const authRoutes = new AuthRoutes(AuthModule);

routes.use(usersRoutes.getRoutes());
routes.use(postRoutes.getRoutes());
routes.use(commentsRoutes.getRoutes());
routes.use(likesRoutes.getRoutes());
routes.use(authRoutes.getRoutes());

export { routes };
