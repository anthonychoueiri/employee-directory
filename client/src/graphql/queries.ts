import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query GetAllEmployees($total: Int, $offset: Int) {
    allEmployees(first: $total, offset: $offset) {
      nodes {
        id
        firstName
        lastName
        picture
        jobTitle
        country
      }
    }
  }
`;
