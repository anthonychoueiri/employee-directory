import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Header from "./components/Header";
import Home from "./components/Home";
import Departments from "./components/Departments";
import GroupList from "./components/GroupList";
import Group from "./components/Group";
import EmployeeItem from "./components/Employee";
import Search from "./components/Search";
import {
  CreateEmployeeForm,
  EditEmployeeForm,
} from "./components/EmployeeForm";
import { Employee } from "./components/Employee";
import EmployeesContext from "./utils/employeesContext";
import { GET_EMPLOYEES } from "./graphql/queries";
import "./sass/main.scss";

const App = (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_EMPLOYEES);

  const employees: Employee[] = data?.allEmployees?.nodes;

  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <EmployeesContext.Provider value={{ employees, loading, error }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<EmployeeItem />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/group/:groupType" element={<GroupList />} />
            <Route path="/group/:groupType/:group" element={<Group />} />
            <Route path="/search" element={<Search />} />
            <Route path="/add" element={<CreateEmployeeForm />} />
            <Route path="/edit/:id" element={<EditEmployeeForm />} />
          </Routes>
        </EmployeesContext.Provider>
      </div>
    </BrowserRouter>
  );
};

export default App;
