// import React from "react";
import "./aboutUs.css";
import DrawerAppBarCat from "./navCat";
import { useEffect } from "react";
import Footer from "./footer";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="aboutus">
        <DrawerAppBarCat />
        <div className="list">
          <p
            style={{
              marginBottom: "13px",
              paddingTop: "20px",
              fontSize: "25px",
            }}
          >
            CHECK OUT ABOUT US
          </p>
        </div>
      </div>
      <div className="about-project">
        <div className="project-section">
          <h2>About UniFinder</h2>
          <p>
            The &ldquo;UniFinder&rdquo; is a web application designed to provide
            comprehensive information about various amenities and services in
            the vicinity of a university campus. This project utilizes modern
            web development technologies, including HTML, CSS, Bootstrap,
            Material UI, JavaScript, and React.js. The primary goal is to
            simplify the process for university students, particularly
            newcomers, to access essential information about local restaurants,
            hostels, mess facilities, shops, and more within a single
            user-friendly platform.
          </p>
          <br />
          <p>
            <strong>Purpose:</strong> The purpose of the &ldquo;UniFinder&rdquo;
            project is crystal clear — to simplify the lives of university
            students. Navigating the unfamiliar terrain of a university campus
            can be a daunting task for newcomers, and finding essential services
            like restaurants, hostels, mess facilities, and shops can be
            time-consuming and frustrating. &ldquo;UniFinder&rdquo; seeks to
            eliminate these challenges by offering a single, centralized
            platform where students can effortlessly access detailed information
            about local amenities.
          </p>
          <br />
          <p>
            <strong>Future Goal:</strong> UniFinder is evolving into a dynamic
            platform, offering fully functional sections for food, shopping, and
            emergency services. The goal is to simplify university life by
            providing real-time, comprehensive information. Future plans include
            introducing filter options for hostels and food based on price,
            empowering users to make budget-conscious decisions. User sign-in
            and sign-out options will enhance personalization, allowing students
            to save preferences and access tailored information seamlessly.
            UniFinder envisions becoming an indispensable tool for students by
            providing a centralized platform that adapts to their evolving
            needs.
          </p>
        </div>
        <br />
        <hr />
        <br />
        <div className="main">
          {/* Flexbox Section */}
          <div className="left-box">
            <img className="ourpic" src="mynewpic.jpg" alt="Left Image" />
            <div className="ourdata">
              <p>
                MD ASIF SIDDIQUI
                <br />
                B.Tech (CSE)
                <br />
                Batch: 2020-24
                <br />
                <br />
                Hi, I&apos;m Asif Siddiqui from Deoria, UP. I&apos;ve led
                successful projects, showcasing my creative web design .
                Currently exploring the frontier of technology, I&apos;m
                enthusiastic about integrating cutting-edge solutions,
                particularly in cloud computing. I&apos;m also passionate about
                sky photography and sketching. In the future, Explore my profile
                for more, and feel free to reach out for collaboration or
                assistance. Thank you!
              </p>

              <p style={{ paddingBottom: "30px", fontWeight: "bold" }}>
                Portfolio:{" "}
                <a
                  style={{ color: "blue" }}
                  href="https://asifsid.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://asifsid.netlify.app/
                </a>
              </p>
            </div>
          </div>

          <div className="right-box">
            <img className="ourpic" src="khubaib1.jpg" alt="Right Image" />
            <div className="ourdata">
              <p>
                KHUBAIB AHMAD
                <br />
                B.Tech (CSE)
                <br />
                Batch: 2020-24
                <br /> <br />
                Hi, I&apos;m Khubaib Ahmad from Firozabad, UP. Passionate about
                Web Development, Cloud technologies, and mastering new
                Programming Languages, I&apos;m currently focused on becoming a
                FrontEnd Web Developer. Proficient in C, C++, and JavaScript, I
                blend coding with a love for photography, particularly in Nature
                and Minimalism. Explore my profile for more, and feel free to
                reach out for collaboration or assistance. Thank you!
              </p>

              <p style={{ paddingBottom: "30px", fontWeight: "bold" }}>
                Portfolio:{" "}
                <a
                  style={{ color: "blue" }}
                  href="https://khubaib.live/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://khubaib.live/
                </a>
              </p>
            </div>
          </div>
        </div>
        <div id="contact us">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AboutUs;
