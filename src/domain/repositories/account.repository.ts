import { CreateAccountDto, PaginationDto, UpdateAccountDto, UpdatePasswordDto } from "../dtos";
import { AccountEntity } from "../entities";

export abstract class AccountRepository {

    abstract findOneById(id: string): Promise<AccountEntity>;

    abstract findMany(dto: PaginationDto): Promise<AccountEntity[]>;

    abstract createAccount(dto: CreateAccountDto): Promise<AccountEntity>;

    abstract updateAccount(dto: UpdateAccountDto): Promise<AccountEntity>;

    abstract changeStatusAccount(id: string): Promise<AccountEntity>;

    abstract changePasswordAccount(dto: UpdatePasswordDto): Promise<Boolean>;

    abstract confirmPassword(password: string, id: string): Promise<Boolean>;
}