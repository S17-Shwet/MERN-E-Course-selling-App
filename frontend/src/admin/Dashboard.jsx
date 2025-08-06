import React from "react";
import { Link } from "react-router-dom";
import logo from "../../public/logo.webp";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/admin/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("admin");
      navigate("/admin/login");
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error?.response?.data?.errors || "Error in logging out");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-5">
        <div className="flex items-center flex-col mb-10">
          <img src={logo} alt="Profile" className="rounded-full h-20 w-20" />
          <h2 className="text-lg font-semibold mt-4">I'm Admin</h2>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link to="/admin/our-courses">
            <button className="w-full bg-blue-300 hover:bg-blue-400 text-white py-2 rounded">
              Our Courses
            </button>
          </Link>
          <Link to="/admin/create-course">
            <button className="w-full bg-blue-300 hover:bg-blue-400 text-white py-2 rounded">
              Create Course
            </button>
          </Link>

          <Link to="/">
            <button className="w-full bg-blue-300 hover:bg-blue-400 text-white py-2 rounded">
              Home
            </button>
          </Link>
          <Link to="/admin/login">
            <button
              onClick={handleLogout}
              className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 rounded"
            >
              Logout
            </button>
          </Link>
        </nav>
      </div>
      <div className="flex h-screen items-center justify-center ml-[40%] text-4xl text-blue-400">
        Welcome!!!
      </div>
    </div>
  );
}

export default Dashboard;
