import { Link, useParams } from "react-router-dom";

import Error from "./Error";
import { titles, locations } from "../utils/constants";

export type GroupType = "titles" | "locations" | unknown;

const GroupList = (): JSX.Element => {
  const params = useParams();
  const groupType: GroupType = params.groupType;

  let pageTitle, groupList;

  if (groupType === "titles") {
    pageTitle = "Titles";
    groupList = titles;
  } else if (groupType === "locations") {
    pageTitle = "Locations";
    groupList = locations;
  } else {
    return <Error />;
  }

  return (
    <>
      <h1 className="page-title">{pageTitle}</h1>
      <ul className="groups-list">
        {groupList.map((element) => (
          <li key={element} className="list-element">
            <Link to={`${element}`}>{element}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default GroupList;
