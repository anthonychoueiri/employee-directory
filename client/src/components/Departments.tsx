import { Link } from "react-router-dom";

import DepartmentImage from "../assets/department.png";

const Departments = (): JSX.Element => {
  const departments = ["Design", "Strategy", "Engineering"];

  return (
    <>
      <h1 className="page-title">Departments</h1>

      <div className="departments">
        {departments.map((department) => (
          <Link key={department} to={`/search`}>
            <div className="department">
              <img
                className="department-img"
                src={DepartmentImage}
                alt={`${department} department`}
              />
              <h2 className="department-name">{department}</h2>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Departments;
