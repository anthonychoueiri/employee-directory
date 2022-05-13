import { useContext } from "react";
import { Link } from "react-router-dom";

import EmployeeList from "./EmployeeList";
import Loading from "./Loading";
import EmployeesContext from "../utils/employeesContext";

const Home = (): JSX.Element => {
  const { employees, loading, error } = useContext(EmployeesContext);

  return (
    <>
      <h1 className="page-title">Employees</h1>
      <Link to="/create">
        <div className="add-employee">
          <div className="add-icon">
            <div className="plus-sign--vertical" />
            <div className="plus-sign--horizontal" />
          </div>
          <h2 className="add-label">Add Employee</h2>
        </div>
      </Link>
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
