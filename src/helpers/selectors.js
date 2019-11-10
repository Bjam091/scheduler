//gets all the appointments for the day

function getAppointmentsForDay(state, day) {
  let appointments = [];
  for (let selectedDay of state.days) {
    if (selectedDay.name === day) {
      for (let id of selectedDay.appointments) {
        appointments.push(state.appointments[id])
      }
    }
  }

  return appointments;
}

//gets all the interview data and into an object

function getInterview(state, interview) {
  if (!interview) {
    return null
  } else {
    const student = interview.student
    const interviewer = state.interviewers[interview.interviewer]
    const interviewObj = { student, interviewer }
    return interviewObj
  }
}

//gets all the interviewer data and into an array

function getInterviewersByDay(state, day) {
  let interviewers = [];
  for (let selectedDay of state.days) {
    if (selectedDay.name === day) {
      for (let id of selectedDay.interviewers) {
        interviewers.push(state.interviewers[id])
      }
    }
  }

  return interviewers;
}

//exports all three functions to be used in the Application.js

export {
  getAppointmentsForDay,
  getInterview,
  getInterviewersByDay
}

