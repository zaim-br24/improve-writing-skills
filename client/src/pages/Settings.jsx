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
import { CgMenuCheese  } from "react-icons/cg";


export default function Settings() {
  const [active, setActive] = useState("general");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const url = window.location.href;

    const settingsIndex = url.indexOf("/settings/");

    if (settingsIndex !== -1) {
      const extractedPart = url.substring(settingsIndex + "/settings/".length);
      if (extractedPart === "profile") {
        setActive("edit profile");
      } else {
        setActive(extractedPart);
      }
    } else {
      setActive("general");
    }
  }, [active]);
  useEffect(() => {
    // const currentActiveTab =  active.charAt(0).toUpperCase() + active.slice(1);
    document.title = `${active} | Talktroop`;
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
        <Secondary>
          <div>
            <div className=" link active">
              <Link onClick={handleSelect}>
                <CgMenuCheese  className="icon" />

                <p>{active && active}</p>
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
