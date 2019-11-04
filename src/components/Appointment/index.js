import "./styles.scss";
import React from "react";
// import React, {fragment} from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form"
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props){
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    

    transition(SAVE);

    props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }

function destroy(event) {
  transition(DELETE, true);
  props
   .cancelInterview(props.id)
   .then(() => transition(EMPTY))
   .catch(error => transition(ERROR_DELETE, true));
 }
 
  return (

  <article className="appointment">
    
 <Header time={props.time} />

 
  {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} /> )}
  {mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onEdit={() => transition(EDIT)}
    onDelete={() => transition(CONFIRM)}

  />
)}
{mode === CREATE && (
  <Form 
  interviewers = {props.interviewers}
  onSave={(name, interviewer) => {
   save(name, interviewer)
  }}
  onCancel={() => back(EMPTY)}
  />
)}
{mode === SAVE && (
  <Status
  message="Saving"
  />
)}
{mode === CONFIRM && (
  <Confirm
  onCancel={() => transition(SHOW)}
  message="Are you sure you would like to delete?"
  onConfirm={() => {
  destroy()
  }}
  />
)}
{mode === DELETE && (
  <Status
  message="Deleting"
  />
)}
{mode === EDIT && (
  <Form
  name = {props.interview.student}
  interviewer = {props.interview.interviewer.id}
  interviewers = {props.interviewers}
  onSave={(name, interviewer) => {
  save(name, interviewer)
  }}
  onCancel={() => back(Show)}
  />
)}
{mode === ERROR_SAVE && (
  <Error
  message = "Could not save appointment."
  onClose={() => back()}
  />
)}
{mode === ERROR_DELETE && (
  <Error
  message = "Could not delete appointment."
  onClose={() => back()}
  />
)}

 
  </article>

  )
};

