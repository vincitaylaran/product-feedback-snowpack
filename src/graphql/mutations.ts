import { gql, DocumentNode } from '@apollo/client';

export const UPDATE_TITLE: DocumentNode = gql`
    mutation {
        updateRequest($title: String!) {
            updateRequest( input: { title: $title } ) {
                id
                title
            }
        }
    }
`;
