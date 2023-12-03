import { useEffect, useState } from "react";
import DrawerAppBarCat from '../../components/navCat'
import "./food.css";
import Footer from '../../components/footer';
import { MainData } from "./food_data";
import Modal from 'react-modal';

export default function Food() {
  
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
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
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
  function showPhoneNumber(phoneNumber) {
    alert("Phone Number: " + phoneNumber);
    // You can also use a modal or other UI components instead of alert
  }

  // Address
  const item = {
    addressImg:
      "https://lh5.googleusercontent.com/p/AF1QipNVK7sGNXhNy62uYkJPXzLlZdwEbaPI0D_L8LsD=w426-h240-k-no",
    latitude: "26.956781240938767",
    longitude: "80.99797393547381",
  };

  const handleAddressClick = () => {
    const mapsUrl = `https://www.google.com/maps?q=${item.latitude},${item.longitude}`;
    window.open(mapsUrl, "_blank");
  };
  return (
    <>
    <div className='food'>
      <DrawerAppBarCat/>
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
    
            {/* living-content */}
            <div className="living-content" style={{ height: livingPageHeight }}>
              {data
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
                          <span style={{fontWeight: "500"}}>Price range:</span> <span>{item.priceRange}</span>
                        </p>
                        <p>
                          <span style={{fontWeight: "500"}}>Service options:</span> <span>{item.serviceOptions}</span>
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
                            onClick={() => showPhoneNumber("+918604899882")}
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
                          <a href="#" onClick={handleAddressClick}>
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
                    <img className="media-img" src={item.mediaImg} alt="media" />
                    <p className="external-data" style={{ marginLeft: "7px", color: "black" }}>
                            Media
                      </p>
                        </a>
                       </div>
    
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Media Modal" className="boxmodal"
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
  )
}

