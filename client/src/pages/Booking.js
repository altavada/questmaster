import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Who from "../components/Who";
import When from "../components/When";

export default function Booking() {
  const transitionTime = 1000;
  const [inputStylist, setInputStylist] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [stage, setStage] = useState("who");
  const [fade, setFade] = useState(false);

  const getFromComponent = (data) => {
    console.log('Component data:', data);
    switch (stage) {
      case "when":
        setFade(true);
        setInputTime(data);
        setTimeout(() => {
          setStage("what");
          setFade(false);
        }, transitionTime);
        break;
      default:
        setFade(true);
        setInputStylist(data);
        setTimeout(() => {
          setStage("when");
          setFade(false);
        }, transitionTime);
    }
  };

  const revertStage = (data) => {
    setFade(true);
    setTimeout(() => {
      setStage(data);
      setFade(false);
    }, transitionTime);
  };

  let navigate = useNavigate();
  
  const backToHome = () => {
    setFade(true);
    setTimeout(() => {
      navigate("/");
    }, transitionTime);
  };

  let prompt;
  let whichContent;
  switch (stage) {
    case "when":
      prompt = "When would you like to come see us?";
      whichContent = (
        <When
          who={inputStylist}
          sendTime={getFromComponent}
          goBack={revertStage}
        />
      );
      break;
    default:
      prompt = "Which team member would you like to book with?";
      whichContent = (
        <Who sendStylistId={getFromComponent} handleReturn={backToHome} />
      );
  }

  return (
    <div className="body-container">
      <div className="fade-in">
        <h2 className={fade ? "fade-out-quick" : "fade-in-quick"}>{prompt}</h2>
      </div>
      <div className="fade-in-slow">
        <div
          className={fade ? "work-box fade-out-quicker" : "work-box fade-in"}
        >
          {whichContent}
        </div>
      </div>
    </div>
  );
}
