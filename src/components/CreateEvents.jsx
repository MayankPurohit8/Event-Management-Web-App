import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
const backendUrl = import.meta.env.VITE__BACKEND_URL;
function CreateEvents() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [id, setId] = useState("");

  useEffect(() => {
    const handleCookie = () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setId(decoded.id);
        } catch (err) {
          console.error("Failed to decode JWT token:", err);
        }
      }
    };
    handleCookie();
  }, []);

  const handlePostEvent = async (e) => {
    e.preventDefault();
    if (!title || !description || !location || !date || !time) {
      console.log("Please fill in all required fields.");
      toast.error("Fill all the Fields");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/user/postEvent`, {
        title,
        description,
        location,
        date,
        time,
        organizer: id,
      });
      toast.success("Event Created");
      console.log("Event created successfully:", response.data);
    } catch (err) {
      console.log("Error creating event:", err);
    }
  };

  return (
    <>
      <div className="size-full p-5 bg-[#fff0f3] ">
        <ToastContainer />
        <form
          onSubmit={handlePostEvent}
          className="size-full flex flex-col gap-10"
        >
          <div className="flex items-center">
            <label htmlFor="title" className="text-3xl px-5">
              Enter Title -
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="desc" className="text-3xl px-5">
              Enter Description -
            </label>
            <textarea
              cols="50"
              rows="5"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex items center gap-5">
            <div className="flex items-center">
              <label htmlFor="date" className="text-3xl px-5">
                Enter Date -
              </label>
              <input
                type="date"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="time" className="px-5 text-3xl">
                Enter Time -
              </label>
              <input
                type="time"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="location" className="px-5 text-3xl">
              Enter Location -
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <input
              type="submit"
              value="Add"
              className="px-10 py-4 border w-fit rounded-xl bg-[#D22E58] text-white text-3xl font-bold"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateEvents;
