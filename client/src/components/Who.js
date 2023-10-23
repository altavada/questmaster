import { useState, useEffect } from "react";
import { getStylistData } from "../utils/aux";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";

const widen = {
  width: "100%",
};

const spacer = {
  margin: "0px 10px",
};

const padding = {
  marginTop: "3px",
};

export default function Who({ sendStylistId, handleReturn, priorSelection }) {
  const [isSelectionMade, setIsSelectionMade] = useState(false);
  const [fade, setFade] = useState(false);
  const [stylist, setStylist] = useState("null");

  useEffect(() => {
    if (priorSelection) {
      setIsSelectionMade(true);
    }
  }, [priorSelection]);

  useEffect(() => {
    if (stylist !== "null" && !isSelectionMade) {
      setFade(true);
      setTimeout(() => {
        setIsSelectionMade(true);
        setFade(false);
      }, 500);
    }
  }, [stylist]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendStylistId({
      body: { stylist },
      stage: "when",
    });
  };

  return (
    <>
      <div className="center wb-content">
        <Button text="Click here to meet our team!" styling={widen} />
      </div>
      <div className="center wb-content">
        Or choose a team member now from the list below –
      </div>
      <form className="center" onSubmit={handleSubmit}>
        <div className="wb-content">
          <Dropdown
            name="stylist"
            selectedValue={priorSelection}
            fetchOptions={getStylistData}
            returnVal={(data) => setStylist(data)}
          />
        </div>
        <div
          className={
            fade ? "wb-content fade-out-quicker" : "wb-content fade-in-quick"
          }
          style={padding}
        >
          <Button
            type="button"
            styling={spacer}
            text="Go Back"
            onClick={handleReturn}
          />
          {isSelectionMade && <Button type="submit" text="Continue" />}
        </div>
      </form>
    </>
  );
}
