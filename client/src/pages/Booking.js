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

  const fetchFromComponent = (data) => {
    console.log(data);
    switch (stage) {
      case "when":
        setInputTime(data.time);
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
          sendTime={fetchFromComponent}
          goBack={revertStage}
        />
      );
      break;
    default:
      prompt = "Which team member would you like to book with?";
      whichContent = (
        <Who sendStylistId={fetchFromComponent} handleReturn={backToHome} />
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
