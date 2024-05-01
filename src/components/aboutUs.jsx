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
            Material UI, React.js and Firebase. The primary goal is to simplify
            the process for university students, particularly newcomers, to
            access essential information about local restaurants, hostels, mess
            facilities, shops, and more within a single user-friendly platform.
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
            <strong>Future Goal:</strong> we're not just thinking about today
            but about the years to come. We want UniFinder to be more than just
            an app; it's a community effort. We're passing the torch to the
            students of Integral University, so they can keep it running
            smoothly for years to come. We'll work together to make sure
            UniFinder fits perfectly into university life, with updates and
            improvements shaped by the students who use it every day. Our aim is
            for UniFinder to become a part of Integral University, helping
            students find what they need and making campus life easier. We're
            here to support them every step of the way, ensuring UniFinder
            leaves a lasting mark as a symbol of innovation and teamwork.
          </p>
        </div>
        <br />
        <hr />
        <br />
        <br />
        <p className="founder">FOUNDERS</p>
        <br />
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
                Hello! I&apos;m Asif Siddiqui from Deoria, Uttar Pradesh. I love
                creating beautiful websites and have experience in web design.
                Currently, I&apos;m exploring the exciting world of technology,
                especially the MERN stack . When I&apos;m not coding,
                you&apos;ll find me capturing the sky&apos;s beauty through
                photography or expressing myself through sketches. Feel free to
                check out my profile—I&apos;m open to collaboration and always
                ready to help. Thank you!
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
