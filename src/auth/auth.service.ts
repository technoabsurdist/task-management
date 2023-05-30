import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.usersRepository.createUser(authCredentialsDto)
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto
        const user = await this.usersRepository.findOneBy({ username: username })

        // user exists and password correct -> Sign in 
        if (user && (await bcrypt.compare(password, user.password))) {
            return 'success'
        } else {
            throw new UnauthorizedException("Please check your login credentials.")
        }
    }
}