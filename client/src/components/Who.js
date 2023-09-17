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

export default function Who({ sendStylistId }) {
  const [allStylists, setAllStylists] = useState([]);
  useEffect(() => {
    getStylistData().then((data => setAllStylists(data)));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    sendStylistId(formJson.stylist);
  };
  return (
    <>
      <div className="center wb-content">
        <Button text="Click here to meet our team!" styling={widen} />
      </div>
      <div className="center wb-content">
        Or choose a team member from the list below –
      </div>
      <form className="center" onSubmit={handleSubmit}>
        <div className="wb-content">
          <Dropdown name="stylist" options={allStylists} />
        </div>
        <div className="wb-content" style={padding}>
          <Button type="button" styling={spacer} text="Go Back" route="/" />
          <Button type="submit" text="Continue" />
        </div>
      </form>
    </>
  );
}
