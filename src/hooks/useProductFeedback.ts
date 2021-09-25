import { useState } from 'react';

interface ProductRequest {
  id: number;
  title: string;
  category: 'feature' | 'bug' | 'enhancement';
  upvotes: number;
  description: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  content: string;
  user: User;
}

interface User {
  image: string;
  name: string;
  username: string;
}

function useProductRequests() {
  const [feedback, setFeedback] = useState<ProductRequest[]>([]);
}
