import { useState } from "react";
import { useNavigate } from "react-router-dom";

type SearchBarProps = {
  onClick?: () => void;
};

const wiggleKeyframes = [
  { transform: "rotate(0)" },
  { transform: "rotate(3deg)" },
  { transform: "rotate(-3deg)" },
  { transform: "rotate(0)" },
];

const wiggleTiming = { duration: 200, iterations: 2 };

const SearchBar = ({ onClick }: SearchBarProps): JSX.Element => {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();
    if (query) {
      navigate({ pathname: "/search", search: `?query=${query}` });
      if (onClick) {
        onClick();
      }
    } else {
      const searchInput = document.getElementById("search-input");
      searchInput?.animate(wiggleKeyframes, wiggleTiming);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        id="search-input"
        type="search"
        name="search"
        placeholder="Search employees"
        className="search-bar"
        onChange={handleChange}
        autoComplete="off"
      ></input>
      <button type="submit" className="btn--dark">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
