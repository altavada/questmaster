import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import { useState } from "react";

const buttonStyles = {
  width: "100%",
};

export default function Who() {
  const [inputStylist, setInputStylist] = useState("");
  function handleSubmit(e, mode) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    if (mode === "who") {
      setInputStylist(formJson.stylist);
    }
  }
  return (
    <div className="body-container">
      <h2>Which team member would you like to book with?</h2>
      <div className="work-box">
        <div className="center wb-content">
          <Button text="Click here to meet our team!" styling={buttonStyles} />
        </div>
        <div className="center wb-content">
          Or click the dropdown menu to make your choice now:
        </div>
        <div className="center fill-box">
          <form onSubmit={(e) => handleSubmit(e, "who")}>
            <div className="wb-content">
              <Dropdown />
            </div>
            <div className="wb-content">
              <Button
                type="submit"
                text="Continue"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
