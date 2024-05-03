import { useEffect, useState } from "react";
import DrawerAppBarCat from "../../components/navCat";
import "./food.css";
import Footer from "../../components/footer";
import { MainData } from "./food_data";
import Modal from "react-modal";
import { TextField, Button, InputAdornment, Typography } from "@mui/material";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { db, storage, auth } from "/src/firebase.js";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

import {
  collection,
  addDoc,
  where,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import {
  Add,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import SearchBar from "../../components/SearchBar";

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
  const [currentFoodReviewHostelId, setCurrentFoodReviewHostelId] =
    useState(null);
  const [Foodreviews, setFoodReviews] = useState([]);
  const [foodFormData, setFoodFormData] = useState({
    name: "",
    comment: "",
  });
  const [loading, setLoading] = useState(false);
  const [formData1, setFormData1] = useState({
    restaurantName: "",
    description: "",
    priceRange: "",
    contact: "",
  });
  const [userFormOpen, setUserFormOpen] = useState(false);
  // form
  const openUserForm = () => {
    setUserFormOpen(true);
  };

  const closeUserForm = () => {
    setUserFormOpen(false);
  };
  // driver tour
  useEffect(() => {
    const driverObj = driver({
      popoverClass: "driverjs-theme",
      showProgress: false,
      steps: [
        {
          element: ".add-icon",
          popover: {
            title: "Add Restaurant",
            description: "Click this icon to add a Restaurant.",
          },
        },
        {
          element: "#img-media",
          popover: {
            title: "Media",
            description: "This icon allows you to view and upload images.",
          },
        },
        {
          element: "#review-form",
          popover: {
            title: "Reviews",
            description: "Here you can give and view reviews from other users.",
          },
        },
      ],
    });

    driverObj.drive();

    // Cleanup function
    return () => {
      // Cleanup logic if needed
    };
  }, []);
  const UserhandleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Add the form data to the "added hostels" collection in Firestore
      const docRef = await addDoc(collection(db, "added restaurants"), {
        hostelName: formData1.restaurantName,
        description: formData1.description,
        rent: formData1.priceRange,
        contact: formData1.contact,
      });

      console.log("Document written with ID: ", docRef.id);

      // Reset form data after submission
      setFormData1({
        restaurantName: "",
        description: "",
        priceRange: "",
        contact: "",
      });
      setLoading(false);
      toast("Thanks for the contribution! Appreciate it.");
      // Close the modal
      closeUserForm();
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to send the data.");
    }
  };
  useEffect(() => {
    if (currentFoodReviewHostelId && isReviewModalOpen) {
      fetchFoodReviews(currentFoodReviewHostelId);
    }
  }, [currentFoodReviewHostelId, isReviewModalOpen]);

  const fetchFoodReviews = async (foodId) => {
    try {
      const foodReviewsCollectionRef = collection(db, "food reviews");
      const querySnapshot = await getDocs(
        query(
          foodReviewsCollectionRef,
          where("foodId", "==", foodId),
          orderBy("timestamp", "desc")
        )
      );
      const foodReviewsData = [];
      querySnapshot.forEach((doc) => {
        foodReviewsData.push(doc.data());
      });
      setFoodReviews(foodReviewsData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true while submitting

    try {
      // Get the currently authenticated user
      const currentUser = auth.currentUser;

      // Check if the user is authenticated
      if (!currentUser) {
        console.error("User not authenticated");
        setLoading(false); // Set loading state to false
        return;
      }

      // Access the 'reviews' collection in Firestore
      const reviewCollectionRef = collection(db, "food reviews");

      // Add a new document to the 'reviews' collection with the review data
      await addDoc(reviewCollectionRef, {
        name: foodFormData.name,
        comment: foodFormData.comment,
        userId: currentUser.uid,
        foodId: currentFoodReviewHostelId, // Include the hostel ID for the review
        timestamp: new Date(), // Add a timestamp for the review
      });

      // Reset form data and close the review modal
      setLoading(false); // Set loading state to false
      setFoodFormData({ name: "", comment: "" }); // Reset form data
      setIsReviewModalOpen(false); // Close the review modal

      // Fetch reviews again to update the displayed reviews for the current hostel
      fetchFoodReviews(currentFoodReviewHostelId);
      toast.success("Your review uploaded successfully!");
    } catch (error) {
      toast.error("Error uploading reviews");
      console.error("Error adding review: ", error);
      setLoading(false); // Set loading state to false in case of error
    }
  };

  const handleCategoryChange = (category) => {
    setActiveButton(1);
    setSelectedCategory(category);
    handleSearchAndCategoryChange();
    setCurrentPage(1);
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
  const handleFoodReviewModalClick = (foodId) => {
    setCurrentFoodReviewHostelId(foodId);
    setIsReviewModalOpen(true);
    fetchFoodReviews(foodId);
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
  if (filteredFood.length === 1) {
    livingPageHeight = `calc(100% - 100px)`;
  } else if (filteredFood.length > 0 && filteredFood.length <= 3) {
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
      <marquee
        style={{
          fontSize: "16px",
          color: " #333",
          padding: "10px",
        }}
      >
        ⚫ Service Options and contact details of restaurant may be subject to
        change.please verify the details with the restaurant management to stay
        up-to-date.
        <span style={{ marginLeft: "40px" }} />⚫ Help us expand UNIFINDER! If
        you know of any nearby hostels, restaurants, or other amenities not
        listed here, please let us know. Together, we can make UNIFINDER a
        helpful guide for future students.
      </marquee>

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
        <div className="searchbar-icon-container">
          <SearchBar onChange={handleSearchChange} className="searchbar" />
          <div className="add-icon" onClick={openUserForm}>
            <Add />
          </div>
          <Modal
            isOpen={userFormOpen}
            onRequestClose={closeUserForm}
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
            <div className="modal">
              <p className="modal-para">Add Restaurant</p>
              <form onSubmit={UserhandleSubmit}>
                <TextField
                  label="Restaurant Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData1.restaurantName}
                  onChange={(e) =>
                    setFormData1({
                      ...formData1,
                      restaurantName: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  placeholder="about the place and environment"
                  margin="normal"
                  value={formData1.description}
                  onChange={(e) =>
                    setFormData1({
                      ...formData1,
                      description: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Price Range"
                  variant="outlined"
                  placeholder="for example: 20-200/person"
                  fullWidth
                  margin="normal"
                  value={formData1.priceRange}
                  onChange={(e) =>
                    setFormData1({
                      ...formData1,
                      priceRange: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Rs.</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Contact"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData1.contact}
                  onChange={(e) =>
                    setFormData1({
                      ...formData1,
                      contact: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+91</InputAdornment>
                    ),
                    inputProps: {
                      pattern: "[0-9]*",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  style={{ marginTop: "10px" }}
                >
                  {loading ? "Adding..." : "Add"}
                </Button>
                <Button
                  onClick={closeUserForm}
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "20px", marginTop: "10px" }}
                >
                  Close
                </Button>
              </form>
            </div>
          </Modal>
        </div>
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
                    {/* <p>
                      <span style={{ fontWeight: "500" }}>Price range:</span>{" "}
                      <span>{item.priceRange}</span>
                    </p> */}
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
                    <div className="media" id="img-media">
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

                    <div className="media" id="review-form">
                      <a onClick={() => handleFoodReviewModalClick(item.id)}>
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
                      onRequestClose={() => setIsReviewModalOpen(false)}
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
                      <div className="review-modal-content">
                        <div className="review-modal">
                          {/* Existing Reviews */}
                          <div className="existing-reviews">
                            <Typography
                              style={{ margin: "auto", textAlign: "center" }}
                              variant="h5"
                            >
                              Checkout Reviews
                            </Typography>
                            <br />
                            {/* Map over the reviews state to display each review */}
                            <div
                              style={{ marginBottom: "20px" }}
                              className="review-list"
                            >
                              {Foodreviews.map((foodReview, index) => (
                                <div key={index} className="review-item">
                                  <Typography
                                    variant="subtitle1"
                                    className="review-name"
                                  >
                                    {foodReview.name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    className="review-comment"
                                  >
                                    {foodReview.comment}
                                  </Typography>{" "}
                                  <br />
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* Form to submit a new review */}
                          <div
                            style={{
                              background: "rgb(243, 243, 243)",
                              padding: "10px 50px 20px 50px",
                              borderRadius: "5px",
                            }}
                            className="review-form"
                          >
                            <Typography
                              style={{ fontSize: "18px", marginTop: "10px" }}
                              variant="h5"
                            >
                              Leave your Review
                            </Typography>
                            <form onSubmit={handleSubmitReview}>
                              <TextField
                                label="Your Name"
                                className="yourName"
                                value={foodFormData.name}
                                onChange={(e) =>
                                  setFoodFormData({
                                    ...foodFormData,
                                    name: e.target.value,
                                  })
                                }
                                required
                                fullWidth
                                margin="dense"
                                style={{
                                  marginRight: "10px",
                                  width: "calc(48%)",
                                }}
                              />
                              <TextField
                                label="Your Review"
                                className="yourReview"
                                value={foodFormData.comment}
                                onChange={(e) =>
                                  setFoodFormData({
                                    ...foodFormData,
                                    comment: e.target.value,
                                  })
                                }
                                required
                                fullWidth
                                margin="dense"
                                style={{ width: "calc(48%)" }}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  marginTop: "10px",
                                }}
                              >
                                <Button
                                  type="submit"
                                  variant="contained"
                                  color="primary"
                                  disabled={loading}
                                >
                                  {loading ? "Submitting..." : "Submit"}
                                </Button>
                                <Button
                                  onClick={() => setIsReviewModalOpen(false)}
                                >
                                  Close
                                </Button>
                              </div>
                            </form>
                          </div>
                        </div>
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
