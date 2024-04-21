import { useEffect, useState } from "react";
import "./living.css";
import DrawerAppBarCat from "../../components/navCat";
import Footer from "../../components/footer";
import { MainData } from "./living_data";
import { TextField, Button, Typography } from "@mui/material";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { KeyboardArrowLeft, KeyboardArrowRight, Style } from "@mui/icons-material";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { db, storage, auth } from "/src/firebase.js";
import { collection, addDoc, where, query, getDocs, orderBy } from "firebase/firestore";
import SearchBar from "../../components/SearchBar";

export default function Living() {
  const [sortOrder, setSortOrder] = useState("asc");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [sortCriteria, setSortCriteria] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHostelId, setCurrentHostelId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [activeButton, setActiveButton] = useState(1);
  const [selectedHostelCategory, setSelectedHostelCategory] = useState("All"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHostels, setFilteredHostels] = useState(MainData);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [currentReviewHostelId, setCurrentReviewHostelId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
  });
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (currentReviewHostelId && isReviewModalOpen) {
      fetchReviews(currentReviewHostelId);
    }
  }, [currentReviewHostelId, isReviewModalOpen]);
  
  const fetchReviews = async (hostelId) => {
    try {
      const reviewsCollectionRef = collection(db, "reviews");
      const querySnapshot = await getDocs(
        query(reviewsCollectionRef, where("hostelId", "==", hostelId), orderBy("timestamp", "desc"))
      );
      const reviewsData = [];
      querySnapshot.forEach((doc) => {
        reviewsData.push(doc.data());
      });
      setReviews(reviewsData);
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
      const reviewCollectionRef = collection(db, "reviews");
  
      // Add a new document to the 'reviews' collection with the review data
      await addDoc(reviewCollectionRef, {
        name: formData.name,
        comment: formData.comment,
        userId: currentUser.uid,
        hostelId: currentReviewHostelId, // Include the hostel ID for the review
        timestamp: new Date(), // Add a timestamp for the review
      });
  
      // Reset form data and close the review modal
      setLoading(false); // Set loading state to false
      setFormData({ name: "", comment: "" }); // Reset form data
      setIsReviewModalOpen(false); // Close the review modal
  
      // Fetch reviews again to update the displayed reviews for the current hostel
      fetchReviews(currentReviewHostelId);
    } catch (error) {
      console.error("Error adding review: ", error);
      setLoading(false); // Set loading state to false in case of error
    }
  };


  useEffect(() => {
    setData(MainData);
  }, []);

  useEffect(() => {
    if (currentHostelId && isModalOpen) {
      fetchModalImages(currentHostelId);
    }
  }, [currentHostelId, isModalOpen]);

  const openModal = async () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setUploading(true);

    try {
      if (!currentHostelId) {
        throw new Error("No hostel selected.");
      }

      const storageRef = ref(
        storage,
        `hostel_images/${currentHostelId}/${file.name}`
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

  const fetchModalImages = async (hostelId) => {
    try {
      if (!hostelId) {
        throw new Error("No hostel ID provided.");
      }

      const imagesRef = ref(storage, `hostel_images/${hostelId}`);
      const imageList = await listAll(imagesRef);
      const urls = await Promise.all(
        imageList.items.map((item) => getDownloadURL(item))
      );
      setModalImages(urls);
    } catch (error) {
      console.error("Error fetching modal images: ", error);
    }
  };

  const handleSort = (criteria) => {
    setSortOrder((prevOrder) =>
      sortCriteria === criteria ? (prevOrder === "asc" ? "desc" : "asc") : "asc"
    );
    setSortCriteria(criteria);
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

  const totalPages = Math.ceil(filteredHostels.length / postsPerPage);

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

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleBoysHostelClick = () => {
    const boysHostelData = MainData.filter(
      (item) =>
        item.category.includes("Boy") && item.category.includes("Hostel")
    );
    setFilteredHostels(boysHostelData);
    setSelectedHostelCategory("Boys Hostels");
    setCurrentPage(1);
    setDropdownVisible(false);
  };

  const handleGirlsHostelClick = () => {
    const girlsHostelData = MainData.filter(
      (item) =>
        item.category.includes("Girl") && item.category.includes("Hostel")
    );
    setFilteredHostels(girlsHostelData);
    setSelectedHostelCategory("Girls Hostels");
    setCurrentPage(1);
    setDropdownVisible(false);
  };

  const handleBoysApartmentClick = () => {
    const boysApartmentData = MainData.filter(
      (item) =>
        item.category.includes("Boy") && item.category.includes("Apartment")
    );
    setFilteredHostels(boysApartmentData);
    setSelectedHostelCategory("Boys Apartments");
    setCurrentPage(1);
    setDropdownVisible(false);
  };

  const handleGirlsApartmentClick = () => {
    const girlsApartmentData = MainData.filter(
      (item) =>
        item.category.includes("Girl") && item.category.includes("Apartment")
    );
    setFilteredHostels(girlsApartmentData);
    setSelectedHostelCategory("Girls Apartments");
    setCurrentPage(1);
    setDropdownVisible(false);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = data.filter((hostel) =>
      hostel.hostel.toLowerCase().includes(query)
    );
    setFilteredHostels(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (currentHostelId && (isModalOpen || !isModalOpen)) {
      fetchModalImages(currentHostelId);
    }
  }, [currentHostelId, isModalOpen]);

  useEffect(() => {
    if (currentReviewHostelId && (isReviewModalOpen || !isReviewModalOpen)) {
      fetchReviews(currentReviewHostelId);
    }
  }, [currentReviewHostelId, isReviewModalOpen]);

  
  const handleCardClick = (hostelId) => {
    setCurrentHostelId(hostelId);
    openModal();
    fetchModalImages(hostelId);
  };
  
  const handleReviewModalClick = (hostelId) => {
    setCurrentReviewHostelId(hostelId);
    setIsReviewModalOpen(true);
    fetchReviews(hostelId);
  };
  
  
  

  const showPhoneNumber = (contactPerson, phoneNumber1, phoneNumber2) => {
    let alertMessage = `Contact Person: ${contactPerson}\nPhone Number 1: ${phoneNumber1}`;

    if (phoneNumber2) {
      alertMessage += `\nPhone Number 2: ${phoneNumber2}`;
    }

    alert(alertMessage);
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

  return (
    <>
      <div className="listings">
        <DrawerAppBarCat />
        <div className="list">
          <p style={{ marginBottom: "13px", fontSize: "13px" }}>
            CHECK OUT OUR LISTINGS
          </p>
          <p style={{ lineHeight: 1.3, fontSize: "30px" }}>
            Explore the Living <br />
            Categories.
          </p>
        </div>
      </div>

      <div id="living_page">
        <div className="living_Card">
          <div
            className="living-card-top"
            onMouseEnter={handleDropdownToggle}
            onMouseLeave={handleDropdownToggle}
          >
            <div className="living-card-top-white-circle">
              <img
                className="living-card-top-pic"
                src="/images/living/hostel.png"
                alt="pro"
              />
            </div>
            <div className="details">
              <h1>Hostel</h1>
              {dropdownVisible && (
                <div>
                  <ul>
                    <li onClick={handleGirlsHostelClick}>GIRLS</li>
                    <li onClick={handleBoysHostelClick}>BOYS</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div
            className="living-card-top"
            onMouseEnter={handleDropdownToggle}
            onMouseLeave={handleDropdownToggle}
          >
            <div className="living-card-top-white-circle">
              <img
                className="living-card-top-pic"
                src="/images/living/apartment.png"
                alt="pro"
              />
            </div>
            <div className="details">
              <h1>Apartments</h1>
              {dropdownVisible && (
                <div>
                  <ul>
                    <li onClick={handleGirlsApartmentClick}>GIRLS</li>
                    <li onClick={handleBoysApartmentClick}>BOYS</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <SearchBar onChange={handleSearchChange} />
        {/* living-content */}
        <div className="living-content">
          {filteredHostels
            .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
            .map((item) => (
              <div className="live_card" key={item.id}>
                <img className="live_pic" src={item.hostel_img} alt="pro" />
                <div className="live_data">
                  <h4 className="hostel-item">{item.hostel}</h4>
                  <p style={{ paddingBottom: "10px" }} className="specs">
                    {item.specs}
                  </p>
                  {/* Facility */}
                  <div className="facility">
                    <h5 style={{ fontSize: "17px" }}>Facilities</h5>
                    <p>
                      Free: <span>{item.Free}</span>
                    </p>
                    <p>
                      Paid: <span>{item.Paid}</span>
                    </p>
                  </div>
                  {/*rent  */}
                  <div className="Rent">
                    <h5 style={{ fontSize: "17px" }}>Rent</h5>
                    <p>
                      <span>{item.Rent}</span>
                    </p>
                  </div>
                  {/* Media */}
                  <div className="media-card">
                    <div className="media">
                      <a
                        href="#"
                        onClick={() =>
                          showPhoneNumber(
                            item.contactPerson,
                            item.phone1,
                            item.phone2
                          )
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
                      <a onClick={() => handleCardClick(item.id)}>
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
                        <p className="modal-para">Check out Images</p>
                        {/* Render modal images for the current hostel only */}
                        <div className="image-container-modal">
                          {currentHostelId !== null &&
                            data
                              .filter((item) => item.id === currentHostelId)
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
  <a onClick={() => handleReviewModalClick(item.id)}> {/* Pass the hostelId to the function */}
    <img className="media-img" src={item.reviewImg} alt="reviews" />
    <p className="external-data" style={{ color: "black " }}>
      Reviews
    </p>
  </a>
</div>

      {/* Review Modal */}
      <Modal
  contentLabel="Reviews Modal"
  className="boxmodal"
  style={{
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }}
  isOpen={isReviewModalOpen}
  onRequestClose={() => setIsReviewModalOpen(false)}
>
  <div className="review-modal-content">
    <div className="review-modal">
      {/* Existing Reviews */}
      <div className="existing-reviews">
        <Typography style={{ margin: "auto", textAlign: "center" }} variant="h5">
          Checkout Reviews
        </Typography>
        <br />
        {/* Map over the reviews state to display each review */}
        <div style={{marginBottom:"20px"}} className="review-list">
          {reviews.map((review, index) => (
            <div key={index} className="review-item">
              <Typography variant="subtitle1" className="review-name">
                {review.name}
              </Typography>
              <Typography variant="body2" className="review-comment">
                {review.comment}
              </Typography> <br />
            </div>
          ))}
        </div>
      </div>
      {/* Form to submit a new review */}
      <div style={{background: "rgb(243, 243, 243)", padding:"10px 50px 20px 50px", borderRadius:"5px"}} className="review-form"> 
        <Typography style={{fontSize:"18px", marginTop:"10px"}} variant="h5">Leave your Review</Typography>
        <form onSubmit={handleSubmitReview}>
  <TextField
    label="Your Name"
    className="yourName"
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    required
    fullWidth
    margin="dense"
    style={{ marginRight:"10px", width: "calc(48%)" }} 
  />
  <TextField
    label="Your Review"
    className="yourReview"
    value={formData.comment}
    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
    required
    fullWidth
    margin="dense"
    style={{ width: "calc(48%)" }} 
  />
  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={loading}
    >
      {loading ? "Submitting..." : "Submit"}
    </Button>
    <Button onClick={() => setIsReviewModalOpen(false)}>Close</Button>
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
