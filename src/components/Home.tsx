import { useEffect, useState } from "react";

import EmployeeList from "./EmployeeList";
import { EmployeeInterface } from "./Employee";
import Loading from "./Loading";
import fetchEmployees from "../utils/fetchEmployees";

const Home = (): JSX.Element => {
  const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchEmployees(setEmployees, setLoading);
  }, []);

  return (
    <>
      <h1 className="page-title">Employees</h1>
      {loading ? <Loading /> : <EmployeeList employees={employees} />}
    </>
  );
};

export default Home;
