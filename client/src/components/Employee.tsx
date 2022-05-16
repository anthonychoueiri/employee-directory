import { Link, useLocation } from "react-router-dom";

import Error from "./Error";
import EditIcon from "../assets/edit.png";
import DeleteIcon from "../assets/delete.png";

export interface EmployeeInterface {
  id: string;
  firstName: string;
  lastName: string;
  picture: string;
  jobTitle: string;
  country: string;
}

type EmployeeThumbnailProps = {
  employee: EmployeeInterface;
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

const Employee = (): JSX.Element => {
  const location = useLocation();
  const { employee }: any = location.state;

  const handleDelete = () => {
    alert("Delete");
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
        <Error />
      )}
    </div>
  );
};

export default Employee;
