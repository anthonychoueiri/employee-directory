import { gql } from "@apollo/client";

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($employee: EmployeeInput!) {
    createEmployee(input: { employee: $employee }) {
      employee {
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
