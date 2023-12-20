import React, { useState, useEffect } from "react";
import {
  Wrapper,
  Sidebar,
  Content,
  Header,
  Secondary,
} from "../styles/settings";
import { ProfilePage, UserProfile } from "./Account";

import { sidebarLinks } from "../constants";
import { Link, Outlet } from "react-router-dom";
import { MdCheck } from "react-icons/md";

export default function Settings() {
  const [active, setActive] = useState("general");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const url = window.location.href;

    const settingsIndex = url.indexOf("/settings/");

    if (settingsIndex !== -1) {
      const extractedPart = url.substring(settingsIndex + "/settings/".length);
      if (extractedPart == "profile") {
        setActive("edit profile");
      } else {
        setActive(extractedPart);
      }
    }
  }, [active]);
  useEffect(() => {
    document.title = `${
      active.charAt(0).toUpperCase() + active.slice(1)
    } | Talktroop`;
  }, [active]);
  const handleSelect = () => {
    setOpen(!open);
  };

  return (
    <Wrapper>
      <Header>
        <UserProfile />
      </Header>
      <div className="full-container">
        <Sidebar>
          {sidebarLinks.map((item, index) => {
            return (
              <div
                className={active === item.name ? `link active` : "link"}
                key={index}
              >
                <Link to={item.link} onClick={() => setActive(item.name)}>
                  {item.name}
                </Link>
              </div>
            );
          })}
        </Sidebar>
        <Secondary className="secondary">
          <div >
            <div className=" link active">
              <Link onClick={handleSelect}>
                <p>{active}</p>
                <MdCheck className="icon" />
              </Link>
            </div>
            {open &&
              sidebarLinks.map((item, index) => {
                if (item.name !== active) {
                  return (
                    <div
                      className="link"
                      key={index}
                      onClick={() => setOpen(false)}
                    >
                      <Link to={item.link} onClick={() => setActive(item.name)}>
                        {item.name}
                      </Link>
                    </div>
                  );
                }
              })}
          </div>
        </Secondary>
        <Content>
          <Outlet />
        </Content>
      </div>
    </Wrapper>
  );
}

//  <div className="secondary">
//    <ul className="vertical-sidenav account-menu hiring-profile-account-menu open">
//      <li>
//        <Link to="/account">General</Link>
//      </li>
//      <li>
//        <Link to="/account/profile">Edit Profile</Link>
//      </li>
//      <li className={location.pathname === "/account/password" ? "active" : ""}>
//        <Link to="/account/password">Password</Link>
//      </li>
//      <li>
//        <Link to="/account/social_profiles">Social Profiles</Link>
//      </li>
//      <li>
//        <Link to="/account/notifications">Email Notifications</Link>
//      </li>
//      <li>
//        <Link to="/account/orders">Billing</Link>
//      </li>
//      <li>
//        <Link to="/account/sessions">Sessions</Link>
//      </li>
//      <li>
//        <Link to="/account/applications">Applications</Link>
//      </li>
//      <li>
//        <Link to="/account/export">Data Export</Link>
//      </li>
//      <li className="separator"></li>
//      <li className="warning">
//        <Link to="/account/destroy_confirm">Delete Account</Link>
//      </li>
//    </ul>
//  </div>;
