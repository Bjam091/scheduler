import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from 'axios';
import getAppointmentsForDay from "../helpers/selectors";




export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);


  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {



  const days = axios.get('http://localhost:8001/api/days');
  const appointments = axios.get('http://localhost:8001/api/appointments');


  Promise.all([days, appointments])
  .then(([days, appointments]) => 
    setState(prev => ({ ...prev, days: days.data, appointments: appointments.data}))
  )
    },  []);
  

  const appointmentList = getAppointmentsForDay(state, state.day).map(appointment => {
    return (<Appointment key={appointment.id} {...appointment} />)
  });
  

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">


<DayList days={state.days} day={state.day} setDay={day => setDay(day)} />
</nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
      
    </main>
  );
}
