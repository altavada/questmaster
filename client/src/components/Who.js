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

export default function Who({ sendStylistId, handleReturn }) {
  const [allStylists, setAllStylists] = useState([]);
  const [isSelectionMade, setIsSelectionMade] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    getStylistData().then((data) => {
      setAllStylists(data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log("We save the selected stylist's ID for appointment-creation:", formJson.stylist);
    sendStylistId(formJson.stylist);
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
            options={allStylists}
            handleChange={() => {
              if (!isSelectionMade) {
                setFade(true);
                setTimeout(() => {
                  setIsSelectionMade(true);
                  setFade(false);
                }, 400);
              }
            }}
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
