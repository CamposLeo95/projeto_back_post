import { PostController } from "./post.controller";
import { PostRepository } from "./post.repository";
import { PostService } from "./post.service";

const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const postController = new PostController(postService);

export const PostModule = postController;
