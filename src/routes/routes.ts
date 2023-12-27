import { Router } from "express";
import { UsersControllers } from "../controllers/UserController";
import { PostController } from "../controllers/PostController";
import { login, verifyToken } from "../utils/login";

const userController = new UsersControllers()
const postController = new PostController()

const routes = Router()


routes.get('/users', userController.list.bind(userController))
routes.get('/users/:id', userController.findUser.bind(userController))
routes.post('/users', userController.create.bind(userController))
routes.put('/users/:id', userController.update.bind(userController))
routes.delete('/users/:id', userController.delete.bind(userController))

routes.post('/login', login)

routes.get('/posts', verifyToken, postController.list.bind(postController))
routes.post('/posts', verifyToken, postController.create.bind(postController))
routes.put('/posts/:id', verifyToken, postController.update.bind(postController))
routes.delete('/posts/:id', verifyToken, postController.delete.bind(postController))


export { routes }