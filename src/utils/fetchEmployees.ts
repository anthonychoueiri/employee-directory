import { EmployeeInterface } from "../components/Employee";

const fetchEmployees = async (): Promise<Array<EmployeeInterface> | null> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}?results=50&inc=name,location,picture,login`
    );
    const data = await response.json();

    const tempList: Array<EmployeeInterface> = [];
    for (const element of data.results) {
      const employee: EmployeeInterface = {
        id: element.login.uuid,
        name: element.name.first + " " + element.name.last,
        picture: element.picture.large,
        jobTitle: element.location.state, // to be changed
        location: element.location.country,
      };
      tempList.push(employee);
    }
    return tempList;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default fetchEmployees;
