import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import EmployeeList from "./EmployeeList";
import { EmployeeInterface } from "./Employee";
import fetchEmployees from "../utils/fetchEmployees";

const Search = (): JSX.Element => {
  const [matchedEmployees, setMatchedEmployees] = useState<EmployeeInterface[]>(
    []
  );
  const [searchParams] = useSearchParams();
  let query: string | null = searchParams.get("query");

  if (query) {
    query = query.toLowerCase();
  }

  useEffect(() => {
    fetchEmployees(
      setMatchedEmployees,
      (tempList: Array<EmployeeInterface>): Array<EmployeeInterface> | null => {
        if (!query) {
          return null;
        }

        const matches: Array<EmployeeInterface> | null = [];

        for (const employee of tempList) {
          if (
            employee.name.toLowerCase().includes(query) ||
            employee.jobTitle.toLowerCase().includes(query) ||
            employee.location.toLowerCase().includes(query)
          ) {
            matches.push(employee);
          }
        }

        return matches;
      }
    );
  }, [query]);

  return (
    <>
      <h1 className="page-title">{`Search results for "${query}"`}</h1>
      <EmployeeList employees={matchedEmployees} />
    </>
  );
};

export default Search;
