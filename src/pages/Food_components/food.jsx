import { useEffect, useState } from "react";
import DrawerAppBarCat from "../../components/navCat";
import "./food.css";
import Footer from "../../components/footer";
import { MainData } from "./food_data";
import Modal from "react-modal";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "/src/firebase.js";
import { toast } from "react-toastify";
import SearchBar from "../../components/SearchBar";
import { TextField } from "@mui/material";

export default function Food() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [activeButton, setActiveButton] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFoodItemId, setSelectedFoodItemId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFood, setFilteredFood] = useState(MainData);
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
  const handleCategoryChange = (category) => {
    setCurrentPage(1);
    setActiveButton(1);
    setSelectedCategory(category);
    handleSearchAndCategoryChange();
  };

  const handleSearchAndCategoryChange = () => {
    const filteredByCategory =
      selectedCategory === "All"
        ? MainData
        : MainData.filter((item) => item.category.includes(selectedCategory));

    const filteredByName = filteredByCategory.filter((food) =>
      food.foodPlace.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredFood(filteredByName);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1);

    handleSearchAndCategoryChange();
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

  useEffect(() => {
    if (selectedFoodItemId && isModalOpen) {
      fetchModalImages(selectedFoodItemId);
    }
  }, [selectedFoodItemId, isModalOpen]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setUploading(true);

    try {
      if (!selectedFoodItemId) {
        throw new Error("No food item selected.");
      }

      const storageRef = ref(
        storage,
        `food_images/${selectedFoodItemId}/${file.name}`
      );

      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);

      setModalImages((prevImages) => [...prevImages, imageUrl]);
      setUploading(false);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image: ", error);
      setUploading(false);
    }
  };

  const fetchModalImages = async (foodItemId) => {
    try {
      if (!foodItemId) {
        throw new Error("No food item ID provided.");
      }

      const imagesRef = ref(storage, `food_images/${foodItemId}`);
      const imageList = await listAll(imagesRef);
      const urls = await Promise.all(
        imageList.items.map((item) => getDownloadURL(item))
      );
      setModalImages(urls);
    } catch (error) {
      console.error("Error fetching modal images: ", error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    setActiveButton((prevButton) => Math.min(prevButton + 1, totalPages));
    scrollToTop();
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    setActiveButton((prevButton) => Math.max(prevButton - 1, 1));
    scrollToTop();
  };

  const totalPages = Math.ceil(filteredFood.length / postsPerPage);

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

  const handleFoodItemClick = (foodItemId) => {
    setSelectedFoodItemId(foodItemId);
    openModal();
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

  // adjust living-content height
  let livingPageHeight;
  if (filteredFood.length > 0 && filteredFood.length <= 3) {
    livingPageHeight = `${filteredFood.length * 500}px`; // Adjust 500 as needed
  } else {
    livingPageHeight = "auto";
  }

  function showPhoneNumber(phoneNumber1, phoneNumber2) {
    let alertMessage = `Phone Number 1: ${phoneNumber1}`;

    if (phoneNumber2) {
      alertMessage += `\nPhone Number 2: ${phoneNumber2}`;
    }

    alert(alertMessage);
  }

  return (
    <>
      <div className="food">
        <DrawerAppBarCat />
        <div className="food-heading">
          <p style={{ marginBottom: "13px", fontSize: "13px" }}>
            CHECK OUT OUR LISTINGS
          </p>
          <p style={{ lineHeight: 1.3, fontSize: "30px" }}>
            Explore the Food <br />
            Categories.
          </p>
        </div>
      </div>
      <div id="living_page">
        <div className="living_Card">
          <div
            className="living-card-top"
            onClick={() => handleCategoryChange("Restaurants")}
          >
            <div className="living-card-top-white-circle">
              <img
                className="living-card-top-pic"
                src="/images/food/restaurant.png"
                alt="pro"
              />
            </div>
            <div className="details">
              <h1>Restaurants</h1>
            </div>
          </div>
          <div
            className="living-card-top"
            onClick={() => handleCategoryChange("Dhabas")}
          >
            <div className="living-card-top-white-circle">
              <img
                className="living-card-top-pic"
                src="/images/food/dhaba.png"
                alt="pro"
              />
            </div>
            <div className="details">
              <h1>Dhabas</h1>
            </div>
          </div>

          <div
            className="living-card-top"
            onClick={() => handleCategoryChange("Cafe")}
          >
            <div className="living-card-top-white-circle">
              <img
                className="living-card-top-pic"
                src="/images/food/tea_stall.png"
                alt="pro"
              />
            </div>
            <div className="details">
              <h1>Tea Stalls</h1>
            </div>
          </div>
        </div>
        <SearchBar onChange={handleSearchChange} />
        <div className="living-content" style={{ height: livingPageHeight }}>
          {filteredFood
            .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
            .map((item) => (
              <div className="live_card" key={item.id}>
                <img className="live_pic" src={item.foodPlace_img} alt="pro" />
                <div className="live_data">
                  <h4 className="hostel-item">{item.foodPlace}</h4>
                  <p style={{ paddingBottom: "10px" }} className="specs">
                    {item.specs}
                  </p>
                  <div className="facility">
                    <h5 style={{ fontSize: "17px" }}>Details:</h5>
                    <p>
                      <span style={{ fontWeight: "500" }}>Price range:</span>{" "}
                      <span>{item.priceRange}</span>
                    </p>
                    <p>
                      <span style={{ fontWeight: "500" }}>
                        Service options:
                      </span>{" "}
                      <span>{item.serviceOptions}</span>
                    </p>
                  </div>
                  <div className="Rent">
                    <h5 style={{ fontSize: "17px" }}>Hours:</h5>
                    <p>
                      <span>{item.timings}</span>
                    </p>
                  </div>
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
                      <a onClick={() => handleFoodItemClick(item.id)}>
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
                      <div className="modal-content">
                        <div className="image-container-modal">
                          {selectedFoodItemId !== null &&
                            filteredFood
                              .filter((item) => item.id === selectedFoodItemId)
                              .map((item) =>
                                item.modal_images?.map((image, index) => (
                                  <img
                                    key={`${item.id}_${index}`}
                                    className="modal_img"
                                    src={image}
                                    alt={`Image ${index}`}
                                  />
                                ))
                              )}
                          {modalImages.map((imageUrl, index) => (
                            <img
                              key={index}
                              className="modal_img"
                              src={imageUrl}
                              alt={`Image ${index}`}
                            />
                          ))}
                        </div>
                        {uploading ? (
                          <p className="custom-file-upload">Uploading...</p>
                        ) : (
                          <label
                            htmlFor="file-input"
                            className="custom-file-upload"
                          >
                            Upload Image
                          </label>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleUpload}
                          disabled={uploading}
                          id="file-input"
                          style={{ display: "none" }}
                        />
                        <button className="modal-btn" onClick={closeModal}>
                          Close
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
        <div className="pagination" style={{ padding: "0px" }}>
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
            className="sidebtn"
            disabled={
              filteredFood.slice(currentPage * postsPerPage).length === 0
            }
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
