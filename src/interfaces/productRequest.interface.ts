import type {IComment} from "./comment.interface"

export interface IProductRequest {
    id: bigint;
    title: string;
    category: string;
    upvotes: bigint;
    status: string;
    description: string;
    comments: IComment[]
}