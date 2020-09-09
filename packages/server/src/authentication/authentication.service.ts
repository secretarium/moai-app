import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserAlreadyExistsException from '../exceptions/UserAlreadyExistsException';
import CreateUserDto from '../user/user.dto';
import User from '../user/user.interface';
import userModel from './../user/user.model';

class AuthenticationService {
    public user = userModel;

    public async register(userData: CreateUserDto): Promise<Moai.UserCreationData> {
        if (
            await this.user.findOne({ email: `${userData.email}` })
        ) {
            throw new UserAlreadyExistsException(userData.email);
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await this.user.create({
            ...userData,
            password: hashedPassword
        });
        const tokenData = this.createToken(user);
        const cookie = this.createCookie(tokenData);
        return {
            cookie,
            user
        };
    }
    public createCookie(tokenData: Moai.TokenData): string {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }

    public createToken(user: User): Moai.TokenData {
        const expiresIn = 60 * 60; // an hour
        const secret = process.env.JWT_SECRET;
        const dataStoredInToken: Moai.DataStoredInToken = {
            _id: user._id
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn })
        };
    }
}

export default AuthenticationService;
