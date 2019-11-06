import { useEffect, useReducer } from "react";
import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

//calls on the reducers to set the data for the applicaion

export default function useApplicationData() {

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
      .then(([days, appointments, interviewers]) => {
        dispatch({ type: SET_APPLICATION_DATA, days: days.data, appointments: appointments.data, interviewers: interviewers.data })
      }
      )
  }, []);

  async function bookInterview(id, interview) {
    await axios.put(`http://localhost:8001/api/appointments/${id}`, { interview });
    dispatch({ type: SET_INTERVIEW, id, interview });
  }

  async function cancelInterview(id) {
    await axios.delete(`http://localhost:8001/api/appointments/${id}`);
    dispatch({ type: SET_INTERVIEW, id, interview: null });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}