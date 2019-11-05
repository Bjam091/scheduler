export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const SET_DAYS = "SET_DAYS";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { 
        ...state, 
        day: action.day 
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
        days: action.value,
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