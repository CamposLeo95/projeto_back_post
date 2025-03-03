import { PrismaClient } from "@prisma/client";
import { AuthWithEmailUseCase } from "../../domain/useCases/auth/auth-email.usecase";
import { PrismaUserRepository } from "../../infra/db/prisma/repositories/prisma-user.repository";
import { AuthController } from "./controllers/auth.controllers";

const prismaClient = new PrismaClient();
const prismaUserRepository = new PrismaUserRepository(prismaClient);
const authWithEmail = new AuthWithEmailUseCase(prismaUserRepository);
const authController = new AuthController(authWithEmail);

export const AuthModule = authController;
