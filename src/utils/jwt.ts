import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [JWTConfig]
})
export class JWTConfig {

    constructor(
        private readonly configService: ConfigService) { }

    getConfig() {
        return {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_EXPIRES_IN') || '60s'
        }
    }
}