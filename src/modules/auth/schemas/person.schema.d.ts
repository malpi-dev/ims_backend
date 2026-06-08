import { BaseSchema } from '../../../common/schemas/base.schema';
export declare class Person extends BaseSchema {
    userId: string;
    name: string;
    surnames: string;
    birthday: Date;
    gender: string;
    profileImage: string;
    phone: string;
}
export declare const PersonSchema: import("mongoose").Schema<Person, import("mongoose").Model<Person, any, any, any, import("mongoose").Document<unknown, any, Person, any, {}> & Person & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Person, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Person>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Person> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
