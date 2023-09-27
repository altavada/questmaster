import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Who from "../components/Who";
import When from "../components/When";
import What from "../components/What";
import Review from "../components/Review";

export default function Booking() {
  const transitionTime = 1000;
  const [inputStylist, setInputStylist] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [details, setDetails] = useState({});
  const [requestData, setRequestData] = useState({});
  const [onStage, setOnStage] = useState("who");
  const [fade, setFade] = useState(false);

  const getFromComponent = (data, whichData, toStage) => {
    setFade(true);
    setTimeout(() => {
      switch (whichData) {
        default:
          setInputStylist(data);
          break;
        case "time":
          setInputTime(data);
          break;
        case "details":
          setDetails(data);
          setRequestData({ ...data, time: inputTime, stylist: inputStylist });
      }
      setOnStage(toStage);
      setFade(false);
    }, transitionTime);
  };

  const revertStage = (data) => {
    setFade(true);
    setTimeout(() => {
      setOnStage(data);
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
  switch (onStage) {
    default:
      prompt = "Which team member would you like to book with?";
      whichContent = (
        <Who sendStylistId={getFromComponent} handleReturn={backToHome} />
      );
      break;
    case "what":
      prompt = "Tell us about your visit";
      whichContent = (
        <What sendDetails={getFromComponent} goBack={revertStage} />
      );
      break;
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
    case "review":
      prompt = "Does everything look correct?";
      whichContent = <Review requestData={requestData} goBack={revertStage} />;
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
