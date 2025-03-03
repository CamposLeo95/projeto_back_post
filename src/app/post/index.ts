import { PrismaClient } from "@prisma/client";
import { CreatePostUseCase } from "../../domain/useCases/post/create-post.usecase";
import { DeletePostUseCase } from "../../domain/useCases/post/delete-post.usecase";
import { FindAllByUserPostUseCase } from "../../domain/useCases/post/find-all-post-by-user.usecase";
import { FindAllPostsUseCase } from "../../domain/useCases/post/find-all-post.usecase";
import { FindPostByID } from "../../domain/useCases/post/find-post-by-id.usecase";
import { UpdatePostUseCase } from "../../domain/useCases/post/update-post.usecase";
import { PrismaPostRepository } from "../../infra/db/prisma/repositories/prisma-post.repository";
import { PostController } from "./controller/post.controller";

const prisma = new PrismaClient();
const prismaPostRepository = new PrismaPostRepository(prisma);

const createPostUseCase = new CreatePostUseCase(prismaPostRepository);
const deletePostUseCase = new DeletePostUseCase(prismaPostRepository);
const findAllByUserPostUseCase = new FindAllByUserPostUseCase(
	prismaPostRepository,
);
const findAllPostsUseCase = new FindAllPostsUseCase(prismaPostRepository);
const findPostByID = new FindPostByID(prismaPostRepository);
const updatePostUseCase = new UpdatePostUseCase(prismaPostRepository);

export const PostModule = new PostController(
	createPostUseCase,
	deletePostUseCase,
	findAllByUserPostUseCase,
	findAllPostsUseCase,
	findPostByID,
	updatePostUseCase,
);
