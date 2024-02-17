import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "/src/firebase.js";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const Navigate = useNavigate();
  const { Component } = props;
  useEffect(() => {
    let login = onAuthStateChanged(auth, (user) => {
      if (!user) {
        Navigate("/signin");
      }
    });
  }, []);

  return (
    <>
      <Component />
    </>
  );
};

export default Protected;
