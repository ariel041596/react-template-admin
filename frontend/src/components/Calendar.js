import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

const Calendar = () => {
  // Varialbles
  // eslint-disable-next-line
  const [calendarEvents, setCalendarEvents] = useState([
    {
      title: "Event Now",
      start: new Date(),
    },
  ]);
  // MEthods
  const handleDateClick = (arg) => {
    console.log(arg);
  };
  return (
    <div className="demo-app">
      <div className="demo-app-calendar">
        <FullCalendar
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          events={calendarEvents}
          dateClick={handleDateClick}
        />
      </div>
    </div>
  );
};
export default Calendar;
