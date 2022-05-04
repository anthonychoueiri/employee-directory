import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import EmployeeList from "./EmployeeList";
import { EmployeeInterface } from "./Employee";
import { GroupType } from "./GroupList";
import fetchEmployees from "../utils/fetchEmployees";

const Group = (): JSX.Element => {
  const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
  const params = useParams();
  const groupType: GroupType = params.groupType;
  const group: string | undefined = params.group;

  useEffect(() => {
    fetchEmployees(
      setEmployees,
      (tempList: Array<EmployeeInterface>): Array<EmployeeInterface> | null => {
        if (!groupType || !group) {
          return null;
        }

        const matches: Array<EmployeeInterface> | null = [];

        for (const employee of tempList) {
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

        return matches;
      }
    );
  }, [group, groupType]);

  return (
    <>
      <h1 className="page-title">{group}</h1>
      <EmployeeList employees={employees} />
    </>
  );
};

export default Group;
