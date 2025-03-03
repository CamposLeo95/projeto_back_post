import type { User } from "@prisma/client";
import type {
	IUserInputCreateDTO,
	IUserInputUpdateDTO,
	IUserOutputDTO,
} from "../dtos/user.dto";

export abstract class UserRepository {
	abstract findAll(): Promise<IUserOutputDTO[] | null>;
	abstract findById(id: number): Promise<IUserOutputDTO>;
	abstract findByEmail(email: string): Promise<IUserOutputDTO>;
	abstract create(user: IUserInputCreateDTO): Promise<void>;
	abstract update(user: IUserInputUpdateDTO): Promise<void>;
	abstract delete(id: number): Promise<void>;
}
