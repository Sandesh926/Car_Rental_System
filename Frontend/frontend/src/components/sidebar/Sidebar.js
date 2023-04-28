import React, { useState } from "react";
import "./sidebar.css";
import { AiOutlineAppstore } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineShopping } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlinePieChart } from "react-icons/ai";
import { AiOutlineSetting } from "react-icons/ai";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { AiFillCar } from "react-icons/ai";

function Sidebar() {
  const [currentLink, setCurrentLink] = useState(1);
  return (
    <section className="sidebar">
      <div className="top">
        <div className="brand">
          <AiFillCar />
          <span>CarRental</span>
        </div>
        <div className="links">
          <ul>
            <li
              className={currentLink === 1 ? "active" : "none"}
              onClick={() => setCurrentLink(1)}
            >
              <a href="#">
                <AiOutlineAppstore />
                <span className="border">Dashboard</span>
              </a>
            </li>
            <li
              className={currentLink === 2 ? "active" : "none"}
              onClick={() => setCurrentLink(2)}
            >
              <a href="#">
                <AiOutlineShoppingCart />
                <span className="border">Orders</span>
              </a>
            </li>
            <li
              className={currentLink === 3 ? "active" : "none"}
              onClick={() => setCurrentLink(3)}
            >
              <a href="#">
                <AiOutlineShopping />
                <span className="border">Products</span>
              </a>
            </li>
            <li
              className={currentLink === 4 ? "active" : "none"}
              onClick={() => setCurrentLink(4)}
            >
              <a href="#">
                <AiOutlinePieChart />
                <span className="border">Overview</span>
              </a>
            </li>
            <li
              className={currentLink === 5 ? "active" : "none"}
              onClick={() => setCurrentLink(5)}
            >
              <a href="#">
                <AiOutlineUsergroupAdd />
                <span className="border">Customers</span>
              </a>
            </li>
            <li
              className={currentLink === 6 ? "active" : "none"}
              onClick={() => setCurrentLink(6)}
            >
              <a href="#">
                <AiOutlineMessage />
                <span className="border">Message</span>
              </a>
            </li>
            <li
              className={currentLink === 7 ? "active" : "none"}
              onClick={() => setCurrentLink(7)}
            >
              <a href="#">
                <AiOutlineSetting />
                <span className="border">Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="logout">
        <a href="#">
          <AiOutlineLogout />
          <span>Logout</span>
        </a>
      </div>
    </section>
  );
}

export default Sidebar;
