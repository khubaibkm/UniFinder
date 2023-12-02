import { useEffect, useState } from "react";
import "./living.css";
import DrawerAppBarCat from "../../components/navCat";
import Footer from "../../components/footer";
import { MainData } from "./living_data";
import Modal from "react-modal";

export default function Living() {
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

  const handleSort = (criteria) => {
    // Toggle sort order if clicking on the same criteria
    setSortOrder((prevOrder) =>
      sortCriteria === criteria ? (prevOrder === "asc" ? "desc" : "asc") : "asc"
    );
    setSortCriteria(criteria);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const handleGirlsClick = () => {
    // Filter data that contains "girls" keyword
    const girlsData = MainData.filter((item) =>
      item.specs.toLowerCase().includes("girls")
    );
    setData(girlsData);
    // Reset current page to 1 when applying a filter
    setCurrentPage(1);
    // Close the dropdown after clicking
    setDropdownVisible(false);
  };

  // Create a new function for handling boys filtering
  const handleBoysClick = () => {
    const boysData = MainData.filter((item) =>
      item.specs.toLowerCase().includes("boys")
    );
    setData(boysData);
    setCurrentPage(1);
    setDropdownVisible(false);
  };
  // adjust living-content height
  let livingPageHeight;
  if (data.length > 0 && data.length <= 3) {
    livingPageHeight = `${data.length * 500}px`; // Adjust 500 as needed
  } else {
    livingPageHeight = "auto"; // or set a default height as needed
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
                    <li onClick={handleGirlsClick}>GIRLS</li>
                    <li onClick={handleBoysClick}>BOYS</li>
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
                    <li onClick={handleGirlsClick}>GIRLS</li>
                    <li onClick={handleBoysClick}>BOYS</li>
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
          </div>
        </div>

        {/* living-content */}
        <div className="living-content" style={{ height: livingPageHeight }}>
          {data
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
            style={{ width: "60px", height: "30px" }}
          >
            Prev
          </button>
          <span style={{ paddingRight: "10px", paddingLeft: "10px" }}>
            {currentPage}
          </span>
          <button
            style={{ width: "60px", height: "30px" }}
            onClick={handleNextPage}
            disabled={lastPostIndex >= data.length}
          >
            Next
          </button>
        </div>
        <div id="contact us">
          <Footer />
        </div>
      </div>
    </>
  );
}
