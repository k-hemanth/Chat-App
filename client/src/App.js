import { styled } from "@mui/system";
import Header from "./Layout/Header";
import Routes from "./Routes";
import './App.css';

const MainWrapper = styled("main")({
  flexGrow: 1,
  // height: "100vh",
  overflow: "auto",
});

function App() {
  return (
    <>
      <Header />
      <MainWrapper>
        <Routes />
      </MainWrapper>
    </>
  );
}

export default App;
