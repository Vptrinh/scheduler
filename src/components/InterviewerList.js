import React from "react";
// import classNames from "classnames";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";



export default function InterviewerList(props) {
  //Validate the interviewers props
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };


  return(
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewers</h4>
    <ul className="interviewers__list">
      {props.interviewers.map(interviewer => (
        <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer = {event => props.onChange(interviewer.id)}  
      />
      ))}

    </ul>
  </section>
  );
}