import { useState } from "react";
import Who from "../components/Who";

export default function Booking() {
  const [inputStylist, setInputStylist] = useState("");
  const [stage, setStage] = useState("who");
  const fetchFromComponent = (data) => {
    console.log(data)
    switch (stage) {
      default:
        setInputStylist(data);
        setStage("when");
    }
  };
  let whichContent;
  switch (stage) {
    default:
      whichContent = <Who sendStylistId={fetchFromComponent} />;
  }
  return (
    <div className="body-container">
      <h2>Which team member would you like to book with?</h2>
      <div className="work-box">
        {whichContent}
      </div>
    </div>
  );
}
