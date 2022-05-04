import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import SearchBar from "./SearchBar";
import breakpoints from "../utils/breakpoints";
import Logo from "../assets/logo.png";

type MobileNavbarProps = {
  isOpen: boolean;
  onClick: () => void;
};

type NavContentProps = {
  onClick?: () => void;
};

const NavContent = ({ onClick }: NavContentProps): JSX.Element => (
  <div className="nav-content" onClick={onClick}>
    <Link to="/">Employees</Link>
    <Link to="/departments">Departments</Link>
    <Link to="/group/titles">Titles</Link>
    <Link to="/group/locations">Locations</Link>
  </div>
);

const MobileNavbar = ({ isOpen, onClick }: MobileNavbarProps): JSX.Element => (
  <nav className="navbar">
    <div className="navbar-btn-mobile" onClick={onClick}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
    <div className={"mobile-nav " + (isOpen ? "opened" : "closed")}>
      <div className="navbar-header">
        <img className="navbar-logo" src={Logo} alt="Logo" />
        <div className="navbar-btn-mobile--close" onClick={onClick}>
          <div className="line--1"></div>
          <div className="line--2"></div>
        </div>
      </div>
      <SearchBar onClick={onClick} />
      <NavContent onClick={onClick} />
    </div>
  </nav>
);

const LargeNavbar = (): JSX.Element => (
  <nav className="navbar">
    <a href="/" className="large-nav">
      Employees
    </a>
    <NavContent />
  </nav>
);

const Navbar = (): JSX.Element => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const isDesktopOrLaptop = useMediaQuery({ minWidth: breakpoints.lg });

  const handleNav = (): void => setNavOpen(!navOpen);

  useEffect(() => {
    const bodySelector = document.querySelector("body");
    if (navOpen) {
      bodySelector!.classList.add("mobile-nav-is-open");
    } else {
      bodySelector!.classList.remove("mobile-nav-is-open");
    }
  }, [navOpen]);

  return (
    <>
      {isDesktopOrLaptop ? (
        <LargeNavbar />
      ) : (
        <MobileNavbar isOpen={navOpen} onClick={handleNav} />
      )}
    </>
  );
};

export default Navbar;
