// App.js
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import Home from "./pages/home/home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Living from "./pages/Living_components/living";
import Food from "./pages/Food_components/food";
import Emergency from "./pages/Emergency_components/emergency";
import Shopping from "./pages/Shopping_components/shopping";
import AboutUs from "./components/aboutUs";
import Loader from "./components/Loader";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
// import Error from "./components/error";
import Protected from "./components/services/Protected";
import HomeWithoutSigning from "./pages/HomeWithoutSigning";
import IntroForm from "./components/introForm";
import MyProfile from "./components/myProfile";
import Modal from 'react-modal';
import { messaging } from "./firebase";
import {getToken} from "firebase/messaging";


function App() {
  // Notification
  async function requestPermission(){
      const permission = await Notification.requestPermission();
      if(permission==="granted"){
        const token = await getToken(messaging, {vapidKey: "BK5NvsdDcjb-rYBqzlmsUt4cw5s4uqe5MjWMni6YTW6nmqU6Dq6JEWECZkHtQ1MGWxrw_cSefLlTcmLQoSFtab0"});
        console.log("token generated", token);
      }
      else if(permission==="denied"){
        alert("You denied the permissions, now you'll not get any notifications!")
      }
  }

  useEffect(() =>{
      requestPermission();
  }, []);

  Modal.setAppElement("#root");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ScrollToTop
        className="scrollToTop"
        smooth
        style={{ borderRadius: "50%", padding: "20px 42px 40px 16px" }}
      />
      <div className="app">
        <ToastContainer />
        {loading ? (
          <Loader />
        ) : (
          <Router>
            <Routes>
              <Route path="/" element={<HomeWithoutSigning />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route
              path="/form"
              element={<Protected Component={IntroForm} />}
            />
              <Route
              path="/profile"
              element={<Protected Component={MyProfile} />}
            />
              <Route path="/home" element={<Protected Component={Home} />} />
              <Route path="/home/living" element={<Protected Component={Living} />} />
              <Route path="/home/food" element={<Protected Component={Food} />} />
              <Route path="/home/shopping" element={<Protected Component={Shopping} />} />
              <Route path="/home/emergency" element={<Protected Component={Emergency} />} />
              <Route path="aboutus" element={<AboutUs />} />
              {/* <Route path="*" element={<Error />} /> */}
            </Routes>
          </Router>
        )}
      </div>
    </>
  );
}

export default App;
