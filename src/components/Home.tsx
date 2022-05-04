import { useEffect, useState } from "react";

import EmployeeList from "./EmployeeList";
import { EmployeeInterface } from "./Employee";
import fetchEmployees from "../utils/fetchEmployees";

const Home = (): JSX.Element => {
  const [employees, setEmployees] = useState<EmployeeInterface[]>([]);

  useEffect(() => {
    fetchEmployees(setEmployees);
  }, []);

  return (
    <>
      <h1 className="page-title">Employees</h1>
      <EmployeeList employees={employees} />
    </>
  );
};

export default Home;
