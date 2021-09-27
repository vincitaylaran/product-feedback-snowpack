import type { User } from './user.interface';
import type { ProductRequest } from './productRequest.interface';

export interface ProductFeedback {
  currentUser: User;
  productRequests: ProductRequest[];
}
