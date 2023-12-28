import React from "react";
import "./NavbarOrders.css";

function NavbarOrders() {
  const NavbarData = [
    {
      title: "All Orders",
      link: "/AllOrder"
    },
    {
      title: "Wait for confirmation",
      link: "/WaitConfirmation"
    },
    {
      title: "Delivering",
      link: "/DeliveringOrder"
    },
    {
      title: "completed",
      link: "/CompletedOrder"
    },
    {
      title: "Cancelled",
      link: "/CancelledOrder"
    },
  ];

  return (
    <div className="NavbarOrders">
      <div className="List">
        {NavbarData.map((val, key) => (
          <li
            className="row"
            key={key}
            id={window.location.pathname === val.link ? "active" : ""}
            onClick={() => {
              window.location.pathname = val.link;
            }}
          >
            {""}
            <div id="title">{val.title}</div>
          </li>
        ))}
      </div>
    </div>
  );
}

export default NavbarOrders;
