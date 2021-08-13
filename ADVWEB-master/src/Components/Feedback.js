import { useState, useEffect } from "react"

// see docs at bottom
export function Feedback(props) {

  const [show, setShow] = useState(false)
  const [type, setType] = useState()
  let timer = undefined

  useEffect(() => {
    // set up type when component is mounted
    switch (props.type) {
      case "e":
        setType("danger");
        break;
      case "s":
        setType("success");
        break;
      case "w":
        setType("warning");
        break;
      default:
        setType("success");
        break;
    }
  });

  useEffect(() => {
    // if trigger is changed
    if (props.trigger === true) {
      timer = setTimeout(() => {
        dismiss();
      }, props.duration);
    }
  }, [props.trigger]);

  const dismiss = () => {
    clearTimeout(timer);
    setShow(false);
    props.reset(false);
  };

  if (props.trigger === true) {
    return (
      <div
        className={"alert alert-dismissible " + `alert-${type}`}
        role="alert"
      >
        {props.message}
        <button
          type="button"
          className="btn-close"
          onClick={() => props.reset(false)}
        ></button>
      </div>
    );
  } else {
    return null;
  }
}

// props type= ['e' for error | 'w' for warning | 's' for success] -- String
// props duration = miliseconds -- Number
// props message = message to display -- String
// props trigger = state hook to use to show the feedback -- Boolean
// props reset = state hook function to change the value of trigger hook -- Function
// usage 
// const [display,setDisplay] = useState(false)
// <Feedback message="Hello" type="s" duration={5000} trigger={display} reset={setDisplay} />
// to show the message, change display to true
// <button onClick={ () => setDisplay(true) }>Show</button>