import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Departments from "./components/Departments";
import GroupList from "./components/GroupList";
import Group from "./components/Group";
import Employee from "./components/Employee";
import Search from "./components/Search";
import "./sass/main.scss";

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Employee />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/group/:groupType" element={<GroupList />} />
          <Route path="/group/:groupType/:group" element={<Group />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
