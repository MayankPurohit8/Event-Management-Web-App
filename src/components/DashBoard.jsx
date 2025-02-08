import { NavLink, Routes, Route } from "react-router-dom";
import Events from "./Events";
import axios from "axios";
import CreateEvents from "./CreateEvents";
import Cookies from "js-cookie";
import ManageEvents from "./ManageEvents";
import Authentication from "./Authentication";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
const backendUrl = process.env.BACKEND_URL;

function DashBoard() {
  const [guest, setGuest] = useState(false);
  const [username, setUserName] = useState("");

  useEffect(() => {
    const handleCookie = () => {
      const token = Cookies.get("token");
      if (token) {
        const decoded = jwtDecode(token);
        setGuest(decoded.guest);
        setUserName(decoded.name);
      }
    };
    handleCookie();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${backendUrl}/user/logout`,
        {},
        { withCredentials: true }
      );
      Cookies.remove("token");
      window.location.reload();
    } catch (err) {
      console.log("Error while logging out:", err);
    }
  };

  return (
    <>
      <div className="w-full h-screen relative">
        <Authentication />
        <header className="flex justify-between items-end px-5 sm:px-10 w-full h-1/7 sm:h-20">
          <div className="flex items-end w-1/2 sm:w-1/4 justify-between">
            <div className="logo text-3xl sm:text-6xl font-bold">EVent</div>
          </div>
          <div className="user flex flex-col justify-end items-end">
            <div className="px-2 text-lg sm:text-3xl">{username}</div>
          </div>
        </header>

        <div className="flex flex-col sm:flex-row h-5/6">
          <div className="w-full sm:w-1/5 h-full flex flex-col text-lg sm:text-xl gap-5 p-3 sm:p-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "p-3 rounded-4xl border-4 border-[#D22E58] text-[#D22E58]"
                  : "p-3"
              }
            >
              Events
            </NavLink>
            {guest ? null : (
              <NavLink
                to="/createEvents"
                className={({ isActive }) =>
                  isActive
                    ? "p-3 rounded-4xl border-4 border-[#D22E58] text-[#D22E58]"
                    : "p-3"
                }
              >
                Create Events
              </NavLink>
            )}
            {guest ? null : (
              <NavLink
                to="/manageEvents"
                className={({ isActive }) =>
                  isActive
                    ? "p-3 rounded-4xl border-4 border-[#D22E58] text-[#D22E58]"
                    : "p-3"
                }
              >
                Manage Events
              </NavLink>
            )}
            <button
              className="bg-blue-500 py-2 px-4 rounded-4xl text-white hover:bg-blue-400"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          <div className="size-full sm:w-4/5 p-5 rounded-3x ">
            <Routes>
              <Route path="/" element={<Events />} />
              {guest ? null : (
                <Route path="/createEvents" element={<CreateEvents />} />
              )}
              {guest ? null : (
                <Route path="/manageEvents" element={<ManageEvents />} />
              )}
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
