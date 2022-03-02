

export const getAppointmentsForDay = (state, day) => {
  const filteredNames = state.days.filter(dayz => dayz.name === day);

  if (filteredNames.length === 0) {
    return [];
  } else {
    return filteredNames[0].appointments.map(id => state.appointments[id]);
  }
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter((xday) => xday.name === day);
  if (filteredDays.length === 0) {
    return [];
  } else {
    return filteredDays[0].interviewers.map((id) => state.interviewers[id]);
  }
}

export const getInterview = (state, interview) => {
  if(!interview) {
    return null;
  } else {
    return {
      ...interview, 
      interviewer: state.interviewers[interview.interviewer]
    }
  }
}
 