import "./Review.css";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { dataReview } from "./data";

function SampleNextArrow({ className, style, onClick }) {
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow({ className, style, onClick }) {
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
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
    slidesToScroll: 4,
    initialSlide: 0,
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "20px",
        }}
      >
        <Card sx={{ maxWidth: 900, marginBottom: "20px" }}>
          <CardContent>
            <Grid container spacing={2}>
              {/* First Column */}
              <Grid item xs={5} id="grid1">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  style={{ fontSize: "30px", maxWidth: "400px" }}
                >
                  Discover the Top Highlights and Reviews from 200+ listings.
                </Typography>
              </Grid>

              {/* Second Column */}
              <Grid item xs={2} style={{ maxWidth: "100px" }}>
                <img
                  src="public/Vector 2.png"
                  alt="Image"
                  style={{ width: "55px" }}
                />
              </Grid>

              {/* Third Column */}
              <Grid item xs={5} style={{ maxWidth: "300px" }}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  color="text.secondary"
                >
                  Go through the highlights to get better understanding of the
                  places and things around. <br /> <br />
                  Experience the reviews – embark on a profound exploration of
                  customer experiences, comprehensive star ratings, and choose
                  the place according to your relevance.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>

      <div className="App">
        <Slider {...settings}>
          {dataReview.map((item) => (
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
