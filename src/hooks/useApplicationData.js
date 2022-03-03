import axios from "axios";
const { useState, useEffect } = require("react");

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((response) => {
      setState((prev) => ({
        ...prev,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    //Checks if there is an appointment booked or not, if so, then it calls the updateSpots function.
    const booking = appointment.interview;
    appointment.interview = { ...interview };

    let days = [...state.days];

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      if (!booking) {
        days = updateSpots("bookInterview");
      }
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  function cancelInterview(id, interview) {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: null,
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };

      const days = updateSpots();
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  const updateSpots = function (requestType) {
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        if (requestType === "bookInterview") {
          return { ...day, spots: day.spots - 1 };
        } else {
          return { ...day, spots: day.spots + 1 };
        }
      } else {
        return { ...day };
      }
    });
    return days;
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
