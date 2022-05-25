import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import EmployeeList from "./EmployeeList";
import Loading from "./Loading";
import { EmployeeInterface } from "./Employee";
import { GroupType } from "./GroupList";
import EmployeesContext from "../utils/employeesContext";

const Group = (): JSX.Element => {
  const { employees, loading } = useContext(EmployeesContext);
  const [matchedEmployees, setMatchedEmployees] = useState<
    EmployeeInterface[] | null
  >([]);
  const params = useParams();
  const groupType: GroupType = params.groupType;
  const group: string | undefined = params.group;

  useEffect(() => {
    if (!groupType || !group || !employees) {
      setMatchedEmployees(null);
      return;
    }

    const matches: Array<EmployeeInterface> | null = [];
    for (const employee of employees) {
      if (groupType === "titles") {
        if (employee.jobTitle === group) {
          matches.push(employee);
        }
      } else if (groupType === "locations") {
        if (employee.location === group) {
          matches.push(employee);
        }
      }
    }
    setMatchedEmployees(matches);
  }, [employees, group, groupType]);

  return (
    <>
      <h1 className="page-title">{group}</h1>
      {loading ? <Loading /> : <EmployeeList employees={matchedEmployees} />}
    </>
  );
};

export default Group;
