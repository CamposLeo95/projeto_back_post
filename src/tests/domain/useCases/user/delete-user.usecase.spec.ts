import type { UserRepository } from "../../../../app/user/repositories/user.repository";
import { DeleteUserUseCase } from "../../../../domain/useCases/user/delete-user.usecase";

import { AppError } from "../../../../shared/exceptions/AppError";

describe("delete-user-usecase", () => {
	let userRepo: jest.Mocked<UserRepository>;
	let deleteUser: DeleteUserUseCase;

	beforeEach(() => {
		userRepo = {
			delete: jest.fn(),
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} as any;

		deleteUser = new DeleteUserUseCase(userRepo);
	});

	it("should delete function to be called with correct id", async () => {
		const id = 123;
		await deleteUser.execute(id);
		expect(userRepo.delete).toHaveBeenCalledWith(123);
	});

	it("should be return a error", async () => {
		const id = 123;

		(userRepo.delete as jest.Mock).mockRejectedValue(
			new AppError("Erro interno no servidor", 500),
		);

		await expect(userRepo.delete(id)).rejects.toThrow(
			new Error("Erro interno no servidor"),
		);
	});
});
