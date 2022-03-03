import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Error from "components/Appointment/Error";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";

export default function Appointment(props) {
  //Transition Views
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    //When there is an async operation, it show's the saving transition.
    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then((response) => {
        
        transition(SHOW, false);
      
      })
      .catch(error => transition(ERROR_SAVE, true));
  }

  //Function that is called when the trash button is used and calls the cancelInterview function in hooks. Then transitions to empty mode.
  
  function destroy(event) {
    transition(DELETE, true);
    props
     .cancelInterview(props.id)
     .then(() => transition(EMPTY))
     .catch(error => transition(ERROR_DELETE, true));
   }
  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && 
      <Empty
        onAdd={() => transition(CREATE)}
      />}
      {mode === SHOW && 
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer || {}}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />}
      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === ERROR_DELETE &&
        <Error 
          message="Could not cancel appointment"
          onClose={() => back(SHOW)}
        />
      }
      {mode === ERROR_SAVE &&
        <Error
          message="Cannot save"
          onClose={back}
        />}
      {mode === CONFIRM &&
        <Confirm
          message="Are you sure you want to delete?"
          onCancel={back}
          onConfirm={() => {destroy(props.id)}}
        />}
      {mode === EDIT && 
        <Form 
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />}
    </article>
  );
}