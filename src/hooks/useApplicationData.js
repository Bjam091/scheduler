import { useEffect, useReducer } from "react";
import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_DAYS
} from "reducers/application";


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

    {console.log(appointments.data)
      dispatch({ type: SET_APPLICATION_DATA, days: days.data, appointments: appointments.data, interviewers: interviewers.data})}
    ) 
  }, []);


  // function findDayId(day) {
  //   if (day === 'Monday') {
  //     return 0
  //   } else if (day === 'Tuesday') {
  //     return 1
  //   } else if (day === 'Wednesday') {
  //     return 2
  //   } else if (day === 'Thursday') {
  //     return 3
  //   } else if (day === 'Friday') {
  //     return 4
  //   }
  // }

  async function bookInterview(id, interview) {
    await axios.put(`http://localhost:8001/api/appointments/${id}`, { interview });
    dispatch({ type: SET_INTERVIEW, id, interview});
    // dispatch({ type: SET_INTERVIEW, id, interview });
    // const dayId = findDayId(state.day);
    // console.log(`dayId`, dayId);
    // let updatedSpots = 0;
    // if (state.appointments[id].interview) {
    //   updatedSpots = state.days[dayId].spots;
    // }
    // else {
    //   updatedSpots = state.days[dayId].spots - 1;
    // }
    // const day = {
    //   ...state.days[dayId],
    //   spots: updatedSpots
    // };
    // const days = [
    //   ...state.days,
    // ];
    // days[dayId] = day;
    // console.log(`appointments`, state.appointments)
    // console.log(`state.appointments[id].interview`, state.appointments[id].interview);
    // console.log(`state.days[dayId].spots`, state.days[dayId].spots);
    // console.log(`days`, days);
    // console.log(`day`, day);
    // console.log(`days[dayId]`, days[dayId]);
    // dispatch({ type: SET_DAYS, value: days });
  }

  async function cancelInterview(id){
    
    await axios.delete(`http://localhost:8001/api/appointments/${id}`);
        dispatch({ type: SET_INTERVIEW, id, interview: null});

    
    // const dayId = findDayId(state.day);
    // let updatedSpots = state.days[dayId].spots + 1;
    // const day_1 = {
    //   ...state.days[dayId],
    //   spots: updatedSpots
    // };
    // const days = [ ...state.days ];

    // days[dayId] = day_1;

    //console.log(`state.appointments[id].interview`, state.appointments[id].interview);
    //console.log(`state.days[dayId].spots`, state.days[dayId].spots);
    //console.log(`days`, days);
    //console.log(`day`, day_1);
    //console.log(`days[dayId]`, days[dayId]);
    //console.log(`days[dayId].appointments`, days[dayId].appointments);
    // state.appointments[id].interview = null;
    //dispatch({ type: SET_APPLICATION_DATA, days: days, appointments: state.appointments, interviewers: state.interviewers });
    //dispatch({ type: SET_INTERVIEW, id: id, interview: null});
  
  }

  return {   
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
  
}