import { Employee } from "../components/Employee";
import { departments, DepartmentsType } from "./constants";

const getEmployeeDepartment = (employee: Employee): string[] => {
  return Object.keys(departments).filter((departmentName) => {
    const { [departmentName as keyof DepartmentsType]: departmentTitles } =
      departments;
    return departmentTitles.includes(employee.jobTitle);
  });
};

export default getEmployeeDepartment;
