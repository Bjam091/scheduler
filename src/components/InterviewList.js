import React from "react";
import "components/InterviewList.scss";
import classNames from "classnames";
import InterviewListItem from "components/InterviewListItem";





export default function InterviewerList(props){
//   const interviewerList = props.interviewers.map(interviewer => {
//     return (
//     <InterviewListItem
//       id={interviewer.id}
//       name={interviewer.name}
//       avatar={interviewer.avatar}
//       selected={interviewer.id === props.interviewer}
//       setInterviewer={props.setInterviewer}

//       />  
//       );
// });


const interviewers = props.interviewers.map(interviewer => {
  return (
    <InterviewListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={(event) => props.setInterviewer(interviewer.id)}
    />
  );
});
  
    return(
     <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{interviewers}</ul>
  </section>
    );
    }


  