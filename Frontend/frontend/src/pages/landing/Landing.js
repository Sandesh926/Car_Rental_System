import "./landing.css";
import Jeep from "../../images/jeep.png";
import Ios from "../../images/ios.png";
import Play from "../../images/play.png";
import Car1 from "../../images/car1.jpg";
import Car2 from "../../images/car2.jpg";
import Car3 from "../../images/car3.jpg";
import Car4 from "../../images/car4.jpg";
import Car5 from "../../images/car5.jpg";
import Car6 from "../../images/car6.jpg";
import Car7 from "../../images/cars7.webp";
import Car8 from "../../images/cars8.webp";
import Rev1 from "../../images/rev1.png";
import About from "../../images/about.png";
import Rev2 from "../../images/rev2.PNG";
import Rev3 from "../../images/rev3.PNG";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      {/* Header */}
      <header>
        <Link to="/" className="logo">
          <img src={Jeep} alt="Jeep Image" />
        </Link>
        <div className="bx bx-menu" id="menu-icon"></div>
        <div className="header-btn">
          <Link to="/register" className="sign-up">
            Sign Up
          </Link>
          <Link to="/login" className="sign-in">
            Sign In
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
            Lorem ipsum dolor sit amet consectetur adi <br />
            pisicing elit. Accusantium, ad cupiditate.
          </p>
          <div className="app-stores">
            <img src={Ios} alt="AppStore Image" />
            <img src={Play} alt="PlayStore Image" />
          </div>
        </div>

        <div className="form-container">
          <form action="">
            <div className="input-box">
              <span>Location</span>
              <input type="search" name="" id="" placeholder="Search Places" />
            </div>
            <div className="input-box">
              <span>Pick-Up Date</span>
              <input type="date" name="" id="" />
            </div>
            <div className="input-box">
              <span>Return Date</span>
              <input type="date" name="" id="" />
            </div>
            <input type="submit" name="" id="" className="btn" />
          </form>
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              doloribus aspernatur eveniet dignissimos eius saepe.
            </p>
          </div>

          <div className="box">
            <i className="bx bxs-calendar-check"></i>
            <h2>Pick-Up Date</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              doloribus aspernatur eveniet dignissimos eius saepe.
            </p>
          </div>

          <div className="box">
            <i className="bx bxs-calendar-star"></i>
            <h2>Book A Car</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              doloribus aspernatur eveniet dignissimos eius saepe.
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
            <p>2017</p>
            <h3>2018 Honda Civic</h3>
            <h2>
              $58500 | $358 <span>/month</span>
            </h2>
            <a href="#" className="btn">
              Rent Now
            </a>
          </div>

          <div className="box">
            <div className="box-img">
              <img src={Car2} alt="" />
            </div>
            <p>2017</p>
            <h3>2018 Honda Civic</h3>
            <h2>
              $58500 | $358 <span>/month</span>
            </h2>
            <a href="#" className="btn">
              Rent Now
            </a>
          </div>

          <div className="box">
            <div className="box-img">
              <img src={Car3} alt="" />
            </div>
            <p>2017</p>
            <h3>2018 Honda Civic</h3>
            <h2>
              $58500 | $358 <span>/month</span>
            </h2>
            <a href="#" className="btn">
              Rent Now
            </a>
          </div>

          <div className="box">
            <div className="box-img">
              <img src={Car4} alt="" />
            </div>
            <p>2017</p>
            <h3>2018 Honda Civic</h3>
            <h2>
              $58500 | $358 <span>/month</span>
            </h2>
            <a href="#" className="btn">
              Rent Now
            </a>
          </div>

          <div className="box">
            <div className="box-img">
              <img src={Car5} alt="" />
            </div>
            <p>2017</p>
            <h3>2018 Honda Civic</h3>
            <h2>
              $58500 | $358 <span>/month</span>
            </h2>
            <a href="#" className="btn">
              Rent Now
            </a>
          </div>

          <div className="box">
            <div className="box-img">
              <img src={Car6} alt="" />
            </div>
            <p>2017</p>
            <h3>2018 Honda Civic</h3>
            <h2>
              $58500 | $358 <span>/month</span>
            </h2>
            <a href="#" className="btn">
              Rent Now
            </a>
          </div>

          <div className="box">
            <div className="box-img">
              <img src={Car7} alt="" />
            </div>
            <p>2017</p>
            <h3>2018 Honda Civic</h3>
            <h2>
              $58500 | $358 <span>/month</span>
            </h2>
            <a href="#" className="btn">
              Rent Now
            </a>
          </div>

          <div className="box">
            <div className="box-img">
              <img src={Car8} alt="" />
            </div>
            <p>2017</p>
            <h3>2018 Honda Civic</h3>
            <h2>
              $58500 | $358 <span>/month</span>
            </h2>
            <a href="#" className="btn">
              Rent Now
            </a>
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
            <img src={About} alt="" />
          </div>
          <div className="about-text">
            <span>About Us</span>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis
              consequatur sint esse cupiditate rem numquam nemo optio,
              necessitatibus voluptatem minus quisquam sequi tempora a aliquam
              sunt ea! Libero cupiditate quod, saepe autem quidem est.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et
              numquam saepe delectus quia quaerat maiores eius placeat
              cupiditate.
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
              <img src={Rev1} alt="" />
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates eligendi ratione accusantium, beatae natus vel mollitia
              itaque labore?
            </p>
          </div>

          <div className="box">
            <div className="rev-img">
              <img src={Rev2} alt="" />
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates eligendi ratione accusantium, beatae natus vel mollitia
              itaque labore?
            </p>
          </div>

          <div className="box">
            <div className="rev-img">
              <img src={Rev3} alt="" />
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
              aliquid perspiciatis nesciunt corrupti ullam quas, quaerat nihil
              asperiores!
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
