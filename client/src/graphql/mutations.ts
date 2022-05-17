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

export const EDIT_EMPLOYEE = gql`
  mutation EditEmployee($employee: EmployeePatch!, $id: Int!) {
    updateEmployeeById(input: { employeePatch: $employee, id: $id }) {
      employee {
        firstName
        lastName
        picture
        jobTitle
        country
      }
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: Int!) {
    deleteEmployeeById(input: { id: $id }) {
      deletedEmployeeId
      employee {
        id
      }
    }
  }
`;
