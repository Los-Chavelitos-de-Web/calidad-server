import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLogin, UserRegister } from 'src/models/User';
import { genHash } from 'src/utils/bcrypt';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService
    ) { }

    @Post('register')
    async register(@Body() user: UserRegister) {
        user.password = await genHash(user.password);
        return this.authService.register(user);
    }

    @Post('login')
    login(@Body() user: UserLogin) {
        return this.authService.login(user);
    }

}
