import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { PiExamFill } from "react-icons/pi";
import { IoLogOut } from "react-icons/io5";
import { FaUser, FaChartLine, FaCog } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";

// Main Dashboard Component
const Dashboard = () => {
  const [open, setOpen] = useState(true);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logged out");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          open ? "w-72" : "w-20"
        } bg-green-950 h-screen p-5 pt-8 relative duration-300`}
      >
        <FiMenu
          className="absolute cursor-pointer right-3 top-9 text-3xl text-white"
          onClick={() => setOpen(!open)}
        />
        <ul className="mt-10">
          <li className="cursor-pointer mt-5 flex text-left">
            <Link to="/dashboard/home" className="flex justify-center items-center">
              <AiOutlineHome className="text-4xl text-green-500" />
              <h1 className={`${!open && "hidden"} origin-left duration-200`}>
                Home
              </h1>
            </Link>
          </li>

          <li className="cursor-pointer mt-5 flex text-left">
            <Link to="/dashboard/result" className="flex justify-center items-center">
              <PiExamFill className="text-4xl text-green-500" />
              <h1 className={`${!open && "hidden"} origin-left duration-200`}>
                Result
              </h1>
            </Link>
          </li>

          <li className="cursor-pointer mt-5 flex text-left">
            <Link to="/dashboard/users" className="flex justify-center items-center">
              <FaUser className="text-4xl text-green-500" />
              <h1 className={`${!open && "hidden"} origin-left duration-200`}>
                Users
              </h1>
            </Link>
          </li>

          <li className="cursor-pointer mt-5 flex text-left">
            <Link to="/dashboard/stats" className="flex justify-center items-center">
              <FaChartLine className="text-4xl text-green-500" />
              <h1 className={`${!open && "hidden"} origin-left duration-200`}>
                Stats
              </h1>
            </Link>
          </li>

          <li className="cursor-pointer mt-5 flex text-left">
            <Link to="/dashboard/settings" className="flex justify-center items-center">
              <FaCog className="text-4xl text-green-500" />
              <h1 className={`${!open && "hidden"} origin-left duration-200`}>
                Settings
              </h1>
            </Link>
          </li>

          <li className="cursor-pointer mt-12 flex text-left">
            <span className="flex justify-center items-center mt-12 text-white text-lg">
              <IoLogOut className="text-4xl text-green-500" />
              <button
                className={`${!open && "hidden"} origin-left duration-200`}
                onClick={handleLogout}
              >
                Log out
              </button>
            </span>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="h-screen flex-auto bg-slate-100">
        <h1 className="text-2xl font-semibold text-center bg-green-950 text-white p-1">
          Welcome Admin
        </h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
