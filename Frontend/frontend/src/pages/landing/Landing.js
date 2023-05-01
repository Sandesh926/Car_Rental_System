import "./landing.css";
import Jeep from "../../images/jeep.png";
import Ios from "../../images/ios.png";
import Play from "../../images/play.png";
import Car1 from "../../images/car1.webp";
import Car2 from "../../images/car2.jpg";
import Car3 from "../../images/car3.jpg";
import Car4 from "../../images/car4.jpg";
import Car5 from "../../images/car5.jpg";
import Car6 from "../../images/car6.jpg";
import Car7 from "../../images/car7.webp";
import Car8 from "../../images/car8.png";
import About from "../../images/about.png";
import Rev2 from "../../images/rev2.PNG";
import Rev3 from "../../images/rev3.PNG";
import Rev4 from "../../images/rev4.PNG";
import Rev5 from "../../images/rev5.PNG";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      {/* Header */}
      <header className="header-main">
        <Link to="/" className="logo">
          <img src={Jeep} alt="Jeep Image" />
        </Link>
        <div className="bx bx-menu" id="menu-icon"></div>
        <div className="header-btn">
          <Link to="/register" className="sign-up">
            Register
          </Link>
          <Link to="/login" className="sign-in">
            Login
          </Link>
        </div>
      </header>

      {/* Home */}
      <section className="home" id="home">
        <div className="text">
          <h1>
            <span>Looking</span> to <br />
            rent a car
          </h1>
          <p>
            Look no further than our car rental system <br />
             for a hassle-free rental experience.
          </p>
          <div className="app-stores">
            <img src={Ios} alt="AppStore Image" />
            <img src={Play} alt="PlayStore Image" />
          </div>
        </div>
      </section>

      {/* Ride */}
      <section className="ride" id="ride">
        <div className="heading">
          <span>How Its Work</span>
          <h1>Rent With 3 Easy Steps</h1>
        </div>
        <div className="ride-container">
          <div className="box">
            <i className="bx bxs-map"></i>
            <h2>Choose A Location</h2>
            <p>
            Choose the perfect rental location for your needs from our diverse range of options.
            </p>
          </div>

          <div className="box">
            <i className="bx bxs-calendar-check"></i>
            <h2>Pick-Up Date</h2>
            <p>
            Select the ideal pick-up date for your rental with our flexible booking system.
            </p>
          </div>

          <div className="box">
            <i className="bx bxs-calendar-star"></i>
            <h2>Book A Car</h2>
            <p>
            Book your rental car quickly and easily online or in-person with our user-friendly system.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services" id="services">
        <div className="heading">
          <span>Best Services</span>
          <h1>
            Explore Out Top Deals <br />
            From Top Rated Dealers
          </h1>
        </div>

        <div className="services-container">
          <div className="box">
            <div className="box-img">
              <img src={Car1} alt="" />
            </div>
            <p>2023</p>
            <h3>Toyota Corolla</h3>
            <h2>
              Rs. 6550 <span>/day</span>
            </h2>
            <Link to="/login" className="btn">
              Rent Now
            </Link>
          </div>

          <div className="box">
            <div className="box-img">
              <img src={Car2} alt="" />
            </div>
            <p>2023</p>
            <h3>Honda Civic</h3>
            <h2>
              Rs. 4200 <span>/day</span>
            </h2>
            <Link to="/login" className="btn">
              Rent Now
            </Link>
          </div>

          <div className="box">
            <div className="box-img">
              <img src={Car3} alt="" />
            </div>
            <p>2023</p>
            <h3>Ford Mustand</h3>
            <h2>
              Rs. 20000 <span>/day</span>
            </h2>
            <Link to="/login" className="btn">
              Rent Now
            </Link>
          </div>

          <div className="box">
            <div className="box-img">
              <img src={Car4} />
            </div>
            <p>2023</p>
            <h3>Chevrolet Camaro</h3>
            <h2>
              Rs. 15000 <span>/day</span>
            </h2>
            <Link to="/login" className="btn">
              Rent Now
            </Link>
          </div>

          <div className="box">
            <div className="box-img">
              <img src={Car5} />
            </div>
            <p>2023</p>
            <h3>Jeep Wrangler</h3>
            <h2>
              Rs. 8000 <span>/day</span>
            </h2>
            <Link to="/login" className="btn">
              Rent Now
            </Link>
          </div>

          <div className="box">
            <div className="box-img">
              <img src={Car6} />
            </div>
            <p>2023</p>
            <h3>Ford F-150</h3>
            <h2>
              Rs.5000 <span>/day</span>
            </h2>
            <Link to="/login" className="btn">
              Rent Now
            </Link>
          </div>

          <div className="box">
            <div className="box-img">
              <img src={Car7} />
            </div>
            <p>2023</p>
            <h3>Toyota RAV4</h3>
            <h2>
              Rs. 7500 <span>/day</span>
            </h2>
            <Link to="/login" className="btn">
              Rent Now
            </Link>
          </div>

          <div className="box">
            <div className="box-img">
              <img src={Car8} />
            </div>
            <p>2023</p>
            <h3>Tesla Model 3</h3>
            <h2>
              Rs. 12000 <span>/day</span>
            </h2>
            <Link to="/login" className="btn">
              Rent Now
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about" id="about">
        <div className="heading">
          <span>About Us</span>
          <h1>Best Customer Experience</h1>
        </div>
        <div className="about-container">
          <div className="about-img">
            <img src={About} />
          </div>
          <div className="about-text">
            <span>About Us</span>
            <p>
            At our car rental system, we strive to provide hassle-free rental experiences. Our well-maintained vehicles, competitive rates, and exceptional customer service ensure you get the most out of your rental. Book online or in-person and let us take care of the rest.
            </p>
            <p>
            Diverse fleet, affordable rates, and exceptional service make us the go-to choice for stress-free car rentals.
            </p>
            <Link to="/login" className="btn">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="reviews" id="reviews">
        <div className="heading">
          <span>Reviews</span>
          <h1>Whats Our Customer Say</h1>
        </div>
        <div className="reviews-container">
          <div className="box">
            <div className="rev-img">
              <img src={Rev5} />
            </div>
            <h2>Bijay Baniya</h2>
            <div className="stars">
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star-half"></i>
            </div>
            <p>
            Convenient online booking, competitive rates, and top-notch fleet make this car rental system a standout choice.
            </p>
          </div>

          <div className="box">
            <div className="rev-img">
              <img src={Rev2} />
            </div>
            <h2>Sandesh Bhurtyal</h2>
            <div className="stars">
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star-half"></i>
            </div>
            <p>
            Efficient, user-friendly, affordable car rental system with a great selection of vehicles and excellent customer service.
            </p>
          </div>

          <div className="box">
            <div className="rev-img">
              <img src={Rev3} />
            </div>
            <h2>Amit Bajracharya</h2>
            <div className="stars">
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star-half"></i>
            </div>
            <p>
            Smooth and hassle-free car rental experience with reliable vehicles and helpful staff. Highly recommended.
            </p>
          </div>

          <div className="box">
            <div className="rev-img">
              <img src={Rev4} />
            </div>
            <h2>Sayush Khadka</h2>
            <div className="stars">
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star-half"></i>
            </div>
            <p>
            Hassle-free rental with reliable cars and helpful staff. Highly recommended!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="footer">
        <div className="footer-container container">
          <div className="copyright">
            <p>
              Copyright &#169; CarRentalWebsite. All rights reserved by Car
              Rental System.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Landing;
