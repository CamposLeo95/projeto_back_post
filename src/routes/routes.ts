import { Router } from "express";
import upload from "../config/multer";
import { CommentController } from "../controllers/CommentController";
import { LikeController } from "../controllers/LikeController";
import { PostController } from "../controllers/PostController";
import { UsersControllers } from "../controllers/UserController";
import { login, verifyToken } from "../utils/login";

const userController = new UsersControllers()
const postController = new PostController()
const commentController = new CommentController()
const likeController = new LikeController()

const routes = Router()

routes.get('/users', userController.list.bind(userController))
routes.get('/users/:id', userController.findUser.bind(userController))
routes.post('/users', userController.create.bind(userController))
routes.put('/users/:id', userController.update.bind(userController))
routes.delete('/users/:id', userController.delete.bind(userController))

routes.post('/login', login)

routes.get('/posts', verifyToken, postController.list.bind(postController))
routes.post('/posts',upload.single("image"), verifyToken, postController.create.bind(postController))
routes.put('/posts/:id', verifyToken, postController.update.bind(postController))
routes.delete('/posts/:id', verifyToken, postController.delete.bind(postController))

routes.get('/posts/:idPost/comments', verifyToken, commentController.listCommentsByIdPost.bind(commentController))
routes.post('/posts/:idPost/comments', verifyToken, commentController.create.bind(commentController))
routes.put('/posts/:idPost/comments/:id', verifyToken, commentController.update.bind(commentController))
routes.delete('/posts/:idPost/comments/:id', verifyToken, commentController.delete.bind(commentController))

routes.post('/posts/:idPost/like', verifyToken, likeController.toggleLike.bind(likeController))




export { routes }