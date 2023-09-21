// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
// import Button from '@mui/material/Button';
import DrawerAppBar from "./components/nav";
import { Page1 } from "./components/page1";

function App() {
  return (
    <>
      <div className="app">
        <DrawerAppBar/><Page1/>
      </div> 
    </>
  );
}

export default App;
