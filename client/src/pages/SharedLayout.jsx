import { Outlet } from "react-router-dom";
import Wrapper from "../styles/sharedLayout";
import { SidebarSmall, Sidebar, Navbar } from "../components";

export default function SharedLayout() {
  return (
    <Wrapper>
      <main className="dashboard">
        {/* <Sidebar /> */}

        {/* {showSidebar && <SmallSidebar />} */}
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
}
