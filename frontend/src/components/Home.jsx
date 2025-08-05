import React from "react";
import logo from "../../public/logo.webp";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";
import { useState } from "react";
function Home() {
  const [courses, setCourses] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // only one time render
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        console.log(response.data.courses);
        setCourses(response.data.courses);
      } catch (error) {
        console.log("error in fetchCourse", error);
      }
    };
    fetchCourses();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error is Logging out", error);
      toast.error(error?.response?.data?.errors || "Error in logging out");
    }
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-950">
      <div className="h-[1250px] md:h-[1050px] text-white container mx-auto ">
        {/* main div applied to all header section and footer */}

        {/* Header */}
        <header className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt=""
              className="w-7 h-7 md:w-10 md:h-10 rounded-full"
            />
            <h1 className="md:text-2xl text-blue-200 font-bold">CourseHaven</h1>
          </div>

          {/* login and signup buttons */}
          <div className="space-x-4 ">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-transparent text-white py-2 px-4 border-white rounded"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="bg-transparent text-white py-2 px-4 border-white rounded"
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="bg-transparent text-white py-2 px-4 border-white rounded"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </header>

        {/* Main section */}

        <section className="text-center py-20">
          <h1 className="text-4xl font-semibold text-blue-200">CourseHaven</h1>
          <br />

          <p className="text-gray-500">
            Sharpen your skills with courses crafted by experts.
          </p>

          <div className="space-x-2 mt-8">
            <Link
              to={"/courses"}
              className="bg-blue-100 text-gray-600 p-2 md:px-6 rounded font-semibold hover:bg-white duration-300 hover:text-black"
            >
              Explore Courses
            </Link>
            <Link
              to={""}
              className="bg-white text-gray-600 p-2 md:px-6 rounded font-semibold hover:bg-blue-100 duration-300 hover:text-black"
            >
              Courses videos
            </Link>
          </div>
        </section>

        <section className="p-10">
          <Slider {...settings}>
            {courses.map((course) => (
              <div key={course._id} className="p-4">
                <div className="relative flex-shrink-0 w-92 transition-transform duration-300 transform hover:scale-105">
                  <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <img
                      className="h-32 w-full object-contain"
                      src={course.image.url}
                      alt=""
                    />
                    <div className="p-6 text-center">
                      <h2 className="text-xl font-bold text-white">
                        {course.title}
                      </h2>
                      <Link
                        to={`/buy/${course._id}`}
                        className="mt-4 bg-blue-200 text-black py-2 px-4 rounded-full hover:bg-blue-300 duration-300"
                      >
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>
        <hr />

        {/* Footer */}
        <footer className="my-12">
          <div className="grid grid-cols-1 md:grid-cols-3 ">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-2">
                <img src={logo} alt="" className="w-10 h-10 rounded-full" />
                <h1 className="text-2xl text-blue-200 font-bold">
                  CourseHaven
                </h1>
              </div>

              {/* Social icons */}
              <div className="mt-3 ml-2 md:ml-8">
                <p className="mb-2 ">Follow us</p>

                <div className="flex space-x-4">
                  <a href="">
                    <FaFacebook className="text-2xl hover:text-blue-400 duration-300" />
                  </a>
                  <a href="">
                    <FaInstagram className="text-2xl hover:text-pink-400 duration-300" />
                  </a>
                  <a href="">
                    <FaTwitter className="text-2xl hover:text-blue-600 duration-300" />
                  </a>
                </div>
              </div>
            </div>

            <div className="items-center mt-6 md:mt-0 flex flex-col ">
              <h3 className="text-lg font-semibold md:mb-4">Connect us via:</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300 text-center">
                  Github
                </li>
                <li className="hover:text-white cursor-pointer duration-300 text-center">
                  Linkedin
                </li>
                <li className="hover:text-white duration-300">
                  Contact No.7620750024
                </li>
              </ul>
            </div>

            <div className="items-center flex flex-col ">
              <h3 className="text-lg font-semibold mb-2 mt-4">
                copyrights &#169; 2025
              </h3>
              <ul className="space-y-2 text-center text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300 text-center">
                  Term & Conditions
                </li>
                <li className="hover:text-white cursor-pointer duration-300 text-center">
                  Privacy Policy
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Refund & Cancellation
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
