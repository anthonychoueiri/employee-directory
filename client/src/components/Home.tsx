import { useContext } from "react";

import EmployeeList from "./EmployeeList";
import Loading from "./Loading";
import EmployeesContext from "../utils/employeesContext";

const Home = (): JSX.Element => {
  const { employees, loading, error } = useContext(EmployeesContext);

  return (
    <>
      <h1 className="page-title">Employees</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <h2 className="fetch-error">Could not find employees</h2>
      ) : (
        <EmployeeList employees={employees} />
      )}
    </>
  );
};

export default Home;
