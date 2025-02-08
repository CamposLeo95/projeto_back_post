import { PrismaClient } from "@prisma/client";
import { PrismaUserRepository } from "../../infra/db/prisma/repositories/prisma-user.repository";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";

const prismaClient = new PrismaClient();
const prismaUserRepository = new PrismaUserRepository(prismaClient);
const loginService = new LoginService(prismaUserRepository);
const loginController = new LoginController(loginService);

export const LoginModule = loginController;
