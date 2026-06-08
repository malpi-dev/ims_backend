export declare class RefreshToken {
    userId: string;
    token: string;
    expiresAt: Date;
    isRevoked: boolean;
}
export declare const RefreshTokenSchema: import("mongoose").Schema<RefreshToken, import("mongoose").Model<RefreshToken, any, any, any, import("mongoose").Document<unknown, any, RefreshToken, any, {}> & RefreshToken & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RefreshToken, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<RefreshToken>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<RefreshToken> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
