import { useState } from "react";

//creates a history for the user when going through the interview process

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);
  function transition(newMode, replace) {
    setMode(newMode)
    if (replace === true) {
      setHistory([initial]);
    } else {
      setHistory([...history, mode])
    }
  }
  function back() {
    setMode(history.pop())
  }
  return { mode, transition, back }

} 