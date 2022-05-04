import { useMediaQuery } from "react-responsive";

import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import breakpoints from "../utils/breakpoints";
import Logo from "../assets/logo.png";

const Header = (): JSX.Element => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: breakpoints.lg });

  const stickyHeader = () => {
    if (document.readyState !== "complete") {
      return;
    }

    const header = document.getElementById("header");
    const sticky = header!.offsetTop;

    if (window.pageYOffset > sticky) {
      header!.classList.add("sticky");
    } else {
      header!.classList.remove("sticky");
    }
  };

  window.onscroll = stickyHeader;

  return (
    <header id="header" className="header">
      {isDesktopOrLaptop ? (
        <>
          <div className="header-left">
            <img className="logo" src={Logo} alt="Logo" />
            <Navbar />
          </div>
          <SearchBar />
        </>
      ) : (
        <>
          <Navbar />
          <img className="logo" src={Logo} alt="Logo" />
        </>
      )}
    </header>
  );
};

export default Header;
