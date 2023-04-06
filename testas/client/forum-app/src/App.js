import AllRoutes from "./routes/AllRoutes";
import Navbar from "./components/navbar/Navbar";
import styled from "styled-components";

function App() {
  return (
    <Wrapper>
      <Navbar />
      <AllRoutes />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
`;
