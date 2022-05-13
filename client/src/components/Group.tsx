import { useContext } from "react";
import { useParams } from "react-router-dom";

import EmployeeList from "./EmployeeList";
import Loading from "./Loading";
import Error from "./Error";
import { EmployeeInterface } from "./Employee";
import { GroupType } from "./GroupList";
import EmployeesContext from "../utils/employeesContext";

const Group = (): JSX.Element => {
  const { employees, loading, error } = useContext(EmployeesContext);
  const params = useParams();

  const groupType: GroupType = params.groupType;
  const groupParam: string | undefined = params.group;

  if (!employees || !groupParam) {
    return <Error />;
  }

  const matchedEmployees: EmployeeInterface[] | null = [];
  for (const employee of employees) {
    if (groupType === "titles") {
      const group: string | undefined = groupParam?.slice(0, -1);
      if (employee.jobTitle === group) {
        matchedEmployees.push(employee);
      }
    } else if (groupType === "locations") {
      if (employee.country === groupParam) {
        matchedEmployees.push(employee);
      }
    }
  }

  return (
    <>
      <h1 className="page-title">{groupParam}</h1>
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

export default Group;
