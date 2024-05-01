import { useEffect, useState } from "react";
import DrawerAppBarCat from "../../components/navCat";
import "./emergency.css";
import Footer from "../../components/footer";
import { MainData } from "./emergency_data";
import Modal from "react-modal";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { TextField } from "@mui/material";

export default function Emergency() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const openReviewModal = () => {
    setIsReviewModalOpen(true);
  };
  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const comment = e.target.elements.comment.value;

    closeReviewModal();
  };
  const renderPageButtons = () => {
    const maxVisiblePages = 2;
    const buttons = [];
    if (totalPages <= 1) {
      return buttons;
    }
    buttons.push(
      <button
        id="pagination-btn"
        key={1}
        style={{
          margin: "5px",
          width: "30px",
          height: "30px",
          borderRadius: "5px",
          backgroundColor: activeButton === 1 ? "#D3D3D3" : "white",
        }}
        onClick={() => handlePageClick(1)}
        className={currentPage === 1 ? "activebtn" : ""}
      >
        1
      </button>
    );
    if (currentPage > maxVisiblePages + 1) {
      buttons.push(<span key="left-dots">...</span>);
    }
    const start = Math.max(2, currentPage - maxVisiblePages);
    const end = Math.min(totalPages - 1, currentPage + maxVisiblePages);

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          id="pagination-btn"
          key={i}
          style={{
            margin: "5px",
            width: "30px",
            height: "30px",
            borderRadius: "5px",
            backgroundColor: activeButton === i ? "#D3D3D3" : "white",
          }}
          onClick={() => handlePageClick(i)}
          className={currentPage === i ? "activebtn" : ""}
        >
          {i}
        </button>
      );
    }

    if (end < totalPages - 1) {
      buttons.push(<span key="right-dots">...</span>);
    }
    buttons.push(
      <button
        id="pagination-btn"
        key={totalPages}
        style={{
          margin: "5px",
          width: "30px",
          height: "30px",
          borderRadius: "5px",
          backgroundColor: activeButton === totalPages ? "#D3D3D3" : "white",
        }}
        onClick={() => handlePageClick(totalPages)}
        className={currentPage === totalPages ? "activebtn" : ""}
      >
        {totalPages}
      </button>
    );

    return buttons;
  };
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
  const [selectedCategory, setSelectedCategory] = useState("All");
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

      <marquee>
        ⚫In emergencies, access late-night medical shop details and connect
        with local drivers for rides. <span style={{ marginLeft: "40px" }} />
        ⚫Help improve our emergency section! Share contact details of local
        drivers offering late-night rides by emailing us. Your contribution
        ensures everyone has access to safe transportation options.
      </marquee>
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
                      <a onClick={openReviewModal}>
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
                    <Modal
                      isOpen={isReviewModalOpen}
                      onRequestClose={closeReviewModal}
                      contentLabel="Review Modal"
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
                      <div className="modal-content">
                        <p className="modal-para">Check out Reviews</p>
                        <form onSubmit={handleSubmitReview}>
                          <TextField
                            id="standard-basic"
                            label="Review"
                            variant="standard"
                            style={{ width: "95%" }}
                          />

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              marginTop: "10px",
                              marginLeft: "5px",
                            }}
                          >
                            <button
                              type="submit"
                              className="modal-btn"
                              style={{ marginRight: "10px" }}
                            >
                              Submit
                            </button>
                            <button
                              className="modal-btn"
                              onClick={closeReviewModal}
                            >
                              Close
                            </button>
                          </div>
                        </form>
                      </div>
                    </Modal>
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

          {renderPageButtons()}

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
