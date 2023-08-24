import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/index"
function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/employees" element={<Table />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
