import { useLocation } from "react-router-dom";

import { EmployeeInterface } from "./Employee";

type LocationState = {
  employee: EmployeeInterface;
};

const EmployeeForm = (): JSX.Element => {
  const location = useLocation();

  let state, employee;
  if (location.state) {
    state = location.state as LocationState;
    employee = state.employee;
  }

  const handleChange = () => {};

  return (
    <div className="form-container">
      <h1 className="form-title">
        {(employee ? "Edit" : "Create") + " Employee"}
      </h1>

      <form className="employee-form">
        <label className="form-label">First Name:</label>
        <input
          name="first-name"
          value={employee?.firstName}
          type="text"
          className="form-input"
          onChange={handleChange}
        />
        <label className="form-label">Last Name:</label>
        <input
          name="last-name"
          value={employee?.lastName}
          type="text"
          className="form-input"
          onChange={handleChange}
        />
        <label className="form-label">Picture URL:</label>
        <input
          name="picture"
          value={employee?.picture}
          type="text"
          className="form-input"
          onChange={handleChange}
        />
        <label className="form-label">Job Title:</label>
        <input
          name="job-title"
          value={employee?.jobTitle}
          type="text"
          className="form-input"
          onChange={handleChange}
        />
        <label className="form-label">Country:</label>
        <input
          name="country"
          value={employee?.country}
          type="text"
          className="form-input"
          onChange={handleChange}
        />
        <button type="submit" className="btn--colored">
          Done
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
