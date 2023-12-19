import { Router } from "express";
import { UsersControllers } from "../controllers/UserController";
import { login } from "../utils/login";

const userController = new UsersControllers()

const routes = Router()

routes.get('/users', userController.list.bind(userController))
routes.post('/users', userController.create.bind(userController))
routes.put('/users/:id', userController.update.bind(userController))
routes.delete('/users/:id', userController.delete.bind(userController))

routes.post('/login', login )

export { routes }