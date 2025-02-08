import { PrismaClient } from "@prisma/client";
import { PrismaUserRepository } from "../../infra/db/prisma/repositories/prisma-user.repository";
import { PostRepository } from "../post/post.repository";

import { CommentController } from "./comment.controller";
import { CommentRepository } from "./comment.repository";
import { CommentService } from "./comment.service";

const prismaClient = new PrismaClient();
const prismaUserRepository = new PrismaUserRepository(prismaClient);
const postRepository = new PostRepository();
const commentRepository = new CommentRepository();
const commentService = new CommentService(
	commentRepository,
	postRepository,
	prismaUserRepository,
);
const commentController = new CommentController(commentService);

export const CommentModule = commentController;
