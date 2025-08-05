import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";

function UpdateCourse() {
  //    when clicked on update button
  // we go on update-course with course id so fetch that course id from backend

  const { id } = useParams();

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");

  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  //   if user go on first page then if data is not coming from backend then show loading
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //   for data should be visible already we have to create useEffect for fetching that data of mentioned courseId at line 7 useEffect runs without any click automatically,without any event

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // call course detail api
        const { data } = await axios.get(`${BACKEND_URL}/course/${id}`, {
          withCredentials: true,
        });
        console.log(data);
        // saving console data in our states
        setTitle(data.course.title);
        setDescription(data.course.description);
        setPrice(data.course.price);
        setImage(data.course.image.url);
        setImagePreview(data.course.image.url);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch course data");
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [id]); //whenever id changes ,that time useEffect runs ,admin goes on update courses page

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader(); //read file
    reader.readAsDataURL(file); //base 64 encoded string convert
    reader.onload = () => {
      setImagePreview(reader.result); //through onload actual file value is taken and that is seen on UI
      setImage(file);
    };
  };

  // backend api call
  const handleUpdateCourse = async (e) => {
    e.preventDefault(); //prevents by default page reloading

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    if (image) {
      formData.append("image", image);
    }

    // see if admin is login && is valid

    const admin = JSON.parse(localStorage.getItem("admin"));
    const token = admin.token;
    if (!token) {
      toast.error("Please login to admin");
      //   navigate("/admin/login");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:4001/api/v1/course/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      //   console.log(response.data);
      toast.success(response.data.message || "Course updated successfully");

      navigate("/admin/our-courses");
      setTitle("");
      setPrice("");
      setImage("");
      setDescription("");
      setImagePreview("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div>
      <div className="min-h-screen py-10">
        <div className="max-w-4xl mx-auto p-6 border rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-8">Update Course</h3>
          <form onSubmit={handleUpdateCourse} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-lg">Title</label>
              <input
                type="text"
                placeholder="Enter your course title"
                value={title}
                // getting title from user and setting in setTitle targetting and saving in setTitle's title
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Description</label>
              <input
                type="text"
                placeholder="Enter your course description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Price</label>
              <input
                type="number"
                placeholder="Enter your course price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Course Image</label>
              <div className="flex items-center justify-center">
                <img
                  src={imagePreview ? `${imagePreview}` : "/imgPL.webp"}
                  alt="Course"
                  className="w-full max-w-sm h-auto rounded-md object-cover"
                />
              </div>
              <input
                type="file" //takiing image and converting it into encoded string
                onChange={changePhotoHandler}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
            >
              Update Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateCourse;
