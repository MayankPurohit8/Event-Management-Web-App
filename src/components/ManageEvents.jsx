import axios from "axios";
import { useEffect, useState } from "react";
import EditEvent from "./EditEvent";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function ManageEvents({ title }) {
  const [events, setEvents] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [id, setId] = useState("");

  useEffect(() => {
    const getEvents = async () => {
      try {
        let res = await axios.get("http://localhost:3000/events/getEvents");
        setEvents(res.data.events);
      } catch (err) {
        console.log("Something went wrong while retrieving events");
      }
    };
    getEvents();
  }, []);

  useEffect(() => {
    const handleCookie = () => {
      const token = Cookies.get("token");
      const decoded = jwtDecode(token);
      setId(decoded.id);
    };
    handleCookie();
  }, []);

  return (
    <div className="size-full bg-[#fff0f3] overflow-auto custom-scrollbar flex flex-col gap-10 rounded-3xl relative">
      {visibility && <EditEvent event={selectedEvent} />}
      <div className="px-7 py-2 text-3xl font-bold">Manage Events</div>

      {events.length > 0 ? (
        <div className="px-10 flex flex-col gap-2">
          {events.map((event, index) =>
            event.organizer === id ? (
              <div
                onClick={() => {
                  setVisibility(!visibility);
                  setSelectedEvent(event);
                }}
                key={index}
                className="bg-white px-5 py-2 rounded-4xl flex gap-10 items-center overflow-hidden cursor-pointer hover:bg-[#f0f0f0]"
              >
                <div className="relative Date bg-[#FAF0F1] flex flex-col px-7 py-4 rounded-4xl items-center shadow-2xl">
                  <div className="text-xl font-bold">
                    {new Date(event.date).toLocaleString("en-US", {
                      weekday: "short",
                    })}
                  </div>
                  <div className="max-w-fit text-4xl font-extrabold text-[#D22E58]">
                    {new Date(event.date).getDate()}
                  </div>
                </div>
                <div>
                  <div className="title text-xl font-bold">{event.title}</div>
                  <div className="font-extralight overflow-hidden">
                    {event.description}
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
      ) : (
        <div>No events available</div>
      )}
    </div>
  );
}

export default ManageEvents;
