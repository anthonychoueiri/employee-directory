import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";

import EmployeeList from "./EmployeeList";
import Loading from "./Loading";
import { EmployeeInterface } from "./Employee";
import EmployeesContext from "../utils/employeesContext";

const Search = (): JSX.Element => {
  const { employees, loading } = useContext(EmployeesContext);

  const [matchedEmployees, setMatchedEmployees] = useState<
    EmployeeInterface[] | null
  >([]);
  const [searchParams] = useSearchParams();
  let query: string | null = searchParams.get("query");

  if (query) {
    query = query.toLowerCase();
  }

  useEffect(() => {
    if (!query || !employees) {
      setMatchedEmployees(null);
      return;
    }

    const matches: Array<EmployeeInterface> | null = [];
    for (const employee of employees) {
      if (
        employee.name.toLowerCase().includes(query) ||
        employee.jobTitle.toLowerCase().includes(query) ||
        employee.location.toLowerCase().includes(query)
      ) {
        matches.push(employee);
      }
    }
    setMatchedEmployees(matches);
  }, [employees, query]);

  return (
    <>
      <h1 className="page-title">{`Search results for "${query}"`}</h1>
      {loading ? <Loading /> : <EmployeeList employees={matchedEmployees} />}
    </>
  );
};

export default Search;
