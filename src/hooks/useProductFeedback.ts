import { useState, useEffect } from 'react';
import data from '../data.json';

interface ProductFeedback {
  currentUser: User;
  productRequests: ProductRequest[];
}

interface ProductRequest {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  description: string;
  comments?: Comment[];
}

interface Comment {
  id: number;
  content: string;
  user: User;
  replyingTo?: string;
}

interface User {
  image: string;
  name: string;
  username: string;
}

export function useProductFeedback() {
  const [feedback, setFeedback] = useState<ProductFeedback>();

  useEffect(() => {
    const fetchData = (): void => {
      setFeedback(data);
    };

    fetchData();
  }, [feedback]);

  return {
    feedback,
  };
}
