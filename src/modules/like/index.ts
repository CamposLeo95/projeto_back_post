import { LikeController } from "./like.controller";
import { LikeRepository } from "./like.repository";

import { LikeService } from "./like.service";

const likeRepository = new LikeRepository();
const likeService = new LikeService(likeRepository);
const likeControler = new LikeController(likeService);

export const LikeModule = likeControler;
