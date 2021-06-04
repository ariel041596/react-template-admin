import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import AddEvent from "./AddEvent";

const Calendar = () => {
  // Varialbles
  const [open, setOpen] = useState(false);
  const [eventData, setEventData] = useState("");

  // eslint-disable-next-line
  const [calendarEvents, setCalendarEvents] = useState([
    {
      title: "Event Now",
      start: "2021-05-24T10:30Z",
      end: "2021-05-29T10:30Z",
    },
  ]);
  // MEthods
  // const handleDateClick = (arg) => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSelect = (arg) => {
    setOpen(true);
    setEventData(arg);
  };

  return (
    <div className="demo-app">
      <div className="demo-app-calendar">
        <FullCalendar
          select={handleSelect}
          selectable="true"
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          events={calendarEvents}
          // dateClick={handleDateClick}
        />

        <AddEvent
          open={open}
          data={eventData}
          handleClose={handleClose}
        ></AddEvent>
      </div>
    </div>
  );
};
export default Calendar;
