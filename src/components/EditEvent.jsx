import { useState } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
function EditEvent({ event, close }) {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [date, setDate] = useState(event.date);
  const [location, setLocation] = useState(event.location);
  const [time, setTime] = useState(event.time);

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(`${backendUrl}/events/updateEvent`, {
        title,
        description,
        location,
        date,
        time,
        id: event._id,
      });
      console.log(res);
      if (res.status === 200) {
        console.log("sucessfully updated");
      }
    } catch (err) {
      console.log("something went wrong", err.message);
    }
  };
  return (
    <>
      <div className="z-2 h-full w-full bg-white/30 backdrop-blur-sm flex  flex-col items-end justify-end absolute py-4 px-5 ">
        <form
          onSubmit={handleUpdateEvent}
          className="relative bg-white w-1/2 h-screen rounded-xl shadow-2xl border border-gray-100 flex flex-col   "
        >
          <div className="bg-[#D22E58] p-5 text-white ">
            <div className="relative">
              <input
                type="text"
                className="text-5xl font-medium p-2 outline-none "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                className="absolute top-0 right-0 text-xl border-2 border-black shadow-2xl py-2 px-4 rounded-full bg-white font-bold text-[#D22E58]"
                onClick={close}
              >
                X
              </button>
            </div>
            <input
              className=" font-extralight py-2 w-full outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="p-5">
            <div className="text-xl font-semibold ">Date and Time</div>
            <div className="flex justify-between m-2 ml-5 p-3 border border-gray-400 rounded-lg">
              <div className="">
                <div className="text-gray-600 font-serif">Date</div>
                <div className="flex gap-2 font-extralight">
                  <input
                    className="outline-none"
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="">
                <div className="text-gray-600 font-serif">Time</div>
                <input
                  className="font-extralight outline-none"
                  type="time"
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="px-5">
            <div className="text-xl font-semibold">Location</div>
            <div className="flex justify-between mt-2 ml-5 p-3 border border-gray-400 rounded-lg ">
              <div>
                <div className="text-gray-600 font-serif">City</div>
                <input
                  type="text"
                  className="font-extralight outline-none"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 w-full h-1/9 bg-gray-100 flex items-end justify-end p-5">
            <input
              type="submit"
              className="bg-[#D22E58] text-white p-5 rounded-3xl"
              value="Update"
            />
          </div>
        </form>
      </div>
    </>
  );
}
export default EditEvent;
