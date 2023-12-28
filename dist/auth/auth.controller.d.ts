import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from 'src/dto';
export declare class AuthController {
    private readonly AuthService;
    constructor(AuthService: AuthService);
    login(dto: LoginDto): Promise<any>;
    signup(dto: SignupDto): Promise<any>;
}
