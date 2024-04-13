import { useEffect, useState } from "react";
import "./living.css";
import DrawerAppBarCat from "../../components/navCat";
import Footer from "../../components/footer";
import { MainData } from "./living_data";
import Modal from "react-modal";
import {toast} from 'react-toastify';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "/src/firebase.js";

export default function Living() {
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [sortCriteria, setSortCriteria] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHostelId, setCurrentHostelId] = useState(null);
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
  
  
    const getdata = () => {
      setData(MainData);
    };
  
    useEffect(() => {
      getdata();
    }, []);
  
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
    // Toggle sort order if clicking on the same criteria
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
  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const handleCardClick = (hostelId) => {
    setCurrentHostelId(hostelId);
    openModal();
    fetchModalImages(hostelId);
  };

  const lastPostIndex = Math.min(currentPage * postsPerPage, data.length);
  const firstPostIndex = Math.max(lastPostIndex - postsPerPage, 0);
  const [selectedHostelCategory, setSelectedHostelCategory] = useState("All"); // Default to show all categories
  // Create a new function for handling Boys filtering in Hostel
  const handleBoysHostelClick = () => {
    const boysHostelData = MainData.filter(
      (item) =>
        item.category.includes("Boy") && item.category.includes("Hostel")
    );
    setData(boysHostelData);
    setSelectedHostelCategory("Boys Hostels");
    setCurrentPage(1);
    setDropdownVisible(false);
  };

  // Create a new function for handling Girls filtering in Hostel
  const handleGirlsHostelClick = () => {
    const girlsHostelData = MainData.filter(
      (item) =>
        item.category.includes("Girl") && item.category.includes("Hostel")
    );
    setData(girlsHostelData);
    setSelectedHostelCategory("Girls Hostels");
    setCurrentPage(1);
    setDropdownVisible(false);
  };

  // Create a new function for handling Boys filtering in Apartment
  const handleBoysApartmentClick = () => {
    const boysApartmentData = MainData.filter(
      (item) =>
        item.category.includes("Boy") && item.category.includes("Apartment")
    );
    setData(boysApartmentData);
    setSelectedHostelCategory("Boys Apartments");
    setCurrentPage(1);
    setDropdownVisible(false);
  };

  // Create a new function for handling Girls filtering in Apartment
  const handleGirlsApartmentClick = () => {
    const girlsApartmentData = MainData.filter(
      (item) =>
        item.category.includes("Girl") && item.category.includes("Apartment")
    );
    setData(girlsApartmentData);
    setSelectedHostelCategory("Girls Apartments");
    setCurrentPage(1);
    setDropdownVisible(false);
  };
  const filteredData = data.filter((item) => {
    if (selectedHostelCategory === "All") {
      return true;
    }
    return item.category.includes(selectedHostelCategory);
  });
  // adjust living-content height
  let livingPageHeight;
  if (data.length > 0 && data.length <= 3) {
    livingPageHeight = `${data.length * 500}px`;
  } else {
    livingPageHeight = "auto";
  }

  // contact
  function showPhoneNumber(contactPerson, phoneNumber1, phoneNumber2) {
    let alertMessage = `Contact Person: ${contactPerson}\nPhone Number 1: ${phoneNumber1}`;

    if (phoneNumber2) {
      alertMessage += `\nPhone Number 2: ${phoneNumber2}`;
    }

    alert(alertMessage);
  }

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
          {/* <div
            className="living-card-top"
            onMouseEnter={handleDropdownToggle}
            onMouseLeave={handleDropdownToggle}
          >
            <div className="living-card-top-white-circle">
              <img
                className="living-card-top-pic"
                src="/images/living/flats.png"
                alt="pro"
              />
            </div>
            <div className="details">
              <h1>Flats</h1>
              {dropdownVisible && (
                <div>
                  <ul>
                    <li onClick={handleGirlsClick}>GIRLS</li>
                    <li onClick={handleBoysClick}>BOYS</li>
                  </ul>
                </div>
              )}
            </div>
          </div> */}
        </div>

        {/* living-content */}
        <div className="living-content" style={{ height: livingPageHeight }}>
          {data.slice(firstPostIndex, lastPostIndex).map((item) => (
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
                      <p className="external-data" style={{ color: "black " }}>
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
                      <p className="external-data" style={{ color: "black " }}>
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
    <label htmlFor="file-input" className="custom-file-upload">
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
    style={{ display: 'none' }}
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
                      <p className="external-data" style={{ color: "black " }}>
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