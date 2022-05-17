import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query GetAllEmployees {
    allEmployees {
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

export const READ_EMPLOYEE = gql`
  fragment MyEmployee on Employee {
    id
    firstName
    lastName
    picture
    jobTitle
    country
  }
`;
