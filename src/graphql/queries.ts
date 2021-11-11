import { gql, DocumentNode } from '@apollo/client';

export const PRODUCT_REQUESTS: DocumentNode = gql`
  {
    AllRequests {
      id
      title
      category
      status
      upvotes {
        id
      }
      description
      comments {
        id
        content
        user {
          id
          name
          username
          image
        }
      }
    }

    User(id: 1) {
      id
      username
      image
      upvotes {
        id
      }
    }
  }
`;
