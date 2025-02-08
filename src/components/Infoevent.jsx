import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

function InfoEvent({ event, close }) {
  const [bookedslots, setBookedSlots] = useState(event.guests.length);
  const [guest, setGuest] = useState(true);
  const [id, setId] = useState("");

  useEffect(() => {
    const handleCookie = () => {
      const token = Cookies.get("token");
      if (token) {
        const decode = jwtDecode(token);
        setGuest(decode.guest);
        setId(decode.id);
      }

      socket.on("updatedBookedSlots", (newBookedSlots) => {
        setBookedSlots(newBookedSlots);
      });

      return () => {
        socket.off("updatedBookedSlots");
      };
    };
    handleCookie();
  }, []);

  const handleUpdateSlots = async () => {
    try {
      let res = await axios.post("http://localhost:3000/bookSlots", {
        userid: id,
        eventid: event._id,
      });
      if (res.status === 200) {
        console.log("updated slots");
      }
    } catch (err) {
      console.log("something went wrong");
    }
  };

  return (
    <>
      <div className="z-2 h-full w-full bg-white/30 backdrop-blur-xs flex  flex-col items-end justify-end absolute py-4 px-5 ">
        <div className="relative bg-white w-1/2 h-screen rounded-xl shadow-2xl border border-gray-100 flex flex-col overflow-auto ">
          <div className="bg-[#D22E58] p-5 text-white">
            <div className="text-5xl font-medium relative">
              <div className="">{event.title}</div>
              <button
                class="absolute top-0 right-0 text-xl border-2 border-black shadow-2xl py-2 px-4 rounded-full bg-white font-bold text-[#D22E58]"
                onClick={close}
              >
                X
              </button>
            </div>
            <div className=" font-extralight py-2">{event.description}</div>
          </div>
          <div className="p-5 ">
            <div className="text-xl font-semibold ">Date and Time</div>
            <div className="flex justify-between m-2 ml-5 p-3 border border-gray-400 rounded-lg">
              <div className="">
                <div className="text-gray-600 font-serif">Date</div>
                <div className="flex gap-2 font-extralight">
                  <div className="">
                    {new Date(event.date).toLocaleString("en-US", {
                      weekday: "long",
                    })}
                    ,
                  </div>
                  <div className="flex gap-1">
                    <div className="">{new Date(event.date).getDate()}</div>
                    <div className="">
                      {new Date(event.date).toLocaleString("en-US", {
                        month: "long",
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="text-gray-600 font-serif">Time</div>
                <div className="font-extralight">{event.time}</div>
              </div>
            </div>
          </div>
          <div className="px-5">
            <div className="text-xl font-semibold">Location</div>
            <div className="flex justify-between mt-2 ml-5 p-3 border border-gray-400 rounded-lg ">
              <div>
                <div className="text-gray-600 font-serif">City</div>
                <div className="font-extralight">{event.location}</div>
              </div>
            </div>
          </div>
          <div className="px-5 py-4 flex items-center justify-center">
            <div className="text-xl font-semibold ">Booked Slots : </div>
            <div className="font-serif  font-extralight text-3xl px-2 ">
              {bookedslots}
            </div>
          </div>
          <div className="absolute bottom-0 w-full h-1/9 bg-gray-100 flex items-end justify-end p-5">
            {guest ? (
              <button
                className="bg-[#D22E58] text-white p-5 rounded-3xl"
                onClick={handleUpdateSlots}
              >
                Book Slots
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default InfoEvent;
