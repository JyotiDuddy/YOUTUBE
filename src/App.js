import "./App.css";
import Head from "./components/Head";
import Body from "./components/Body";
import WatchPage from "./components/WatchPage";
import { Routes, Route } from "react-router-dom";
import MainContainer from "./components/MainContainer";

function App() {
  return (
    <>
      <Head />
      <Routes>
        <Route
          path="/"
          element={<Body />}
          children={[
             <Route index element={<MainContainer/>}/>,
             <Route path ="watch" element={<WatchPage/>}/>
          ]}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
