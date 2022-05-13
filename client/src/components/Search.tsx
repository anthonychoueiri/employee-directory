import { useContext } from "react";
import { useSearchParams } from "react-router-dom";

import EmployeeList from "./EmployeeList";
import Loading from "./Loading";
import Error from "./Error";
import { EmployeeInterface } from "./Employee";
import EmployeesContext from "../utils/employeesContext";

const Search = (): JSX.Element => {
  const { employees, loading, error } = useContext(EmployeesContext);
  const [searchParams] = useSearchParams();

  const query: string | null = searchParams.get("query");

  if (!employees || !query) {
    return <Error />;
  }

  const searchQuery: string[] = query.toLowerCase().split(" ");

  const matchedEmployees: EmployeeInterface[] | null = [];
  for (const employee of employees) {
    if (
      searchQuery.includes(employee.firstName.toLowerCase()) ||
      searchQuery.includes(employee.lastName.toLowerCase()) ||
      searchQuery.includes(employee.jobTitle.toLowerCase()) ||
      searchQuery.includes(employee.country.toLowerCase())
    ) {
      matchedEmployees.push(employee);
    }
  }

  return (
    <>
      <h1 className="page-title">{`Search results for "${searchQuery}"`}</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <EmployeeList employees={matchedEmployees} />
      )}
    </>
  );
};

export default Search;
