import { Outlet } from "react-router-dom";
import Wrapper from "../styles/sharedLayout";
import { SidebarSmall, Sidebar, Navbar, Alert } from "../components";
import { useAppContext } from "../context/appContext";

export default function SharedLayout() {
  return (
    <Wrapper>
      <main className="dashboard">
        {/* <Sidebar /> */}
        <div>
          <Navbar />
          {/* {showAlert && <Alert />} */}
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
}
