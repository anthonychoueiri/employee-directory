import { EmployeeInterface } from "../components/Employee";

const defaultFilter = (
  tempList: Array<EmployeeInterface>
): Array<EmployeeInterface> | null => tempList;

const fetchEmployees = async (
  setEmployees: React.Dispatch<React.SetStateAction<EmployeeInterface[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  filter: (
    tempList: Array<EmployeeInterface>
  ) => Array<EmployeeInterface> | null = defaultFilter
) => {
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

    const filteredList = filter(tempList);
    if (filteredList) {
      setEmployees(filteredList);
    }
  } catch (error) {
    console.log(error);
  }
  setLoading(false);
};

export default fetchEmployees;
