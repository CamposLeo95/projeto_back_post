import path from "node:path";
import cors from "cors";

import express from "express";
import { routes } from "./routes/routes";
import "dotenv/config";
import { errorHandler } from "./middlewares/errors/errorHandler.middleware";

export class App {
	app = express();

	constructor() {
		this.app;
		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.app.use(express.json());
		this.app.use(cors());
		this.app.use("/uploads", express.static(path.join(__dirname, "uploads")));
		this.app.use(express.json({ limit: "10mb" }));
		this.app.use(express.urlencoded({ limit: "10mb", extended: true }));
	}

	routes() {
		this.app.use(routes);
		this.app.use(errorHandler);
	}
}

export default new App().app;
