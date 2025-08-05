import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import Courses from "./components/Courses";
import Buy from "./components/Buy";
import Purchases from "./components/Purchases";
import AdminSignup from "./admin/AdminSignup";
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import UpdateCourse from "./admin/UpdateCourse";
import OurCourses from "./admin/OurCourses";
import { Navigate } from "react-router-dom";
import CourseCreate from "./admin/CourseCreate";

function App() {
  // protecting routes when admin logout , dasboard should not be visible thenafter,also when user is authenticaticate thenafter user can access purchase pages
  const user = JSON.parse(localStorage.getItem("user"));

  const admin = JSON.parse(localStorage.getItem("admin"));
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Other routes */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/buy/:courseId" element={<Buy />} />
        <Route
          path="/purchases"
          element={user ? <Purchases /> : <Navigate to={"/login"} />}
        />

        {/* Admin Routes */}

        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            localStorage.getItem("admin") ? (
              <Dashboard />
            ) : (
              <Navigate to={"/admin/login"} />
            )
          }
        />
        <Route path="/admin/create-course" element={<CourseCreate />} />
        <Route path="/admin/update-course/:id" element={<UpdateCourse />} />
        <Route path="/admin/our-courses" element={<OurCourses />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
