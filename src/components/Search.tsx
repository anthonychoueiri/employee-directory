import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import EmployeeList from "./EmployeeList";
import { EmployeeInterface } from "./Employee";
import Loading from "./Loading";
import fetchEmployees from "../utils/fetchEmployees";

const Search = (): JSX.Element => {
  const [matchedEmployees, setMatchedEmployees] = useState<
    EmployeeInterface[] | null
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  let query: string | null = searchParams.get("query");

  if (query) {
    query = query.toLowerCase();
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchEmployees();

      if (!query || !data) {
        setMatchedEmployees(null);
        return;
      }

      const matches: Array<EmployeeInterface> | null = [];
      for (const employee of data) {
        if (
          employee.name.toLowerCase().includes(query) ||
          employee.jobTitle.toLowerCase().includes(query) ||
          employee.location.toLowerCase().includes(query)
        ) {
          matches.push(employee);
        }
      }

      setLoading(false);
      setMatchedEmployees(matches);
    };
    fetchData();
  }, [query]);

  return (
    <>
      <h1 className="page-title">{`Search results for "${query}"`}</h1>
      {loading ? <Loading /> : <EmployeeList employees={matchedEmployees} />}
    </>
  );
};

export default Search;
