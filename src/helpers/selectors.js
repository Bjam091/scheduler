import { statements } from "@babel/template";

export function getAppointmentsForDay(state, day) {
    let appointments = [];
for(let selectedDay of state.days){
  if(selectedDay.name === day){
    for(let id of selectedDay.appointments){
      appointments.push(state.appointments[id])
    }
  }
}

return appointments;
}





 