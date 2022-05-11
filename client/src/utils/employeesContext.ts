import { createContext } from "react";

import { EmployeeInterface } from "../components/Employee";

export interface EmployeesContextInterface {
  employees: EmployeeInterface[] | null;
  loading: boolean;
}

const EmployeesContext = createContext<EmployeesContextInterface>({
  employees: [],
  loading: true,
});

export default EmployeesContext;
