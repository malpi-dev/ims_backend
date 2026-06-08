import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshDto } from './dto/refresh.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        data: {
            user: (import("mongoose").Document<unknown, {}, import("./schemas/user.schema").UserDocument, {}, {}> & import("./schemas/user.schema").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
            user: (import("mongoose").Document<unknown, {}, import("./schemas/user.schema").UserDocument, {}, {}> & import("./schemas/user.schema").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
                _id: import("mongoose").Types.ObjectId;
            }> & {
                __v: number;
            }) | null;
            accessToken: string;
            refreshToken: string;
        };
        message: string;
    }>;
    refresh(dto: RefreshDto): Promise<{
        data: {
            user: (import("mongoose").Document<unknown, {}, import("./schemas/user.schema").UserDocument, {}, {}> & import("./schemas/user.schema").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
                _id: import("mongoose").Types.ObjectId;
            }> & {
                __v: number;
            }) | null;
            accessToken: string;
            refreshToken: string;
        };
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
    getProfile(user: any): Promise<{
        data: {
            person: (import("mongoose").Document<unknown, {}, import("./schemas/person.schema").Person, {}, {}> & import("./schemas/person.schema").Person & {
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
    updateProfile(user: any, dto: UpdateProfileDto): Promise<{
        data: import("mongoose").Document<unknown, {}, import("./schemas/person.schema").Person, {}, {}> & import("./schemas/person.schema").Person & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        message: string;
    }>;
    changePassword(user: any, dto: ChangePasswordDto): Promise<{
        data: boolean;
        message: string;
    }>;
    logout(user: any): Promise<{
        data: boolean;
        message: string;
    }>;
}
