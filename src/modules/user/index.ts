import { PrismaClient } from "@prisma/client";
import { PrismaUserRepository } from "../../infra/db/prisma/repositories/prisma-user.repository";
import { UsersControllers } from "../../infra/http/modules/user/user.controller";
import { CreateUserUseCase } from "./useCases/createUser/create-user.usecase";
import { DeleteUserUseCase } from "./useCases/deleteUser/delete-user.usecase";
import { FindAllUserUseCase } from "./useCases/findAllUser/find-all-user.usecase";
import { FindUserByIdUseCase } from "./useCases/findUserById/find-user-by-id.usecase";
import { UpdateUserUseCase } from "./useCases/updateUser/update-user";

const prismaClient = new PrismaClient();

const PrismaRepository = new PrismaUserRepository(prismaClient);
const findAllUser = new FindAllUserUseCase(PrismaRepository);
const findUsersByID = new FindUserByIdUseCase(PrismaRepository);
const createUser = new CreateUserUseCase(PrismaRepository);
const updateUser = new UpdateUserUseCase(PrismaRepository);
const deleteUser = new DeleteUserUseCase(PrismaRepository);

export const userController = new UsersControllers(
	findAllUser,
	findUsersByID,
	createUser,
	updateUser,
	deleteUser,
);
