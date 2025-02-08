import axios from "axios";
import { useEffect, useState } from "react";
import InfoEvent from "./Infoevent";

function Events() {
  const [events, setEvents] = useState([]);
  const [visibility, setVisiblity] = useState(false);
  const [selectedEvent, setSelectedevent] = useState({});

  const close = () => {
    setVisiblity(false);
  };

  useEffect(() => {
    const getEvents = async () => {
      try {
        let res = await axios.get(`${backendUrl}/events/getEvents");
        setEvents(res.data.events);
      } catch (err) {
        console.log("something went wrong while retrieving events");
      }
    };
    getEvents();
  }, []);

  return (
    <>
      <div className="size-full bg-[#fff0f3] overflow-auto custom-scrollbar flex flex-col gap-10 rounded-3xl relative">
        {visibility ? <InfoEvent event={selectedEvent} close={close} /> : ""}
        <div className=" px-7 py-2 text-3xl font-bold">Upcoming Events</div>

        {events.length > 0 ? (
          <div className="px-10 flex flex-col gap-2">
            {events.map((event, index) => (
              <div
                onClick={() => {
                  setVisiblity(true);
                  setSelectedevent(event);
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

export default Events;
