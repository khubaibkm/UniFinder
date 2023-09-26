// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
// import Button from '@mui/material/Button';
import DrawerAppBar from "./components/nav";
import { Page1 } from "./components/page1";
import { Categories } from "./components/categories";

function App() {
  return (
    <>
      <div className="app">
        <DrawerAppBar/>
        <Page1/>
        <Categories/>
      </div> 
    </>
  );
}

export default App;
