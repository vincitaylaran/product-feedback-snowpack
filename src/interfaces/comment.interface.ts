import type { IUser } from "./user.interface";

export interface IComment {
    id: bigint;
    content: string;
    user : IUser
    replies?: IReply[]
}

export interface IReply {
    content: string;
    replyingTo: Pick<IUser, "username">;
    user: IUser;
}