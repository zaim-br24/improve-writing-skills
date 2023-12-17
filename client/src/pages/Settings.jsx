import React, { useState, useEffect } from "react";
import { Wrapper, Sidebar, Content, Header } from "../styles/settings";
import { ProfilePage, UserProfile } from "./Account";

import { sidebarLinks } from "../constants";
import { Link, Outlet } from "react-router-dom";

export default function Settings() {
  const [active, setActive] = useState("general");
    useEffect(() => {
      const url = window.location.href;

      const settingsIndex = url.indexOf("/settings/");

      if (settingsIndex !== -1) {
          const extractedPart = url.substring(settingsIndex + "/settings/".length);
          console.log(extractedPart)
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
        <Content>
          <Outlet />
        </Content>
      </div>
    </Wrapper>
  );
}
