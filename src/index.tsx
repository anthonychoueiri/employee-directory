import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Home from "./components/Home";
import Departments from "./components/Departments";
import GroupList from "./components/GroupList";
import Group from "./components/Group";
import Employee from "./components/Employee";
import Search from "./components/Search";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Employee />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/group/:groupType" element={<GroupList />} />
          <Route path="/group/:groupType/:group" element={<Group />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>
);
