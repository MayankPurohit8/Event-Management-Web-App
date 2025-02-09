import axios from "axios";
import { useEffect, useState } from "react";
import EditEvent from "./EditEvent";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
const backendUrl = import.meta.VITE__BACKEND_URL;
function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [id, setId] = useState("");

  const close = () => {
    setVisibility(false);
  };
  useEffect(() => {
    const handleCookie = () => {
      try {
        const token = Cookies.get("token");
        if (token) {
          const decoded = jwtDecode(token);
          setId(decoded.id);
        }
      } catch (err) {
        console.log("something went wrong ");
      }
    };

    const getEvents = async () => {
      try {
        let res = await axios.get(`${backendUrl}/events/getEvents`);
        setEvents(res.data.events);
      } catch (err) {
        console.log("something went wrong while retrieving events");
      }
    };
    handleCookie();
    getEvents();
  }, []);

  return (
    <>
      <div className="size-full bg-[#fff0f3] overflow-auto custom-scrollbar flex flex-col gap-10 rounded-3xl relative">
        {visibility ? <EditEvent event={selectedEvent} close={close} /> : ""}
        <div className=" px-7 py-2 text-3xl font-bold">Upcoming Events</div>

        {events.length > 0 ? (
          <div className="px-10 flex flex-col gap-2">
            {events
              .filter((event) => event.organizer === id)
              .map((event, index) => (
                <div
                  onClick={() => {
                    setVisibility(true);
                    setSelectedEvent(event);
                    console.log(event.organizer);
                  }}
                  key={index}
                  className=" bg-white px-5 py-2 rounded-4xl flex gap-10 items-center overflow-hidden"
                >
                  <div className=" relative Date bg-[#FAF0F1] flex flex-col px-7 py-4 rounded-4xl items-center shadow-2xl ">
                    <div className=" text-xl font-bold">
                      {new Date(event.date).toLocaleString("en-US", {
                        weekday: "short",
                      })}
                    </div>
                    <div className=" max-w-fit text-4xl font-extrabold text-[#D22E58]">
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
              ))}
          </div>
        ) : (
          <div>No events available</div>
        )}
      </div>
    </>
  );
}

export default ManageEvents;
