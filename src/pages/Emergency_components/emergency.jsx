import { useEffect, useState } from "react";
import DrawerAppBarCat from "../../components/navCat";
import "./emergency.css";
import Footer from "../../components/footer";
import { MainData } from "./emergency_data";
import Modal from "react-modal";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

export default function Emergency() {
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [sortCriteria, setSortCriteria] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getdata = () => {
    setData(MainData);
  };

  useEffect(() => {
    getdata();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    setActiveButton((prevButton) => Math.min(prevButton + 1, totalPages));
    scrollToTop();
  };
  const [activeButton, setActiveButton] = useState(1);
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    setActiveButton((prevButton) => Math.max(prevButton - 1, 1));
    scrollToTop();
  };
  const totalPages = Math.ceil(data.length / postsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    setActiveButton(pageNumber);
    scrollToTop();
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can change this to "auto" for instant scrolling
    });
  };
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  // adjust living-content height
  let livingPageHeight;
  if (data.length > 0 && data.length <= 3) {
    livingPageHeight = `${data.length * 500}px`; // Adjust 500 as needed
  } else {
    livingPageHeight = "auto"; // or set a default height as needed
  }

  // contact
  function showPhoneNumber(phoneNumber1, phoneNumber2) {
    let alertMessage = `Phone Number 1: ${phoneNumber1}`;

    if (phoneNumber2) {
      alertMessage += `\nPhone Number 2: ${phoneNumber2}`;
    }

    alert(alertMessage);
  }
  // Filteration
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default to show all categories
  const filteredData = data.filter((item) => {
    if (selectedCategory === "All") {
      return true; // Show all categories
    }
    return item.category.some((category) => category === selectedCategory);
  });
  return (
    <>
      <div className="emergency">
        <DrawerAppBarCat />
        <div className="emer-heading">
          <p style={{ marginBottom: "13px", fontSize: "13px" }}>
            CHECK OUT OUR LISTINGS
          </p>
          <p style={{ lineHeight: 1.3, fontSize: "30px" }}>
            Explore the Emergency <br />
            Categories.
          </p>
        </div>
      </div>
      <div id="living_page">
        <div className="living_Card">
          <div
            className="living-card-top"
            onClick={() => setSelectedCategory("medical")}
          >
            <div className="living-card-top-white-circle">
              <img
                className="living-card-top-pic"
                src="/images/emergency/medical.png"
                alt="pro"
              />
            </div>
            <div className="details">
              <h1>Medical</h1>
            </div>
          </div>
          <div
            className="living-card-top"
            onClick={() => setSelectedCategory("ride")}
          >
            <div className="living-card-top-white-circle">
              <img
                className="living-card-top-pic"
                src="/images/emergency/emergency_ride.png"
                alt="pro"
              />
            </div>
            <div className="details">
              <h1>Emergency Ride</h1>
            </div>
          </div>
        </div>

        {/* living-content */}
        <div className="living-content" style={{ height: livingPageHeight }}>
          {filteredData
            .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
            .map((item) => (
              <div className="live_card" key={item.id}>
                <img className="live_pic" src={item.emerPlace_img} alt="pro" />
                <div className="live_data">
                  <h4 className="hostel-item">{item.emerPlace}</h4>
                  <p style={{ paddingBottom: "10px" }} className="specs">
                    {item.specs}
                  </p>
                  {/* Facility */}
                  <div className="facility">
                    <h5 style={{ fontSize: "17px" }}>Availability:</h5>
                    <p>
                      <span>{item.serviceOptions}</span>
                    </p>
                  </div>
                  {/*rent  */}
                  <div className="Rent">
                    <h5 style={{ fontSize: "17px" }}>Hours:</h5>
                    <p>
                      <span>{item.timings}</span>
                    </p>
                  </div>
                  {/* Media */}
                  <div className="media-card">
                    <div className="media">
                      <a
                        href="#"
                        onClick={() =>
                          showPhoneNumber(item.phone1, item.phone2)
                        }
                      >
                        <img
                          className="media-img"
                          src={item.contactImg}
                          alt="contact"
                        />
                        <p
                          className="external-data"
                          style={{ color: "black " }}
                        >
                          Contact Us
                        </p>
                      </a>
                    </div>
                    <div className="media">
                      <a
                        href={item.map}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          className="media-img"
                          src={item.addressImg}
                          alt="address"
                        />
                        <p
                          className="external-data"
                          style={{ color: "black " }}
                        >
                          Address
                        </p>
                      </a>
                    </div>
                    <div className="media">
                      <a onClick={openModal}>
                        <img
                          className="media-img"
                          src={item.mediaImg}
                          alt="media"
                        />
                        <p
                          className="external-data"
                          style={{ marginLeft: "7px", color: "black" }}
                        >
                          Media
                        </p>
                      </a>
                    </div>

                    <Modal
                      isOpen={isModalOpen}
                      onRequestClose={closeModal}
                      contentLabel="Media Modal"
                      className="boxmodal"
                      style={{
                        overlay: {
                          backgroundColor: "rgba(0, 0, 0, 0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        },
                      }}
                    >
                      {/* Your modal content goes here */}
                      <p>This is the media modal content.</p>
                      <button onClick={closeModal}>Close Modal</button>
                    </Modal>

                    <div className="media">
                      <a href="#">
                        <img
                          className="media-img"
                          src={item.reviewImg}
                          alt="reviews"
                        />
                        <p
                          className="external-data"
                          style={{ color: "black " }}
                        >
                          Reviews
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="pagination">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="sidebtn"
          >
            <KeyboardArrowLeft />
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              id="pagination-btn"
              key={index}
              style={{
                margin: "5px",
                width: "30px",
                height: "30px",
                borderRadius: "5px",
                backgroundColor:
                  activeButton === index + 1 ? "#D3D3D3" : "white",
              }}
              onClick={() => handlePageClick(index + 1)}
              className={currentPage === index + 1 ? "activebtn" : ""}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={data.slice(currentPage * postsPerPage).length === 0}
            className="sidebtn"
          >
            <KeyboardArrowRight />
          </button>
        </div>
        <div id="contact us">
          <Footer />
        </div>
      </div>
    </>
  );
}
