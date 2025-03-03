import { PrismaClient } from "@prisma/client";
import { CreateCommentUseCase } from "../../domain/useCases/comment/create-comment.usecase";
import { DeleteCommentUseCase } from "../../domain/useCases/comment/delete-comment.usecase";
import { FindCommentByPostIdUseCase } from "../../domain/useCases/comment/find-comment-by-id.usecase";
import { UpdateCommentUseCase } from "../../domain/useCases/comment/update-comment.usecase";
import { PrismaCommentRepository } from "../../infra/db/prisma/repositories/prisma-comment.repository";
import { CommentController } from "./controller/comment.controller";

const prisma = new PrismaClient();
const prismCommentsRepository = new PrismaCommentRepository(prisma);

const createCommentUseCase = new CreateCommentUseCase(prismCommentsRepository);
const updateCommentUseCase = new UpdateCommentUseCase(prismCommentsRepository);
const findCommentsByPostId = new FindCommentByPostIdUseCase(
	prismCommentsRepository,
);
const deleteCommentUseCase = new DeleteCommentUseCase(prismCommentsRepository);
const commentController = new CommentController(
	createCommentUseCase,
	updateCommentUseCase,
	findCommentsByPostId,
	deleteCommentUseCase,
);

export const CommentModule = commentController;
