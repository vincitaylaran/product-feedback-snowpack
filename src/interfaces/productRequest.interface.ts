import type { User } from './user.interface';

export interface ProductRequest {
  id: number;
  title: string;
  category: string;
  status: string;
  upvotes: number;
  description: string;
  comments?: Comment[];
}

export enum ProductRequestCategory {
  Enhancement = 'enhancement',
  Feature = 'feature',
  Bug = 'bug',
}

export type ProductRequestCategoryFilters = ProductRequestCategory | 'all';

export enum ProductRequestStatus {
  Live = 'live',
  InProgress = 'in-progress',
  Planned = 'planned',
  Suggestion = 'suggestion',
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  replies?: Reply[];
}

export interface Reply {
  content: string;
  replyingTo: string;
  user: User;
}
