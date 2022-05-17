import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { EmployeeInterface } from "./Employee";
import { CREATE_EMPLOYEE, EDIT_EMPLOYEE } from "../graphql/mutations";

type LocationState = {
  employee: EmployeeInterface;
};

type EmployeeFormProps = {
  employee?: EmployeeInterface;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
};

const EmployeeForm = ({
  employee,
  onSubmit,
  onChange,
  onCancel,
}: EmployeeFormProps): JSX.Element => (
  <div className="form-container">
    <h1 className="form-title">
      {(employee ? "Edit" : "Create") + " Employee"}
    </h1>

    <form className="employee-form" onSubmit={onSubmit}>
      <label className="form-label">First Name:</label>
      <input
        name="first-name"
        value={employee?.firstName}
        type="text"
        className="form-input"
        onChange={onChange}
      />
      <label className="form-label">Last Name:</label>
      <input
        name="last-name"
        value={employee?.lastName}
        type="text"
        className="form-input"
        onChange={onChange}
      />
      <label className="form-label">Picture URL:</label>
      <input
        name="picture"
        value={employee?.picture}
        type="text"
        className="form-input"
        onChange={onChange}
      />
      <label className="form-label">Job Title:</label>
      <input
        name="job-title"
        value={employee?.jobTitle}
        type="text"
        className="form-input"
        onChange={onChange}
      />
      <label className="form-label">Country:</label>
      <input
        name="country"
        value={employee?.country}
        type="text"
        className="form-input"
        onChange={onChange}
      />
      <div className="action-buttons">
        <button type="button" className="btn--light" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn--colored">
          Done
        </button>
      </div>
    </form>
  </div>
);

export const CreateEmployeeForm = (): JSX.Element => {
  const [employee, setEmployee] = useState<EmployeeInterface | any>({
    firstName: "",
    lastName: "",
    picture: "",
    jobTitle: "",
    country: "",
  });
  const navigate = useNavigate();
  const [createEmployee, { data, loading, error }] =
    useMutation(CREATE_EMPLOYEE);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    if (name === "first-name") {
      setEmployee({ ...employee, firstName: value });
    } else if (name === "last-name") {
      setEmployee({ ...employee, lastName: value });
    } else if (name === "picture") {
      setEmployee({ ...employee, picture: value });
    } else if (name === "job-title") {
      setEmployee({ ...employee, jobTitle: value });
    } else if (name === "country") {
      setEmployee({ ...employee, country: value });
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();
    if (!employee) {
      alert("Please enter valid values for all fields.");
      return;
    }

    createEmployee({ variables: { employee } });

    while (loading) {
      continue;
    }
    if (error) {
      alert("Could not create employee.");
    } else if (data) {
      alert("Employee created.");
      navigate(`/${data.id}`, { state: employee });
    }
  };

  const handleCancel: React.MouseEventHandler<HTMLButtonElement> = (): void => {
    navigate("/");
  };

  useEffect(() => {
    if (loading) {
      return;
    } else if (error) {
      alert("Could not create employee.");
    } else if (data) {
      navigate(`/${data.createEmployee.employee.id}`, { state: employee });
    }
  }, [data, loading, error]);

  return (
    <EmployeeForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onChange={handleChange}
    />
  );
};

export const EditEmployeeForm = (): JSX.Element => {
  const [employee, setEmployee] = useState<EmployeeInterface | any>({
    id: "",
    firstName: "",
    lastName: "",
    picture: "",
    jobTitle: "",
    country: "",
  });
  const location = useLocation();
  const [editEmployee, { loading, error }] = useMutation(EDIT_EMPLOYEE);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    if (name === "first-name") {
      setEmployee({ ...employee, firstName: value });
    } else if (name === "last-name") {
      setEmployee({ ...employee, lastName: value });
    } else if (name === "picture") {
      setEmployee({ ...employee, picture: value });
    } else if (name === "job-title") {
      setEmployee({ ...employee, jobTitle: value });
    } else if (name === "country") {
      setEmployee({ ...employee, country: value });
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();
    if (!employee) {
      alert("Please enter valid values for all fields.");
      return;
    }

    editEmployee({
      variables: {
        employee,
        id: employee.id,
      },
    });

    while (loading) {
      continue;
    }
    if (error) {
      alert("Could not edit employee.");
      return;
    }
    alert("Employee edited.");
    window.history.back();
  };

  const handleCancel: React.MouseEventHandler<HTMLButtonElement> = (): void => {
    window.history.back();
  };

  useEffect(() => {
    let state;
    if (location.state) {
      state = location.state as LocationState;
      setEmployee(state.employee);
    }
  }, [location.state]);

  return (
    <EmployeeForm
      employee={employee}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onChange={handleChange}
    />
  );
};
