import type { UserRepository } from "../../../../app/user/repositories/user.repository";
import { CreateUserUseCase } from "../../../../domain/useCases/user/create-user.usecase";
import { AppError } from "../../../../shared/exceptions/AppError";
import { hashPassword } from "../../../../shared/utils/bcryptPassword";

// Mock representa um objeto que voce nao quer que rode com a funcao normal mas que execute com lkum resultado determinado

// Nesse exemplo estamos determinando que a funcao sera o retorno de uma funcao Mocked
jest.mock("../../../../shared/utils/bcryptPassword", () => ({
	hashPassword: jest.fn() as jest.MockedFunction<typeof hashPassword>, // Tipando corretamente como jest.MockedFunction
}));

describe("create-user-usecase", () => {
	// Mocked funciona como uma tipagem do typeScript para a gente determinar um tipo sera um mocked

	// Neste exemplo, estamos criando um mock do repositório de usuários (UserRepository) e utilizando jest.Mocked<UserRepository> para garantir que o TypeScript saiba que o userRepo é um mock de um UserRepository. Dessa forma, você pode usar funções como jest.fn() para simular os métodos de UserRepository, e o TypeScript terá a verificação de tipo correta.
	let userRepo: jest.Mocked<UserRepository>;
	let createUserUseCase: CreateUserUseCase;

	beforeEach(() => {
		userRepo = {
			create: jest.fn(),
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} as any;

		createUserUseCase = new CreateUserUseCase(userRepo);
	});

	it("should be create a new user with a hash password", async () => {
		(
			hashPassword as jest.MockedFunction<typeof hashPassword>
		).mockResolvedValue("hashed_password");
		const userInputDTO = {
			name: "John Doe",
			email: "johndoe@email.com",
			password: "123456",
			admin: false,
			image_perfil: "url_da_imagem_perfil",
			image_cover: "url_da_imagem_cover",
			bio: "Bio do usuário",
		};

		await createUserUseCase.execute(userInputDTO);

		// Aqui ele sabe que tem que ter uma funcao dentro do createUserUseCase que sera a hashPassword entao no seu codigo original voce precisara ter essa funcao
		expect(hashPassword).toHaveBeenCalledWith("123456");
		expect(userRepo.create).toHaveBeenCalledWith({
			...userInputDTO,
			password: "hashed_password",
		});
	});

	it("should be return a error if something is wrong", async () => {
		(
			hashPassword as jest.MockedFunction<typeof hashPassword>
		).mockRejectedValueOnce(new Error("Erro ao criptografar"));

		const userInputDTO = {
			name: "John Doe",
			email: "johndoe@email.com",
			password: "123456",
			admin: false,
			image_perfil: "url_da_imagem_perfil",
			image_cover: "url_da_imagem_cover",
			bio: "Bio do usuário",
		};

		await expect(createUserUseCase.execute(userInputDTO)).rejects.toThrow(
			new AppError("Erro interno no servidor", 500),
		);
	});
});
