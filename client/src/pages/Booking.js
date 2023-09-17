import { useState } from "react";
import Who from "../components/Who";
import When from "../components/When";

export default function Booking() {
  const [inputStylist, setInputStylist] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [stage, setStage] = useState("who");
  const fetchFromComponent = (data) => {
    console.log(data);
    switch (stage) {
      case "when":
        setInputTime(data.time);
        break;
      default:
        setInputStylist(data);
        setStage("when");
    }
  };
  const revertStage = (data) => {
    setStage(data);
  };
  let prompt;
  let whichContent;
  switch (stage) {
    case "when":
      prompt = "When would you like to come see us?";
      whichContent = (
        <When who={inputStylist} sendTime={fetchFromComponent} goBack={revertStage} />
      );
      break;
    default:
      prompt = "Which team member would you like to book with?";
      whichContent = <Who sendStylistId={fetchFromComponent} />;
  }
  return (
    <div className="body-container">
      <h2 className="fade-in">{prompt}</h2>
      <div className="work-box fade-in-slow">{whichContent}</div>
    </div>
  );
}
