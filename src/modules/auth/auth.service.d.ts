import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Person } from './schemas/person.schema';
import { RefreshToken } from './schemas/refresh-token.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class AuthService {
    private readonly userModel;
    private readonly personModel;
    private readonly refreshTokenModel;
    private readonly jwtService;
    private readonly configService;
    constructor(userModel: Model<UserDocument>, personModel: Model<Person>, refreshTokenModel: Model<RefreshToken>, jwtService: JwtService, configService: ConfigService);
    private generateTokens;
    private parseExpiresIn;
    register(dto: RegisterDto): Promise<{
        data: {
            user: (import("mongoose").Document<unknown, {}, UserDocument, {}, {}> & User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
                _id: import("mongoose").Types.ObjectId;
            }> & {
                __v: number;
            }) | null;
            accessToken: string;
            refreshToken: string;
        };
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
        data: {
            user: (import("mongoose").Document<unknown, {}, UserDocument, {}, {}> & User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
                _id: import("mongoose").Types.ObjectId;
            }> & {
                __v: number;
            }) | null;
            accessToken: string;
            refreshToken: string;
        };
        message: string;
    }>;
    refresh(refreshToken: string): Promise<{
        data: {
            user: (import("mongoose").Document<unknown, {}, UserDocument, {}, {}> & User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
                _id: import("mongoose").Types.ObjectId;
            }> & {
                __v: number;
            }) | null;
            accessToken: string;
            refreshToken: string;
        };
        message: string;
    }>;
    logout(userId: string): Promise<{
        data: boolean;
        message: string;
    }>;
    getProfile(userId: string): Promise<{
        data: {
            person: (import("mongoose").Document<unknown, {}, Person, {}, {}> & Person & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            }) | null;
            email: string;
            password: string;
            role: string;
            status: string;
            deletedAt: Date | null;
            _id: import("mongoose").Types.ObjectId;
            $locals: Record<string, unknown>;
            $op: "save" | "validate" | "remove" | null;
            $where: Record<string, unknown>;
            baseModelName?: string;
            collection: import("mongoose").Collection;
            db: import("mongoose").Connection;
            errors?: import("mongoose").Error.ValidationError;
            id?: any;
            isNew: boolean;
            schema: import("mongoose").Schema;
            __v: number;
        };
        message: string;
    }>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<{
        data: import("mongoose").Document<unknown, {}, Person, {}, {}> & Person & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        message: string;
    }>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<{
        data: boolean;
        message: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        data: boolean;
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        data: boolean;
        message: string;
    }>;
}
