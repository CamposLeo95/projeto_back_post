import { PrismaClient } from "@prisma/client";
import { CreateUserUseCase } from "../../domain/useCases/user/create-user.usecase";
import { DeleteUserUseCase } from "../../domain/useCases/user/delete-user.usecase";
import { FindAllUserUseCase } from "../../domain/useCases/user/find-all-user.usecase";
import { FindUserByIdUseCase } from "../../domain/useCases/user/find-user-by-id.usecase";
import { UpdateUserUseCase } from "../../domain/useCases/user/update-user";
import { PrismaUserRepository } from "../../infra/db/prisma/repositories/prisma-user.repository";
import { UsersControllers } from "./controller/user.controller";

const prismaClient = new PrismaClient();
const prismaUserRepository = new PrismaUserRepository(prismaClient);

const findAllUser = new FindAllUserUseCase(prismaUserRepository);
const findUsersByID = new FindUserByIdUseCase(prismaUserRepository);
const createUser = new CreateUserUseCase(prismaUserRepository);
const updateUser = new UpdateUserUseCase(prismaUserRepository);
const deleteUser = new DeleteUserUseCase(prismaUserRepository);

export const UserModule = new UsersControllers(
	findAllUser,
	findUsersByID,
	createUser,
	updateUser,
	deleteUser,
);
