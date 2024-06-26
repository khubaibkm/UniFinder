import { useEffect, useState } from "react";
import DrawerAppBarCat from "../../components/navCat";
import "./shopping.css";
import Footer from "../../components/footer";
import { MainData } from "./shopping_data";
import Modal from "react-modal";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { TextField } from "@mui/material";

export default function Shopping() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
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
  const openModal = (images) => {
    setModalImages(images);
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
      behavior: "smooth",
    });
  };
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  // adjust living-content height
  let livingPageHeight;
  if (data.length > 0 && data.length <= 3) {
    livingPageHeight = `${data.length * 500}px`;
  } else {
    livingPageHeight = "auto";
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
      <div className="shopping">
        <DrawerAppBarCat />
        <div className="shop-heading">
          <p style={{ marginBottom: "13px", fontSize: "13px" }}>
            CHECK OUT OUR LISTINGS
          </p>
          <p style={{ lineHeight: 1.3, fontSize: "30px" }}>
            Explore the Shopping <br />
            Categories.
          </p>
        </div>
      </div>
      <div id="living_page">
        <div className="living_Card">
          <div
            className="living-card-top"
            onClick={() => setSelectedCategory("grocery")}
          >
            <div className="living-card-top-white-circle">
              <img
                className="living-card-top-pic"
                src="/images/shopping/groceries.png"
                alt="pro"
              />
            </div>
            <div className="details">
              <h1>Groceries</h1>
            </div>
          </div>
          <div
            className="living-card-top"
            onClick={() => setSelectedCategory("cloth")}
          >
            <div className="living-card-top-white-circle">
              <img
                className="living-card-top-pic"
                src="/images/shopping/clothing.png"
                alt="pro"
              />
            </div>
            <div className="details">
              <h1>Clothing</h1>
            </div>
          </div>
        </div>
        {/* <SearchBar onChange={handleSearchChange} /> */}
        {/* living-content */}
        <div className="living-content" style={{ height: livingPageHeight }}>
          {filteredData
            .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
            .map((item) => (
              <div className="live_card" key={item.id}>
                <img className="live_pic" src={item.shopPlace_img} alt="pro" />
                <div className="live_data">
                  <h4 className="hostel-item">{item.shopPlace}</h4>
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
                      <a onClick={() => openModal(item.modal_images)}>
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
                      onRequestClose={() => setIsModalOpen(false)}
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
                      <div className="modal-content">
                        <p className="modal-para">Check out Images</p>
                        <div className="image-container-modal">
                          {modalImages.map((image, index) => (
                            <img
                              className="modal_img"
                              key={index}
                              src={image}
                              alt={`Image ${index}`}
                            />
                          ))}
                        </div>
                        <button
                          className="modal-btn"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Close Modal
                        </button>
                      </div>
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
