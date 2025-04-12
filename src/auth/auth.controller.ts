import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/models/User';
import { genHash } from 'src/utils/bcrypt';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService
    ) { }

    @Post('register')
    async register(@Body() user: User) {
        user.password = await genHash(user.password);
        return this.authService.register(user);
    }

    @Post('login')
    login(@Body() user: User) {
        return this.authService.login(user);
    }

}
