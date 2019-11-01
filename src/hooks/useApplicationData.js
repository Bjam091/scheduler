import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_DAYS = "SET_DAYS";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { 
        ...state, day: action.day 
      }
      
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      }
    
    case SET_DAYS:
      return {
        ...state,
        days: action.days,
      }

    case SET_INTERVIEW: {
       const appointment = {
        ...state.appointments[action.id],
        interview: { ...action.interview }
      };
  
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };
      return {...state, appointments}
    }

    
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}




export default function useApplicationData(){

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    const days = axios.get('http://localhost:8001/api/days');
    const appointments = axios.get('http://localhost:8001/api/appointments');
    const interviewers = axios.get('http://localhost:8001/api/interviewers');
  
    Promise.all([days, appointments, interviewers])
    .then(([days, appointments, interviewers]) => 
      dispatch({ type: SET_APPLICATION_DATA, days: days.data, appointments: appointments.data, interviewers: interviewers.data})
    )
  }, []);

  function getDays() {
    const days = axios.get('http://localhost:8001/api/days');
    
    Promise.all([days]).then(([days]) => 
    dispatch({ type: SET_DAYS, days: days.data})
    )
  }

  function bookInterview(id, interview) {
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(() => {
      dispatch({ type: SET_INTERVIEW, id, interview });
      getDays();
    })
  }

  function cancelInterview(id){
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      dispatch({ type: SET_INTERVIEW, id });
      getDays();
      })
    }
    return {   
      state,
      setDay,
      bookInterview,
      cancelInterview
    }

  

  
}