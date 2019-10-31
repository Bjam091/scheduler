// import { statements } from "@babel/template";
// import React from "react";

function getAppointmentsForDay(state, day) {
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

function getInterview(state, interview){
  if (interview === null){
    return null
  } else {
  const student = interview.student
  const interviewer = state.interviewers[interview.interviewer]
  const interviewObj = {student, interviewer}
  return interviewObj
}
}


function getInterviewersByDay(state, day) {
  let interviewers = [];
for(let selectedDay of state.days){
if(selectedDay.name === day){
  for(let id of selectedDay.interviewers){
    interviewers.push(state.interviewers[id])
  }
}
}

return interviewers;
}


export {
  getAppointmentsForDay,
  getInterview,
  getInterviewersByDay
}

 