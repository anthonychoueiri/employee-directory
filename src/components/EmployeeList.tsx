import { EmployeeThumbnail, EmployeeInterface } from "./Employee";

type EmployeeListProps = {
  employees: Array<EmployeeInterface>;
};

const EmployeeList = ({ employees }: EmployeeListProps): JSX.Element => (
  <div className="employee-list">
    {employees?.length ? (
      employees.map((employee: EmployeeInterface) => (
        <EmployeeThumbnail key={employee.id} employee={employee} />
      ))
    ) : (
      <h2 className="fetch-error">Could not find employees</h2>
    )}
  </div>
);

export default EmployeeList;
