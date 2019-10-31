import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData(){

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...state, day }));

  useEffect(() => {
    const days = axios.get('http://localhost:8001/api/days');
    const appointments = axios.get('http://localhost:8001/api/appointments');
    const interviewers = axios.get('http://localhost:8001/api/interviewers');
  
  
    Promise.all([days, appointments, interviewers])
    .then(([days, appointments, interviewers]) => 
      setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}))
    )
  }, []);

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
    return {   
      state,
      setDay,
      bookInterview,
      cancelInterview
    }

  

  
}