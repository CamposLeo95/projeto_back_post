import { PrismaClient } from "@prisma/client";
import { FindAllLikesByPostIdUseCase } from "../../domain/useCases/like/find-all-likes-by-post-id.usecase";
import { FindOnlyLikeUseCase } from "../../domain/useCases/like/find-only-like.usecase";
import { ToggleLikeUseCase } from "../../domain/useCases/like/toggle-like.usecase";
import { PrismaLikeRepository } from "../../infra/db/prisma/repositories/prisma-like.repository";
import { LikeController } from "./controller/like.controller";

const prisma = new PrismaClient();
const prismaLikeRepository = new PrismaLikeRepository(prisma);

const findAllLikesByPostIdUseCase = new FindAllLikesByPostIdUseCase(
	prismaLikeRepository,
);
const findOnlyLike = new FindOnlyLikeUseCase(prismaLikeRepository);
const toggleLike = new ToggleLikeUseCase(prismaLikeRepository);
const likeControler = new LikeController(
	toggleLike,
	findAllLikesByPostIdUseCase,
	findOnlyLike,
);

export const LikeModule = likeControler;
