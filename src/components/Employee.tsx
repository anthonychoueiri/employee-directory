import { Link, useLocation } from "react-router-dom";

export interface EmployeeInterface {
  id: string;
  name: string;
  picture: string;
  jobTitle: string;
  location: string;
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
        alt={employee.name}
      />
      <div className="employee-info">
        <h3 className="employee-name--thumbnail">{employee.name}</h3>
        <p className="employee-title--thumbnail">{employee.jobTitle}</p>
      </div>
    </div>
  </Link>
);

const Employee = (): JSX.Element => {
  const location = useLocation();
  const { employee }: any = location.state;

  return (
    <div className="employee">
      {employee ? (
        <>
          <img
            className="employee-picture"
            src={employee.picture}
            alt={employee.name}
          />
          <div className="employee-info-list">
            <h2 className="employee-name">{employee.name}</h2>
            {/* <div className="info-field">
              <h3 className="employee-bold">Job Title:</h3>
              <p className="employee-light">{employee.jobTitle}</p>
            </div>
            <div className="info-field">
              <h3 className="employee-bold">Department:</h3>
              <p className="employee-light">{employee.jobTitle}</p>
            </div>
            <div className="info-field">
              <h3 className="employee-bold">Location:</h3>
              <p className="employee-light">{employee.location}</p>
            </div> */}
            <dl className="info-field">
              <dt className="employee-bold">Job Title:</dt>
              <dd className="employee-light">{employee.jobTitle}</dd>
              <dt className="employee-bold">Department:</dt>
              <dd className="employee-light">{employee.jobTitle}</dd>
              <dt className="employee-bold">Location:</dt>
              <dd className="employee-light">{employee.location}</dd>
            </dl>
          </div>
        </>
      ) : (
        <h2 className="fetch-error">Could not fetch employees</h2>
      )}
    </div>
  );
};

export default Employee;
