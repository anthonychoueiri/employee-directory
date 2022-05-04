import { Link, useParams } from "react-router-dom";

type GroupType = "titles" | "locations" | unknown;

const GroupList = (): JSX.Element => {
  const params = useParams();
  const groupType: GroupType = params.groupType;

  const titles = ["Designer", "Strategist", "Engineer"];
  const locations = [
    "Canada",
    "France",
    "Norway",
    "Finland",
    "Germany",
    "United States",
    "Ireland",
    "Spain",
  ];

  let pageTitle, groupList;

  if (groupType === "titles") {
    pageTitle = "Titles";
    groupList = titles;
  } else if (groupType === "locations") {
    pageTitle = "Locations";
    groupList = locations;
  } else {
    return <h2 className="fetch-error">Could not fetch groups</h2>;
  }

  return (
    <>
      <h1 className="page-title">{pageTitle}</h1>
      <ul className="groups-list">
        {groupList.map((element) => (
          <li key={element} className="list-element">
            {element}
          </li>
        ))}
      </ul>
    </>
  );
};

export default GroupList;
