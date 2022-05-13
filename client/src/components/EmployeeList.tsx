import Error from "./Error";
import { EmployeeThumbnail, EmployeeInterface } from "./Employee";

type EmployeeListProps = {
  employees: EmployeeInterface[] | null;
};

const EmployeeList = ({ employees }: EmployeeListProps): JSX.Element => (
  <div className="employee-list">
    {employees?.length ? (
      employees.map((employee: EmployeeInterface) => (
        <EmployeeThumbnail key={employee.id} employee={employee} />
      ))
    ) : (
      <Error />
    )}
  </div>
);

export default EmployeeList;
