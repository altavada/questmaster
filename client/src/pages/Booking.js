import { useState } from "react";
import Who from "../components/Who";
import When from "../components/When";

export default function Booking() {
  const [inputStylist, setInputStylist] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [stage, setStage] = useState("who");
  const fetchFromComponent = (data) => {
    console.log(data);
    switch (stage) {
      case "when":
        setInputDate(data.date);
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
  let whichContent;
  switch (stage) {
    case "when":
      whichContent = (
        <When sendTime={fetchFromComponent} goBack={revertStage} />
      );
      break;
    default:
      whichContent = <Who sendStylistId={fetchFromComponent} />;
  }
  return (
    <div className="body-container">
      <h2>Which team member would you like to book with?</h2>
      <div className="work-box">{whichContent}</div>
    </div>
  );
}
