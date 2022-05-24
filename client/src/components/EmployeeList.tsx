import React, { useState, useEffect } from "react";

import Error from "./Error";
import { EmployeeThumbnail, Employee } from "./Employee";
import { employeesPerPage } from "../utils/constants";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  previousPage: React.MouseEventHandler<HTMLButtonElement>;
  nextPage: React.MouseEventHandler<HTMLButtonElement>;
  goToPage: React.MouseEventHandler<HTMLButtonElement>;
};

type EmployeeListProps = {
  employees: Employee[];
};

const Pagination = ({
  totalPages,
  currentPage,
  nextPage,
  previousPage,
  goToPage,
}: PaginationProps): JSX.Element => {
  const pages: number[] = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    if (currentPage === 1) {
      prevBtn?.classList.add("disabled");
      prevBtn?.classList.remove("enabled");
    } else {
      prevBtn?.classList.remove("disabled");
      prevBtn?.classList.add("enabled");
    }

    if (currentPage === totalPages) {
      nextBtn?.classList.add("disabled");
      nextBtn?.classList.remove("enabled");
    } else {
      nextBtn?.classList.remove("disabled");
      nextBtn?.classList.add("enabled");
    }
  }, [currentPage, totalPages]);

  return (
    <div className="pagination">
      <button
        id="prev-btn"
        type="button"
        className="arrow--left"
        onClick={previousPage}
        disabled={currentPage === 1}
      />
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={"page-number" + (page === currentPage ? "--current" : "")}
          onClick={goToPage}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}
      <button
        id="next-btn"
        type="button"
        className="arrow--right"
        onClick={nextPage}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

const EmployeeList = ({ employees }: EmployeeListProps): JSX.Element => {
  const [employeesOnPage, setEmployeesOnPage] = useState<Employee[]>(
    employees?.slice(0, employeesPerPage) || []
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = employees
    ? Math.ceil(employees.length / employeesPerPage)
    : -1;

  const previousPage: React.MouseEventHandler<HTMLButtonElement> = (): void => {
    setCurrentPage(currentPage - 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const nextPage: React.MouseEventHandler<HTMLButtonElement> = (): void => {
    setCurrentPage(currentPage + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goToPage: React.MouseEventHandler<HTMLButtonElement> = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const btn = e.target as HTMLElement;
    setCurrentPage(parseInt(btn.innerHTML));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!employees || !employees.length || totalPages < 1) {
      return;
    }

    if (currentPage < 1 || currentPage > totalPages) {
      return;
    }

    const start = (currentPage - 1) * employeesPerPage;
    const end = currentPage * employeesPerPage;
    setEmployeesOnPage(employees.slice(start, end));
  }, [currentPage, totalPages, employees]);

  if (!employees || !employees.length) {
    return (
      <div className="employee-list">
        <Error />
      </div>
    );
  }

  return (
    <>
      <div className="employee-list">
        {employeesOnPage?.length ? (
          employeesOnPage.map((employee: Employee) => (
            <EmployeeThumbnail key={employee.id} employee={employee} />
          ))
        ) : (
          <Error />
        )}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        previousPage={previousPage}
        nextPage={nextPage}
        goToPage={goToPage}
      />
    </>
  );
};

export default EmployeeList;
