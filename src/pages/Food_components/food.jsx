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

export default function Food() {
  const handleCategoryChange = () => {
    setCurrentPage(1);
    setActiveButton(1);
  };
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [activeButton, setActiveButton] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFoodItemId, setSelectedFoodItemId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  //pagination code
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

  // Function to fetch modal images from Firebase storage
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
  const handleFoodItemClick = (foodItemId) => {
    setSelectedFoodItemId(foodItemId);
    openModal();
  };
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  // adjust living-content height
  let livingPageHeight;
  if (data.length > 0 && data.length <= 3) {
    livingPageHeight = `${data.length * 500}px`; // Adjust 500 as needed
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
    return item.category.includes(selectedCategory);
  });
  // searchbar
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFood, setFilteredFood] = useState(MainData);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = MainData.filter((food) =>
      food.foodPlace.toLowerCase().includes(query)
    );
    setFilteredFood(filtered);
  };

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
            onClick={() => {
              setSelectedCategory("Restaurants");
              handleCategoryChange();
            }}
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
            onClick={() => {
              setSelectedCategory("Dhabas");
              handleCategoryChange();
            }}
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
            onClick={() => {
              setSelectedCategory("Cafe");
              handleCategoryChange();
            }}
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
        {/* living-content */}
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
                  {/* Facility */}
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
                        {/* Modal content */}
                        <div className="image-container-modal">
                          {selectedFoodItemId !== null &&
                            data
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
                          {/* Modal images */}
                          {modalImages.map((imageUrl, index) => (
                            <img
                              key={index}
                              className="modal_img"
                              src={imageUrl}
                              alt={`Image ${index}`}
                            />
                          ))}
                        </div>
                        {/* Conditional rendering of upload button text */}
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
                        {/* Hide the input element */}
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
            disabled={data.slice(currentPage * postsPerPage).length === 0}
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
