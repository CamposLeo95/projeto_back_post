import { Router } from "express";
import type { AuthController } from "../../app/auth/controllers/auth.controllers";

export class AuthRoutes {
	private routes: Router;
	constructor(private authController: AuthController) {
		this.routes = Router();
		this.setupRoutes();
	}

	private setupRoutes() {
		this.routes.post(
			"/auth",
			this.authController.authWithEmailController.bind(this.authController),
		);
	}

	public getRoutes() {
		return this.routes;
	}
}
