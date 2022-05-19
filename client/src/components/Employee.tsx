import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useApolloClient, useMutation } from "@apollo/client";

import Error from "./Error";
import { READ_EMPLOYEE } from "../graphql/queries";
import { DELETE_EMPLOYEE } from "../graphql/mutations";
import EditIcon from "../assets/edit.png";
import DeleteIcon from "../assets/delete.png";

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  picture: string;
  jobTitle: string;
  country: string;
}

type EmployeeThumbnailProps = {
  employee: Employee;
};

export const EmployeeThumbnail = ({
  employee,
}: EmployeeThumbnailProps): JSX.Element => (
  <Link to={`/${employee.id}`} state={{ employee }}>
    <div className="employee-card">
      <img
        className="employee-thumbnail"
        src={employee.picture}
        alt={employee.firstName + " " + employee.lastName}
      />
      <div className="employee-info">
        <h3 className="employee-name--thumbnail">
          {employee.firstName + " " + employee.lastName}
        </h3>
        <p className="employee-title--thumbnail">{employee.jobTitle}</p>
      </div>
    </div>
  </Link>
);

const EmployeeItem = (): JSX.Element => {
  const [employee, setEmployee] = useState<Employee>();
  const client = useApolloClient();
  const params = useParams();
  const { id } = params;
  const [deleteEmployee, { loading, error }] = useMutation(DELETE_EMPLOYEE);

  useEffect(() => {
    const employeeData = client.readFragment({
      id: `Employee:${id}`,
      fragment: READ_EMPLOYEE,
    });
    setEmployee(employeeData);
  }, [client, id]);

  const handleDelete = () => {
    if (!employee) {
      return;
    }

    deleteEmployee({ variables: { id: employee.id } });
    while (loading) {
      continue;
    }
    if (error) {
      alert("Could not delete employee.");
      return;
    }
    alert("Employee deleted");
    window.history.back();
  };

  return (
    <div className="employee">
      {employee ? (
        <>
          <img
            className="employee-picture"
            src={employee.picture}
            alt={employee.firstName + " " + employee.lastName}
          />
          <div className="employee-info-list">
            <div className="employee-header">
              <h2 className="employee-name">
                {employee.firstName + " " + employee.lastName}
              </h2>
              <div className="employee-actions">
                <Link to={`/edit/${employee.id}`} state={{ employee }}>
                  <img src={EditIcon} alt="Edit" />
                </Link>
                <img src={DeleteIcon} alt="Delete" onClick={handleDelete} />
              </div>
            </div>
            <dl className="info-field">
              <dt className="employee-bold">Job Title:</dt>
              <dd className="employee-light">{employee.jobTitle}</dd>
              <dt className="employee-bold">Department:</dt>
              <dd className="employee-light">{employee.jobTitle}</dd>
              <dt className="employee-bold">Location:</dt>
              <dd className="employee-light">{employee.country}</dd>
            </dl>
          </div>
        </>
      ) : (
        <Error errorMessage="Could not find employee." />
      )}
    </div>
  );
};

export default EmployeeItem;
