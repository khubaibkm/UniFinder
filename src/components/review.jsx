import "./review.css";
import React from "react";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReviewData } from "./reviewData";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', width:'19px', height:'18px', background: '#212529', borderRadius: '100%'  }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', width:'19px', height:'18px', background: '#212529', borderRadius: '100%' }}
        onClick={onClick}
      />
    );
  }
  

export default function Review() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="carousel">
      <div id="category">
        <h2>Highlights & Reviews</h2>
        <h6>Take a glance</h6>
      </div>
      <div className="boxDiv"
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "20px",
        }}
      >
        <Card sx={{ maxWidth: 900, marginBottom: "20px" }}>
        <CardContent className="reviewContent">
            <Grid container spacing={2}>
            {/* First Column */}
            <Grid item xs={12} md={5}>
                <div className="grid-content">
                <Typography variant="body1" fontWeight="bold" style={{ fontSize: "30px" }} className="grid1">
                    Discover the Top Highlights and Reviews from 200+ listings.
                </Typography>
                </div>
            </Grid>

            {/* Second Column */}
            <Grid item xs={12} md={2}>
                <img src="Vector 2.png" alt="Image" style={{ width: "55px" }} />
            </Grid>

            {/* Third Column */}
            <Grid item xs={12} md={5}>
                <div className="grid-content">
                <Typography variant="body2" fontWeight="bold" color="text.secondary" className="grid2">
                    Go through the highlights to get a better understanding of the
                    places and things around. <br /> <br />
                    Experience the reviews – embark on a profound exploration of
                    customer experiences, comprehensive star ratings, and choose
                    the place according to your relevance.
                </Typography>
                </div>
            </Grid>
            </Grid>
        </CardContent>
        </Card>

      </div>

      <div className="App cardMain">
        <Slider {...settings}>
          {ReviewData.map((item) => (
            <div className="Card" key={item.id}>
              <div className="card-top">
                <img src={item.proImg} alt="pro" />
                <div className="details">
                  <h1>{item.name}</h1>
                  <p>{item.position}</p>
                </div>
              </div>

              <div className="card-mid">
                <p>{item.about}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}