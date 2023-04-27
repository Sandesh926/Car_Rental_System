import "./register.css";
import Background from "../../images/bg.jpg";
import Car from "../../images/ferrari.png";

function Register() {
  return (
    <section className="register-section">
      <img src={Background} className="bg" />
      <img src={Car} className="car" />
      <div className="register">
        <h2>Sign Up</h2>
        <div class="inputBox">
          <input type="text" placeholder="Username" />
        </div>
        <div class="inputBox">
          <input type="password" placeholder="Password" />
        </div>
        <div class="inputBox">
          <input type="submit" value="Register" id="btn" />
        </div>
      </div>
    </section>
  );
}

export default Register;
