import type { UserRepository } from "../../../../app/user/repositories/user.repository";
import { FindAllUserUseCase } from "../../../../domain/useCases/user/find-all-user.usecase";

describe("find-all-users-usecase", () => {
	let userRepo: jest.Mocked<UserRepository>;
	let findAllUsers: FindAllUserUseCase;

	beforeEach(() => {
		userRepo = {
			findAll: jest.fn(),
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} as any;

		findAllUsers = new FindAllUserUseCase(userRepo);
	});

	it("should return the correct users lenght", async () => {
		userRepo.findAll.mockResolvedValueOnce([
			{
				id: 1,
				name: "John Doe",
				email: "john@example.com",
				password: "hash_pass",
				createdAt: new Date("2025-03-24T14:25:22.402Z"),
				admin: false,
			},
		]);

		const result = await findAllUsers.execute();

		expect(result?.length).toBe(1);
	});

	it("should return all users correct", async () => {
		userRepo.findAll.mockResolvedValueOnce([
			{
				id: 1,
				name: "John Doe",
				email: "john@example.com",
				password: "hash_pass",
				createdAt: new Date("2025-03-24T14:25:22.402Z"),
				admin: false,
			},
			{
				id: 2,
				name: "jane Doe",
				email: "jane@example.com",
				password: "hash_pass",
				createdAt: new Date("2025-03-24T14:25:22.402Z"),
				admin: false,
			},
		]);

		// chamar
		const result = await findAllUsers.execute();
		// retorno

		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		expect(result![0]).toEqual({
			id: 1,
			name: "John Doe",
			email: "john@example.com",
			password: "hash_pass",
			createdAt: new Date("2025-03-24T14:25:22.402Z"),
			admin: false,
		});
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		expect(result![1]).toEqual({
			id: 2,
			name: "jane Doe",
			email: "jane@example.com",
			password: "hash_pass",
			createdAt: new Date("2025-03-24T14:25:22.402Z"),
			admin: false,
		});
	});
});
