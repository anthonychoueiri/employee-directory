import Header from "./components/Header";
import "./sass/main.scss";

type AppProps = {
  children: React.ReactNode;
};

const App = ({ children }: AppProps): JSX.Element => {
  return (
    <>
      <Header />
      <div className="App">{children}</div>
    </>
  );
};

export default App;
