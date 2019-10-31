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

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const EDIT = "EDIT";


export default function Appointment(props){
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );

    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      return interview
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
    transition(SAVE)
    props.bookInterview(props.id, save(name, interviewer)).then(() => 
    transition(SHOW));
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
    transition(DELETE)
    props.cancelInterview(props.id).then(() => 
    transition(EMPTY))
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
    transition(SAVE)
    props.bookInterview(props.id, save(name, interviewer)).then(() => 
    transition(SHOW));
  }}
  onCancel={() => back(Show)}
  />
)}

 
  </article>

  )
};

