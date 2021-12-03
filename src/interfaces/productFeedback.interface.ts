import type { User } from './user.interface';
import type { ProductRequest } from './productRequest.interface';

export interface ProductFeedback {
  productRequests: ProductRequest[];
}
