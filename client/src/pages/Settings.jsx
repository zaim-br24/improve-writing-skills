import React, { useState, useEffect } from "react";
import { Wrapper, Sidebar, Content, Header } from "../styles/settings";
import { ProfilePage, UserProfile } from "./Account";

import { sidebarLinks } from "../constants";
import { Link, Outlet } from "react-router-dom";

export default function Settings() {
  const [active, setActive] = useState("general");
  useEffect(() => {
    document.title = `${
      active.charAt(0).toUpperCase() + active.slice(1)
    } | Talktroop`;
  }, [active]);
  return (
    <Wrapper>
      <Header>header</Header>
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
          <UserProfile />

          <Outlet />
        </Content>
      </div>
    </Wrapper>
  );
}
