import React from "react";
import "./navbar.css";
import { BiSearch } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import { AiOutlineBell } from "react-icons/ai";

function Navbar() {
  const currentDate = new Date();
  return (
    <>
    <nav className="navbar">
      <div className="title">
        <h1>Dashboard</h1>
      </div>
      <div className="notification">
        <div className="date">
          <AiOutlineCalendar />
          <span>{currentDate.toDateString()}</span>
        </div>
        <div className="icon">
          <BiSearch />
          <span>|</span>
          <AiOutlineBell />
          <span>|</span>
        </div>
      </div>
    </nav>
    </>
  );
}

export default Navbar;
