import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersByDay } from "../helpers/selectors";




export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);


  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(() => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
    console.log(id, interview);
    })
  }

  function cancelInterview(id){
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({
        ...state,
        appointments
      });
   
      })
    }
  
  



  useEffect(() => {



  const days = axios.get('http://localhost:8001/api/days');
  const appointments = axios.get('http://localhost:8001/api/appointments');
  const interviewers = axios.get('http://localhost:8001/api/interviewers')


  Promise.all([days, appointments, interviewers])
  .then(([days, appointments, interviewers]) => 
    setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}))
  )
    },  []);
  

    const appointments = getAppointmentsForDay(state, state.day);
    const appointmentList = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersByDay(state, state.day)

      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
          />
 
      )
    })
  

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
