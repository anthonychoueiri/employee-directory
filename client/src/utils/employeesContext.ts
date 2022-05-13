import { createContext } from "react";
import { ApolloError } from "@apollo/client";

import { EmployeeInterface } from "../components/Employee";

export interface EmployeesContextInterface {
  employees: EmployeeInterface[] | null;
  loading: boolean;
  error: ApolloError | undefined;
}

const EmployeesContext = createContext<EmployeesContextInterface>({
  employees: [],
  loading: true,
  error: undefined,
});

export default EmployeesContext;
