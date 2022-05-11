import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Departments from "./components/Departments";
import GroupList from "./components/GroupList";
import Group from "./components/Group";
import Employee from "./components/Employee";
import Search from "./components/Search";
import { EmployeeInterface } from "./components/Employee";
import EmployeesContext from "./utils/employeesContext";
import fetchEmployees from "./utils/fetchEmployees";
import "./sass/main.scss";

const App = (): JSX.Element => {
  const [employees, setEmployees] = useState<EmployeeInterface[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data: EmployeeInterface[] | null = await fetchEmployees();
      setEmployees(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <EmployeesContext.Provider value={{ employees, loading }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Employee />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/group/:groupType" element={<GroupList />} />
            <Route path="/group/:groupType/:group" element={<Group />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </EmployeesContext.Provider>
      </div>
    </BrowserRouter>
  );
};

export default App;
