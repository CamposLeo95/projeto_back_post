import type { User } from "../entities/user.entity";

export abstract class UserRepository {
	abstract findAll(): Promise<User[] | null>;
	abstract findById(id: number): Promise<User | null>;
	abstract findByEmail(email: string): Promise<User | null>;
	abstract create(user: User): Promise<User>;
	abstract update(user: User): Promise<User>;
	abstract delete(id: number): Promise<void>;
}
