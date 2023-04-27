import "./login.css";
import Background from "../../images/bg.jpg";
import Car from "../../images/ferrari.png";

function Login() {
  return (
    <section className="login-section">
      <img src={Background} className="bg" />
      <img src={Car} className="car" />
      <div className="login">
        <h2>Sign In</h2>
        <div class="inputBox">
          <input type="text" placeholder="Username" />
        </div>
        <div class="inputBox">
          <input type="password" placeholder="Password" />
        </div>
        <div class="inputBox">
          <input type="submit" value="Login" id="btn" />
        </div>
        <div class="group">
          <a href="#">Forget Password</a>
          <a href="#">Sign Up</a>
        </div>
      </div>
    </section>
  );
}

export default Login;
