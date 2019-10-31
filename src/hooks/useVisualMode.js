import { useState } from "react";


export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);
  function transition (newMode, replace) {
    setMode(newMode)
    if (replace === true) {
      // history.pop()
      // setHistory(history)
      setHistory([initial]);
    } else {
      setHistory([...history, mode])
    }
  }
  function back () { 
    setMode(history.pop())
  }
  return { mode, transition, back }
  
} 